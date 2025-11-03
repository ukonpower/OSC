#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>

#include <rm_h>

// 頂点シェーダーから受け取る変換マトリックス
in mat4 vTransformMatrix;

uniform float uTime;

SDFResult D( vec3 p ) {

	vec3 pp = p;

	// シャリ部分 - 円柱形状
	float shari = sdCappedCylinder(pp, 0.25, 0.08);

	return SDFResult(
		shari,
		p,
		0.0,
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
		localRayPos += dist.d * localRayDir;

		if( dist.d < 0.001 ) {

			hit = true;
			break;

		}

	}

	if( !hit ) discard;

	// ワールド空間に戻す
	rayPos = (vTransformMatrix * vec4(localRayPos, 1.0)).xyz;

	outNormal = N( localRayPos, 0.01 );
	outNormal = normalize((transpose(invMatrix) * vec4(outNormal, 0.0)).xyz);

	#include <rm_out_obj>

	// シャリの色 - 白いご飯
	vec3 color = vec3(0.95, 0.93, 0.88);

	outColor.xyz = color;
	outRoughness = 0.8;
	outMetalic = 0.0;

	// 距離に応じたフェードアウト
	outColor.xyz *= smoothstep( 2.0, 0.5, length( rayPos ) );

	#include <frag_out>

}
