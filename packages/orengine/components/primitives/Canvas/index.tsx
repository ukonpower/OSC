import { useRef, useEffect } from "react";

import { useOREditor } from "../../../features/OREditor/Hooks/useOREditor";

import style from './index.module.scss';

export const Canvas: React.FC = () => {

	const { engine, editor } = useOREditor();
	const wrapperElmRef = useRef<HTMLDivElement | null>( null );

	useEffect( () => {

		const wrapperElm = wrapperElmRef.current;
		if ( ! engine || ! wrapperElm ) return;

		const canvas = engine.canvas as HTMLCanvasElement;
		if ( ! canvas ) {

			console.error( 'Canvas element not found in engine' );
			return;

		}

		// キャンバスの追加
		wrapperElm.appendChild( canvas );

		let mousedownHandler: ( ( event: MouseEvent ) => void ) | null = null;
		let mouseupHandler: ( ( event: MouseEvent ) => void ) | null = null;

		if ( import.meta.env.DEV && editor && ( editor as any )._scenePointer ) {

			// ドラッグとクリックを区別するため、mousedownとmouseupの位置を記録
			let mousedownX = 0;
			let mousedownY = 0;
			const DRAG_THRESHOLD = 5; // ピクセル単位でのドラッグ判定閾値

			mousedownHandler = ( event: MouseEvent ) => {

				mousedownX = event.clientX;
				mousedownY = event.clientY;

			};

			mouseupHandler = ( event: MouseEvent ) => {

				// mousedownとmouseupの位置の差分を計算
				const deltaX = Math.abs( event.clientX - mousedownX );
				const deltaY = Math.abs( event.clientY - mousedownY );

				// 閾値以下の移動量の場合のみクリックとして扱う
				if ( deltaX <= DRAG_THRESHOLD && deltaY <= DRAG_THRESHOLD ) {

					const scenePointer = ( editor as any )._scenePointer;

					if ( scenePointer && scenePointer.handleClick ) {

						scenePointer.handleClick( event.clientX, event.clientY, canvas );

					}

				}

			};

			canvas.addEventListener( 'mousedown', mousedownHandler );
			canvas.addEventListener( 'mouseup', mouseupHandler );

		}

		// クリーンアップ関数
		return () => {

			if ( wrapperElm.contains( canvas ) ) {

				wrapperElm.removeChild( canvas );

			}

			if ( mousedownHandler ) {

				canvas.removeEventListener( 'mousedown', mousedownHandler );

			}

			if ( mouseupHandler ) {

				canvas.removeEventListener( 'mouseup', mouseupHandler );

			}

		};

	}, [ engine, editor ] );

	return (
		<div
			className={style.container}
			ref={wrapperElmRef}
			role="presentation"
			aria-label="3D Canvas"
		/>
	);

};
