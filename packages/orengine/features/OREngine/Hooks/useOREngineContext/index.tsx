import { OREngineProjectData } from "packages/orengine/features/OREngine/core/ProjectSerializer";
import React, { useCallback, useEffect } from "react";

import { Engine } from "../../core";

export const useOREngineContext = ( gl: WebGL2RenderingContext ) => {

	const [ engine, setEngine ] = React.useState<Engine>( () => new Engine( gl ) );
	const engineRef = React.useRef<Engine>( engine );
	engineRef.current = engine;

	useEffect( () => {

		if ( ! engineRef.current.disposed ) return;

		const newEngine = new Engine( gl );

		setEngine( newEngine );

	}, [ gl ] );

	useEffect( () => {

		return () => {

			engine.dispose();

		};


	}, [ engine ] );

	const load = useCallback( ( data: OREngineProjectData | undefined ) => {

		engine.load( data );

	}, [ engine ] );

	return {
		engine,
		load
	};

};
