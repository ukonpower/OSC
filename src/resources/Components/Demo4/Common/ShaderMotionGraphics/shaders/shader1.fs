#include <common>
#include <packing>
#include <frag_h>

// 頂点シェーダーから渡されるレイヤー値（0.0〜1.0）
in float vLayer;

// Shader 1: 時間でアニメーションする円
void main( void ) {

	#include <frag_in>

	// 中心からの距離
	vec2 uv = vUv * 2.0 - 1.0;
	float dist = length( uv );

	// 時間で脈動する円
	float pulse = sin( uTime * 2.0 ) * 0.5 + 0.5;
	float circle = smoothstep( 0.5 + pulse * 0.3, 0.5 + pulse * 0.3 - 0.02, dist );

	vec3 color = vec3( circle ) * vec3( 1.0, 0.5, 0.2 );

	outColor = vec4( color, 1.0 );
	outRoughness = 0.3;
	outMetalic = 0.8;

	#include <frag_out>

}
