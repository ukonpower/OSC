#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

#include <rm_h>

uniform mat4 uModelViewMatrix;

uniform float uTime;
uniform float uTimeE;
uniform sampler2D uNoiseTex;

// たいやき形状を表現するSDF関数
SDFResult D( vec3 p ) {

	vec3 pp = p;

	pp.yz *= rotate( PI / 2.0 );
	pp.xy *= rotate( PI / 2.0 );

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
	float k = 0.75 + 0.25;
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
	hireTosakaP.xz += vec2( -0.010, 0.22 );
	hireTosakaP.xz *= rotate( 0.25 );
	float hireTosaka = sdRoundBox( hireTosakaP, vec3( 0.15, 0.035 + sin( hireTosakaP.x * 200.0) * 0.002, 0.07 ), 0.03 );
	d = opSmoothAdd( d, hireTosaka, 0.015 );

	// バックヒレ
	vec3 hireBackP = pp;
	hireBackP.xz += vec2( -0.1, -0.19 );
	hireBackP.xz *= rotate( -0.5 );
	float hireBack = sdRoundBox( hireBackP, vec3( 0.1, 0.035 + sin( hireBackP.x * 200.0) * 0.002, 0.05 ), 0.03 );
	d = opSmoothAdd( d, hireBack, 0.02 );

	// ヒレサイド
	vec3 hireSideP = pp;
	hireSideP.xz += vec2( 0.11, -0.12 );
	hireSideP.z *= 1.0 - hireSideP.x * 3.0;
	float hireSideHeight = 0.073 + hireSideP.x * 0.1 + sin( hireSideP.z * 200.0 ) * 0.002;
	float hireSide = sdRoundBox( hireSideP, vec3( 0.1, hireSideHeight, 0.06 ), 0.01 );
	d = opSmoothAdd( d, hireSide, 0.003 );

	return SDFResult(
		d,
		p,
		0.0,
		vec4( pp, 0.0 )
	);

}

#include <subsurface>
#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>

	SDFResult dist;

	bool hit = false;

	#include <rm_loop,128,0.001,1.0>

	if( !hit ) discard;

	outNormal = N( rayPos, 0.002 );

	#include <rm_out_obj>

	// ノイズテクスチャを取得
	vec2 noiseUV = dist.matparam.xz * 1.0 + 0.5;
	vec4 n1 = texture(uNoiseTex, noiseUV);
	vec4 n2 = texture(uNoiseTex, noiseUV * 4.0);
	vec4 n3 = texture(uNoiseTex, noiseUV * 8.0);

	// subsurface scatteringを計算
	float sss = subsurface( rayPos, normalize( (vec4( 0.0, 1.0, 0.0, 0.0 ) * uModelViewMatrix).xyz ), 0.1);

	// たいやきの焼き色
	vec3 baseColor = vec3( 0.9, 0.55, 0.2 );

	// ノイズで焼き色のバリエーションを追加
	outColor.xyz = mix( baseColor.xyz, vec3( 1.0, 0.2, 0.0 ), n1.r * 0.2 + n2.r * 0.1 );
	outColor.xyz = mix( outColor.xyz, vec3( 0.6, 0.2, 0.0 ), smoothstep( 0.1, 0.01, abs( dist.matparam.y ) ) * 0.5 );

	// ノイズでroughnessを調整（焼きムラを表現）
	outRoughness = 0.1 + n1.r * 0.3 + n2.r * 0.2;

	// ノイズでノーマルを微調整（表面の質感）
	outNormal = normalize(outNormal + n3.xyz * 0.3);

	#include <frag_out>

}
