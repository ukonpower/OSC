#include <common>
#include <packing>
#include <frag_h>
#include <light>
#include <pmrem>

uniform sampler2D uEnvMap;

in vec4 vGPUVel;
in vec4 vGPUPos;
in vec4 vId;

void main( void ) {

	#include <frag_in>

	// デフォルト設定
	outColor.xyz = vec3(0.0);
	outRoughness = 0.2;
	outMetalic = 0.2;

	#ifdef IS_FORWARD

		vec3 viewNormal = normalize( vViewNormal );

		#include <lighting_forwardIn>

		vec2 uv = gl_FragCoord.xy / uResolution;

		// フレネル効果
		float dnv = dot( geo.normal, geo.viewDir );
		float ef = fresnel( dnv );

		// 屈折効果によるシーンテクスチャのサンプリング
		float nf = 1.0;

		for( int i = 0; i < 3; i++ ) {

			// 法線に基づいて屈折オフセットを計算
			vec2 v = -( viewNormal.xy ) * ( float( i + 1 ) / 4.0 * 0.015 + 0.05 );
			outColor.x += nf * texture( uDeferredTexture, uv + v * 1.0 ).x;
			outColor.y += nf * texture( uDeferredTexture, uv + v * 1.3 ).y;
			outColor.z += nf * texture( uDeferredTexture, uv + v * 1.6 ).z;

		}

		outColor.xyz /= 3.0;

		// いくらの色味を加える（オレンジ系）
		outColor.xyz = (outColor.xyz + vec3( 0.7, 0.3, 0.0 )) * vec3( 0.7, 0.1, 0.0 );
		outColor.w = 1.0;

		// フレネル効果でハイライト追加
		outColor.xyz += ef * 1.0 * vec3( 1.0, 0.5, 0.0 );

		#include <lighting_light>

		float emit = smoothstep( 0.85, 1.0, vGPUVel.w );

		outColor.xyz *= 1.0 + smoothstep( 0.02, 0.2, ef ) * 1.0 + emit * 55.0;

		
		#include <lighting_env>

	#endif

	#include <frag_out>

}
