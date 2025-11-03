import * as MXP from 'maxpower';

// 自動生成されたシェーダーコンポーネント情報をインポート
import {
	COMPONENT_IMPORTS,
	SHADER_IMPORTS,
	SHADER_COMPONENTS,
	type ShaderComponent,
	type ShaderFile
} from './_shaderComponents';

// 型を再エクスポート
export type { ShaderComponent, ShaderFile };
export { SHADER_COMPONENTS };

// コンポーネントを読み込む
export const loadComponent = async ( component: ShaderComponent ): Promise<typeof MXP.Component> => {

	const importer = COMPONENT_IMPORTS[ component.path ];

	if ( ! importer ) {

		throw new Error( `Component not found: ${component.path}` );

	}

	const module = await importer();
	const CompClass = module.default || module[ component.name ];

	if ( ! CompClass ) {

		throw new Error( `Component class not found: ${component.name}` );

	}

	return CompClass;

};

// シェーダーファイルを読み込む
export const loadShader = async ( component: ShaderComponent, shaderFile: ShaderFile ): Promise<string> => {

	const shaderKey = `${component.path}/${shaderFile.path}`;
	const importer = SHADER_IMPORTS[ shaderKey ];

	if ( ! importer ) {

		throw new Error( `Shader not found: ${shaderKey}` );

	}

	const module = await importer();
	return module.default;

};
