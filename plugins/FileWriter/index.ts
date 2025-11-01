import fs from 'fs/promises';
import path from 'path';
import { Plugin } from 'vite';

/**
 * FileWriter Vite Plugin
 * シェーダーエディタからのファイル保存リクエストを処理する
 */
export const FileWriter = (): Plugin => {

	return {
		name: 'file-writer',
		configureServer( server ) {

			server.middlewares.use( async ( req, res, next ) => {

				// /api/writeShader エンドポイント
				if ( req.url === '/api/writeShader' && req.method === 'POST' ) {

					try {

						// リクエストボディを読み取り
						const chunks: Buffer[] = [];

						req.on( 'data', ( chunk ) => {

							chunks.push( chunk );

						} );

						req.on( 'end', async () => {

							try {

								const body = Buffer.concat( chunks ).toString();
								const { filePath, code } = JSON.parse( body );

								if ( ! filePath || typeof code !== 'string' ) {

									res.statusCode = 400;
									res.end( 'Bad Request: filePath and code are required' );
									return;

								}

								// セキュリティチェック: src/resources/Components/ 配下のみ許可
								const rootDir = path.resolve( __dirname, '../..' );
								const fullPath = path.resolve( rootDir, 'src', filePath );
								const allowedDir = path.resolve( rootDir, 'src/resources/Components' );

								if ( ! fullPath.startsWith( allowedDir ) ) {

									res.statusCode = 403;
									res.end( 'Forbidden: Only files under src/resources/Components/ can be modified' );
									return;

								}

								// ファイル書き込み
								await fs.writeFile( fullPath, code, 'utf-8' );

								console.log( `[FileWriter] Saved: ${filePath}` );

								res.statusCode = 200;
								res.end( 'OK' );

							} catch ( error ) {

								console.error( '[FileWriter] Error:', error );
								res.statusCode = 500;
								res.end( `Internal Server Error: ${error}` );

							}

						} );

					} catch ( error ) {

						console.error( '[FileWriter] Error:', error );
						res.statusCode = 500;
						res.end( `Internal Server Error: ${error}` );

					}

				} else {

					next();

				}

			} );

		}
	};

};
