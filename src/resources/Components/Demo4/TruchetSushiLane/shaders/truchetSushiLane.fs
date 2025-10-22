#include <common>
#include <packing>
#include <frag_h>
#include <sdf>
#include <hash>
#include <rm_h>
#include <rotate>

float sdOrientedBox( in vec2 p, in vec2 a, in vec2 b, float th )
{
    float l = length(b-a);
    vec2  d = (b-a)/l;
    vec2  q = (p-(a+b)*0.5);
          q = mat2(d.x,-d.y,d.y,d.x)*q;
          q = abs(q)-vec2(l,th)*0.5;
    return length(max(q,0.0)) + min(max(q.x,q.y),0.0);    
}

vec2 gridCenter;
float gridSize = 5.0;
float strokeWidth = 0.35;
float laneHeight = 0.1;

float ring( vec2 center ) {
	return sdRing( center, vec2( -1.0, 0.0 ), 0.5, strokeWidth );
}

float p1( vec3 p, vec2 dir1 ) {

	float d = sdOrientedBox( p.xz, vec2( 0.0 ), dir1, strokeWidth );
	d = min( d, length( p.xz ) - strokeWidth / 2.0 );

	return d;

}

float p2( vec3 p, vec2 dir1, vec2 dir2 ) {

	if( dot( dir1, dir2 ) < 0.0 ) {

		return sdOrientedBox( p.xz, dir1, dir2, strokeWidth );

	}

	return ring( p.xz - ( dir1 + dir2 ) * 0.5 );

}

float p3( vec3 p, vec2 dir1, vec2 dir2, vec2 dir3 ) {

	vec2 line1 = dir1;
	vec2 line2 = dir2;
	vec2 aloneDir = dir3;

	if( dot( line1, line2 ) > -0.5  ) {

		line2 = dir3;
		aloneDir = dir2;

	}

	if( dot( line1, line2 ) > -0.5 ) {

		line1 = dir2;
		line2 = dir3;
		aloneDir = dir1;

	} 

	float d = sdOrientedBox( p.xz, line1, line2, strokeWidth);
	d = min( d, length( p.xz - aloneDir * 0.5 ) - strokeWidth / 2.0 );

	vec2 dirAmari = mix( line1, line2, step( hash12( gridCenter ), 0.5 ) );

	d = min( d, ring( p.xz - ( aloneDir + dirAmari ) * 0.5 ) );

	return d;
	
}

float p4( vec3 p, vec2 dir1, vec2 dir2, vec2 dir3, vec2 dir4 ) {

	p.xz *= rotate( HPI * step(hash12( gridCenter ), 0.5) );
	float d = ring( p.xz - 0.5 );
	d = min( d, ring( p.xz + 0.5 ) );
	return d;

}


// https://kinakomoti321.hatenablog.com/entry/2024/12/10/023309
float gridTraversal( vec2 ro, vec2 rd) {

   gridCenter = (floor( ( ro + rd * 1E-3 ) / gridSize) + 0.5)*gridSize;
   vec2 src = -( ro - gridCenter ) / rd;
   vec2 dst = abs( 0.5 * gridSize / rd );
   vec2 bv = src + dst;

   return  min( bv.x, bv.y );
} 

vec2 tci(vec2 uv)
{
  return round(uv*2.)*.5;
}

// SDF（Signed Distance Function）
SDFResult D( vec3 p ) {

	vec3 op = p;
	op.y = mod( op.y, 20.0 ) - 10.0;
	p.xz -= gridCenter;


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

		vec2 id = tci(gridCenter + dir[i] * 0.5 * gridSize);

		if( hash12( id  ) < 0.8 ) {

			quv[qCount++] = dir[i];

		}

	}

	float s = 0.0;

	float dist2D;

	dist2D = gridSize / 3.0;

	if( qCount == 1 ) {

		dist2D = min( dist2D, p1( p / gridSize, quv[0] ) );

	}

	if( qCount == 2 ) {

		dist2D = min( dist2D, p2( p / gridSize, quv[0], quv[1] ) );

	}

	if( qCount == 3 ) {

		dist2D = min( dist2D, p3( p / gridSize, quv[0], quv[1], quv[2] ) );

	}

	if( qCount == 4 ) {

		dist2D = min( dist2D, p4( p / gridSize, quv[0], quv[1], quv[2], quv[3] ) );

	}

    vec2 w = vec2( dist2D, abs(op.y) - laneHeight );
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
	float t = 0.0;

	// 通常のレイマーチング
	for( int i = 0; i < 128; i++ ) {

		dist = D( rayPos );

		if( dist.d < 0.001 ) {
			hit = true;
			break;
		}

        float limitD = gridTraversal(rayPos.xz, rayDir.xz);
		float d = min( dist.d, limitD );
		t += d;
		rayPos += rayDir * d;

	}

	if( !hit ) discard;

	// 法線を計算
	outNormal = N( rayPos, 0.01 );

	// オブジェクト空間からワールド空間への変換、位置・法線・深度を出力
	#include <rm_out_obj>

	// 赤い色を設定
	outColor = vec4( vec3( 0.9 ), 1.0 );
	outEmission = vec3( 0.0 );
	outRoughness = 0.1;

	#include <frag_out>

}
