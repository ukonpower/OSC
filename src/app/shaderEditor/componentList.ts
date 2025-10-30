import * as MXP from 'maxpower';

// コンポーネントの動的インポート用マッピング
// Viteの制約により、動的インポートは静的に解決可能なパスのみサポート
const COMPONENT_IMPORTS: Record<string, () => Promise<any>> = {
	"Demo4/Maguro/Maguro": () => import( "~/resources/Components/Demo4/Maguro/Maguro/index.ts" ),
	"Demo4/Maguro/Sashimi": () => import( "~/resources/Components/Demo4/Maguro/Sashimi/index.ts" ),
};

const SHADER_IMPORTS: Record<string, () => Promise<any>> = {
	"Demo4/Maguro/Maguro/shaders/maguro.fs": () => import( "~/resources/Components/Demo4/Maguro/Maguro/shaders/maguro.fs?raw" ),
	"Demo4/Maguro/Sashimi/shaders/sashimi.fs": () => import( "~/resources/Components/Demo4/Maguro/Sashimi/shaders/sashimi.fs?raw" ),
};

// シェーダーエディタで編集可能なコンポーネント一覧
export interface ShaderComponent {
	name: string;
	path: string;
	shaderPath: string;
}

export const SHADER_COMPONENTS: ShaderComponent[] = [
	{
		name: "Maguro",
		path: "Demo4/Maguro/Maguro",
		shaderPath: "shaders/maguro.fs"
	},
	{
		name: "Sashimi",
		path: "Demo4/Maguro/Sashimi",
		shaderPath: "shaders/sashimi.fs"
	},
];

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
export const loadShader = async ( component: ShaderComponent ): Promise<string> => {

	const shaderKey = `${component.path}/${component.shaderPath}`;
	const importer = SHADER_IMPORTS[ shaderKey ];

	if ( ! importer ) {

		throw new Error( `Shader not found: ${shaderKey}` );

	}

	const module = await importer();
	return module.default;

};
