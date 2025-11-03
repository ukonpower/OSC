#include <common>
#include <vert_h>

// インスタンスごとのID属性（location = 4, 5）
layout(location = 4) in vec4 id;
layout(location = 5) in vec4 id2;

#include <matrix>

uniform float uTime;

// フラグメントシェーダーに渡す変換マトリックス
out mat4 vTransformMatrix;

void main( void ) {

	#include <vert_in>

	// インスタンスは1つだけ、中央に配置
	vec3 instancePos = vec3(0.0, -0.1, 0.0);

	// 回転なし
	mat4 scaleMatrix = makeScale(1.0);
	mat4 translateMatrix = makeTranslation(instancePos);

	// マトリックスを合成
	vTransformMatrix = translateMatrix * scaleMatrix;

	// マトリックスを頂点位置に適用
	outPos = (vTransformMatrix * vec4(outPos, 1.0)).xyz;

	// 標準的な頂点出力処理
	#include <vert_out>

}
