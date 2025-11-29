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

// player.jsonからreservedに追加するプロパティ名を抽出
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
								...( () => {

									const reserved = new Set<string>();

									// すべてのキー名と値を再帰的に収集（playerJson用）
									const collectAllKeys = ( obj: any ) => {

										if ( ! obj || typeof obj !== 'object' ) return;

										Object.keys( obj ).forEach( key => {

											reserved.add( key );

											const value = obj[ key ];

											// 文字列値も収集（コンポーネント名など）
											if ( typeof value === 'string' ) {

												reserved.add( value );

											} else if ( Array.isArray( value ) ) {

												value.forEach( collectAllKeys );

											} else if ( typeof value === 'object' ) {

												collectAllKeys( value );

											}

										} );

									};

									// animationとuniformsオブジェクト内のキー名を収集（blidgeData用）
									const collectAnimationAndUniformKeys = ( obj: any ) => {

										if ( ! obj || typeof obj !== 'object' ) return;

										Object.keys( obj ).forEach( key => {

											const value = obj[ key ];

											// animationまたはuniformsオブジェクトの中のキーを収集
											if ( key === 'animation' || key === 'uniforms' ) {

												if ( value && typeof value === 'object' && ! Array.isArray( value ) ) {

													Object.keys( value ).forEach( k => reserved.add( k ) );

												}

											}

											// 再帰的に探索
											if ( Array.isArray( value ) ) {

												value.forEach( collectAnimationAndUniformKeys );

											} else if ( typeof value === 'object' ) {

												collectAnimationAndUniformKeys( value );

											}

										} );

									};

									// playerJsonは全てのキー名と文字列値を収集
									collectAllKeys( playerJson );

									// blidgeDataはanimationとuniformsのキー名のみ収集
									collectAnimationAndUniformKeys( blidgeData );

									return Array.from( reserved );

								} )()
							],
						}
					},
					compress: {
						passes: 16,
						arguments: true,
						booleans_as_integers: true,
						drop_console: false,
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
