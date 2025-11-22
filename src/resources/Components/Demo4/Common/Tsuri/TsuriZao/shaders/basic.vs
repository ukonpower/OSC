#include <common>
#include <vert_h>

float height = 2.0;

void main( void ) {

	#include <vert_in>

	vec3 downDir = ( uModelMatrix * vec4( vec3( 0.0, 0.0, -1.0 ), 0.0 ) ).xyz;

	outPos.xz *= smoothstep( height, 0.2, position.y );
	outPos += downDir * pow( linearstep( 0.5, height, position.y ), 2.0 ) * 0.2;
	
	#include <vert_out>

}
