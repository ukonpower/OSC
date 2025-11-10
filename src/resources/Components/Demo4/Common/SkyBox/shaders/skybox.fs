#include <common>
#include <packing>
#include <frag_h>
#include <noise_value>
#include <rotate>

uniform float uTimeE;
uniform float uAspectRatio;
uniform sampler2D uNoiseTex;
uniform vec4 uState;

void main( void ) {

	#include <frag_in>

	vec3 normal = normalize( - vNormal );
	outRoughness = 1.0;
	outColor *= 0.0;
	outEmission = vec3( 1.0 );
	outEmission *= uState.x;

	#ifdef IS_FORWARD

		vec4 n = texture( uNoiseTex, vUv * 0.2 );
		outColor = vec4( outEmission * 1.0 * smoothstep( 0.2, 0.5, n.x ) , 1.0 );
	
	#endif

	outEnv = 0.0;

	#include <frag_out>

} 