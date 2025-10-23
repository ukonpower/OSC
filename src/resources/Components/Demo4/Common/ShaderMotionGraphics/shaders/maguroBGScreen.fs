#include <common>
#include <packing>
#include <frag_h>
#include <noise_simplex>

// MaguroBGScreen: マグロ背景用のシェーダー
uniform float uTime;

void main( void ) {

	#include <frag_in>

	// UV座標を正規化
	vec2 uv = vUv;
	vec2 p = uv * 2.0 - 1.0;
	p.x *= uResolution.x / uResolution.y;

	// 時間ベースのアニメーション
	float t = uTime * 0.3;

	// ノイズによる海中のような揺らぎ
	float noise1 = snoise( vec3( p * 2.0, t ) ) * 0.5 + 0.5;
	float noise2 = snoise( vec3( p * 4.0, t * 0.7 ) ) * 0.5 + 0.5;
	float noise3 = snoise( vec3( p * 8.0, t * 0.5 ) ) * 0.5 + 0.5;

	// 深海のグラデーション（上から下へ）
	vec3 topColor = vec3( 0.0, 0.1, 0.3 );      // 深い青
	vec3 bottomColor = vec3( 0.0, 0.05, 0.15 ); // より暗い青
	vec3 baseColor = mix( topColor, bottomColor, uv.y );

	// ノイズで色に変化を加える
	vec3 color = baseColor;
	color += vec3( 0.0, 0.05, 0.1 ) * noise1;
	color += vec3( 0.0, 0.03, 0.08 ) * noise2 * 0.5;
	color += vec3( 0.0, 0.02, 0.05 ) * noise3 * 0.3;

	// 光の筋（コースティクス風）
	float caustics = snoise( vec3( p * 6.0 + vec2( t * 0.5, 0.0 ), t * 0.3 ) );
	caustics = pow( max( caustics, 0.0 ), 3.0 ) * 0.15;
	color += vec3( 0.1, 0.2, 0.3 ) * caustics;

	outColor = vec4( color, 1.0 );
	outRoughness = 0.8;
	outMetalic = 0.0;
	outEmission = color * 0.1; // わずかな発光

	#include <frag_out>

}
