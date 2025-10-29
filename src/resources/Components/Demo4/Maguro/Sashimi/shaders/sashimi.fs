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

// 刺身の種類（0: マグロ, 1: サーモン）
uniform float uSashimiType;

// 刺身のSDF定義
SDFResult D( vec3 p ) {

	vec3 sashimiP = p;
	sashimiP.y -= 0.2;
	
	vec4 n = texture( uNoiseTex, p.xz * 0.1 - vec2( 0.1, 0.3 ) );
	vec4 n2 = texture( uNoiseTex, p.xz * 2.0 - vec2( 0.1, 0.3 ) );
	
	vec3 pp = sashimiP;
	pp.yz *= rotate( smoothstep( 0.0, 1.0, abs(pp.z) ) * sign( pp.z ) * 0.5);
	pp.xy *= rotate( -smoothstep( 0.0, 0.4, abs(pp.x) ) * sign( pp.x ) * 0.5);
	pp.y += n2.x * 0.01;
	vec3 sashimiSize = vec3( 0.2, 0.01 + n.x * 0.08, 0.65 );
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

#include <subsurface>
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

	vec4 n = texture( uNoiseTex,  rayPos.xz * 0.1 + 0.5 );
	vec4 n2 = texture( uNoiseTex,  rayPos.xz * 4.0 + 0.5 );

	float sss = subsurface( rayPos, normalize( vec3( 1.0, 1.0, 0.0 ) ), 0.15);

	outNormal = N( rayPos, 0.01 );
	outNormal = normalize( outNormal + (n2.y - 0.5) * 0.4 );

	#include <rm_out_obj>

	float dnv = dot( rayDir, -outNormal.xyz );

	// 刺身のカラー（マグロの赤身 or サーモンのオレンジ）
	vec3 maguruColor = vec3( 0.9, 0.15, 0.1 );    // マグロ：赤身
	vec3 salmonColor = vec3( 1.0, 0.5, 0.3 );      // サーモン：オレンジ
	vec3 sashimiColor = mix( maguruColor, salmonColor, uSashimiType );

	outColor.xyz = sashimiColor;
	outColor.xyz = mix( outColor.xyz, vec3( 1.0 ), smoothstep( 0.8, 1.0, fract(length( rayPos.xz + 0.5 + n.xy * 0.3 ) * 5.0 ) ) * n.y * 0.8 );

	// エミッションもサーモンの時はオレンジに
	vec3 maguruEmission = vec3( 0.9, 0.1, 0.2 );
	vec3 salmonEmission = vec3( 1.0, 0.6, 0.3 );
	outEmission.xyz += mix( maguruEmission, salmonEmission, uSashimiType ) * sss * 0.9 * smoothstep( 1.5, 0.0, dnv );
	outRoughness = 0.4;

	// グラデーション効果
	outColor.xyz *= smoothstep( 1.5, 0.4, length( rayPos ) );
	outRoughness = 0.2 + n2.y * 0.2;
	outMetalic = 0.3;

	#include <frag_out>


}
