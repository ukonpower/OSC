#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <noise_cyclic>

#include <rm_h>

uniform float uTime;

SDFResult D( vec3 p ) {

	vec3 pp = p;

	// シャリ部分 - 円柱形状
	float shari = sdCappedCylinder(pp, 0.25, 0.08);

	// 海苔のシェル形状 - 外側の円柱
	vec3 noriPos = pp - vec3(0.0, 0.05, 0.0);
	float noriOuter = sdCappedCylinder(noriPos, 0.26, 0.15);
	float noriInner = sdCappedCylinder(noriPos, 0.24, 0.16);
	float nori = max(noriOuter, -noriInner);

	// 海苔の表面テクスチャ（ノイズで凹凸）
	float noriTexture = noiseCyc(pp * 30.0).x * 0.005;
	nori += noriTexture;

	// シャリと海苔を統合
	float d = min(shari, nori);

	return SDFResult(
		d,
		p,
		nori < shari ? 1.0 : 0.0, // 海苔かシャリかを識別
		vec4(0.0)
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>

	SDFResult dist;
	bool hit = false;

	for( int i = 0; i < 64; i++ ) {

		dist = D( rayPos );
		rayPos += dist.d * rayDir * 1.0;

		if( dist.d < 0.001 ) {

			hit = true;
			break;

		}

	}

	if( !hit ) discard;

	outNormal = N( rayPos, 0.01 );

	#include <rm_out_obj>

	vec3 color;

	if( dist.emission > 0.5 ) {

		// 海苔の色 - 黒緑色
		color = vec3(0.05, 0.08, 0.05);
		float variation = noiseCyc(rayPos * 20.0).x * 0.05;
		color += variation;
		outRoughness = 0.9;

	} else {

		// シャリの色 - 白いご飯
		color = vec3(0.95, 0.93, 0.88);
		outRoughness = 0.8;

	}

	outColor.xyz = color;
	outMetalic = 0.0;

	// 距離に応じたフェードアウト
	outColor.xyz *= smoothstep( 2.0, 0.5, length( rayPos ) );

	#include <frag_out>

}
