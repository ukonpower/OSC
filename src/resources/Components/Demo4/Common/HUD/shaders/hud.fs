#include <common>
#include <packing>
#include <frag_h>
#include <rotate>

// uTime is available from <common>
uniform float uTimeE;

void main( void ) {

	#include <frag_in>

	float aspectRatio = uResolution.x / uResolution.y;

	// 六角形グリッド (魚のウロコ柄)
	// 参考: https://www.shadertoy.com/view/4dKXz3

	vec2 cuv = vUv - 0.5;

	// アスペクト比補正と回転
	vec2 baseUv = cuv;
	baseUv.y /= aspectRatio;
	baseUv.y = abs(baseUv.y);
	baseUv.x = abs(baseUv.x);
	baseUv.xy *= rotate( HPI * 1.0 * 0.8);

	// 時間によるスクロール効果
	vec2 uv = baseUv;
	uv.y += uTimeE * 0.01 * sign( cuv.y );

	// 六角形座標系でのパターン計算
	uv = uv * 18.0 * 1.73 / 2.0; // スケール調整
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

	// グリッドパターンの表示
	float w = 0.0;
	float dist = length(C - uv);
	
	w = sin(dist * PI * 10.0 - sin( uTimeE * 0.3 + length( C.x ) * 2.0 ) * 10.0);
	// w *= smoothstep( 2.3, 4.0, C.x );
	w *= smoothstep( 3.6 , 8.0, C.x ) * 0.5;

	outColor.xyz = vec3( 1.0 );
	outColor.w = w;
	
	#include <frag_out>

}