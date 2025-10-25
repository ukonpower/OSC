#include <common>
#include <packing>
#include <frag_h>

// 頂点シェーダーから渡されるレイヤー値（0.0〜1.0）
in float vLayer;

// Shader 2: チェッカーボードパターン
void main( void ) {

	#include <frag_in>

	// チェッカーボード（8x8）
	vec2 uv = vUv * 8.0;
	float checker = mod( floor( uv.x ) + floor( uv.y ), 2.0 );

	// 時間で色をアニメーション
	vec3 color1 = vec3( sin( uTime ) * 0.5 + 0.5, 0.2, 0.8 );
	vec3 color2 = vec3( 0.1, cos( uTime ) * 0.5 + 0.5, 0.3 );
	vec3 color = mix( color1, color2, checker );

	outColor = vec4( color, 1.0 );
	outRoughness = 0.7;
	outMetalic = 0.2;

	#include <frag_out>

}
