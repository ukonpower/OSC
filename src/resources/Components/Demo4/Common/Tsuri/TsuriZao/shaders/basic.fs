#include <common>
#include <packing>
#include <frag_h>

void main( void ) {

	#include <frag_in>

	outColor = vec4( vec3( 0.3, 0.2, 0.0 ), 1.0 );
	
	#include <frag_out>

}
