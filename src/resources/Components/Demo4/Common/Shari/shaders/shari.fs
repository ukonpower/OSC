#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

#include <rm_h>

// シャリ（寿司のご飯）のSDF定義
SDFResult D( vec3 p ) {

	vec3 pp = p;

	// 丸っこい四角形（横に長い形状）
	vec3 size = vec3( 1.0, 0.3, 0.5 ) * 0.45;
	float roundness = 0.3;
	float d = sdBox( pp, size ) - roundness;

	return SDFResult(
		d,
		p,
		0.0
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>

	SDFResult dist;

	bool hit = false;

	// レイマーチングループ
	for( int i = 0; i < 64; i++ ) {

		dist = D( rayPos );
		rayPos += dist.d * rayDir * 0.8;

		if( dist.d < 0.01 ) {

			hit = true;
			break;

		}

	}

	if( !hit ) discard;

	// 法線計算
	outNormal = N( rayPos, 0.01 );

	#include <rm_out_obj>

	// シャリの色（白米の色）
	outColor.xyz = vec3( 0.98, 0.96, 0.92 );

	// 少しラフネスを追加（マット感）
	outRoughness = 0.7;
	outMetalic = 0.0;

	// 距離に応じた減衰（オプション）
	outColor.xyz *= smoothstep( 2.0, 0.5, length( rayPos ) );

	#include <frag_out>

}
