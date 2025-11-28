#include <common>
#include <packing>
#include <frag_h>
#include <sdf>
#include <rm_h>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

const float seatDepth = 0.4;

// マテリアルID
const float MAT_FLOOR = 0.0;
const float MAT_WOOD = 1.0;
const float MAT_LANE = 2.0;
const float MAT_CONVEYOR = 3.0;
const float MAT_FAUCET = 4.0;
const float MAT_BLACK = 5.0;
const float MAT_WALL = 6.0;
const float MAT_NOREN = 7.0;

uniform float uTimeE;
uniform vec4 uState;

vec2 gridCenter = vec2( 0.0, 0.0 );
const vec2 gridSize = vec2( 1.0, 1.6 );
const vec2 offsetPos = vec2( gridSize / 2.0 ) + vec2( 0.0, 0.3);

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
	vec2 d = vec2( sdCappedCylinder( baseRotP, 0.01, 0.05 ), 0.0 );

	vec3 buttonP = baseP;
	buttonP += vec3( 0.0, 0.0, -0.05);
	buttonP.yz *= rotate( HPI );
	d = opAdd( d, vec2( sdCappedCylinder( buttonP, 0.013, 0.003 ), 1.0 ) );

	vec3 jaguchiP = baseP;
	jaguchiP += vec3( 0.0, -0.03, -0.025 );
	jaguchiP.yz *= rotate( 0.6 );
	d = opAdd( d, vec2( sdCappedCylinder( jaguchiP, 0.01, 0.035 ), 0.0 ) );

	vec3 jaguchi2P = baseP;
	jaguchi2P += vec3( 0.0, -0.059, -0.06 );
	jaguchi2P.yz *= rotate( HPI + 0.6 );
	jaguchi2P += vec3( 0.0, 0.0054, -0.01 );
	d = opAdd( d, vec2( sdCappedCylinder( jaguchi2P, 0.009, 0.015 ), 0.0 ) );

	return SDFResult( d.x, p, MAT_FAUCET, vec4( p, 0.0 ) );
}

SDFResult laneConveyor( vec3 p ) {

	vec3 laneConveyorP = p;
	laneConveyorP += vec3( 0.0, 0.0, 0.0 );
	laneConveyorP.x = mod( laneConveyorP.x + uTimeE * 0.2, 0.1 ) - 0.05;
	float d = sdBox( laneConveyorP, vec3( 0.045, 0.01, 0.06 ) );

	return SDFResult( d, p, MAT_CONVEYOR, vec4( p, 0.0 ) );
}

SDFResult lane( vec3 p ) {

	vec3 laneP = p;
	laneP += vec3( 0.0, 0.05, 0.5 );
	vec2 d = vec2( sdBox( laneP, vec3( 0.5, 0.2, 0.1) ), MAT_WOOD );
	d = opAdd( d, vec2( laneConveyor( laneP + vec3( 0.0, -0.2, -0.015 ) ).d, MAT_CONVEYOR ) );

	vec3 topLaneP = laneP;
	topLaneP += vec3( 0.0, -0.45, 0.0  );
	d = opAdd( d, vec2( sdBox( topLaneP, vec3( 0.5, 0.013, 0.1) ), MAT_WOOD ) );

	vec3 laneWallP = topLaneP;
	laneWallP += vec3( 0.0, 0.0, 0.1 );
	d = opAdd( d, vec2( sdBox( laneWallP, vec3( 0.5, 2.0, 0.03) ), MAT_WALL ) );

	vec3 shikiriP = laneWallP;
	shikiriP.x = abs( shikiriP.x );
	shikiriP += vec3( -0.5, 0.0, -0.01 );
	d = opAdd( d, vec2( sdBox( shikiriP, vec3( 0.03, 2.0, 0.03) ), MAT_WOOD ) );

	return SDFResult( d.x, p, d.y, vec4( laneP, 0.0 ) );

}

SDFResult table( vec3 p  ) {

	vec2 d = vec2( sdBox( p, vec3( 0.2, 0.02, seatDepth ) ), MAT_WOOD );

	vec3 poleP = p;
	poleP += vec3( 0.0, 0.25, 0.0 );
	d = opAdd( d, vec2( sdCappedCylinder( poleP, 0.03, 0.25 ), MAT_BLACK ) );
	return SDFResult( d.x, p, d.y, vec4( p, 0.0 ) );

}

SDFResult seat( vec3 p  ) {

	vec3 seatP = p;
	seatP.x = abs( seatP.x );
	seatP += vec3( - 0.4, 0.2, 0.0 );
	vec2 d = vec2( sdBox( seatP, vec3( 0.2, 0.06, seatDepth ) ), MAT_WOOD );

	vec3 semotareP = seatP;
	semotareP += vec3( -0.12, -0.26, 0.0 );
	d = opAdd( d, vec2( sdBox( semotareP, vec3( 0.08, 0.20, seatDepth ) ), MAT_WOOD ) );

	vec3 kushonP = seatP;
	kushonP -= vec3( 0.02, 0.27, 0.0 );
	d = opAdd( d, vec2( sdBox( kushonP, vec3( 0.007, 0.15, seatDepth * 0.93 ) ) - 0.02, MAT_BLACK ) );

	vec3 kushon2P = seatP;
	kushon2P -= vec3( -0.08, 0.08, 0.0 );
	d = opAdd( d, vec2( sdBox( kushon2P, vec3( 0.1, 0.007, seatDepth * 0.93 ) ) - 0.02, MAT_BLACK ) );

	vec3 ashiP = semotareP;
	ashiP += vec3( 0.0, 0.4, 0.0 );
	d = opAdd( d, vec2( sdBox( ashiP, vec3( 0.25, 0.1, 0.35 ) ), MAT_WOOD ) );

	return SDFResult( d.x, p, d.y, vec4( p, 0.0 ) );

}

