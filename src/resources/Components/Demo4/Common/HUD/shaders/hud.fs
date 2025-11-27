#include <common>
#include <packing>
#include <frag_h>
#include <rotate>

// uTime is available from <common>
uniform float uTimeE;

void main( void ) {

	#include <frag_in>

	float aspectRatio = uResolution.x / uResolution.y;

	// grid

	vec2 cuv = vUv - 0.5;

	vec2 gridUv = cuv;
	gridUv.x *= aspectRatio;
	gridUv.xy *= rotate( 0.09 );
	vec2 baseGridUv = gridUv;
	gridUv.x += uTimeE * 0.05 * sign( baseGridUv.y );
	gridUv.y *= 0.5;
	gridUv *= 30.0; 
	gridUv.y += floor(gridUv.x) * 0.5;
	gridUv = fract( gridUv );

	float w = 0.0;
	w = step( 0.5, gridUv.y );

	w *= step( 0.45, abs(baseGridUv.y) );

	outColor.xyz = vec3( 1.0 );
	outColor.w = w * 0.4;
	
	#include <frag_out>

}