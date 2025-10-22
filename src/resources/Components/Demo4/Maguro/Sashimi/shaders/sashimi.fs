#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

#include <rm_h>

// グローバルテクスチャユニフォーム
uniform sampler2D uNoiseTex;
uniform sampler2D uNoiseCyclicTex;

// 刺身のSDF定義
SDFResult D( vec3 p ) {

	vec3 sashimiP = p;
	sashimiP.y -= 0.2;
	
	vec4 n = texture( uNoiseTex, p.xz * 0.1 - vec2( 0.1, 0.3 ) );
	
	vec3 pp = sashimiP;
	pp.yz *= rotate( smoothstep( 0.0, 1.0, abs(pp.z) ) * sign( pp.z ) * 0.5);
	pp.xy *= rotate( -smoothstep( 0.0, 0.4, abs(pp.x) ) * sign( pp.x ) * 0.5);
	vec3 sashimiSize = vec3( 0.2, 0.02 + n.x * 0.08, 0.65 );
	vec2 d = vec2( sdBox( pp, sashimiSize ), 0.0 );

	vec3 trimP = pp;
	trimP.xz += vec2( -0.0, 0.0);
	trimP.xz *= rotate( 0.3 );
	d.x = opAnd( sdBox(trimP, vec3( 1.0, 0.2, 0.4 )), d.x );

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
		rayPos += dist.d * rayDir * 0.7;

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
	outRoughness = 0.2;
	outMetalic = 0.2;

	#include <frag_out>


}
