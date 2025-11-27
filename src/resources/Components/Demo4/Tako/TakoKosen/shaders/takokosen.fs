#include <common>
#include <packing>
#include <frag_h>

uniform vec4 uState;

void main( void ) {

	#include <frag_in>

	outColor.xyz += 10.0;
	outColor.w *= uState.y;
	
	#include <frag_out>

}
