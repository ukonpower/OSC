#include <common>
#include <frag_h>
#include <noise_simplex>

uniform float uTimeE;

layout (location = 0) out vec4 outColor;

void main( void ) {

	// 時間でアニメーションするsimplexノイズ
	vec3 pos = vec3( vUv * 4.0, uTimeE * 0.3 );

	outColor.x = noiseSimplex( pos ) * 0.5 + 0.5;
	outColor.y = noiseSimplex( pos + vec3( 100.0, 0.0, 0.0 ) ) * 0.5 + 0.5;
	outColor.z = noiseSimplex( pos + vec3( 0.0, 100.0, 0.0 ) ) * 0.5 + 0.5;
	outColor.w = noiseSimplex( pos + vec3( 0.0, 0.0, 100.0 ) ) * 0.5 + 0.5;

}
