#include <common>
#include <frag_h>
#include <light>

uniform float uTimeE;
uniform vec2 uResolution;
uniform sampler2D uNoiseTex;

void main( void ) {

	#include <frag_in>

	// UV座標を計算（ワールド座標ベース）
	vec2 uv = vPos.xy * 0.5 + 0.5;

	// ノイズテクスチャを取得してディテールを追加
	vec4 noise = texture( uNoiseTex, uv * 2.0 );
	vec4 noise2 = texture( uNoiseTex, uv * 8.0 );

	// マグロの赤身の色（濃い赤）
	vec3 maguroColor = vec3( 0.6, 0.05, 0.1 );

	// ノイズでバリエーションを追加
	maguroColor += ( noise.rgb - 0.5 ) * 0.15;

	// 少し明るい部分を追加（筋のような表現）
	float pattern = smoothstep( 0.3, 0.7, noise2.r );
	maguroColor = mix( maguroColor, maguroColor * 1.3, pattern * 0.2 );

	// 出力
	outColor = vec4( maguroColor, 1.0 );
	outRoughness = 0.6 + noise.r * 0.3; // ノイズでラフネスを調整
	outMetalic = 0.1; // わずかに金属感

	// ノーマルマップでディテールを追加
	outNormal = normalize( vNormal + ( noise2.xyz - 0.5 ) * 0.2 );

	#include <frag_out>

}
