#include <common>
#include <packing>
#include <frag_h>
#include <sdf>
#include <rm_h>
#include <rotate>

const float seatDepth = 0.4;

uniform float uTimeE;

vec2 gridCenter = vec2( 0.0, 0.0 );
const vec2 gridSize = vec2( 1.0, 1.6 );
const vec2 offsetPos = vec2( gridSize / 2.0 );

// https://kinakomoti321.hatenablog.com/entry/2024/12/10/023309
float gridTraversal( vec2 ro, vec2 rd) {

	ro -= offsetPos;

  gridCenter = (floor( ( ro + rd * 1E-3 ) / gridSize) + 0.5)*gridSize;
  vec2 src = -( ro - gridCenter ) / rd;
  vec2 dst = abs( 0.5 * gridSize / rd );
  vec2 bv = src + dst;

  return  min( bv.x, bv.y );
}

SDFResult jaguchi( vec3 p ) {

	vec3 baseP = p;
	baseP += vec3( -0.05, -0.08, 0.38 );

	vec3 baseRotP = baseP;
	baseRotP.yz *= rotate( HPI );
	float d = sdCappedCylinder( baseRotP, 0.01, 0.05 );

	vec3 buttonP = baseP;
	buttonP += vec3( 0.0, 0.0, -0.05);
	buttonP.yz *= rotate( HPI );
	d = opSmoothAdd( d, sdCappedCylinder( buttonP, 0.013, 0.003 ), 0.004 );

	vec3 jaguchiP = baseP;
	jaguchiP += vec3( 0.0, -0.03, -0.025 );
	jaguchiP.yz *= rotate( 0.6 );
	d = opSmoothAdd( d, sdCappedCylinder( jaguchiP, 0.01, 0.035 ), 0.004 );

	vec3 jaguchi2P = baseP;
	jaguchi2P += vec3( 0.0, -0.059, -0.06 );
	jaguchi2P.yz *= rotate( HPI + 0.6 );
	jaguchi2P += vec3( 0.0, 0.0054, -0.01 );
	d = opSmoothAdd( d, sdCappedCylinder( jaguchi2P, 0.009, 0.015 ), 0.01 );

	return SDFResult( d, p, 4.0, vec4( 0.0 ) );
}

SDFResult laneConveyor( vec3 p ) {

	vec3 laneConveyorP = p;
	laneConveyorP += vec3( 0.0, 0.0, 0.0 );
	laneConveyorP.x = mod( laneConveyorP.x + uTimeE * 0.2, 0.1 ) - 0.05;
	float d = sdBox( laneConveyorP, vec3( 0.045, 0.01, 0.06 ) );

	return SDFResult( d, p, 0.0, vec4( 0.0 ) );
}

SDFResult lane( vec3 p ) {

	vec3 laneP = p;
	laneP += vec3( 0.0, 0.05, 0.5 );
	float d = sdBox( laneP, vec3( 0.5, 0.2, 0.1) );
	d = min( d, laneConveyor( laneP + vec3( 0.0, -0.2, -0.015 ) ).d );

	vec3 topLaneP = laneP;
	topLaneP += vec3( 0.0, -0.45, 0.0  );
	d = min( d, sdBox( topLaneP, vec3( 0.5, 0.013, 0.1) ) );
	// d = min( d, laneConveyor( topLaneP + vec3( 0.0, -0.015, -0.015 ) ).d );


	vec3 laneWallP = topLaneP;
	laneWallP += vec3( 0.0, 0.0, 0.1 );
	d = min( d, sdBox( laneWallP, vec3( 0.5, 2.0, 0.03) ) );

	return SDFResult( d, laneP, 0.0, vec4( 0.0 ) );

}

SDFResult table( vec3 p  ) {

	float d = sdBox( p, vec3( 0.2, 0.02, seatDepth ) );

	vec3 poleP = p;
	poleP += vec3( 0.0, 0.25, 0.0 );
	d = min( d, sdCappedCylinder( poleP, 0.03, 0.25 ) );
	return SDFResult( d, p, 0.0, vec4( 0.0 ) );

}

SDFResult seat( vec3 p  ) {

	vec3 seatP = p;
	seatP.x = abs( seatP.x );
	seatP += vec3( - 0.4, 0.2, 0.0 );
	float d = sdBox( seatP, vec3( 0.2, 0.06, seatDepth ) );

	vec3 semotareP = seatP;
	semotareP += vec3( -0.12, -0.27, 0.0 );
	d = min( d, sdBox( semotareP, vec3( 0.08, 0.20, seatDepth ) ) );

	vec3 ashiP = semotareP;
	ashiP += vec3( 0.0, 0.4, 0.0 );
	d = min( d, sdBox( ashiP, vec3( 0.25, 0.1, 0.35 ) ) );

	return SDFResult( d, p, 0.0, vec4( 0.0 ) );

}

SDFResult sdFloor( vec3 p ) {

	float seatDepth = 0.4;

	vec3 floorP = p;
	floorP.x = abs( floorP.x );
	floorP += vec3( 0.0, 0.45, 0.0 );
	float d = sdBox( floorP, vec3( 0.5, 0.05, seatDepth ) );

	return SDFResult( d, p, 0.0, vec4( 0.0 ) );

}

SDFResult D( vec3 p ) {

	vec3 pl = p;

	pl.xy -= offsetPos;
	pl.xy -= gridCenter;

	SDFResult distTable = table( pl );
	SDFResult result = distTable;

	SDFResult distSeat = seat( pl );
	if( distSeat.d < result.d ) result = distSeat;

  	SDFResult distFloor = sdFloor( pl );
	if( distFloor.d < result.d ) result = distFloor;

	SDFResult distLane = lane( pl );
	if( distLane.d < result.d ) result = distLane;

	SDFResult distJaguchi = jaguchi( pl );
	if( distJaguchi.d < result.d ) result = distJaguchi;

	return result;

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>

	// カメラ位置からワールド空間でレイを初期化
	#include <rm_ray_screen>

	SDFResult dist;
	bool hit = false;


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

	// マテリアルベースの色設定（色は後で実装するので白で設定）
	outColor = vec4( 1.0, 1.0, 1.0, 1.0 );
	outEmission = vec3( 0.0 );
	outRoughness = 0.7;
	outMetalic = 0.0;

	if( dist.mat == 0.0 ) {

		// 床
		outRoughness = 0.8;

	} else if( dist.mat == 4.0 ) {

		// 蛇口（メタリック）
		outRoughness = 0.1;
		outMetalic = 0.8;

	}

	#include <frag_out>

}
