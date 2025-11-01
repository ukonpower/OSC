#include <common>
#include <frag_h>
#include <sdf>
#include <rotate>
#include <light>
#include <pmrem>
#include <noise_cyclic>
#include <rm_h>

uniform sampler2D uEnvMap;

// 水柱のSDF定義
SDFResult D( vec3 p ) {

	vec3 pp = p;

	// 円柱形状（半径0.5、高さ2.0）
	pp.zx *= rotate( p.y );
	
	float d = sdCappedCylinder( pp + vec3( 0.5, 0.0, 0.0 ), 0.1, 3.0 );
	d = min( d, sdCappedCylinder( pp + vec3( -0.5, 0.0, 0.0 ), 0.1, 3.0 ) );

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
	vec3 normal = N( rayPos, 0.01 );
	outNormal = normal;

	outRoughness = 0.1;
	outMetalic = 0.0;
	outColor.xyz = vec3( 0.0 );

	#include <rm_out_obj>

	#ifdef IS_FORWARD

		#include <lighting_forwardIn>

		vec2 uv = gl_FragCoord.xy / uResolution;

		// フレネル効果
		float dnv = dot( geo.normal, geo.viewDir );
		float ef = fresnel( dnv );

		// 屈折効果によるシーンテクスチャのサンプリング
		float nf = 1.0;

		for( int i = 0; i < 16; i++ ) {

			// 法線に基づいて屈折オフセットを計算
			vec2 v = -( viewNormal.xy ) * ( float( i + 1 ) / 4.0 * 0.015 + 0.05 );
			outColor.x += nf * texture( uDeferredTexture, uv + v * 1.0 ).x;
			outColor.y += nf * texture( uDeferredTexture, uv + v * 1.3 ).y;
			outColor.z += nf * texture( uDeferredTexture, uv + v * 1.6 ).z;

		}

		outColor.xyz /= 16.0;

		// 水の色味を加える（青緑系）
		outColor.xyz *= vec3( 0.95, 0.95, 1.0 );
		outColor.w = 1.0;

		// フレネル効果でハイライト追加
		outColor.xyz += ef * 2.0;

		#include <lighting_light>
		#include <lighting_env>

	#endif

	#include <frag_out>

}
