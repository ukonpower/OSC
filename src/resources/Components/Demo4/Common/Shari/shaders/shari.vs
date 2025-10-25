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

	vec3 instancePos = id2.xyz - 0.5;
	instancePos.xyz *= vec3( 1.0, 0.7, 2.7 );

	// 回転角度を計算
	float angleXY = id.y * TPI;
	float angleYZ = id.z * TPI;

	// マトリックス生成関数を使用してマトリックスを構築
	mat4 scaleMatrix = makeScale(0.5);
	mat4 rotXY = makeRotationXY(angleXY);
	mat4 rotYZ = makeRotationYZ(angleYZ);
	mat4 translateMatrix = makeTranslation(instancePos);

	// マトリックスを合成（スケール -> 回転 -> 平行移動の順）
	vTransformMatrix = translateMatrix * rotYZ * rotXY * scaleMatrix;

	// マトリックスを頂点位置に適用
	outPos = (vTransformMatrix * vec4(outPos, 1.0)).xyz;

	// 法線には回転のみを適用（平行移動とスケールは法線に影響しない）
	mat3 normMat = normalMatrix(rotYZ * rotXY);
	outNormal = normMat * outNormal;

	// 標準的な頂点出力処理
	#include <vert_out>

	// インスタンスIDをフラグメントシェーダーに渡す
	vId = id;
	vId2 = id2;

}
