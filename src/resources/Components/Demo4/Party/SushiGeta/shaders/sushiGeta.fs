#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

#include <rm_h>

SDFResult D( vec3 p ) {

	vec3 pp = p;

	vec2 d = vec2( sdBox( pp, vec3( 0.5, 0.5, 0.5) ) - 0.005, 0.0 );

	return SDFResult(
		d.x,
		p,
		d.y,
		vec4(0.0)
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>

	SDFResult dist;

	bool hit = false;

	#include <rm_loop,128,0.001,1.0>

	if( !hit ) discard;

	outNormal = N( rayPos, 0.01 );

	#include <rm_out_obj>

	outColor.xyz = vec3( 1.0 );
	outRoughness = 0.5;

	outColor.xyz *= smoothstep( 1.5, 0.4,  length( rayPos ) );

	#include <frag_out>


}
