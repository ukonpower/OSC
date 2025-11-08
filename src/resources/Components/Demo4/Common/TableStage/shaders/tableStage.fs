#include <common>
#include <packing>
#include <frag_h>
#include <sdf>
#include <rm_h>

uniform float uTimeE;

SDFResult table( vec3 p  ) {

	float d = sdBox( p, vec3( 0.2, 0.02, 0.3 ) );

	vec3 poleP = p;
	poleP += vec3( 0.0, 0.25, 0.0 );
	d = min( d, sdCappedCylinder( poleP, 0.03, 0.25 ) );
	return SDFResult( d, p, 0.0, vec4( 0.0 ) );

}

SDFResult seat( vec3 p  ) {

	float depth = 0.4;

	vec3 seatP = p;
	seatP.x = abs( seatP.x );
	seatP += vec3( - 0.4, 0.2, 0.0 );
	float d = sdBox( seatP, vec3( 0.2, 0.06, depth ) );

	vec3 semotareP = seatP;
	semotareP += vec3( -0.12, -0.27, 0.0 );
	d = min( d, sdBox( semotareP, vec3( 0.08, 0.20, depth ) ) );

	vec3 ashiP = semotareP;
	ashiP += vec3( 0.0, 0.4, 0.0 );
	d = min( d, sdBox( ashiP, vec3( 0.25, 0.1, 0.35 ) ) );

	return SDFResult( d, p, 0.0, vec4( 0.0 ) );

}

vec2 gridCenter = vec2( 0.0, 0.0 );
vec2 gridSize = vec2( 1.0, 1.6 );

// https://kinakomoti321.hatenablog.com/entry/2024/12/10/023309
float gridTraversal( vec2 ro, vec2 rd) {

   gridCenter = (floor( ( ro + rd * 1E-3 ) / gridSize) + 0.5)*gridSize;
   vec2 src = -( ro - gridCenter ) / rd;
   vec2 dst = abs( 0.5 * gridSize / rd );
   vec2 bv = src + dst;

   return  min( bv.x, bv.y );
}

SDFResult D( vec3 p ) {

	vec3 pl = p;

	pl.xy -= gridCenter;

	SDFResult distTable = table( pl );
	float d = distTable.d;

	SDFResult distSeat = seat( pl );
	d = min( d, distSeat.d );

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

	// カメラ位置からワールド空間でレイを初期化
	#include <rm_ray_world>

	SDFResult dist;
	bool hit = false;

	rayPos.xy -= gridSize / 2.0;

	// レイマーチング
	for( int i = 0; i < 128; i++ ) {

		// グリッドトラバーサルで最適化
		float limitD = gridTraversal(rayPos.xy, rayDir.xy);

		dist = D( rayPos );

		if( dist.d < 0.001 ) {

			hit = true;
			break;

		}

		float d = min( dist.d, limitD );
		rayPos += rayDir * d;

	}

	if( !hit ) discard;

	// 法線を計算
	outNormal = N( rayPos, 0.001 );

	// オブジェクト空間からワールド空間への変換、位置・法線・深度を出力
	#include <rm_out_obj>

	// 木目調の茶色を設定（テーブルステージらしい色）
	outColor = vec4( 1.0, 1.0, 1.0, 1.0 );
	outEmission = vec3( 0.0 );
	outRoughness = 0.7;

	#include <frag_out>

}
