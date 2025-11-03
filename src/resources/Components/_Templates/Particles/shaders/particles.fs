#include <common>
#include <packing>
#include <frag_h>

in vec4 vGPUVel;
in vec4 vGPUPos;
in vec4 vId;

void main( void ) {

	#include <frag_in>

	// basic material properties
	outColor = vec4( 1.0 );
	outRoughness = 0.5;
	outMetalic = 0.0;
	outSSN = 0.0;

	// basic emission
	outEmission = vec3( 0.0 );

	#include <frag_out>

}
