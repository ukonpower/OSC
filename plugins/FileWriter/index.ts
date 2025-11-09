import fs from 'fs/promises';
import path from 'path';

import { Plugin } from 'vite';

type IncomingRequest = {
	body?: unknown;
	rawBody?: unknown;
	readable: boolean;
	readableEnded: boolean;
	on: ( event: string, listener: ( ...args: any[] ) => void ) => void;
	off: ( event: string, listener: ( ...args: any[] ) => void ) => void;
	removeListener: ( event: string, listener: ( ...args: any[] ) => void ) => void;
};

/**
 * 既に他のミドルウェアがパース済みのボディがあれば優先的に利用する
 */
const getParsedBody = ( req: IncomingRequest ): string | null => {

	const candidates = [ req.body, req.rawBody ];

	for ( const candidate of candidates ) {

		if ( candidate === undefined || candidate === null ) {

			continue;

		}

		if ( typeof candidate === 'string' ) {

			return candidate;

		}

		if ( Buffer.isBuffer( candidate ) ) {

			return candidate.toString();

		}

		try {

			return JSON.stringify( candidate );

		} catch {

			// Stringify failed, continue to next candidate

		}

	}

	return null;

};

/**
 * リクエストボディを読み取るヘルパー関数
 */
async function readBody( req: IncomingRequest ): Promise<string> {

	const cached = getParsedBody( req );

	if ( cached !== null ) {

		return cached;

	}

	return new Promise( ( resolve, reject ) => {

		const chunks: Buffer[] = [];

		const cleanup = () => {

			req.removeListener( 'data', onData );
			req.removeListener( 'end', onEnd );
			req.removeListener( 'error', onError );

		};

		const onData = ( chunk: Buffer ) => {

			chunks.push( chunk );

		};

		const onEnd = () => {

			cleanup();
			const body = Buffer.concat( chunks ).toString();
			resolve( body );

		};

		const onError = ( err: Error ) => {

			cleanup();
			reject( err );

		};

		req.on( 'data', onData );
		req.on( 'end', onEnd );
		req.on( 'error', onError );

		// すでにストリームが終了している場合は即座に解決
		if ( req.readableEnded ) {

			onEnd();

		}

	} );

}

const ROOT_DIR = path.resolve( __dirname, '../..' );
const SCENE_FILE_PATH = path.resolve( ROOT_DIR, 'src/resources/blidge-data.json' );
const COMPONENTS_DIR = path.resolve( ROOT_DIR, 'src/resources/Components' );

const SCENE_REWATCH_DELAY = 200;
const SHADER_REWATCH_DELAY = 200;

/**
 * FileWriter Vite Plugin
 * シーンデータ/シェーダー保存リクエストを処理する
 */
export const FileWriter = (): Plugin => {

	return {
		name: 'file-writer',
		enforce: 'pre',
		configureServer( server ) {

			const watcher = server.watcher;
			let sceneRewatchTimeout: NodeJS.Timeout | null = null;
			const shaderRewatchTimeouts = new Map<string, NodeJS.Timeout>();

			const temporarilyUnwatchScene = () => {

				if ( ! watcher ) {

					return;

				}

				if ( sceneRewatchTimeout ) {

					clearTimeout( sceneRewatchTimeout );
					sceneRewatchTimeout = null;

				}

				watcher.unwatch( SCENE_FILE_PATH );

			};

			const scheduleSceneRewatch = () => {

				if ( ! watcher ) {

					return;

				}

				if ( sceneRewatchTimeout ) {

					clearTimeout( sceneRewatchTimeout );

				}

				sceneRewatchTimeout = setTimeout( () => {

					watcher.add( SCENE_FILE_PATH );
					sceneRewatchTimeout = null;

				}, SCENE_REWATCH_DELAY );

			};

			const temporarilyUnwatchShader = ( shaderPath: string ) => {

				if ( ! watcher ) {

					return;

				}

				const existingTimeout = shaderRewatchTimeouts.get( shaderPath );

				if ( existingTimeout ) {

					clearTimeout( existingTimeout );
					shaderRewatchTimeouts.delete( shaderPath );

				}

				watcher.unwatch( shaderPath );

			};

			const scheduleShaderRewatch = ( shaderPath: string ) => {

				if ( ! watcher ) {

					return;

				}

				const existingTimeout = shaderRewatchTimeouts.get( shaderPath );

				if ( existingTimeout ) {

					clearTimeout( existingTimeout );

				}

				const timeout = setTimeout( () => {

					watcher.add( shaderPath );
					shaderRewatchTimeouts.delete( shaderPath );

				}, SHADER_REWATCH_DELAY );

				shaderRewatchTimeouts.set( shaderPath, timeout );

			};

			server.httpServer?.on( 'close', () => {

				if ( sceneRewatchTimeout ) {

					clearTimeout( sceneRewatchTimeout );
					sceneRewatchTimeout = null;

				}

				for ( const timeout of shaderRewatchTimeouts.values() ) {

					clearTimeout( timeout );

				}

				shaderRewatchTimeouts.clear();

			} );

			server.middlewares.use( async ( req, res, next ) => {

				if ( req.method !== 'POST' ) {

					next();
					return;

				}

				try {

					if ( req.url === '/api/writeScene' ) {

						const body = await readBody( req as IncomingRequest );
						const { sceneData } = JSON.parse( body );

						if ( ! sceneData || typeof sceneData !== 'object' ) {

							res.statusCode = 400;
							res.end( 'Bad Request: sceneData is required' );
							return;

						}

						temporarilyUnwatchScene();

						// JSON形式で保存（インデントあり）
						try {

							await fs.writeFile( SCENE_FILE_PATH, JSON.stringify( sceneData, null, 2 ), 'utf-8' );

						} finally {

							scheduleSceneRewatch();

						}

						res.statusCode = 200;
						res.end( 'OK' );
						return;

					}

					if ( req.url === '/api/writeShader' ) {

						const body = await readBody( req as IncomingRequest );
						const { filePath, code } = JSON.parse( body );

						if ( typeof filePath !== 'string' || typeof code !== 'string' ) {

							res.statusCode = 400;
							res.end( 'Bad Request: filePath and code are required' );
							return;

						}

						const fullPath = path.resolve( ROOT_DIR, 'src', filePath );

						if ( ! fullPath.startsWith( COMPONENTS_DIR ) ) {

							res.statusCode = 403;
							res.end( 'Forbidden: Only files under src/resources/Components/ can be modified' );
							return;

						}

						// シェーダーファイルの監視を一時的に解除してから保存
						temporarilyUnwatchShader( fullPath );

						try {

							await fs.writeFile( fullPath, code, 'utf-8' );

						} finally {

							// 保存後、遅延して監視を再開
							scheduleShaderRewatch( fullPath );

						}

						res.statusCode = 200;
						res.end( 'OK' );
						return;

					}

				} catch ( error ) {

					res.statusCode = 500;
					res.end( `Internal Server Error: ${error}` );
					return;

				}

				// 他のリクエストは次のミドルウェアへ
				next();

			} );

		}
	};

};
