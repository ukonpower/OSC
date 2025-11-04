#include <common>
#include <packing>
#include <frag_h>
#include <noise_simplex>

in vec2 vLayerIndex;
uniform float uTime;
uniform vec4 uState;

uniform sampler2D uNoiseTex;

void main( void ) {

	#include <frag_in>

	// UV座標を正規化
	vec2 uv = vUv;
	vec2 cuv = uv - 0.5;
	vec2 p = uv * 2.0 - 1.0;

	vec4 noiseTex = texture( uNoiseTex, vUv );

	float line = length( vec2( 1.0 - uv.x, uv.y ) );

	float v = smoothstep(0.0, 1.0, - ((1.0 - vLayerIndex.y) * 0.5 + line * 0.5 ) * 0.3 + (uState.x) * 1.3 );
	v = easeOut(v, 2.5);

	float noise1 = noiseSimplex( vec3( p * 1.5 - vLayerIndex.x * 0.1 + 0.4, uTime * 0.1  ) ) * 0.5 + 0.5;
	float hole = noise1 - ( v - 1.0 );

	if( hole > 0.5 - (1.0 - vLayerIndex.y) * 0.2 ) {

		discard;

	}


	vec3 color;
	color = mix( vec3( 0.0, 0.6, 0.0 ), vec3( 0.0, 0.3, 0.0 ), vLayerIndex.y);
	outColor = vec4( color, 1.0 );
	outRoughness = 0.3;
	outMetalic = 0.2;
	outEmission = color;
	outEnv = 0.0;
	outGradient = 1.0;

	#include <frag_out>

}
