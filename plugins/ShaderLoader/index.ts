import childProcess from 'child_process';
import fs from 'fs';
import util from 'util';

import { createFilter } from '@rollup/pluginutils';
import { Plugin } from 'vite';

const exec = util.promisify( childProcess.exec );

export interface ShaderLoaderOptions {
	skipMinifier?: boolean;
}

export const ShaderLoader = ( userOptions?: ShaderLoaderOptions ): Plugin => {

	const options = Object.assign(
		{
			include: [
				'**/*.vs',
				'**/*.fs',
				'**/*.vert',
				'**/*.frag',
				'**/*.glsl',
				'**/*.module.glsl',
				'**/*.part.glsl'
			]
		},
	);

	const filter = createFilter( options.include, options.exclude );

	// ShaderMinifierをスキップするかどうかはuserOptionsで制御
	// デフォルトはfalse（minifierを実行する）
	const skip = userOptions?.skipMinifier ?? false;

	return {
		name: 'shaderLoader',
		enforce: 'pre',
		buildStart() {

			if ( ! fs.existsSync( "./tmp" ) ) {

				fs.mkdirSync( "./tmp" );

			}

		},
		buildEnd() {

			if ( fs.existsSync( "./tmp" ) ) {

				return fs.promises.rm( "./tmp", { recursive: true, force: true, } );

			}

		},

		async transform( code: string, id: string ) {

			if ( ! filter( id ) ) return;

			const isPart = id.indexOf( '.part.glsl' ) > - 1;

			if ( isPart ) {

				return {
					code: `export default ${JSON.stringify( code.replaceAll( /[\n]+/g, "" ) )};`,
					map: { mappings: '' }
				};

			}

			code = code.replaceAll( "\\n", "\n" );
			code = code.replaceAll( "\\t", "\t" );
			code = code.replaceAll( "precision highp float;", "//[\nprecision highp float;\n//]\n" );

			const fileName = id.replaceAll( '/', "_" ) + new Date().getTime();
			const inputFilePath = `./tmp/${fileName}_in.txt`;
			const outputFilePath = `./tmp/${fileName}_out.txt`;

			await fs.promises.writeFile( inputFilePath, code );

			const functionPattern = /^\s*(float|vec2|vec3|vec4|mat2|mat3|mat4|void)\s+(\w+)\s*\(/gm;
			const structPattern = /^\s*struct\s+(\w+)\s*\{/gm;

			function extractNames( pattern: RegExp, code: string ) {

				let matches;
				const names: string[] = [];

				while ( ( matches = pattern.exec( code ) ) !== null ) {

					names.push( matches[ 2 ] || matches[ 1 ] );

				}

				return names;

			}

			let args = '--format text --preserve-externals';

			let noRenamingList = [ "main", "D" ];

			const isModule = id.indexOf( '.module.glsl' ) > - 1;

			if ( isModule ) {

				args += " --no-remove-unused";
				noRenamingList = [ ...noRenamingList, ...extractNames( functionPattern, code ), ...extractNames( structPattern, code ) ];

			}

			if ( noRenamingList.length > 0 ) {

				args += ' --no-renaming-list ' + noRenamingList.join( ',' );

			}

			// skip minifier if requested or on Mac
			if ( skip ) {

				// 開発環境でファイルパス情報をシェーダーソースの先頭にコメントとして埋め込む
				const relativeId = id.replace( process.cwd(), '' ).replace( /^\//, '' );
				const codeWithPath = `// @shader-file: ${relativeId}\n${code}`;

				return {
					code: `export default ${JSON.stringify( codeWithPath )};`,
					map: { mappings: '' }
				};

			}

			// MINIFIER!!
			try {

				if ( process.platform == "darwin" ) {

					await exec( `mono ~/Documents/application/shader_minifier/shader_minifier.exe ${inputFilePath} -o ${outputFilePath} ${args}` );

				} else {

					await exec( `shader_minifier.exe ${inputFilePath} -o ${outputFilePath} ${args}` );

				}

			} catch ( e ) {

				this.error( `ShaderLoader: ${e.stdout}` );

			}

			const compiledCode = await fs.promises.readFile( outputFilePath, 'utf-8' );

			fs.unlinkSync( inputFilePath );
			fs.unlinkSync( outputFilePath );

			return {
				code: `export default ${JSON.stringify( compiledCode )};`,
				map: { mappings: '' }
			};


		}
	};

};
