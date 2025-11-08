import { useCallback, useRef, useState } from 'react';

interface SliderProps {
	value: number;
	onChange: ( value: number ) => void;
	min?: number;
	max?: number;
	step?: number;
	className?: string;
}

export const Slider = ( { value, onChange, min = 0, max = 1, step = 0.01, className = '' }: SliderProps ) => {

	const sliderRef = useRef<HTMLDivElement>( null );
	const [ isDragging, setIsDragging ] = useState( false );

	// 値を範囲内に制限
	const clamp = ( val: number ) => Math.max( min, Math.min( max, val ) );

	// マウス/タッチ位置から値を計算
	const calculateValue = useCallback( ( clientX: number ) => {

		if ( ! sliderRef.current ) return value;

		const rect = sliderRef.current.getBoundingClientRect();
		const percentage = ( clientX - rect.left ) / rect.width;
		const rawValue = min + percentage * ( max - min );

		// stepに基づいて丸める
		const steppedValue = Math.round( rawValue / step ) * step;
		return clamp( steppedValue );

	}, [ min, max, step, value ] );

	// ドラッグ開始
	const handlePointerDown = useCallback( ( e: React.MouseEvent | React.TouchEvent ) => {

		e.preventDefault();
		setIsDragging( true );

		const clientX = 'touches' in e ? e.touches[ 0 ].clientX : e.clientX;
		const newValue = calculateValue( clientX );
		onChange( newValue );

		// ドラッグ中の処理
		const handlePointerMove = ( moveEvent: MouseEvent | TouchEvent ) => {

			const moveClientX = 'touches' in moveEvent ? moveEvent.touches[ 0 ].clientX : moveEvent.clientX;
			const newValue = calculateValue( moveClientX );
			onChange( newValue );

		};

		// ドラッグ終了
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
		window.addEventListener( 'touchmove', handlePointerMove );
		window.addEventListener( 'touchend', handlePointerUp );

	}, [ calculateValue, onChange ] );

	// 値から位置パーセンテージを計算
	const percentage = ( ( value - min ) / ( max - min ) ) * 100;

	return (
		<div
			ref={sliderRef}
			className={`shader-editor__slider ${isDragging ? 'shader-editor__slider--dragging' : ''} ${className}`}
			onMouseDown={handlePointerDown}
			onTouchStart={handlePointerDown}
		>
			<div className="shader-editor__slider-track">
				<div
					className="shader-editor__slider-fill"
					style={{ width: `${percentage}%` }}
				/>
			</div>
			<div
				className="shader-editor__slider-thumb"
				style={{ left: `${percentage}%` }}
			/>
		</div>
	);

};
