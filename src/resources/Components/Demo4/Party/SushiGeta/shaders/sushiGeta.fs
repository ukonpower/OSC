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

	vec3 mainP = pp;
	float d = sdBox( mainP, vec3( 0.5, 0.05, 0.35 ) ) - 0.01;

	// ashi
	vec3 ashiP = pp;
	ashiP.x = abs( ashiP.x );
	ashiP.x -= 0.3;
	ashiP.y += 0.1;
	d = opAdd( d, sdBox( ashiP, vec3( 0.05,0.05,0.35 ) ) - 0.01 );
	
	return SDFResult(
		d,
		p,
		0.0,
		vec4(0.0)
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>

	#include <rm_loop,64,0.001,1.0>

	if( !hit ) discard;

	outNormal = N( rayPos, 0.01 );

	#include <rm_out_obj>

	outColor.xyz = vec3( 1.0 );
	outRoughness = 0.5;

	float n1 = fbm( rayPos * 0.4 );
	float mokume = fract( length( rayPos * vec3( 0.5, 1.0, 1.0) + vec3( -0.1, 0.4, 0.1 ) ) * 45.0 + n1 * 20.0 );

	vec3 baseCol = vec3( 0.8, 0.55, 0.25 );
	outColor.xyz = mix( baseCol, baseCol * 0.9, mokume );
	outNormal = normalize( outNormal + mokume * 0.2 );

	#include <frag_out>


}
