#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

uniform sampler2D uNoiseTex;

#include <rm_h>

SDFResult D( vec3 p ) {

	vec3 pp = p;

	vec3 n = noiseCyc( pp * vec3( 5.0,1.0, 1.0 ) );

	vec2 d = vec2( sdBox( pp, vec3( 0.5, 0.49 - n.x * 0.0005, 0.49 - n.x * 0.0005 ) ) - 0.005, 0.0 );

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

	for( int i = 0; i < 32; i++ ) {

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

	// アスファルト質感
	vec3 uvSide = rayPos.xyz * 3.0;

	// ノイズテクスチャから複数スケールでサンプリング
	vec4 n1 = vec4( 
		fbm( uvSide * vec3( 40.0, 1.0, 7.0) ),
		fbm( uvSide * vec3( 20.0, 1.0, 7.0) + 100.0 ),
		fbm( uvSide * vec3( 10.0, 1.0, 1.0 ) * 30.0 + 30.0 ),
		fbm( uvSide * vec3( 10.0, 1.0, 1.0 ) * 2.0 + 30.0 )
	);

	// アスファルトのベースカラー（暗いグレー）
	vec3 asphaltColor = mix( vec3( 0.5 ), vec3( 0.1 ), n1.x * smoothstep( -0.5, 0.7, rayPos.y ) * ( 1.0 - dot( outNormal, vec3( 0.0, 1.0, 0.0 ) ) ) );

	asphaltColor = mix( asphaltColor, vec3( 0.0 ), smoothstep( 0.2, -0.3, rayPos.y + smoothstep( 0.3, 1.0, n1.y ) * 0.3 ));
	
	asphaltColor = mix( asphaltColor, vec3( 0.1 ), n1.z * dot( outNormal, vec3( 0.0, 1.0, 0.0 ) ) * n1.w);

	outColor.xyz = asphaltColor;

	// ラフネス（アスファルトは粗い）
	outRoughness = 0.7;

	outColor.xyz *= smoothstep( 1.5, 0.4, length( rayPos ) );

	#include <frag_out>


}
