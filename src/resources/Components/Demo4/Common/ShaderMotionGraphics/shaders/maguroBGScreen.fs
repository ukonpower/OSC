#include <common>
#include <packing>
#include <frag_h>
#include <noise_simplex>

in vec2 vLayerIndex;
uniform float uTime;

void main( void ) {

	#include <frag_in>

	// UV座標を正規化
	vec2 uv = vUv;
	vec2 p = uv * 2.0 - 1.0;

	// 時間ベースのアニメーション
	float t = uTime * 0.3;

	// ノイズのフェッチ - レイヤーごとに異なるノイズパターン (整数値を使用)
	float noise1 = noiseSimplex( vec3( p * 2.0, vLayerIndex.x * 10.0 + t ) ) * 0.5 + 0.5;
	float noise2 = noiseSimplex( vec3( p * 4.0, vLayerIndex.x * 10.0 + t * 0.7 ) ) * 0.5 + 0.5;
	float noise3 = noiseSimplex( vec3( p * 8.0, vLayerIndex.x * 10.0 + t * 0.5 ) ) * 0.5 + 0.5;

	float hole = length( uv - 0.5 );

	hole += noise1 * 0.1;

	if( hole < 0.2 ) {

		discard;

	}

	// シンプルなマグロの赤身カラー - 正規化値で明るさを調整
	vec3 color = vec3( 0.9, 0.15, 0.1 );
	color *= vLayerIndex.y;

	outColor = vec4( color, 1.0 );
	outRoughness = 0.4;
	outMetalic = 0.3;
	outEmission = vec3( 1.0, 0.1, 0.0  );
	outEnv = 0.0;

	#include <frag_out>

}
