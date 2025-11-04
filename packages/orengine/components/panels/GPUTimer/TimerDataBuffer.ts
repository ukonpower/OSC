import { TimerSample, TimerStatistics, TimerDuration } from './types';

/**
 * 固定サイズのリングバッファ
 * 古いデータを自動的に上書きする
 */
class CircularBuffer {

	private buffer: number[];
	private index: number;
	private size: number;
	private filled: boolean;

	constructor( size: number ) {

		this.size = size;
		this.buffer = new Array( size );
		this.index = 0;
		this.filled = false;

	}

	/**
	 * 値を追加
	 */
	push( value: number ) {

		this.buffer[ this.index ] = value;
		this.index = ( this.index + 1 ) % this.size;

		if ( ! this.filled && this.index === 0 ) {

			this.filled = true;

		}

	}

	/**
	 * 平均値を取得
	 */
	getAverage(): number {

		const count = this.filled ? this.size : this.index;

		if ( count === 0 ) return 0;

		let sum = 0;

		for ( let i = 0; i < count; i ++ ) {

			sum += this.buffer[ i ];

		}

		return sum / count;

	}

	/**
	 * 最大値を取得
	 */
	getMax(): number {

		const count = this.filled ? this.size : this.index;

		if ( count === 0 ) return 0;

		let max = this.buffer[ 0 ];

		for ( let i = 1; i < count; i ++ ) {

			if ( this.buffer[ i ] > max ) {

				max = this.buffer[ i ];

			}

		}

		return max;

	}

	/**
	 * 最小値を取得
	 */
	getMin(): number {

		const count = this.filled ? this.size : this.index;

		if ( count === 0 ) return 0;

		let min = this.buffer[ 0 ];

		for ( let i = 1; i < count; i ++ ) {

			if ( this.buffer[ i ] < min ) {

				min = this.buffer[ i ];

			}

		}

		return min;

	}

	/**
	 * サンプル数を取得
	 */
	getCount(): number {

		return this.filled ? this.size : this.index;

	}

}

/**
 * タイマーデータのバッファと統計処理を管理
 */
export class TimerDataBuffer {

	private buffers: Map<string, CircularBuffer>;
	private windowSize: number;
	private currentData: Map<string, TimerSample>;
	private frameCount: number;
	private logInterval: number; // ログ出力間隔（フレーム数）
	private lastSampleCount: number; // 前回のサンプル数

	constructor( windowSize: number = 30 ) {

		this.windowSize = windowSize;
		this.buffers = new Map();
		this.currentData = new Map();
		this.frameCount = 0;
		this.logInterval = 60; // 60フレームごと（約1秒）
		this.lastSampleCount = 0;

	}

	/**
	 * Rendererから送られてきたサンプルを更新
	 */
	update( samples: TimerDuration[] ) {

		const timestamp = performance.now();
		this.frameCount ++;

		// デバッグログ: 60フレームごとに出力
		const shouldLog = this.frameCount % this.logInterval === 0;

		if ( shouldLog ) {

			console.group( `[GPUTimer] Frame ${this.frameCount} - ${new Date().toLocaleTimeString()}.${timestamp.toFixed( 0 ).slice( - 3 )}` );
			console.log( `受信サンプル数: ${samples.length}` );

			if ( samples.length === 0 ) {

				console.warn( "⚠️ GPU計測結果が0件です。クエリがまだ完了していない可能性があります" );

			}

		}

		// 既存データをクリアせず累積的に更新
		// これによりフレーム間でのサンプル数変動の影響を受けにくくなる

		for ( let i = 0; i < samples.length; i ++ ) {

			const sample = samples[ i ];

			// nameから renderType を抽出（例: "deferred/cam[xxx]/Mesh_1/[drawId]"）
			const parts = sample.name.split( '/' );
			const renderType = parts[ 0 ] || 'unknown';

			const timerSample: TimerSample = {
				name: sample.name,
				duration: sample.duration,
				timestamp,
				renderType,
			};

			// バッファに追加
			let buffer = this.buffers.get( sample.name );

			if ( ! buffer ) {

				buffer = new CircularBuffer( this.windowSize );
				this.buffers.set( sample.name, buffer );

				if ( shouldLog ) {

					console.log( `🆕 新規タイマー登録: ${sample.name}` );

				}

			}

			buffer.push( sample.duration );

			// 現在のデータとして保存
			this.currentData.set( sample.name, timerSample );

			// 個別サンプルのログ（最初の3つのみ）
			if ( shouldLog && i < 3 ) {

				console.log( `  [${i}] ${sample.name}: ${sample.duration.toFixed( 3 )}ms` );

			}

		}

		if ( shouldLog ) {

			if ( samples.length > 3 ) {

				console.log( `  ... 他 ${samples.length - 3} 件` );

			}

			// サンプル数の変動チェック
			if ( this.lastSampleCount > 0 && Math.abs( samples.length - this.lastSampleCount ) > 5 ) {

				console.warn( `⚠️ サンプル数が大きく変動: ${this.lastSampleCount} → ${samples.length}` );

			}

			this.lastSampleCount = samples.length;

			console.groupEnd();

		}

	}

	/**
	 * 統計情報を取得
	 */
	getStatistics(): TimerStatistics[] {

		const stats: TimerStatistics[] = [];
		let totalDuration = 0;
		const now = performance.now();
		const staleThreshold = 1000; // 1秒以上更新がない場合は古いとみなす

		// 古いエントリをクリーンアップ
		const staleEntries: string[] = [];
		this.currentData.forEach( ( sample, name ) => {

			if ( now - sample.timestamp > staleThreshold ) {

				staleEntries.push( name );

			}

		} );

		staleEntries.forEach( name => {

			this.currentData.delete( name );

		} );

		// まず合計時間を計算
		this.currentData.forEach( ( sample ) => {

			totalDuration += sample.duration;

		} );

		// 各サンプルの統計を計算
		this.currentData.forEach( ( sample ) => {

			const buffer = this.buffers.get( sample.name );

			if ( buffer ) {

				stats.push( {
					name: sample.name,
					renderType: sample.renderType,
					current: sample.duration,
					avg: buffer.getAverage(),
					max: buffer.getMax(),
					min: buffer.getMin(),
					samples: buffer.getCount(),
					percentage: totalDuration > 0 ? ( sample.duration / totalDuration ) * 100 : 0,
				} );

			}

		} );

		return stats;

	}

	/**
	 * 合計GPU時間を取得
	 */
	getTotalTime(): number {

		let total = 0;

		this.currentData.forEach( ( sample ) => {

			total += sample.duration;

		} );

		return total;

	}

}
