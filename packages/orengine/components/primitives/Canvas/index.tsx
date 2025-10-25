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

		let clickHandler: ( ( event: MouseEvent ) => void ) | null = null;

		if ( import.meta.env.DEV && editor && ( editor as any )._scenePointer ) {

			clickHandler = ( event: MouseEvent ) => {

				const scenePointer = ( editor as any )._scenePointer;

				if ( scenePointer && scenePointer.handleClick ) {

					scenePointer.handleClick( event.clientX, event.clientY, canvas );

				}

			};

			canvas.addEventListener( 'click', clickHandler );

		}

		// クリーンアップ関数
		return () => {

			if ( wrapperElm.contains( canvas ) ) {

				wrapperElm.removeChild( canvas );

			}

			if ( clickHandler ) {

				canvas.removeEventListener( 'click', clickHandler );

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
