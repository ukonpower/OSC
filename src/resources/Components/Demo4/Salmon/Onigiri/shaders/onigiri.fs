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

	vec2 d = vec2( udTriangle( pp, vec3( 0.0, 0.5, 0.0 ), vec3( -0.5, -0.35, 0.0 ), vec3( 0.5, -0.35, 0.0 ) ), 0.0 );
	d -= 0.3;

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
	outColor.xyz *= smoothstep( 0.0, 0.03, sdBox( rayPos.xy + vec2( 0.0, 0.4 ), vec2( 0.25, 0.3 ) ) );
	
	#include <frag_out>
	

}