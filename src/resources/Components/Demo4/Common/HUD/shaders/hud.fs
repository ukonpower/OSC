#include <common>
#include <packing>
#include <frag_h>
#include <rotate>

// uTime is available from <common>
uniform float uTimeE;

void main( void ) {

	#include <frag_in>

	// 六角形グリッド (魚のウロコ柄) - 参考: https://www.shadertoy.com/view/4dKXz3
	const float SQRT3 = 1.73;
	const mat2 hexToCartesian = mat2(1, 0.5, 0, SQRT3/2.0);

	vec2 cuv = vUv - 0.5;

	// アスペクト比補正、abs、回転を一度に適用
	vec2 uv = abs(cuv);
	uv.y /= uResolution.x / uResolution.y;
	uv *= rotate(HPI * 0.8);
	uv.y += uTimeE * 0.01 * sign(cuv.y); // スクロール

	// 六角形座標系への変換
	uv *= 18.0 * SQRT3 / 2.0;
	vec2 U = uv * mat2(1, -1.0/SQRT3, 0, 2.0/SQRT3);
	vec3 g = fract(vec3(U, 1.0 - U.x - U.y));
	vec3 id = floor(vec3(U, 1.0 - U.x - U.y));

	if (length(g) > 1.0) g = 1.0 - g; // 重心座標

	U = id.xy * hexToCartesian;

	// 最近傍ノード探索（使用する距離のみ計算）
	float l10 = length(U + vec2(1, 0) - uv);
	float l01 = length(U + vec2(0.5, SQRT3/2.0) - uv);
	float l11 = length(U + vec2(1.5, SQRT3/2.0) - uv);
	float l20 = length(U + vec2(2, 0) - uv);

	// ウロコ模様のセル選択
	id += l20 < 1.0 ? vec3(2, 0, 0) : l11 < 1.0 ? vec3(1, 1, 0) : l10 < 1.0 ? vec3(1, 0, 0) : l01 < 1.0 ? vec3(0, 1, 0) : vec3(0);
	vec2 C = id.xy * hexToCartesian;

	// グリッドパターン
	float dist = length(C - uv);
	float w = sin(dist * PI * 10.0 - sin(uTimeE * 0.3 + length(C.x) * 2.0) * 10.0);
	w *= smoothstep(3.6, 8.0, C.x) * 0.5;

	outColor = vec4(1.0, 1.0, 1.0, w);
	
	#include <frag_out>

}