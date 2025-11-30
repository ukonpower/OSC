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

uniform float uTimeE;
uniform float uEmission;

// 刺身のSDF定義
SDFResult D( vec3 p ) {

	vec3 sashimiP = p;
	sashimiP.y -= 0.2;

	vec3 pp = sashimiP;
	pp.yz *= rotate( smoothstep( 0.0, 0.8, abs(pp.z) ) * sign( pp.z ) * 0.3);
	pp.xy *= rotate( -smoothstep( 0.0, 0.3, abs(pp.x) ) * sign( pp.x ) * 0.4);

	vec2 d = vec2( 9999999.0, 1.0 );

	#if defined( TAKO )

		// タコ

		vec4 n = texture( uNoiseTex, p.xz * 0.1 - vec2( 0.1, 0.3 ) );
		vec4 n2 = texture( uNoiseTex, p.xz * 0.1 - vec2( 0.1, 0.3 ) + n.xy * 3.0 );
		pp.y += n2.x * 0.02;
		
		vec3 takoSize = vec3( 0.25, 0.02, 0.4 );
		pp.x *= 1.2 + sin( -HPI + pp.z * 4.0 ) * 0.4;
		pp.y -= (texture( uNoiseTex, pp.xz * 0.1 - vec2( 0.1, 0.3 ) + vec2( 0.0, uTimeE * 0.01 ) ).x - 0.45) * smoothstep( 0.05, 0.2, abs( pp.x ) ) * 0.3;
		pp.x += sin( pp.z * 30.0 ) * 0.2 * smoothstep( 0.1, 1.0, abs( pp.x ) );
		d.x = sdBox( pp, takoSize );

	#else

		vec4 n = texture( uNoiseTex, p.xz * 0.1 - vec2( 0.1, 0.3 ) );
		vec4 n2 = texture( uNoiseTex, p.xz * 2.0 - vec2( 0.1, 0.3 ) );
		pp.y += n2.x * 0.02;

		// マグロ・サーモン（薄め）
		vec3 sashimiSize = vec3( 0.2, 0.01 + n.x * 0.08, 0.65 );
		d.x = sdBox( pp, sashimiSize );

		vec3 trimP = pp;
		trimP.xz += vec2( -0.0, 0.0);
		trimP.xz *= rotate( 0.3 );
		d.x = opAnd( sdBox(trimP, vec3( 1.0, 0.2, 0.4 )), d.x );

	#endif

	return SDFResult(
		d.x,
		p,
		d.y,
		vec4(pp, 0.0)
	);

}

#include <subsurface>
#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>



	// レイマーチングループ
	#include <rm_loop,53,0.001,0.7>

	if( !hit ) discard;

	vec4 n = texture( uNoiseTex,  rayPos.xz * 0.1 + 0.5 );
	vec4 n2 = texture( uNoiseTex,  rayPos.xz * 4.0 + 0.5 );

	float sss = subsurface( rayPos, normalize( vec3( 1.0, 1.0, 0.0 ) ), 0.15);

	outNormal = N( rayPos, 0.01 );
	outNormal = normalize( outNormal + (n2.y - 0.5) * 0.4 );

	#include <rm_out_obj>

	float dnv = dot( rayDir, -outNormal.xyz );

	vec3 sashimiColor = vec3( 1.0 );
	vec3 sashimiEmission = vec3( 0.0 );

	// 刺身のカラー（Defineで種類を切り替え）
	#if defined( SALMON )
		sashimiColor = vec3( 1.0, 0.4, 0.2 );  // サーモン：オレンジ
		sashimiEmission = vec3( 1.0, 0.4, 0.1 );
	#elif defined( TAKO )
		sashimiColor = vec3( 1.0, 0.95, 0.9 ); // タコ：白っぽい
		sashimiColor.xyz = mix( sashimiColor.xyz, vec3( 0.8, 0.0, 0.1 ), smoothstep( 0.16, 0.23, abs( dist.matparam.x ) )  );
		sashimiEmission = vec3( 1.0, 0.8, 0.7 );
	#else
		sashimiColor = vec3( 0.9, 0.15, 0.1 ); // マグロ：赤身
		sashimiEmission = vec3( 0.9, 0.1, 0.2 );
	#endif

	outColor.xyz = sashimiColor;
	outColor.xyz = mix( outColor.xyz, vec3( 1.0 ), smoothstep( 0.8, 1.0, fract(length( rayPos.xz + 0.5 + n.xy * 0.3 ) * 5.0 ) ) * n.y * 0.8 );

	outEmission.xyz += sashimiEmission * sss * 0.9 * smoothstep( 1.5, 0.0, dnv );
	outRoughness = 0.4;

	// グラデーション効果
	outColor.xyz *= smoothstep( 1.5, 0.4, length( rayPos ) );
	outRoughness = 0.2 + n2.y * 0.2;
	outMetalic = 0.3;
	outEmission *= 1.0 + uEmission * 3.0;
	outEmission += outColor.xyz * 0.2;

	#include <frag_out>


}
