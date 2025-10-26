#include <common>
#include <packing>
#include <frag_h>

uniform vec3 uWireColor;

void main( void ) {

	#include <frag_in>
	outColor = vec4( uWireColor, 1.0 );
	#include <frag_out>

}