import * as fs from 'fs';
import * as path from 'path';

import * as chokidar from 'chokidar';
import { Plugin } from 'vite';

let watcher: chokidar.FSWatcher | null = null;

const componentsDir = "./src/resources/Components/";

// 開発環境とプロダクションで異なるcomponentListファイルを生成
const componentListFileDev = "./src/resources/_comps.dev.ts";
const componentListFileProd = "./src/resources/_comps.ts";

const updateComponentList = ( isProduction: boolean = false ) => {

	const componentListFile = isProduction ? componentListFileProd : componentListFileDev;

	// プロダクションビルド時に除外するディレクトリ
	const excludeDirsProduction = [ 'Samples', '_DevOnly' ];
	// 開発環境では除外なし
	const excludeDirsDev: string[] = [];

	const excludeDirs = isProduction ? excludeDirsProduction : excludeDirsDev;

	const getIndexTsFiles = ( dir: string, fileList:string[] = [] ) => {

		const files = fs.readdirSync( dir );

		files.forEach( file => {

			const filePath = path.join( dir, file );
			const stat = fs.statSync( filePath );

			if ( stat.isDirectory() ) {

				// 除外リストにあるディレクトリはスキップ
				if ( excludeDirs.includes( file ) ) {

					return;

				}

				getIndexTsFiles( filePath, fileList );

			} else if ( stat.isFile() && file === 'index.ts' ) {

				fileList.push( filePath );

			}

		} );

		return fileList;

	};

	const fileList = getIndexTsFiles( componentsDir );

	const components = fileList.map( ( file ) => {

		const fileContent = fs.readFileSync( file, 'utf-8' );

		const lines = fileContent.split( '\n' );

		const componentClassName = lines.find( ( line ) => line.startsWith( 'export class' ) );

		if ( componentClassName === undefined ) {

			return;

		}

		const componentClassNameArray = componentClassName.split( /\s|</ );

		const componentName = componentClassNameArray[ 2 ];

		// componentListファイルからの相対パスを計算（./で始まるように）
		let relativePath = path.relative( path.dirname( componentListFile ), file ).replace( /\\/g, '/' );
		if ( ! relativePath.startsWith( '.' ) ) {

			relativePath = './' + relativePath;

		}

		return {

			name: componentName,
			path: path.relative( path.dirname( componentsDir ), file ).replace( /\\/g, '/' ),
			relativePath: relativePath,


		};

	} );

	// componentlist

	const componentCatGroups: {[category: string]: any} = {};

	components.forEach( ( component ) => {

		if ( component === undefined ) {

			return;

		}

		const splitPath = component.path.split( '/' );

		let targetGropus = componentCatGroups;

		for ( let i = 0; i < splitPath.length; i ++ ) {

			const dir = splitPath[ i ];

			if ( i == splitPath.length - 2 ) {

				targetGropus[ dir ] = [ component.name, component.relativePath ];

				break;

			}

			const catArray = targetGropus[ dir ] = targetGropus[ dir ] || {};

			targetGropus = catArray;

		}


	} );

	// write file

	let file = "";

	components.forEach( ( component ) => {

		if ( component === undefined ) {

			return;

		}

		file += `import { ${component.name} } from '${component.relativePath}';\n`;

	} );

	file += "\n";

	file += "export const COMPONENTLIST: {[key: string]: any} = {\n";

	let indent = "";

	const _ = ( obj: any ) => {

		indent += "\t";

		Object.keys( obj ).forEach( ( key ) => {

			const value = obj[ key ];

			if ( Array.isArray( value ) ) {

				file += `${indent}${value[ 0 ]},\n`;

			} else {

				file += `${indent}${key}: {\n`;

				_( value );

				file += `${indent}},\n`;

			}

		} );

		indent = indent.slice( 0, - 1 );

	};

	_( componentCatGroups[ "Components" ] );

	file += "};\n";

	fs.writeFileSync( componentListFile, file );

};

export const ResourceManager = (): Plugin => {

	let isProduction = false;

	return {
		name: 'ResourceManager',
		enforce: 'pre',
		config: ( config, { mode } ) => {

			isProduction = mode === 'production';

			// ファイル生成を先に実行
			updateComponentList( isProduction );

		},
		configureServer: ( server ) => {

			if ( watcher !== null ) {

				watcher.close();

			}

			watcher = chokidar.watch( componentsDir, {
				ignored: /[\\/\\]\./,
				persistent: true
			} );

			const onAddFile = ( ) => {

				updateComponentList( false ); // 開発環境

			};

			const onUnlinkFile = ( ) => {

				updateComponentList( false ); // 開発環境

			};

			const onChangeFile = ( path: string ) => {

				if ( path.endsWith( 'index.ts' ) ) {

					updateComponentList( false ); // 開発環境

				}

			};

			watcher.on( 'ready', () => {

				watcher.on( 'add', onAddFile );

				watcher.on( 'change', onChangeFile );

				watcher.on( 'unlink', onUnlinkFile );

				watcher.on( 'error', function ( err ) {

					console.log( `Watcher error: ${err}` );

				} );

			} );


		},
		buildStart: () => {

			console.log( `[ResourceManager] buildStart - isProduction: ${isProduction}` );
			updateComponentList( isProduction );

		},
		buildEnd: () => {

			if ( watcher ) {

				watcher.close();
				watcher = null;

			}

		},
	};

};
