#include <common>
#include <noise_value>

layout (location = 0) out vec4 outColor;
in vec2 vUv;
uniform float uTimeE;

void main( void ) {

	// fbmを使って4チャンネル分のノイズを生成
	vec4 n = vec4(
		fbm( vec3( vUv * 3.0, uTimeE * 0.5 ) ),
		fbm( vec3( vUv * 3.0 + 127.1, uTimeE * 0.5 + 311.7 ) ),
		fbm( vec3( vUv * 3.0 + 269.5, uTimeE * 0.5 + 183.3 ) ),
		fbm( vec3( vUv * 3.0 + 419.2, uTimeE * 0.5 + 371.9 ) )
	);

	outColor = n;

}
