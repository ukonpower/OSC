#include <common>
#include <packing>
#include <frag_h>
#include <noise_simplex>

in vec2 vLayerIndex;
uniform float uTime;
uniform vec4 uState;

uniform sampler2D uNoiseTex;

void main( void ) {

	#include <frag_in>

	// UV座標を正規化
	vec2 uv = vUv;
	vec2 cuv = uv - 0.5;
	vec2 p = uv * 2.0 - 1.0;

	// 時間ベースのアニメーション
	float t = uTime * 0.2;

	// ノイズのフェッチ - レイヤーごとに異なるノイズパターン (整数値を使用)
	float noise1 = noiseSimplex( vec3( p * 3.0 + uTime * 0.3, vLayerIndex.x * 10.0 + t  ) ) * 0.5 + 0.5;

	vec4 noiseTex = texture( uNoiseTex, vUv );

	float hole = length( (cuv.x * 0.3 + cuv.y * 0.7)  );

	float line = length( vec2( 1.0 - uv.x, uv.y ) );

	float v = smoothstep(0.0, 1.0, - (vLayerIndex.y * 0.5 + line * 0.5 ) * 0.3 + (uState.x) * 1.3 );
	v = easeBounce(v, 2.5);

	hole += noise1 * 0.15;
	hole -= (1.0 - v) * 0.4;

	if( hole < 0.2 + (1.0 - vLayerIndex.y) * 0.08 ) {

		discard;

	}

	// イクラのオレンジカラー - レイヤーごとに明るさを調整
	vec3 color;
	color = mix( vec3( 1.0, 0.5, 0.0 ), vec3( 1.0, 0.3, 0.0 ), vLayerIndex.y);
	outColor = vec4( color, 1.0 );
	outRoughness = 0.3;
	outMetalic = 0.2;
	outEmission = color * 0.8;
	outEnv = 0.0;
	outGradient = 1.0;

	#include <frag_out>

}
