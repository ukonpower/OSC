#include <common>
#include <vert_h>

// インスタンスごとのID属性（location = 4, 5）
layout(location = 4) in vec4 id;
layout(location = 5) in vec4 id2;

// ユーティリティ関数のインクルード
#include <rotate>
#include <matrix>

// グローバルユニフォーム
uniform float uTime;

// フラグメントシェーダーに渡す変数
out vec4 vId;
out vec4 vId2;
out mat4 vTransformMatrix;

void main( void ) {

	// 基本的な頂点処理
	#include <vert_in>

	// 上に積み重ねる
	vec3 instancePos = vec3( 0.0, id.x * 0.5, 0.0 );

	// マトリックス生成関数を使用してマトリックスを構築
	mat4 translateMatrix = makeTranslation(instancePos);

	// マトリックスを合成
	vTransformMatrix = translateMatrix;

	// マトリックスを頂点位置に適用
	outPos = (vTransformMatrix * vec4(outPos, 1.0)).xyz;

	// 回転なしなので法線はそのまま

	// 標準的な頂点出力処理
	#include <vert_out>

	// インスタンスIDをフラグメントシェーダーに渡す
	vId = id;
	vId2 = id2;

}
