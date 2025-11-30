#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>

#include <rm_h>

// 頂点シェーダーから受け取るインスタンスID
in vec4 vId;
in vec4 vId2;
in mat4 vTransformMatrix;

// SDF関数：シャリの形状を定義
SDFResult D( vec3 p ) {

	vec3 pp = p;

	vec3 scale = vec3(0.25, 0.5, 0.22) * 2.0; // x:幅、y:長さ、z:厚み
	vec3 scaled = pp / scale;
	float sphere = sdSphere(scaled, 0.8) * min(min(scale.x, scale.y), scale.z);

	vec2 d = vec2(sphere, 0.0);

	return SDFResult(
		d.x,
		p,
		d.y,
		vec4(0.0)
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>

	// vTransformMatrixの逆行列を計算してレイの座標をインスタンス空間に変換
	mat4 invMatrix = inverse(vTransformMatrix);
	vec3 localRayPos = (invMatrix * vec4(rayPos, 1.0)).xyz;
	vec3 localRayDir = normalize((invMatrix * vec4(rayDir, 0.0)).xyz);

	SDFResult dist;
	bool hit = false;

	// レイマーチングループ
	for( int i = 0; i < 64; i++ ) {

		dist = D( localRayPos );
		localRayPos += dist.d * localRayDir * 1.0;

		if( dist.d < 0.001 ) {

			hit = true;
			break;

		}

	}

	if( !hit ) discard;

	// 法線計算（ローカル空間）
	vec3 localNormal = N( localRayPos, 0.01 );

	// 法線をワールド空間に変換
	outNormal = normalize((transpose(invMatrix) * vec4(localNormal, 0.0)).xyz);

	// ワールド空間の位置を計算
	rayPos = (vTransformMatrix * vec4(localRayPos, 1.0)).xyz;

	#include <rm_out_obj>

	// シャリらしい見た目を設定
	// 白っぽいベースカラーにインスタンスごとの微妙なバリエーション
	outColor.xyz = vec3(1.0, 0.95, 0.9) * (0.9 + vId.y * 0.1);

	// ラフネス調整（少し光沢を持たせる）
	outRoughness = 0.3 + vId.z * 0.2;

	// メタリック値（非金属）
	outMetalic = 0.0;
	outEmission += 0.15;

	#include <frag_out>

}
