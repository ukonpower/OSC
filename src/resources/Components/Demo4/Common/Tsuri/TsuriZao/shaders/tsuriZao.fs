#include <common>
#include <frag_h>

#include <sdf>
#include <noise>
#include <rotate>

void main( void ) {

	#include <frag_in>

	vec3 rayPos = vViewPosition;
	vec3 rayDir = normalize( vViewPosition );
	vec3 normal = vec3( 0.0 );

	// 釣り竿のSDF
	float d = 1e9;

	for( int i = 0; i < 64; i++ ) {

		vec3 p = rayPos;

		// 円錐状の棒（先が細い）
		float radius = mix( 0.05, 0.02, ( p.y + 1.5 ) / 3.0 );
		float rod = sdCappedCylinder( p, radius, 1.5 );

		d = rod;

		if( d < 0.001 ) break;

		rayPos += rayDir * d;

	}

	if( d < 0.001 ) {

		// 法線計算
		vec2 e = vec2( 0.001, 0.0 );
		vec3 p = rayPos;
		float radius = mix( 0.05, 0.02, ( p.y + 1.5 ) / 3.0 );

		normal = normalize( vec3(
			sdCappedCylinder( p + e.xyy, radius, 1.5 ) - sdCappedCylinder( p - e.xyy, radius, 1.5 ),
			sdCappedCylinder( p + e.yxy, radius, 1.5 ) - sdCappedCylinder( p - e.yxy, radius, 1.5 ),
			sdCappedCylinder( p + e.yyx, radius, 1.5 ) - sdCappedCylinder( p - e.yyx, radius, 1.5 )
		) );

		outNormal = normalize( normalMatrix * normal );
		outRoughness = 0.3;
		outMetalic = 0.0;
		outColor = vec4( 0.4, 0.25, 0.1, 1.0 ); // 木の色
		outEmission = vec3( 0.0 );
		outEnv = 0.5;

	} else {

		discard;

	}

	#include <frag_out>

}
