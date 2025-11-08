#include <common>
#include <packing>
#include <frag_h>
#include <sdf>

#include <rm_h>

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

SDFResult D( vec3 p ) {

	vec3 plx = p;
	plx.x = mod( plx.x - 0.5, 1.0 ) - 0.5;

	SDFResult distTable = table( plx );
	float d = distTable.d;

	SDFResult distSeat = seat( plx );
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

	// レイマーチング
	for( int i = 0; i < 128; i++ ) {

		dist = D( rayPos );
		rayPos += dist.d * rayDir;

		if( dist.d < 0.001 ) {

			hit = true;
			break;

		}

	}

	if( !hit ) discard;

	// 法線を計算
	outNormal = N( rayPos, 0.01 );

	// オブジェクト空間からワールド空間への変換、位置・法線・深度を出力
	#include <rm_out_obj>

	// 木目調の茶色を設定（テーブルステージらしい色）
	outColor = vec4( 1.0 );
	outEmission = vec3( 0.0 );
	outRoughness = 0.7;

	#include <frag_out>

}
