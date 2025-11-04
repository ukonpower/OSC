import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

// ResizableWrapperのプロパティ型定義
export type ResizableWrapperProps = {
	children: React.ReactNode;
	direction?: 'horizontal' | 'vertical' | 'both'; // リサイズ方向
	minSize?: { width?: number; height?: number }; // 最小サイズ（px）
	maxSize?: { width?: number; height?: number }; // 最大サイズ（px）
	defaultSize?: { width?: number | string; height?: number | string }; // 初期サイズ
	storageKey?: string; // LocalStorage保存用キー
	onResize?: ( size: { width: number; height: number } ) => void; // リサイズコールバック
	splitterSize?: number; // スプリッターのサイズ（デフォルト: 4px）
	enableTouch?: boolean; // タッチ対応の有効化
};

// サイズ型定義
type Size = {
	width: number;
	height: number;
};

// ResizableWrapper コンポーネント
// PanelContainerなど任意のコンポーネントをリサイズ可能にするラッパー
export const ResizableWrapper = ( props: ResizableWrapperProps ) => {

	const {
		children,
		direction = 'vertical',
		minSize = {},
		maxSize = {},
		defaultSize = {},
		storageKey,
		onResize,
		splitterSize = 4,
		enableTouch = true,
	} = props;

	// コンテナのref
	const containerRef = useRef<HTMLDivElement>( null );

	// ドラッグ状態
	const [ isDragging, setIsDragging ] = useState( false );

	// 現在のサイズ
	const [ size, setSize ] = useState<Size>( {
		width: 0,
		height: 0,
	} );

	// LocalStorageからサイズを復元
	useEffect( () => {

		// ストレージキーが指定されている場合、保存されたサイズを復元
		if ( storageKey ) {

			const savedSize = localStorage.getItem( storageKey );

			if ( savedSize ) {

				try {

					const parsedSize = JSON.parse( savedSize ) as Size;
					setSize( parsedSize );
					return;

				} catch ( e ) {

					// パースエラーは無視
					console.warn( 'Failed to parse saved size:', e );

				}

			}

		}

		// 保存されたサイズがない場合、デフォルトサイズを設定
		const initialWidth = typeof defaultSize.width === 'number'
			? defaultSize.width
			: containerRef.current && containerRef.current.parentElement
				? containerRef.current.parentElement.clientWidth
				: 300;

		const initialHeight = typeof defaultSize.height === 'number'
			? defaultSize.height
			: containerRef.current && containerRef.current.parentElement
				? containerRef.current.parentElement.clientHeight
				: 200;

		setSize( {
			width: initialWidth,
			height: initialHeight,
		} );

	}, [ storageKey, defaultSize ] );

	// サイズ変更時の処理
	const updateSize = useCallback( ( newSize: Size ) => {

		// 最小・最大サイズを適用
		const constrainedWidth = Math.max(
			minSize.width || 0,
			Math.min( maxSize.width || Infinity, newSize.width )
		);

		const constrainedHeight = Math.max(
			minSize.height || 0,
			Math.min( maxSize.height || Infinity, newSize.height )
		);

		const finalSize: Size = {
			width: constrainedWidth,
			height: constrainedHeight,
		};

		setSize( finalSize );

		// LocalStorageに保存
		if ( storageKey ) {

			localStorage.setItem( storageKey, JSON.stringify( finalSize ) );

		}

		// コールバック呼び出し
		if ( onResize ) {

			onResize( finalSize );

		}

	}, [ minSize, maxSize, storageKey, onResize ] );

	// マウスダウン/タッチスタート時の処理
	const handlePointerDown = useCallback( ( event: React.MouseEvent | React.TouchEvent, resizeDirection: 'horizontal' | 'vertical' | 'both', edge?: 'top' | 'bottom' | 'left' | 'right' ) => {

		event.preventDefault();
		setIsDragging( true );

		// 開始位置を取得（マウスまたはタッチ）
		const startX = 'touches' in event ? event.touches[ 0 ].clientX : event.clientX;
		const startY = 'touches' in event ? event.touches[ 0 ].clientY : event.clientY;
		const startWidth = size.width;
		const startHeight = size.height;

		// マウス/タッチ移動時の処理
		const handlePointerMove = ( e: MouseEvent | TouchEvent ) => {

			const currentX = 'touches' in e ? e.touches[ 0 ].clientX : e.clientX;
			const currentY = 'touches' in e ? e.touches[ 0 ].clientY : e.clientY;

			const deltaX = currentX - startX;
			const deltaY = currentY - startY;

			let newWidth = startWidth;
			let newHeight = startHeight;

			// 水平方向のリサイズ
			if ( resizeDirection === 'horizontal' || resizeDirection === 'both' ) {

				// 左端: 左に動かすと幅が増える（deltaXがマイナス）
				// 右端: 右に動かすと幅が増える（deltaXがプラス）
				if ( edge === 'left' ) {

					newWidth = startWidth - deltaX;

				} else {

					newWidth = startWidth + deltaX;

				}

			}

			// 垂直方向のリサイズ
			if ( resizeDirection === 'vertical' || resizeDirection === 'both' ) {

				// 上端: 上に動かすと高さが増える（deltaYがマイナス）
				// 下端: 下に動かすと高さが増える（deltaYがプラス）
				if ( edge === 'top' ) {

					newHeight = startHeight - deltaY;

				} else {

					newHeight = startHeight + deltaY;

				}

			}

			const newSize: Size = {
				width: newWidth,
				height: newHeight,
			};

			updateSize( newSize );

		};

		// マウス/タッチ終了時の処理
		const handlePointerUp = () => {

			setIsDragging( false );
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

	}, [ size, updateSize, enableTouch ] );

	// スプリッターのクラス名を生成
	const getSplitterClassName = ( splitterDirection: 'horizontal' | 'vertical' ) => {

		let className = styles.splitter + ' ' + styles[ splitterDirection ];

		if ( isDragging ) {

			className += ' ' + styles.dragging;

		}

		return className;

	};

	// コンテナのスタイル
	const containerStyle: React.CSSProperties = {
		width: typeof defaultSize.width === 'string' ? defaultSize.width : size.width + 'px',
		height: typeof defaultSize.height === 'string' ? defaultSize.height : size.height + 'px',
	};

	return (
		<div
			ref={ containerRef }
			className={ styles.resizableWrapper }
			style={ containerStyle }
		>
			{/* コンテンツ */}
			<div className={ styles.content }>
				{ children }
			</div>

			{/* 垂直リサイズハンドル（上端） */}
			{ ( direction === 'vertical' || direction === 'both' ) && (
				<div
					className={ getSplitterClassName( 'vertical' ) + ' ' + styles.top }
					style={ { height: splitterSize + 'px' } }
					onMouseDown={ ( e ) => handlePointerDown( e, 'vertical', 'top' ) }
					onTouchStart={ enableTouch ? ( e ) => handlePointerDown( e, 'vertical', 'top' ) : undefined }
				/>
			) }

			{/* 垂直リサイズハンドル（下端） */}
			{ ( direction === 'vertical' || direction === 'both' ) && (
				<div
					className={ getSplitterClassName( 'vertical' ) + ' ' + styles.bottom }
					style={ { height: splitterSize + 'px' } }
					onMouseDown={ ( e ) => handlePointerDown( e, 'vertical', 'bottom' ) }
					onTouchStart={ enableTouch ? ( e ) => handlePointerDown( e, 'vertical', 'bottom' ) : undefined }
				/>
			) }

			{/* 水平リサイズハンドル（左端） */}
			{ ( direction === 'horizontal' || direction === 'both' ) && (
				<div
					className={ getSplitterClassName( 'horizontal' ) + ' ' + styles.left }
					style={ { width: splitterSize + 'px' } }
					onMouseDown={ ( e ) => handlePointerDown( e, 'horizontal', 'left' ) }
					onTouchStart={ enableTouch ? ( e ) => handlePointerDown( e, 'horizontal', 'left' ) : undefined }
				/>
			) }

			{/* 水平リサイズハンドル（右端） */}
			{ ( direction === 'horizontal' || direction === 'both' ) && (
				<div
					className={ getSplitterClassName( 'horizontal' ) + ' ' + styles.right }
					style={ { width: splitterSize + 'px' } }
					onMouseDown={ ( e ) => handlePointerDown( e, 'horizontal', 'right' ) }
					onTouchStart={ enableTouch ? ( e ) => handlePointerDown( e, 'horizontal', 'right' ) : undefined }
				/>
			) }

			{/* コーナーリサイズハンドル（bothモード時） */}
			{ direction === 'both' && (
				<>
					{/* 左上 */}
					<div
						className={ styles.splitter + ' ' + styles.corner + ' ' + styles.topLeft }
						style={ { width: splitterSize + 'px', height: splitterSize + 'px' } }
						onMouseDown={ ( e ) => handlePointerDown( e, 'both', 'top' ) }
						onTouchStart={ enableTouch ? ( e ) => handlePointerDown( e, 'both', 'top' ) : undefined }
					/>
					{/* 右上 */}
					<div
						className={ styles.splitter + ' ' + styles.corner + ' ' + styles.topRight }
						style={ { width: splitterSize + 'px', height: splitterSize + 'px' } }
						onMouseDown={ ( e ) => handlePointerDown( e, 'both', 'top' ) }
						onTouchStart={ enableTouch ? ( e ) => handlePointerDown( e, 'both', 'top' ) : undefined }
					/>
					{/* 左下 */}
					<div
						className={ styles.splitter + ' ' + styles.corner + ' ' + styles.bottomLeft }
						style={ { width: splitterSize + 'px', height: splitterSize + 'px' } }
						onMouseDown={ ( e ) => handlePointerDown( e, 'both', 'bottom' ) }
						onTouchStart={ enableTouch ? ( e ) => handlePointerDown( e, 'both', 'bottom' ) : undefined }
					/>
					{/* 右下 */}
					<div
						className={ styles.splitter + ' ' + styles.corner + ' ' + styles.bottomRight }
						style={ { width: splitterSize + 'px', height: splitterSize + 'px' } }
						onMouseDown={ ( e ) => handlePointerDown( e, 'both', 'bottom' ) }
						onTouchStart={ enableTouch ? ( e ) => handlePointerDown( e, 'both', 'bottom' ) : undefined }
					/>
				</>
			) }
		</div>
	);

};
