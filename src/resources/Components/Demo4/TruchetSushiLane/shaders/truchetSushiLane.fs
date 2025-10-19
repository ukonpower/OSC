#include <common>
#include <packing>
#include <frag_h>
#include <sdf>
#include <hash>
#include <rm_h>

// float d1( vec3 d ) {

// 	return 0.0;

// }

// float d2( vec3 d ) {

// 	return 0.0;
	
// }

// float d3( vec3 d ) {

// 	return 0.0;
	
// }

// SDF（Signed Distance Function）
SDFResult D( vec3 p ) {

	vec2 gridCenter = floor( p.xz ) + 0.5;
    p.xz = mod( p.xz, 1.0 ) - 0.5;

	// TruchetTiling
	// thanks to renard
	// https://renard.hateblo.jp/entry/2023/08/11/230202
	// https://gist.github.com/Forenard/eb96f682c46aeb3b10cacd6812f29ba0


	vec2[4] quv;
	vec2[4] dir = vec2[4](
		vec2( 0.0, 1.0 ),
		vec2( 1.0, 0.0 ),
		vec2( 0.0, -1.0 ),
		vec2( -1.0, 0.0 )
	);

	int qCount = 0;

	for( int i = 0; i < 4; i++ ) {

		if( hash12( gridCenter + dir[i] * 0.5 ) < 0.5 ) {

			quv[qCount++] = dir[i];
			
		}
		
	}

	float s = 0.0;

	if( qCount == 0 ) {

		s = 0.1;

	}

	if( qCount == 1 ) {

		s = 0.2;
		
	}

	if( qCount == 2 ) {

		s = 0.3;
		
	}

	if( qCount == 3 ) {
		
		s = 0.4;

	}

	if( qCount == 4 ) {

		s = 0.5;
		
	}

	// とりあえずシンプルな球体
	float d = length( p ) - s;

	return SDFResult(
		d,
		p,
		0.0
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

	// 赤い色を設定
	outColor = vec4( 1.0, 0.0, 0.0, 1.0 );
	outEmission = vec3( 0.0 );
	outRoughness = 0.5;

	#include <frag_out>

}
