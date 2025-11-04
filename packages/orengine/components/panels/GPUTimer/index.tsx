import { useEffect, useState, useRef } from 'react';

import { useOREngine } from '../../../features/OREngine/Hooks/useOREngine';
import { TimerDataBuffer } from './TimerDataBuffer';
import { TimerDuration, TimerStatistics } from './types';

import style from './index.module.scss';

/**
 * 時間に応じた色を取得（緑→黄→橙→赤）
 * @param duration 時間（ms）
 * @returns RGB文字列
 */
const getColorForDuration = ( duration: number ): string => {

	// 0-2ms: 緑
	// 2-5ms: 黄
	// 5-10ms: 橙
	// 10ms+: 赤

	if ( duration < 2 ) {

		// 緑
		const ratio = duration / 2;
		const r = Math.floor( 100 + ratio * 100 );
		return `rgb(${r}, 200, 100)`;

	} else if ( duration < 5 ) {

		// 黄
		const ratio = ( duration - 2 ) / 3;
		const g = Math.floor( 200 - ratio * 50 );
		return `rgb(200, ${g}, 100)`;

	} else if ( duration < 10 ) {

		// 橙
		const ratio = ( duration - 5 ) / 5;
		const g = Math.floor( 150 - ratio * 80 );
		const b = Math.floor( 100 - ratio * 50 );
		return `rgb(200, ${g}, ${b})`;

	} else {

		// 赤
		return 'rgb(200, 70, 50)';

	}

};

/**
 * 数値を適切な桁数でフォーマット
 * @param value 数値
 * @returns フォーマットされた文字列
 */
const formatNumber = ( value: number ): string => {

	if ( value >= 10 ) {

		return value.toFixed( 1 );

	} else if ( value >= 1 ) {

		return value.toFixed( 2 );

	} else {

		return value.toFixed( 3 );

	}

};

export const Timer = () => {

	const { engine } = useOREngine();
	const [ statistics, setStatistics ] = useState<TimerStatistics[]>( [] );
	const [ totalTime, setTotalTime ] = useState<number>( 0 );
	const [ filterType, setFilterType ] = useState<string>( 'all' );
	const [ threshold, setThreshold ] = useState<number>( 0 );
	const [ sortBy, setSortBy ] = useState<'time' | 'name'>( 'time' );
	const dataBufferRef = useRef<TimerDataBuffer>( new TimerDataBuffer( 30 ) );
	const rafIdRef = useRef<number>( 0 );
	const dirtyRef = useRef<boolean>( false );
	const lastUpdateTimeRef = useRef<number>( 0 );

	useEffect( () => {

		const renderer = engine.renderer;
		const dataBuffer = dataBufferRef.current;
		const updateInterval = 300; // 更新間隔（ms）

		// Rendererからのタイマーイベントを受信
		const onTimerUpdate = ( samples: TimerDuration[] ) => {

			dataBuffer.update( samples );
			dirtyRef.current = true;

		};

		// requestAnimationFrameでスロットリングしながら更新
		const tick = ( timestamp: number ) => {

			// 前回の更新から指定時間経過していれば更新
			if ( dirtyRef.current && timestamp - lastUpdateTimeRef.current >= updateInterval ) {

				setStatistics( dataBuffer.getStatistics() );
				setTotalTime( dataBuffer.getTotalTime() );
				dirtyRef.current = false;
				lastUpdateTimeRef.current = timestamp;

			}

			rafIdRef.current = requestAnimationFrame( tick );

		};

		renderer.on( "timer", onTimerUpdate );
		rafIdRef.current = requestAnimationFrame( tick );

		return () => {

			renderer.off( "timer", onTimerUpdate );
			cancelAnimationFrame( rafIdRef.current );

		};

	}, [ engine ] );

	// フィルタリング
	const filteredStats = statistics.filter( ( stat ) => {

		// renderTypeフィルタ
		if ( filterType !== 'all' && stat.renderType !== filterType ) {

			return false;

		}

		// 閾値フィルタ（平均値で判定）
		if ( stat.avg < threshold ) {

			return false;

		}

		return true;

	} );

	// 利用可能なrenderTypeリストを取得
	const availableTypes = Array.from( new Set( statistics.map( ( s ) => s.renderType ) ) );

	// ソート
	const sortedItems = [ ...filteredStats ].sort( ( a, b ) => {

		if ( sortBy === 'time' ) {

			return b.avg - a.avg; // 平均時間の降順

		} else {

			return a.name.localeCompare( b.name ); // 名前の昇順

		}

	} );

	// FPS計算（フレーム時間の逆数）
	const fps = totalTime > 0 ? Math.floor( 1000 / totalTime ) : 0;

	return (
		<div className={style.container}>
			{/* ヘッダー：合計時間とFPS */}
			<div className={style.header}>
				<div className={style.totalTime}>
					Total: {formatNumber( totalTime )} ms ({fps} fps)
				</div>

				{/* コントロール：フィルタとソート */}
				<div className={style.controls}>
					<div className={style.control}>
						<span className={style.controlLabel}>Type:</span>
						<select
							className={style.select}
							value={filterType}
							onChange={( e ) => setFilterType( e.target.value )}
						>
							<option value="all">All</option>
							{availableTypes.map( ( type ) => (
								<option key={type} value={type}>
									{type}
								</option>
							) )}
						</select>
					</div>

					<div className={style.control}>
						<span className={style.controlLabel}>Min:</span>
						<input
							className={style.input}
							type="number"
							min="0"
							step="0.1"
							value={threshold}
							onChange={( e ) => setThreshold( parseFloat( e.target.value ) || 0 )}
						/>
						<span className={style.controlLabel}>ms</span>
					</div>

					<div className={style.control}>
						<span className={style.controlLabel}>Sort:</span>
						<select
							className={style.select}
							value={sortBy}
							onChange={( e ) => setSortBy( e.target.value as 'time' | 'name' )}
						>
							<option value="time">Time</option>
							<option value="name">Name</option>
						</select>
					</div>
				</div>
			</div>

			{/* タイマーアイテムのリスト */}
			<div className={style.group}>
				{sortedItems.map( ( stat, index ) => {

					const color = getColorForDuration( stat.avg );
					const barWidth = totalTime > 0 ? ( stat.avg / totalTime ) * 100 : 0;

					return (
						<div key={stat.name + index} className={style.item}>
							<div>
								<span className={style.itemName} title={stat.name}>
									{stat.name}
								</span>
								<span className={style.itemTime} style={{ color }}>
									{formatNumber( stat.avg )}ms
								</span>
								<span className={style.itemStats}>
									max:{formatNumber( stat.max )}
								</span>
							</div>
							<div className={style.progressBar}>
								<div
									className={style.progressFill}
									style={{
										width: `${barWidth}%`,
										backgroundColor: color
									}}
								/>
							</div>
						</div>
					);

				} )}
			</div>
		</div>
	);

};
