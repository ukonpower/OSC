#include <common>
#include <packing>
#include <frag_h>
#include <sdf>
#include <hash>
#include <rm_h>

float sdOrientedBox( in vec2 p, in vec2 a, in vec2 b, float th )
{
    float l = length(b-a);
    vec2  d = (b-a)/l;
    vec2  q = (p-(a+b)*0.5);
          q = mat2(d.x,-d.y,d.y,d.x)*q;
          q = abs(q)-vec2(l,th)*0.5;
    return length(max(q,0.0)) + min(max(q.x,q.y),0.0);    
}

float strokeWidth = 0.1;

float p1( vec3 p, vec2 dir1 ) {

	float d = sdOrientedBox( p.xz, vec2( 0.0 ), dir1, strokeWidth );
	return d;

}

float p2( vec3 p, vec2 dir1, vec2 dir2 ) {

	float d = sdOrientedBox( p.xz, vec2( 0.0 ), dir1, strokeWidth );
	d = min( d, sdOrientedBox( p.xz, vec2( 0.0 ), dir2, strokeWidth ) );
	return d;
	
}

float p3( vec3 p, vec2 dir1, vec2 dir2, vec2 dir3 ) {

	float d = sdOrientedBox( p.xz, vec2( 0.0 ), dir1, strokeWidth );
	d = min( d, sdOrientedBox( p.xz, vec2( 0.0 ), dir2, strokeWidth ) );
	d = min( d, sdOrientedBox( p.xz, vec2( 0.0 ), dir3, strokeWidth ) );

	return d;
	
}

float gridSize = 9.0;

// SDF（Signed Distance Function）
SDFResult D( vec3 p ) {

	vec3 op = p;

	vec2 gridCenter = floor( p.xz / gridSize ) * gridSize + gridSize * 0.5;
    p.xz = mod( p.xz, gridSize ) - gridSize * 0.5;

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

	float dist2D = 9999.0;

	if( qCount == 0 ) {

	}

	if( qCount == 1 ) {

		dist2D = p1( p / gridSize, quv[0] );

	}

	if( qCount == 2 ) {

		dist2D = p2( p / gridSize, quv[0], quv[1] );
		
	}

	if( qCount == 3 ) {
		
		dist2D = p3( p / gridSize, quv[0], quv[1], quv[2] );

	}

	if( qCount == 4 ) {

		dist2D = p3( p / gridSize, quv[1], quv[2], quv[3] );
		
	}

	// とりあえずシンプルな球体
	// float d = length( p ) - s;

	float h = 0.01;
    vec2 w = vec2( dist2D, abs(op.y) - h );
    float d =  min(max(w.x,w.y),0.0) + length(max(w,0.0));

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
