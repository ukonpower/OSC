#include <common>
#include <packing>
#include <frag_h>
#include <noise_simplex>

// 頂点シェーダーから渡されるレイヤー値（0.0〜1.0）
in float vLayer;

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

	// ノイズのフェッチ（将来の使用のため）
	float noise1 = noiseSimplex( vec3( p * 2.0, t ) ) * 0.5 + 0.5;
	float noise2 = noiseSimplex( vec3( p * 4.0, t * 0.7 ) ) * 0.5 + 0.5;
	float noise3 = noiseSimplex( vec3( p * 8.0, t * 0.5 ) ) * 0.5 + 0.5;

	// シンプルなマグロの赤身カラー
	vec3 color = vec3( 0.9, 0.15, 0.1 );

	outColor = vec4( color, 1.0 );
	outRoughness = 0.4;
	outMetalic = 0.3;
	outEmission = vec3( 1.0, 0.1, 0.0  );
	outEnv = 0.0;

	#include <frag_out>

}
