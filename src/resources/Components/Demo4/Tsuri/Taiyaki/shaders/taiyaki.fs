#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

#include <rm_h>

uniform float uTime;
uniform float uTimeE;

// たいやき形状を表現するSDF関数
SDFResult D( vec3 p ) {

	vec3 pp = p;

	// 六角形座標系でのパターン計算（魚のウロコ柄）
	// 参考: https://www.shadertoy.com/view/4dKXz3
	vec2 uv = pp.xz * 15.0 * 1.73 / 2.0; // スケール調整
	uv.x *= -1.0;
	vec2 U = uv * mat2(1, -1.0/1.73, 0, 2.0/1.73); // 六角形座標への変換
	vec3 g = vec3(U, 1.0 - U.x - U.y); // 六角形座標
	vec3 id = floor(g); // セルID

	g = fract(g); // ダイアモンド座標
	if (length(g) > 1.0) g = 1.0 - g; // 重心座標

	U = id.xy * mat2(1, 0.5, 0, 1.73/2.0);

	// 各ノードへのスクリーン空間距離
	float l00 = length(U - uv);
	float l10 = length(U + vec2(1, 0) - uv);
	float l01 = length(U + vec2(0.5, 1.73/2.0) - uv);
	float l11 = length(U + vec2(1.5, 1.73/2.0) - uv);
	float l20 = length(U + vec2(2, 0) - uv);

	// 魚のウロコ模様を作成
	float k = 0.75 + 0.25 * sin(uTime);
	id += l20 < k ? vec3(2, 0, 0) : l11 < k ? vec3(1, 1, 0) : l10 < k ? vec3(1, 0, 0) : l01 < k ? vec3(0, 1, 0) : vec3(0);
	vec2 C = id.xy * mat2(1, 0.5, 0, 1.73/2.0); // 最近傍ノードの中心

	vec2 tileUv = uv - C;
	vec3 bodyP = pp;
	bodyP.x += 0.08;
	bodyP.x *= 0.7;
	float bodyPos = smoothstep( 0.3, -0.4, bodyP.x );
	float bodyHeightMap = 0.0;
	bodyHeightMap = -tileUv.x * 1.5;
	bodyHeightMap *= smoothstep( 0.195, 0.2, length( bodyP.xz * vec2( 1.0, 0.7 ) + vec2( 0.27, 0.05 ) ) ); 
	
	float d = sdRoundedCylinder( bodyP, 0.12, 0.04 + bodyHeightMap * 0.012, 0.01 );


	vec3 shippoP = pp;
	shippoP.xz *= rotate( -0.2 );
	shippoP.xz += vec2( -0.3, 0.01 );
	shippoP.z *= 1.0 - shippoP.x * 2.0;
	shippoP.x += abs( sin( shippoP.z * 37.0 ) ) * 0.02;
	shippoP.x += cos( shippoP.z * 10.0 ) * 0.05;
	float shippoHeightMap = 0.0;
	shippoHeightMap += sin( shippoP.z * 180.0 );
	shippoP.y -= shippoHeightMap * 0.002;
	d = opSmoothAdd( d,sdRoundBox( shippoP, vec3( 0.15,0.05,0.16), 0.03 ), 0.05 );

	// 目
	vec3 eyeP = pp;
	eyeP.xz += vec2( 0.3, 0.07 );
	float eye = sdRoundedCylinder( eyeP, 0.015, 0.02, 0.045 );
	d = opSmoothAdd( d, eye, 0.01 );

	vec3 eyeRoundP = eyeP;
	float eyeRoundHeight = 0.04 * smoothstep( -0.08, 0.05, length( eyeP.xz ) );
	float eyeRound = sdRoundedCylinder( eyeRoundP, 0.025, 0.02, eyeRoundHeight );
	d = opSmoothAdd( d, eyeRound, 0.003 );

	// 口
	vec3 mouthP = pp;
	mouthP.xz += vec2( 0.39, 0.0 );
	mouthP.xz *= rotate( 0.25 );
	mouthP.z = abs( mouthP.z );
	mouthP.z -= 0.01;
	mouthP.xz *= rotate( -0.25 );
	float mouth = sdRoundBox( mouthP, vec3( 0.05, 0.06, 0.015 ), 0.015 );
	d = opSmoothAdd( d, mouth, 0.005 );

	// 頭のヒレ(トサカ)
	vec3 hireTosakaP = pp;
	hireTosakaP.xz += vec2( -0.02, 0.25 );
	hireTosakaP.xz *= rotate( 0.25 );
	float hireTosaka = sdRoundBox( hireTosakaP, vec3( 0.15, 0.035, 0.05 ), 0.03 );
	d = opSmoothAdd( d, hireTosaka, 0.02 );

	// バックヒレ
	vec3 hireBackP = pp;
	hireBackP.xz += vec2( -0.1, -0.19 );
	hireBackP.xz *= rotate( -0.5 );
	float hireBack = sdRoundBox( hireBackP, vec3( 0.1, 0.035, 0.05 ), 0.03 );
	d = opSmoothAdd( d, hireBack, 0.02 );

	// バックヒレ
	vec3 hireSideP = pp;
	hireSideP.xz += vec2( 0.11, -0.12 );
	hireSideP.z *= 1.0 - hireSideP.x * 3.0;
	float height = 0.073 + hireSideP.x * 0.1 + sin( hireSideP.z * 200.0 ) * 0.002;
	float hireSide = sdRoundBox( hireSideP, vec3( 0.1, height, 0.06 ), 0.01 );
	d = opSmoothAdd( d, hireSide, 0.003 );

	return SDFResult(
		d,
		p,
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

	for( int i = 0; i < 128; i++ ) {

		dist = D( rayPos );
		rayPos += dist.d * rayDir * 1.0;

		if( dist.d < 0.001 ) {

			hit = true;
			break;

		}

	}

	if( !hit ) discard;

	outNormal = N( rayPos, 0.002 );

	#include <rm_out_obj>

	// たいやきの焼き色
	outColor.xyz = vec3( 0.9, 0.6, 0.3 );
	outRoughness = 0.6;

	// 距離に応じた減衰
	outColor.xyz *= smoothstep( 1.5, 0.4, length( rayPos ) );

	#include <frag_out>

}
