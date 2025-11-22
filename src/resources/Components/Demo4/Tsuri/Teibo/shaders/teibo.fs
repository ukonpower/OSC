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

	vec2 d = vec2( sdBox( pp, vec3( 0.5, 0.5, 0.5 ) ) - 0.005, 0.0 );

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

	// アスファルト質感
	vec3 worldPos = rayPos;

	// ノイズテクスチャから複数スケールでサンプリング
	float n1 = texture( uNoiseTex, worldPos.xz * 0.5 ).r;
	float n2 = texture( uNoiseTex, worldPos.xz * 2.0 ).g;
	float n3 = texture( uNoiseTex, worldPos.xz * 8.0 ).b;
	float n4 = texture( uNoiseTex, worldPos.xz * 0.1 ).r;

	// アスファルトのベースカラー（暗いグレー）
	vec3 asphaltColor = vec3( 0.15, 0.14, 0.13 );

	// 粗い骨材の模様
	float aggregate = n1 * 0.3 + n2 * 0.5 + n3 * 0.2;
	asphaltColor += vec3( aggregate * 0.1 - 0.05 );

	// 小石のような明るいスポット
	float spots = smoothstep( 0.6, 0.8, n2 ) * n3;
	asphaltColor += vec3( spots * 0.15 );

	outColor.xyz = asphaltColor;

	// ラフネス（アスファルトは粗い）
	outRoughness = 0.7 + n2 * 0.2;

	outColor.xyz *= smoothstep( 1.5, 0.4, length( rayPos ) );

	#include <frag_out>


}
