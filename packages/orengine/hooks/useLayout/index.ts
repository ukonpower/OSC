import { useEffect, useState } from "react";

const SPWIDTH = 768;

export const useLayout = () => {

	const [ isSP, setIsSP ] = useState<boolean>( () => {

		// 初期値をwindow.innerWidthから判定（SSR対応のためtypeof windowチェック）
		if ( typeof window !== 'undefined' ) {

			return window.innerWidth <= SPWIDTH;

		}

		return false;

	} );

	useEffect( () => {

		let prevX: number | null = null;

		const onResize = () => {

			const currentX = window.innerWidth;

			if ( prevX === null || ( currentX - SPWIDTH ) * ( prevX - SPWIDTH ) <= 0 ) {

				setIsSP( currentX <= SPWIDTH );

			}

			prevX = currentX;

		};

		onResize();

		window.addEventListener( 'resize', onResize );

		return () => {

			window.removeEventListener( 'resize', onResize );

		};

	}, [] );

	return {
		isPC: ! isSP,
		isSP
	};

};
