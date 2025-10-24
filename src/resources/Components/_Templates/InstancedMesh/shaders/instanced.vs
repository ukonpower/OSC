#include <common>
#include <vert_h>

// インスタンスごとのID属性（location = 4）
layout(location = 4) in vec4 id;

// ユーティリティ関数のインクルード
#include <rotate>
#include <noise_simplex>

// グローバルユニフォーム
uniform float uTime;

// フラグメントシェーダーに渡す変数
out vec4 vId;

void main( void ) {

	// 基本的な頂点処理
	#include <vert_in>

	// インスタンスごとの位置・変形処理の例
	// id.x: 正規化されたインデックス (0.0 ~ 1.0)
	// id.y, id.z, id.w: ランダム値

	vec3 instancePos = outPos;

	// 例: 各インスタンスを円形に配置
	float angle = id.x * 6.28318530718; // 2 * PI
	float radius = 2.0 + id.y * 1.0; // ランダムな半径

	instancePos.x += cos(angle) * radius;
	instancePos.z += sin(angle) * radius;
	instancePos.y += id.z * 2.0 - 1.0; // Y軸方向にランダムなオフセット

	// 時間に基づく回転アニメーション
	float rotationSpeed = id.w * 0.5 + 0.5;
	float rotation = uTime * rotationSpeed;
	rotate(instancePos.xy, outNormal.xy, rotation);

	// 最終的な位置を設定
	outPos = instancePos;

	// 標準的な頂点出力処理
	#include <vert_out>

	// インスタンスIDをフラグメントシェーダーに渡す
	vId = id;

}
