#include <common>
#include <packing>
#include <frag_h>
#include <sdf>
#include <rotate>

in vec2 vLayerIndex;
uniform float uTime;
uniform float uTimeOffset;
uniform vec4 uState;

void main( void ) {

	#include <frag_in>

	vec2 p = vUv * 2.0 - 1.0;

	float t = uTime * 0.5 + uTimeOffset;

	p.xy *= rotate( (floor( t ) + exp( fract( t ) * -5.0 )) * HPI );

	float len = 0.5;
	float d = sdSegment( p, vec2( -len ), vec2( len ) );
	d = min( d, sdSegment( p, vec2( len, -len ), vec2( -len, len ) ) );

	float w = step( d, 0.15 );

	if( w < 0.5 ) {
		discard;
	}

	// 真っ白な色
	vec3 color = vec3( 1.0 );
	outEmission = vec3( 1.0 );
	#include <frag_out>


}
