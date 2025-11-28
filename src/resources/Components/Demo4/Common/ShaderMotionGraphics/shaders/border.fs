#include <common>
#include <packing>
#include <frag_h>

in vec2 vLayerIndex;
uniform float uTime;
uniform vec4 uState;

void main( void ) {

	#include <frag_in>

	// UV座標
	vec2 uv = vUv;

	// 斜め線の縞々パターン（レイヤーごとに密度が変化）
	float stripeFreq = 10.0 + vLayerIndex.y * 5.0;

	// 斜め45度の座標を計算
	float diagonal = ( uv.x + uv.y ) * stripeFreq;

	// 縞々パターン（0と1を繰り返す）
	float stripes = fract( diagonal );
	float pattern = step( 0.5, stripes );

	// パターンの外側を破棄
	if( pattern < 0.5 ) {
		discard;
	}

	// 真っ白な色
	vec3 color = vec3( 1.0 );

	outColor = vec4( color, 1.0 );
	outRoughness = 0.3;
	outMetalic = 0.2;
	outEmission = vec3( 1.0 );
	outEnv = 0.0;
	outGradient = 1.0;

	#include <frag_out>

}