SDFResult sdFloor( vec3 p ) {

	float seatDepth = 0.4;

	vec3 floorP = p;
	floorP.x = abs( floorP.x );
	floorP += vec3( 0.0, 0.45, 0.0 );
	float d = sdBox( floorP, vec3( 0.5, 0.05, seatDepth ) );

	return SDFResult( d, p, MAT_FLOOR, vec4( p, 0.0 ) );

}

SDFResult noren( vec3 p ) {

	float norenWidth = 0.045;
	float norenLoop = norenWidth * 2.5;
	float size = step( 0.45, abs( p.x ) );

	vec3 norenP = p;
	
	norenP += vec3( 0.0, -0.8, 0.55 );
	norenP.x = mod( norenP.x, norenLoop ) - norenLoop * 0.5;
	float d = sdBox( norenP, vec3( norenWidth, 0.15, 0.005 ) );

	return SDFResult( d, p, MAT_WOOD, vec4( p, 0.0 ) );

}

SDFResult D( vec3 p ) {

	p.z += pow( p.x, 2.0 ) * 0.03;

	vec3 pl = p;
	pl.xy -= offsetPos;
	pl.xy -= gridCenter;
	pl.y += 0.3;
	

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

	SDFResult distNoren = noren( pl );
	if( distNoren.d < result.d ) result = distNoren;

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

	// 汎用ノイズ（細かさ違い3種）
	vec3 matP = dist.matparam.xyz;
	vec4 noise = vec4(
		fbm( rayPos * 2.0 ),   // 粗い
		fbm( rayPos * 8.0 ),   // 中間
		fbm( rayPos * 32.0 ),   // 細かい
		fbm( rayPos * 64.0 )   // さらに細かい
	);

	// マテリアルIDごとに色とプロパティを設定
	outEmission = vec3( 0.0 );
	outRoughness = 0.7;
	outMetalic = 0.0;

	if( dist.mat == MAT_FLOOR ) {

		// 床（タイル風の明るいグレー）
		outColor.xyz = vec3( 0.85, 0.85, 0.88 );
		outRoughness = 0.4;

	} else if( dist.mat == MAT_WOOD ) {

		// テーブル・椅子（木目）
		float mokume = fract( length( matP * vec3( 0.5, 1.0, 1.0 ) + vec3( -0.1, 0.4, 0.1 ) ) * 45.0 + noise.x * 20.0 );
		vec3 baseCol = vec3( 0.8, 0.55, 0.25 );
		outColor.xyz = mix( baseCol, baseCol * 0.95, mokume );
		outNormal = normalize( outNormal + mokume * 0.0 );
		outRoughness = 0.2 + mokume * 0.1;

	} else if( dist.mat == MAT_LANE ) {

		// レーン（プラスチック風の白）
		outColor.xyz = vec3( 0.95, 0.95, 0.95 );
		outRoughness = 0.3;

	} else if( dist.mat == MAT_CONVEYOR ) {

		// コンベア（ゴム風の濃いグレー）
		outColor.xyz = vec3( 1.0, 0.95, 0.85 );
		outRoughness = 0.8;

	} else if( dist.mat == MAT_FAUCET ) {

		// 蛇口（ステンレス風のメタリック）
		outColor.xyz = vec3( 0.8, 0.8, 0.82 );
		outRoughness = 0.15;
		outMetalic = 0.85;

	} else if( dist.mat == MAT_BLACK ) {

		// クッション
		float gara = fract( noise.w * 20.0 );
		outColor.xyz = vec3( 0.3, 0.3, 0.3 ) * noise.x + gara * 0.01;
		outRoughness = 0.3 + gara * 0.3;
		outNormal = normalize( outNormal + vec3(  gara  ) * 0.05 );

	} else if( dist.mat == MAT_WALL ) {

		// 壁（白ベース）
		float gara = fract( noise.x * 40.0 ) * noise.z;
		outColor.xyz = vec3( 0.95, 0.90, 0.8 );
		outColor.xyz *= 0.95 + gara * 0.1;
		outRoughness = 0.1+ gara;

	} else if( dist.mat == MAT_NOREN ) {

		// 暖簾（青い布）
		float gara = noise.z * 0.1;
		outColor.xyz = vec3( 0.25, 0.35, 0.5 ) + gara;
		outRoughness = 0.8 + noise.w * 0.2;
		outNormal = normalize( outNormal + vec3( noise.y, noise.z, 0.0 ) * 0.1 );

	}

	float partyLen = length( rayPos ) * 15.0;

	vec3 emission = vec3( 0.0 );
	emission.x = sin( partyLen - uTimeE * 10.0 );
	emission.y = sin( partyLen - uTimeE * 20.0 - 0.5 );
	emission.z = sin( partyLen - uTimeE * 30.0 - 1.0);
	emission = smoothstep( 0.9, 1.0, emission );
	emission *= 10.0 * uState.y;

	outEmission = emission;

	#include <frag_out>

}
