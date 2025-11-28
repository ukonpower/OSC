#include <common>
#include <frag_h>

uniform float uTime;
uniform sampler2D uTex;

void main( void ) {

	#include <frag_in>

	// テクスチャから色を取得
	vec4 tex = texture( uTex, vUv );

	// 枠の幅
	float borderWidth = 0.05;

	// UV座標から枠判定
	vec2 dist = min(vUv, 1.0 - vUv);
	float border = step(min(dist.x * 0.4, dist.y), borderWidth) * 0.2;
	
	// 枠の色（虹色グラデーション）
	float hue = length(vUv - 0.5) * 10.0;
	vec3 gradientColor = vec3(
		0.5 + 0.5 * cos(hue - uTime * 20.0),
		0.5 + 0.5 * cos(hue - uTime * 25.0 + 2.09439),
		0.5 + 0.5 * cos(hue - uTime * 30.0 + 4.18879)
	);

	// 基本的なマテリアルプロパティ
	outRoughness = 1.0;
	outEmission = (1.0 - tex.r + border * sin( uTime * 40.0 )) * gradientColor * 10.0;

	#include <frag_out>

}
