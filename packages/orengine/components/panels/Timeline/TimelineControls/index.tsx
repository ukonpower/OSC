import React, { useCallback, useEffect, useRef } from 'react';

import { useTimeline } from '../../../../hooks/useTimeline';

import style from './index.module.scss';

export const TimelineControls: React.FC<{children?: React.ReactNode}> = ( props ) => {

  const { viewPort, setCurrentFrame: setFrame, getFrameViewPort, zoom, scroll, setViewPortCenter } = useTimeline();

	const viewPortRef = useRef( [ 0, 0, 0, 0 ] );
	const viewPortRangeRef = useRef( [ 0, 0 ] );

	if ( viewPort ) {

		viewPortRef.current = viewPort;
		viewPortRangeRef.current = [ viewPort[ 2 ] - viewPort[ 0 ], viewPort[ 3 ] - viewPort[ 1 ] ];

	}

	const elmRef = useRef<HTMLDivElement>( null );
	const elmBoundingRectRef = useRef<DOMRect | null>( null );

	// pointer

	const pointerDownButtonRef = useRef<number | null>( null );
	const pointerDownPosRef = useRef<[number, number] | null>( null );
	const pointerDownCenterFrameRef = useRef<number | null>( null );

	const onPointerMove = useCallback( ( e: PointerEvent ) => {

		const elmWidth = elmRef.current && elmRef.current.clientWidth || 1;

		if ( pointerDownButtonRef.current == 0 ) {

			if ( setFrame && getFrameViewPort && elmBoundingRectRef.current ) {

				const pointerX = ( e.clientX - elmBoundingRectRef.current.left ) / elmWidth;

				setFrame( getFrameViewPort( pointerX ) );

			}

		} else if ( pointerDownButtonRef.current == 1 ) {

			const pos = [ e.clientX, e.clientY ];

			if ( pointerDownPosRef.current && pointerDownCenterFrameRef.current ) {

				const movement = - ( pos[ 0 ] - pointerDownPosRef.current[ 0 ] ) / elmWidth * viewPortRangeRef.current[ 0 ];

				if ( setViewPortCenter ) {

					setViewPortCenter( pointerDownCenterFrameRef.current + movement );

				}

			}

		}

	}, [ setFrame, getFrameViewPort, setViewPortCenter ] );

	const onPointerDown = useCallback( ( e: React.PointerEvent<HTMLElement> ) => {

		pointerDownButtonRef.current = e.button;
		pointerDownCenterFrameRef.current = ( viewPortRef.current[ 2 ] + viewPortRef.current[ 0 ] ) / 2;
		pointerDownPosRef.current = [ e.clientX, e.clientY ];

		elmBoundingRectRef.current = e.currentTarget.getBoundingClientRect();

		const pointerX = ( e.clientX - elmBoundingRectRef.current.left ) / e.currentTarget.clientWidth;

		if ( pointerDownButtonRef.current == 0 && setFrame && getFrameViewPort ) {

			setFrame( getFrameViewPort( pointerX ) );

		}

		window.addEventListener( 'pointermove', onPointerMove );

		const onPointerUp = () => {

			pointerDownPosRef.current = null;
			pointerDownButtonRef.current = null;
			pointerDownCenterFrameRef.current = null;
			window.removeEventListener( 'pointermove', onPointerMove );

		};

		window.addEventListener( "pointerup", onPointerUp );

		return () => {

			window.removeEventListener( "pointerup", onPointerUp );
			window.removeEventListener( 'pointermove', onPointerMove );

		};

	}, [ getFrameViewPort, setFrame, onPointerMove ] );

	// wheel

	const onWheel = useCallback( ( e: WheelEvent ) => {

		if ( pointerDownButtonRef.current !== null || ! zoom || ! scroll ) return;

		e.preventDefault();

		const width = e.target && ( e.target as HTMLElement ).clientWidth || 1;

		const absY = Math.abs( e.deltaY );

		if ( Math.abs( e.deltaX ) < absY ) {

			if ( absY > 50 ) {

					 zoom( e.deltaY < 0 ? 0.9 : 1.1 );

			} else {

				zoom( 1.0 + e.deltaY * 0.005 );

			}

		} else {

			scroll( e.deltaX / width * 0.5 );

		}

	}, [ zoom, scroll ] );

	// pinch zoom (for mobile)

	const pinchDistanceRef = useRef<number | null>( null );

	const onTouchStart = useCallback( ( e: TouchEvent ) => {

		if ( e.touches.length === 2 ) {

			// 2本指の距離を計算
			const touch1 = e.touches[ 0 ];
			const touch2 = e.touches[ 1 ];
			const dx = touch2.clientX - touch1.clientX;
			const dy = touch2.clientY - touch1.clientY;
			pinchDistanceRef.current = Math.sqrt( dx * dx + dy * dy );

		}

	}, [] );

	const onTouchMove = useCallback( ( e: TouchEvent ) => {

		if ( e.touches.length === 2 && pinchDistanceRef.current !== null && zoom ) {

			e.preventDefault();

			// 現在の2本指の距離を計算
			const touch1 = e.touches[ 0 ];
			const touch2 = e.touches[ 1 ];
			const dx = touch2.clientX - touch1.clientX;
			const dy = touch2.clientY - touch1.clientY;
			const currentDistance = Math.sqrt( dx * dx + dy * dy );

			// 距離の変化率を計算してズーム
			const scale = currentDistance / pinchDistanceRef.current;
			zoom( 2.0 - scale ); // 逆数的な感覚にするため2.0 - scale

			// 次の計算のために距離を更新
			pinchDistanceRef.current = currentDistance;

		}

	}, [ zoom ] );

	const onTouchEnd = useCallback( () => {

		pinchDistanceRef.current = null;

	}, [] );

	useEffect( () => {

		const elm = elmRef.current;

		if ( elm ) {

			elm.addEventListener( "wheel", onWheel, { passive: false } );
			elm.addEventListener( "touchstart", onTouchStart, { passive: false } );
			elm.addEventListener( "touchmove", onTouchMove, { passive: false } );
			elm.addEventListener( "touchend", onTouchEnd );

		}

		return () => {

			if ( elm ) {

				elm.removeEventListener( "wheel", onWheel );
				elm.removeEventListener( "touchstart", onTouchStart );
				elm.removeEventListener( "touchmove", onTouchMove );
				elm.removeEventListener( "touchend", onTouchEnd );

			}

		};

	}, [ onWheel, onTouchStart, onTouchMove, onTouchEnd ] );

	if ( ! viewPort ) return null;

	return <div className={style.controls} onPointerDown={onPointerDown} ref={elmRef}>
		{props.children}
	</div>;

};
