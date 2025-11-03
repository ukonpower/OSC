#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

#include <rm_h>

uniform float uTime;

SDFResult D( vec3 p ) {

	vec3 pp = p;

	// きゅうりの基本形状 - カプセル
	float h = 0.8;
	pp.y += h / 2.0;
	float cylinder = sdVerticalCapsule(pp, h, 0.09); // 高さ1.0、半径0.15のカプセル

	// 表面のイボイボ（ノイズで凹凸を追加）
	float bumps = noiseCyc(pp * 15.0 + uTime * 0.1).x * 0.005;

	// きゅうりの形状にイボイボを追加
	float d = cylinder - bumps;

	return SDFResult(
		d,
		p,
		0.0,
		vec4(0.0)
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>

	SDFResult dist;

	bool hit = false;

	for( int i = 0; i < 128; i++ ) {

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

	// きゅうりの緑色 - ベースカラーとイボイボで色の濃淡
	vec3 baseColor = vec3(0.2, 0.6, 0.2);
	float colorVariation = noiseCyc(rayPos * 10.0).x * 0.3;
	outColor.xyz = baseColor + colorVariation;

	outRoughness = 0.6;
	outMetalic = 0.1;

	outColor.xyz *= smoothstep( 1.5, 0.4, length( rayPos ) );

	#include <frag_out>

}
