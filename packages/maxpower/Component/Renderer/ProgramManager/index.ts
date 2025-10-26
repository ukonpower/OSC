import * as GLP from 'glpower';

/**
 * シンプルなハッシュ関数（文字列からハッシュ値を生成）
 */
function hashString( str: string ): string {

	let hash = 0;

	for ( let i = 0; i < str.length; i ++ ) {

		const char = str.charCodeAt( i );
		hash = ( ( hash << 5 ) - hash ) + char;
		hash = hash & hash; // 32bit整数に変換

	}

	return hash.toString( 36 );

}

export class ProgramManager {

	private gl: WebGL2RenderingContext;
	private pool: Map<string, GLP.GLPowerProgram>;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;
		this.pool = new Map();

	}

	public get( vertexShader: string, fragmentShader: string ) {

		const id = vertexShader + fragmentShader;

		const programCache = this.pool.get( id );

		if ( programCache !== undefined && programCache.program ) {

			return programCache;

		}

		const program = new GLP.GLPowerProgram( this.gl );

		// シェーダーコンパイルを試行し、結果を監視
		this.compileWithErrorHandling( program, vertexShader, fragmentShader );

		this.pool.set( id, program );

		return program;

	}

	/**
	 * シェーダーコンパイルを実行し、エラーハンドリングを行う（開発環境のみ）
	 */
	private compileWithErrorHandling(
		program: GLP.GLPowerProgram,
		vertexShader: string,
		fragmentShader: string
	): void {

		// 開発環境でのみエラーハンドリングを実行
		if ( import.meta.env.DEV ) {

			// エラー通知・クリア用のヘルパー関数（DEV環境でのみ定義される）
			const notifyError = ( error: any ) => {

				if ( typeof window !== 'undefined' && ( window as any ).__glpowerShaderErrorHandler ) {

					( window as any ).__glpowerShaderErrorHandler( error );

				}

			};

			const clearError = ( shaderKey: string ) => {

				if ( typeof window !== 'undefined' && ( window as any ).__glpowerShaderClearHandler ) {

					( window as any ).__glpowerShaderClearHandler( shaderKey );

				}

			};

			const vertexShaderKey = hashString( vertexShader );
			const fragmentShaderKey = hashString( fragmentShader );

			// コンパイル前のエラーチェック用に、シェーダーを手動でコンパイル
			const vsCompileResult = this.checkShaderCompile( vertexShader, this.gl.VERTEX_SHADER, vertexShaderKey );
			const fsCompileResult = this.checkShaderCompile( fragmentShader, this.gl.FRAGMENT_SHADER, fragmentShaderKey );

			// エラーがあればハンドラーに通知
			if ( ! vsCompileResult.success && vsCompileResult.error ) {

				notifyError( vsCompileResult.error );

			} else {

				// 成功したらエラーをクリア
				clearError( vertexShaderKey );

			}

			if ( ! fsCompileResult.success && fsCompileResult.error ) {

				notifyError( fsCompileResult.error );

			} else {

				// 成功したらエラーをクリア
				clearError( fragmentShaderKey );

			}

		}

		// 通常のコンパイル処理（GLPowerProgramに任せる）
		program.setShader( vertexShader, fragmentShader );

	}

	/**
	 * シェーダーのコンパイル結果をチェック
	 */
	private checkShaderCompile(
		shaderSrc: string,
		type: number,
		shaderKey: string
	): { success: boolean; error?: any } {

		const shader = this.gl.createShader( type );

		if ( ! shader ) {

			return { success: false };

		}

		this.gl.shaderSource( shader, shaderSrc );
		this.gl.compileShader( shader );

		const success = this.gl.getShaderParameter( shader, this.gl.COMPILE_STATUS );

		if ( success ) {

			this.gl.deleteShader( shader );
			return { success: true };

		}

		// エラー情報を収集
		const errorLog = this.gl.getShaderInfoLog( shader );
		const shaderType = type === this.gl.VERTEX_SHADER ? 'vertex' : 'fragment';

		this.gl.deleteShader( shader );

		if ( ! errorLog ) {

			return { success: false };

		}

		const splitShaderSrc = shaderSrc.split( '\n' );
		const lines = errorLog.matchAll( /ERROR: 0:(\d+)/g );

		const errors = Array.from( lines ).map( ( line, index ) => {

			const lineNum = Number( line[ 1 ] );
			const start = Math.max( 0, lineNum - 5 );
			const end = Math.min( splitShaderSrc.length, lineNum + 2 );

			let sourceContext = '';

			splitShaderSrc.forEach( ( t, i ) => {

				if ( start <= i && i <= end ) {

					sourceContext += `${i + 1}: ${t}\n`;

				}

			} );

			return {
				shaderKey: shaderKey,
				type: shaderType,
				message: errorLog.split( '\n' )[ index ],
				line: lineNum,
				sourceContext: sourceContext,
				fullSource: shaderSrc,
			};

		} );

		return { success: false, error: errors[ 0 ] };

	}


}
