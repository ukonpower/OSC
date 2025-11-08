import * as GLP from 'glpower';

// シェーダーから解析されたuniform情報
export interface ParsedUniform {
	name: string;
	type: GLP.UniformType;
	defaultValue: any;
}

// GLSL型からGLP.UniformTypeへのマッピング
const glslTypeMap: { [key: string]: GLP.UniformType } = {
	'float': '1f',
	'int': '1i',
	'bool': '1i',
	'vec2': '2f',
	'vec3': '3f',
	'vec4': '4f',
	'ivec2': '2i',
	'ivec3': '3i',
	'ivec4': '4i',
	'mat2': 'Matrix2fv',
	'mat3': 'Matrix3fv',
	'mat4': 'Matrix4fv',
	'sampler2D': '1i',
	'samplerCube': '1i',
};

// 型に応じたデフォルト値を生成
function getDefaultValue( type: GLP.UniformType ): any {

	if ( type.includes( 'Matrix4' ) ) return new Array( 16 ).fill( 0 );

	if ( type.includes( 'Matrix3' ) ) return new Array( 9 ).fill( 0 );

	if ( type.includes( 'Matrix2' ) ) return new Array( 4 ).fill( 0 );

	if ( type === '4f' || type === '4i' ) return [ 0, 0, 0, 0 ];

	if ( type === '3f' || type === '3i' ) return [ 0, 0, 0 ];

	if ( type === '2f' || type === '2i' ) return [ 0, 0 ];

	return 0;

}

// グローバルuniformかどうかを判定（除外対象）
function isGlobalUniform( name: string ): boolean {

	// グローバルプレフィックス
	if ( name.startsWith( 'u_g' ) ) return true;

	// システムuniform
	const systemUniforms = [
		'uTime',
		'uTimeE',
		'uTimeSS',
		'uDeltaTime',
		'uResolution',
		'uAspectRatio',
		'uGPUResolution',
		'uPixelRatio',
		'uCameraMatrix',
		'uViewMatrix',
		'uProjectionMatrix',
		'uProjectionMatrixInverse',
		'uModelMatrix',
		'uModelMatrixInverse',
		'uNormalMatrix',
		'uBackBufferTexture',
		'uBackBufferResolution',
		'uDeferredTexture',
		'uEnvMap',
	];

	if ( systemUniforms.includes( name ) ) return true;

	// ライト関連
	if ( name.startsWith( 'directionalLight' ) ) return true;

	if ( name.startsWith( 'spotLight' ) ) return true;

	return false;

}

/**
 * シェーダーコードからuniform定義を解析
 * @param shaderCode - GLSLシェーダーコード
 * @returns 解析されたuniformの配列
 */
export function parseShaderUniforms( shaderCode: string ): ParsedUniform[] {

	const uniforms: ParsedUniform[] = [];

	// uniform定義を検出する正規表現
	// 例: uniform float myValue;
	//     uniform vec3 color;
	const uniformRegex = /uniform\s+(\w+)\s+(\w+)\s*;/g;

	let match;

	while ( ( match = uniformRegex.exec( shaderCode ) ) !== null ) {

		const glslType = match[ 1 ]; // 例: "float", "vec3"
		const name = match[ 2 ]; // 例: "myValue", "color"

		// グローバルuniformは除外
		if ( isGlobalUniform( name ) ) continue;

		// GLSLTypeをGLP.UniformTypeに変換
		const type = glslTypeMap[ glslType ];

		if ( ! type ) {

			// 未知の型は警告してスキップ
			console.warn( `Unknown GLSL type "${glslType}" for uniform "${name}"` );
			continue;

		}

		uniforms.push( {
			name,
			type,
			defaultValue: getDefaultValue( type ),
		} );

	}

	return uniforms;

}

/**
 * 解析されたuniformをGLP.Uniforms形式に変換
 * @param parsedUniforms - parseShaderUniformsの結果
 * @returns GLP.Uniforms形式のオブジェクト
 */
export function toGLPUniforms( parsedUniforms: ParsedUniform[] ): GLP.Uniforms {

	const uniforms: GLP.Uniforms = {};

	parsedUniforms.forEach( ( uniform ) => {

		uniforms[ uniform.name ] = {
			type: uniform.type,
			value: uniform.defaultValue,
		};

	} );

	return uniforms;

}
