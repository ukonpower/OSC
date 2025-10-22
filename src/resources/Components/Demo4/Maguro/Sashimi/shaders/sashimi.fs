#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

#include <rm_h>

// 刺身のSDF定義
SDFResult D( vec3 p ) {

	vec3 pp = p;

	// 基本的な刺身の形状（薄い箱）
	vec3 sashimiSize = vec3( 0.6, 0.1, 0.4 );
	vec2 d = vec2( sdBox( pp, sashimiSize ) - 0.01, 0.0 );

	return SDFResult(
		d.x,
		p,
		d.y
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>

	SDFResult dist;

	bool hit = false;

	// レイマーチングループ
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

	// 刺身のカラー（マグロの赤身）
	vec3 sashimiColor = vec3( 0.9, 0.3, 0.3 );
	outColor.xyz = sashimiColor;
	outRoughness = 0.4;

	// グラデーション効果
	outColor.xyz *= smoothstep( 1.5, 0.4, length( rayPos ) );

	#include <frag_out>


}
