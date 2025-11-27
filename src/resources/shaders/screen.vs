#include <common>
#include <vert_h>

void main( void ) {

	#include <vert_in>

	gl_Position = vec4( position.xy, 0.0, 1.0 );

}
