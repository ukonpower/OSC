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

	// 魚の胴体部分（楕円体）
	vec3 bodyScale = vec3( 0.6, 0.35, 0.2 );
	float body = sdEllipsoid( pp, bodyScale );

	// 尾びれ部分（尾の方向に伸びる三角形的な形状）
	vec3 tailPos = pp - vec3( -0.5, 0.0, 0.0 );
	float tail = sdCone( tailPos, vec2( 0.3, 0.15 ), 0.5 );

	// 頭部分（少し丸みを持たせる）
	vec3 headPos = pp - vec3( 0.5, 0.0, 0.0 );
	float head = sdSphere( headPos, 0.25 );

	// 各パーツを合成
	float d = smin( body, tail, 0.15 );
	d = smin( d, head, 0.1 );

	// 表面の焼き目模様（ノイズで凹凸を表現）
	float pattern = noise( pp * 8.0 ) * 0.015;
	d += pattern;

	// 少し丸みをつける
	d -= 0.02;

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

	// たいやきの焼き色（茶色から黄金色のグラデーション）
	vec3 taiyakiColor = mix(
		vec3( 0.8, 0.5, 0.2 ),  // 濃い茶色
		vec3( 1.0, 0.8, 0.3 ),   // 黄金色
		noise( rayPos * 5.0 ) * 0.5 + 0.5
	);

	outColor.xyz = taiyakiColor;
	outRoughness = 0.6;

	// 焼き目の濃淡
	float burn = smoothstep( 0.3, 0.7, noise( rayPos * 10.0 ) );
	outColor.xyz *= mix( 0.7, 1.0, burn );

	// 距離に応じた減衰
	outColor.xyz *= smoothstep( 1.5, 0.4, length( rayPos ) );

	#include <frag_out>

}
