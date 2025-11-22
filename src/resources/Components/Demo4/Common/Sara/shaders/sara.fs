#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

#include <rm_h>

// 皿のSDF関数（参考URLのGYOZA形状を皿形状に変換）
SDFResult D( vec3 p ) {

	vec3 pp = p;

	// スケール調整（皿の大きさ）
	pp *= 0.8;
	pp.x *= 0.6;

	// 皿の中心の穴の半径
	float holeRadius = 0.3;

	// トーラス状の基本形状を作成（皿の底面）
	vec2 q = vec2( length(pp.xz) - holeRadius, pp.y );

	vec2 d = vec2( 10000.0, 0.0 );

	// 皿の底面（回転させて厚みを持たせる）
	vec2 q1 = q;
	q1.xy *= rotate( -1.1 );
	d = add( d, vec2( sdBox( vec3( q1, 0.0 ), vec3( 0.01, 0.18, 1.0 )), 0.0 ) );

	// 皿の縁（上部のリム）
	vec2 q2 = q;
	q2.x += 0.4;
	q2.y += 0.11;
	d = add( d, vec2( sdBox( vec3( q2, 0.0 ), vec3( 0.3, 0.04, 0.1 )), 0.0 ) );

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

	// レイマーチングループ
	#include <rm_loop,128,0.001,1.0>

	if( !hit ) discard;

	// 法線計算
	outNormal = N( rayPos, 0.01 );

	#include <rm_out_obj>

	// 皿の色（白基調）
	outColor.xyz = vec3( 1.0, 0.98, 0.95 );

	// ラフネス（陶器の質感）
	outRoughness = 0.3;

	// メタリック値（非金属）
	outMetalic = 0.0;

	// 距離に応じて暗くする（RaymarchCubeと同様）
	outColor.xyz *= smoothstep( 1.5, 0.4,  length( rayPos ) );

	#include <frag_out>

}
