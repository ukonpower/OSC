#include <common>
#include <packing>
#include <frag_h>
#include <sdf>

#include <rm_h>

// SDF（Signed Distance Function）
SDFResult D( vec3 p ) {

    p = mod( p, 10.0 ) - 5.0;

	// とりあえずシンプルな球体
	float d = length( p ) - 1.0;

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

	// 赤い色を設定
	outColor = vec4( 1.0, 0.0, 0.0, 1.0 );
	outEmission = vec3( 0.0 );
	outRoughness = 0.5;

	#include <frag_out>

}
