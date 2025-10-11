declare module '*.json'{
	const value: any;
	export default value;
}

declare module '*.glsl'{
	const value: string;
	export default value;
}
declare module '*.vs'{
	const value: string;
	export default value;
}
declare module '*.fs'{
	const value: string;
	export default value;
}

declare global {
  const BASE_PATH: string;
  var BASE_PATH: string; // also declare as var for compatibility
}

type HooksContext<T> = Partial<ReturnType<T>>
