#include <common>
#include <packing>
#include <frag_h>

void main( void ) {

	#include <frag_in>

	// 赤い色を設定
	outColor = vec4( 1.0, 0.0, 0.0, 1.0 );
	outEmission = vec3( 0.0 );
	outRoughness = 0.5;

	#include <frag_out>

}
