#include <common>
#include <packing>
#include <frag_h>
#include <sdf>
#include <rm_h>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>
#include <random>

uniform mat4 uModelViewMatrix;

uniform vec4 uState;
uniform vec4 uPrevState;

uniform float uTime;
uniform float uTimeE;

// SDF関数 - TakoAshiを参考にしたゲート形状
SDFResult D( vec3 p ) {

	float close = uState.x;
	float open = 1.0 - uState.x;

	// ランダムな補間位置を計算（位置ベース）
	float randSeed = random( gl_FragCoord.xy / 1000.0 );

	// uPrevStateとuStateの間をランダムに補間
	float b = mix( uState.y, uPrevState.y, randSeed * 1.0 );

	float phase1 = min( b, 1.0 );
	float phase2 = clamp( b - 1.0, 0.0, 1.0 );
	float phase3 = clamp( b - 2.0, 0.0, 1.0 );
	float phase4 = clamp( b - 3.0, 0.0, 1.0 );

	for( int i = 0; i < 4; i++ ) {

		if( phase2 > 0.2 ) {

			p.x = abs( p.x );

		}

		p.x -= phase2 * 0.5;
		p.yz *= rotate( phase2 * PI / 1.0 );
		p.xz *= rotate( -phase2 * PI / 4.0 + phase4 * 0.4  );

		
		p.z -= phase3 * 0.5;
		p.yz *= rotate( phase3 * PI / 1.0 );

	}

	p.xy *= rotate( open * 1.0 * -length( p.yx ) * 0.4 * ( 1.0 - phase1 ) + uTime * 0.2 );
	
	p.xy = pmod( p.xy, 1.0 + phase1 * 7.0 );
	
	p.y += close * 5.0 + sin( uTime * 1.0 + p.y * 0.5 ) * 0.05;

	float wave = linearstep( 0.4, 1.0, open );

	p.xz *= rotate( sin( p.y * 2.0 - uTime * 2.0 - 1.0 ) * 0.5 * smoothstep( 0.3, 1.0, p.y )  * wave );
	p.z += sin( p.y + uTime ) * 0.3 * wave - p.y * 0.2;


	// ノイズによる形状の変化
	p.xz *= 1.0 + noiseValue( vec3( p.y * 1.5 ) ) * 0.15;

	vec3 n1 = noiseCyc( p * 0.6 );

	float radius = 1.0 + 1.0 / (linearstep( 2.3, -2.3, p.y ) + 0.01);

	p.xz *= radius;

	float r = (0.55 + n1.x * 0.1) * 0.5;
	float d = sdRoundedCylinder( p, r, r, 10.0 );

	p.y *= 1.0 + pow(radius, 1.0 ) * 0.3;

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

#include <subsurface>
#include <rm_normal>

void main( void ) {

	#include <frag_in>

	// カメラ位置からワールド空間でレイを初期化
	#include <rm_ray_screen>

	SDFResult dist;
	bool hit = false;

	// レイマーチング
	for( int i = 0; i < 64; i++ ) {

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

	outNormal = N( rayPos, 0.01 );

	vec3 marchPos = dist.pos;
	
	// カラー設定 - ノイズによる模様と境界のスムージング
	float noiseValue = noiseCyc( marchPos + 0.5 ).x;
	vec3 redColor = vec3( 0.6, 0.2, 0.2 ) * ( 0.4 + noiseValue * 0.5 ) * 0.5;
	vec3 whiteColor = vec3( 1.0 );
	float redMask = smoothstep( 0.59, 0.55, marchPos.z );
	outColor.xyz = mix( whiteColor, redColor, redMask );

	
	// subsurface scatteringを計算 - 赤い部分のみに適用
	float sss = subsurface( rayPos, normalize( (vec4( normalize( -rayPos.xyz), 0.0 )).xyz ), 0.5 ) * (1.0 + uState.z * 5.0);
	outEmission += outColor.xyz * 1.0 * redMask;
	outEmission.xyz += sss * (outColor.xyz + vec3( 0.5, 0.1, 0.0 )) * ( redMask );

	// オブジェクト空間からワールド空間への変換、位置・法線・深度を出力
	#include <rm_out_obj>



	#include <frag_out>

}
