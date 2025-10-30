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
