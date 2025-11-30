import path from 'path';

import terser from '@rollup/plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

import playerJson from './data/project.json';
import { HotGetRemover } from './plugins/HotGetRemover';
import { ResourceManager } from './plugins/ResourceManager';
import { ShaderLoader } from './plugins/ShaderLoader';
import blidgeData from './src/resources/blidge-data.json';


const basePath = process.env.BASE_PATH ?? "";

// project-dataの全てのキー名と値を再帰的に収集
const collectProjectDataKeys = ( reserved: Set<string> ) => {

	const collect = ( obj: any ) => {

		if ( ! obj || typeof obj !== 'object' ) return;

		Object.keys( obj ).forEach( key => {

			reserved.add( key );

			const value = obj[ key ];

			// 文字列値も収集（コンポーネント名など）
			if ( typeof value === 'string' ) {

				reserved.add( value );

			} else if ( Array.isArray( value ) ) {

				value.forEach( collect );

			} else if ( typeof value === 'object' ) {

				collect( value );

			}

		} );

	};

	collect( playerJson );

};

// blidge-dataのanimation、uniforms、paramオブジェクト内のキー名を収集
const collectBlidgeDataKeys = ( reserved: Set<string> ) => {

	const collect = ( obj: any ) => {

		if ( ! obj || typeof obj !== 'object' ) return;

		Object.keys( obj ).forEach( key => {

			const value = obj[ key ];

			// animation、uniforms、paramオブジェクトの中のキーを収集
			if ( key === 'animation' || key === 'uniforms' || key === 'param' ) {

				if ( value && typeof value === 'object' && ! Array.isArray( value ) ) {

					Object.keys( value ).forEach( k => reserved.add( k ) );

				}

			}

			// 再帰的に探索
			if ( Array.isArray( value ) ) {

				value.forEach( collect );

			} else if ( typeof value === 'object' ) {

				collect( value );

			}

		} );

	};

	collect( blidgeData );

};

export default defineConfig( {
	root: 'src',
	publicDir: 'assets',
	base: basePath,
	server: {
		port: 3000,
		host: "0.0.0.0",
	},
	build: {
		outDir: '../dist/build/',
		minify: 'terser',
		rollupOptions: {
			input: {
				"main": "./src/app/player/index.ts"
			},
			output: {
				entryFileNames: 'index.js'
			},
			plugins: [
				terser( {
					keep_classnames: true,
					mangle: {
						properties: {
							regex: /^(?!(u[A-Z]|[A-Z_]+$|_)).*$/,
							reserved: [
								"blockType",
								"castShadow",
								"isJumping",
								...( () => {

									const reserved = new Set<string>();

									// project-dataは全てのキー名と文字列値を収集
									collectProjectDataKeys( reserved );

									// blidge-dataはanimation、uniforms、paramのキー名を収集
									collectBlidgeDataKeys( reserved );

									return Array.from( reserved );

								} )()
							],
						}
					},
					compress: {
						passes: 16,
						arguments: true,
						booleans_as_integers: true,
						drop_console: true,
						keep_fargs: false,
						module: true,
						pure_getters: true,
						unsafe: true,
						unsafe_math: true,
						unsafe_methods: true,
						unsafe_proto: true,
						unsafe_undefined: true,
					},
				} ),
			],
		},
	},
	resolve: {
		alias: {
			"glpower": path.join( __dirname, "packages/glpower/src" ),
			"maxpower": path.join( __dirname, "packages/maxpower" ),
			"orengine": path.join( __dirname, "packages/orengine" ),
			"~": path.join( __dirname, "src" ),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: "modern-compiler",
			},
		},
	},
	plugins: [
		HotGetRemover(),
		ResourceManager(),
		ShaderLoader( {
			skipMinifier: false,
			embedFilePath: false
		} ),
		visualizer( {
			template: 'list',
			filename: 'dist/stats-list.yaml',
			gzipSize: true,
		} ),
		visualizer( {
			template: 'treemap',
			filename: 'dist/stats-treemap.html',
			gzipSize: true,
		} ),
	],
	define: {
		BASE_PATH: `"${basePath}"`
	}
} );
