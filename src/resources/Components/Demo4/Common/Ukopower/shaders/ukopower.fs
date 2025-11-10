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

	// たこ焼き風の球体を描画
	float baseRadius = 0.40 + noiseValue( pp * 5.0 ) * 0.055;
	float bodyRadius = baseRadius + fbm( pp * 20.0 ) * 0.01;

	vec2 d = vec2( sdSphere( pp, bodyRadius ), 0.0 );

	// ソース部分
	float sauceRadius = baseRadius * 0.95;

	float round = atan( pp.x, pp.z );
	float wave = ( noiseValue( vec3( round * 2.0 ) ) ) * sin( round );

	sauceRadius += smoothstep( 0.0, 0.4, pp.y * 1.3 + wave * 0.3 ) * 0.05 + smoothstep( 0.2, 0.8, noiseValue( pp * 7.0 ) ) * 0.001;
	d = opAdd( d, vec2( sdSphere( pp, sauceRadius ), 1.0 ) );

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

	outRoughness = 1.0;
	outMetalic = 0.0;

	if( dist.mat == 0.0 ) {

		// たこ焼き本体
		outColor.xyz = mix( vec3( 0.8, 0.6, 0.4 ), vec3( 0.3, 0.15, 0.05 ), smoothstep( 0.3, 0.7, fbm( dist.pos * 3.0 ) ) );
		outRoughness = 0.3;

	} else if( dist.mat == 1.0 ) {

		// ソース
		outColor.xyz = vec3( 0.15, 0.03, 0.00 );
		outRoughness = 0.1;

	}

	// リムライト効果
	float limLight = ( 1.0 - dot( outNormal.xyz, -rayDir ) ) * 0.8;
	outEmission += limLight * 0.3;

	#include <frag_out>


}
