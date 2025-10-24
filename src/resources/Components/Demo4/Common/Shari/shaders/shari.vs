#include <common>
#include <vert_h>

// インスタンスごとのID属性（location = 4, 5）
layout(location = 4) in vec4 id;
layout(location = 5) in vec4 id2;

// ユーティリティ関数のインクルード
#include <rotate>

// グローバルユニフォーム
uniform float uTime;

// フラグメントシェーダーに渡す変数
out vec4 vId;
out vec4 vId2;

void main( void ) {

	// 基本的な頂点処理
	#include <vert_in>

	vec3 instancePos = id2.xyz - 0.5;
	instancePos.xyz *= vec3( 1.0, 0.7, 2.7 );
	outPos.xyz *= 0.5;


	// 時間に基づく回転アニメーション
	float rotationSpeed = id.w * 0.5 + 0.5;
	rotate(outPos.xy, outNormal.xy, id.y * TPI);
	rotate(outPos.yz, outNormal.yz, id.z * TPI);

	// 最終的な位置を設定
	outPos += instancePos;

	// 標準的な頂点出力処理
	#include <vert_out>

	// インスタンスIDをフラグメントシェーダーに渡す
	vId = id;
	vId2 = id2;

}
