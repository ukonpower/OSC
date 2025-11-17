#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

#include <rm_h>

// たいやき形状を表現するSDF関数
SDFResult D( vec3 p ) {

	vec3 pp = p;

	vec3 bodyP = pp;
	bodyP.x += 0.08;
	bodyP.x *= 0.7;
	float d = sdRoundedCylinder( bodyP, 0.12, 0.04, 0.01 );


	vec3 shippoP = pp;
	shippoP.xz += vec2( -0.3, 0.05 );
	shippoP.xz *= rotate( -0.2 );
	d = opAdd( d,sdRoundBox( shippoP, vec3( 0.15,0.05,0.16 ), 0.03 ) );

	return SDFResult(
		d,
		p,
		0.0,
		vec4( 0.0 )
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>

	SDFResult dist;

	bool hit = false;

	for( int i = 0; i < 128; i++ ) {

		dist = D( rayPos );
		rayPos += dist.d * rayDir * 1.0;

		if( dist.d < 0.001 ) {

			hit = true;
			break;

		}

	}

	if( !hit ) discard;

	outNormal = N( rayPos, 0.01 );

	#include <rm_out_obj>

	// たいやきの焼き色
	outColor.xyz = vec3( 0.9, 0.6, 0.3 );
	outRoughness = 0.6;

	// 距離に応じた減衰
	outColor.xyz *= smoothstep( 1.5, 0.4, length( rayPos ) );

	#include <frag_out>

}
