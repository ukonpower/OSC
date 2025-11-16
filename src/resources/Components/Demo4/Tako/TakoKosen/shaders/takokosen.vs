#include <common>
#include <vert_h>

uniform vec4 uState;

void main( void ) {

	#include <vert_in>

	outPos.xyz *= uState.x;
	
	#include <vert_out>

}
