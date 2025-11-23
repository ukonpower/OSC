const moduleCache = new Map<any, any>();

export const hotGet = ( key: string, module: any ) => {

	if ( process.env.NODE_ENV === 'development' ) {

		const cache = moduleCache.get( key );

		if ( cache ) return cache;

		moduleCache.set( key, module );

	}

	return module;

};

export const hotUpdate = ( key: string, newModule: any ) => {

	if ( process.env.NODE_ENV === 'development' ) {

		moduleCache.set( key, newModule );

	}

	return newModule;

};
