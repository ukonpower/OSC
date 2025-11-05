#include <common>
#include <packing>
#include <frag_h>
#include <noise_value>
#include <rotate>

uniform float uTimeE;
uniform float uAspectRatio;
uniform sampler2D uNoiseTex;

void main( void ) {

	#include <frag_in>

	vec3 normal = normalize( - vNormal );
	outRoughness = 1.0;
	outColor *= 0.0;

	// たい焼き釣りシーンの水辺の空
	// 明るい青空グラデーション
	vec3 skyColor = mix(
		vec3( 0.4, 0.7, 1.0 ),  // 上部：明るい青
		vec3( 0.8, 0.9, 1.0 ),  // 下部：淡い青
		smoothstep( -0.5, 0.5, normal.y )
	);

	// ノイズで雲のような質感を追加
	vec4 n = texture( uNoiseTex, vUv * 0.3 + uTimeE * 0.01 );
	skyColor += vec3( 0.2 ) * smoothstep( 0.5, 0.7, n.x );

	outEmission = skyColor * 1.5;

	#ifdef IS_FORWARD

		outColor = vec4( outEmission, 1.0 );

	#endif

	outEnv = 0.0;

	#include <frag_out>

}
