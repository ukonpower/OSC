import { useCallback, useEffect, useRef, useState, Children } from 'react';
import styles from './index.module.scss';

// SplitContainerのプロパティ型定義
export type SplitContainerProps = {
	children: React.ReactNode;
	direction: 'horizontal' | 'vertical'; // 分割方向
	sizes?: ( number | string )[]; // 各パネルの初期サイズ（flex値、px、%など）
	minSizes?: number[]; // 各パネルの最小サイズ（px）
	storageKey?: string; // LocalStorage保存用キー
	splitterSize?: number; // スプリッターの幅（デフォルト: 4px）
	enableTouch?: boolean; // タッチ対応の有効化
};

// SplitContainer コンポーネント
// 複数の子要素をflexベースで分割し、ドラッグでサイズ調整可能にする
export const SplitContainer = ( props: SplitContainerProps ) => {

	const {
		children,
		direction,
		sizes: initialSizes,
		minSizes = [],
		storageKey,
		splitterSize = 4,
		enableTouch = true,
	} = props;

	// 子要素を配列化
	const childArray = Children.toArray( children );
	const childCount = childArray.length;

	// コンテナのref
	const containerRef = useRef<HTMLDivElement>( null );

	// ドラッグ状態 (どのスプリッターがドラッグされているか)
	const [ draggingIndex, setDraggingIndex ] = useState<number | null>( null );

	// 各パネルのサイズ（flex値、px、%など）
	const [ paneSizes, setPaneSizes ] = useState<( number | string )[]>( [] );

	// LocalStorageからサイズを復元、または初期サイズを設定
	useEffect( () => {

		// ストレージキーが指定されている場合、保存されたサイズを復元
		if ( storageKey ) {

			const savedSizes = localStorage.getItem( storageKey );

			if ( savedSizes ) {

				try {

					const parsedSizes = JSON.parse( savedSizes ) as number[];

					// 保存されたサイズの数が子要素の数と一致する場合のみ使用
					if ( parsedSizes.length === childCount ) {

						setPaneSizes( parsedSizes );
						return;

					}

				} catch ( e ) {

					// パースエラーは無視
					console.warn( 'Failed to parse saved sizes:', e );

				}

			}

		}

		// 初期サイズを設定
		const defaultSizes = initialSizes && initialSizes.length === childCount
			? initialSizes
			: new Array( childCount ).fill( 1 ); // デフォルトは均等分割

		setPaneSizes( defaultSizes );

	}, [ storageKey, initialSizes, childCount ] );

	// サイズ更新処理
	const updateSizes = useCallback( ( newSizes: ( number | string )[] ) => {

		setPaneSizes( newSizes );

		// LocalStorageに保存
		if ( storageKey ) {

			localStorage.setItem( storageKey, JSON.stringify( newSizes ) );

		}

	}, [ storageKey ] );

	// スプリッターのドラッグ開始
	const handleSplitterPointerDown = useCallback( ( event: React.MouseEvent | React.TouchEvent, splitterIndex: number ) => {

		event.preventDefault();
		setDraggingIndex( splitterIndex );

		// 開始位置を取得
		const startPos = direction === 'horizontal'
			? ( 'touches' in event ? event.touches[ 0 ].clientX : event.clientX )
			: ( 'touches' in event ? event.touches[ 0 ].clientY : event.clientY );

		// コンテナのサイズを取得
		const containerSize = containerRef.current
			? ( direction === 'horizontal' ? containerRef.current.clientWidth : containerRef.current.clientHeight )
			: 0;

		// スプリッターのサイズ分を引いた実際のコンテンツサイズ
		const totalSplitterSize = splitterSize * ( childCount - 1 );
		const contentSize = containerSize - totalSplitterSize;

		// 各パネルの現在のピクセルサイズを計算
		// 文字列の場合は数値に変換（'300px' → 300、'50%' → コンテナサイズの50%）
		const pixelSizes = paneSizes.map( ( size, idx ) => {

			if ( typeof size === 'string' ) {

				// px指定
				if ( size.endsWith( 'px' ) ) {

					return parseFloat( size );

				}

				// %指定
				if ( size.endsWith( '%' ) ) {

					return ( parseFloat( size ) / 100 ) * contentSize;

				}

				// 数値文字列
				return parseFloat( size ) || 0;

			}

			// 数値の場合、実際のパネルサイズを取得
			const paneElement = containerRef.current && containerRef.current.children[ idx * 2 ] as HTMLElement;

			return paneElement ? ( direction === 'horizontal' ? paneElement.clientWidth : paneElement.clientHeight ) : 0;

		} );

		// ドラッグ処理
		const handlePointerMove = ( e: MouseEvent | TouchEvent ) => {

			const currentPos = direction === 'horizontal'
				? ( 'touches' in e ? e.touches[ 0 ].clientX : e.clientX )
				: ( 'touches' in e ? e.touches[ 0 ].clientY : e.clientY );

			const delta = currentPos - startPos;

			// 左/上のパネルと右/下のパネルのサイズを更新
			const newPixelSizes = [ ...pixelSizes ];
			newPixelSizes[ splitterIndex ] = pixelSizes[ splitterIndex ] + delta;
			newPixelSizes[ splitterIndex + 1 ] = pixelSizes[ splitterIndex + 1 ] - delta;

			// 最小サイズを適用
			const minLeft = minSizes[ splitterIndex ] || 50;
			const minRight = minSizes[ splitterIndex + 1 ] || 50;

			if ( newPixelSizes[ splitterIndex ] < minLeft ) {

				newPixelSizes[ splitterIndex ] = minLeft;
				newPixelSizes[ splitterIndex + 1 ] = pixelSizes[ splitterIndex ] + pixelSizes[ splitterIndex + 1 ] - minLeft;

			} else if ( newPixelSizes[ splitterIndex + 1 ] < minRight ) {

				newPixelSizes[ splitterIndex + 1 ] = minRight;
				newPixelSizes[ splitterIndex ] = pixelSizes[ splitterIndex ] + pixelSizes[ splitterIndex + 1 ] - minRight;

			}

			// ドラッグで変更されたサイズを更新（数値で保存）
			const newSizes = [ ...paneSizes ];
			newSizes[ splitterIndex ] = newPixelSizes[ splitterIndex ];
			newSizes[ splitterIndex + 1 ] = newPixelSizes[ splitterIndex + 1 ];

			updateSizes( newSizes );

		};

		// ドラッグ終了
		const handlePointerUp = () => {

			setDraggingIndex( null );
			window.removeEventListener( 'mousemove', handlePointerMove );
			window.removeEventListener( 'mouseup', handlePointerUp );
			window.removeEventListener( 'touchmove', handlePointerMove );
			window.removeEventListener( 'touchend', handlePointerUp );

		};

		// イベントリスナーを登録
		window.addEventListener( 'mousemove', handlePointerMove );
		window.addEventListener( 'mouseup', handlePointerUp );

		if ( enableTouch ) {

			window.addEventListener( 'touchmove', handlePointerMove );
			window.addEventListener( 'touchend', handlePointerUp );

		}

	}, [ direction, splitterSize, childCount, paneSizes, minSizes, updateSizes, enableTouch ] );

	// パネルとスプリッターを交互に配置
	const elements: React.ReactNode[] = [];

	childArray.forEach( ( child, index ) => {

		// パネル
		const size = paneSizes[ index ] || 1;
		const paneStyle: React.CSSProperties = {
			// 文字列の場合はそのまま使用（'300px', '50%'など）
			// 数値の場合はflex値として使用
			flex: typeof size === 'string' ? undefined : size,
			width: typeof size === 'string' && direction === 'horizontal' ? size : undefined,
			height: typeof size === 'string' && direction === 'vertical' ? size : undefined,
			minWidth: direction === 'horizontal' && minSizes[ index ] ? minSizes[ index ] + 'px' : undefined,
			minHeight: direction === 'vertical' && minSizes[ index ] ? minSizes[ index ] + 'px' : undefined,
		};

		elements.push(
			<div key={ `pane-${ index }` } className={ styles.pane } style={ paneStyle }>
				{ child }
			</div>
		);

		// スプリッター（最後のパネル以外）
		if ( index < childCount - 1 ) {

			const splitterClassName = [
				styles.splitter,
				styles[ direction ],
				draggingIndex === index ? styles.dragging : '',
			].join( ' ' );

			const splitterStyle: React.CSSProperties = direction === 'horizontal'
				? { width: splitterSize + 'px' }
				: { height: splitterSize + 'px' };

			elements.push(
				<div
					key={ `splitter-${ index }` }
					className={ splitterClassName }
					style={ splitterStyle }
					onMouseDown={ ( e ) => handleSplitterPointerDown( e, index ) }
					onTouchStart={ enableTouch ? ( e ) => handleSplitterPointerDown( e, index ) : undefined }
				/>
			);

		}

	} );

	// コンテナのクラス名
	const containerClassName = [
		styles.splitContainer,
		styles[ direction ],
	].join( ' ' );

	return (
		<div ref={ containerRef } className={ containerClassName }>
			{ elements }
		</div>
	);

};
