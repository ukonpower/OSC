#include <common>
#include <frag_h>
#include <rm_h>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

uniform float uTime;

// SDF関数 - タコの触手を描画
SDFResult D( vec3 p ) {

	// ノイズによる形状の変化
	p.xz *= 1.0 + noiseValue( vec3( p.y * 1.5 ) ) * 0.15;

	vec3 n1 = noiseCyc( p * 0.6 );

	float radius = 1.0 + 1.0 / linearstep( 2.3, -2.3, p.y );

	p.xz *= radius;
	p.y *= 1.0 + pow(radius, 2.0 ) * 0.1;
	
	float d = sdInfinityCylinder( p, vec3( 0.0, 0.0, (0.55 + n1 * 0.1)  ) );

	// 吸盤の作成
	vec3 suckerP = p;
	suckerP.z -= 0.4;
	suckerP.x = abs( suckerP.x ) - 0.25;
	suckerP.y = mod( suckerP.y, 0.5 ) - 0.25;
	suckerP.xz *= rotate( -0.1 );
	suckerP.yz *= rotate( HPI );
	d = opSmoothAdd( d, sdRoundedCylinder( suckerP, 0.11, 0.04, 0.12 + length( suckerP.xz )* 0.2 ), 0.2 );

	// 吸盤のディテール
	d = opSmoothSub( sdSphere( suckerP - vec3( 0.0, 0.2, 0.0 ), 0.05 ), d, 0.05 );
	d = opSmoothAdd( sdSphere( suckerP - vec3( 0.0, 0.13, 0.0 ), 0.06 ), d, 0.02 );

	d /= radius;

	return SDFResult(
		d,
		p.xyz,
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

	// レイマーチング
	for( int i = 0; i < 32; i++ ) {

		dist = D( rayPos );
		rayPos += dist.d * rayDir * 0.7;

		if( dist.d < 0.001 ) {

			hit = true;
			break;

		}

	}

	if( !hit ) discard;

	// マテリアル設定
	outRoughness = 0.02;
	outMetalic = 0.0;

	vec3 uvPos = dist.pos;
	uvPos.xy *= rotate( HPI / 2.0 );
	uvPos.yz *= rotate( HPI / 2.0);

	vec3 marchPos = dist.pos;

	// カラー設定 - ノイズによる模様と境界のスムージング
	outColor.xyz = mix( vec3( 0.4 + noiseCyc( marchPos + 0.5 ).x * 0.5 ), vec3( 1.0 ), smoothstep( 0.55, 0.59, marchPos.z ) );

	outNormal = N( rayPos, 0.01 );

	#include <rm_out_obj>
	#include <frag_out>

}
