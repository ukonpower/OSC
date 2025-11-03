#include <common>
#include <packing>
#include <frag_h>

// 頂点シェーダーから受け取る変数
in vec4 vId;
in float vLife;
in vec3 vVelocity;

void main() {
	#include <frag_in>

	// ライフタイムに応じて色を変化
	float lifeFade = smoothstep(0.0, 0.2, vLife) * smoothstep(1.0, 0.6, vLife);

	// 速度に応じて色を変化（オプション）
	float velocityFactor = length(vVelocity) * 0.1;

	// パーティクルの色設定
	outColor.rgb = mix(
		vec3(0.2, 0.5, 1.0), // 青系
		vec3(1.0, 0.3, 0.2), // 赤系
		velocityFactor
	);

	// ライフタイムで透明度調整
	outColor.a *= lifeFade;

	// エミッシブ（発光）
	outEmission = outColor.rgb * lifeFade * 2.0;

	// マテリアルプロパティ
	outRoughness = 0.8;
	outMetalic = 0.1;

	#include <frag_out>
}
