#include <common>
#include <packing>
#include <frag_h>

in vec2 vLayerIndex;
uniform float uTime;
uniform vec4 uState;

void main( void ) {

	#include <frag_in>

	// UV座標を中心基準に変換
	vec2 uv = vUv;
	vec2 p = uv * 2.0 - 1.0;

	// 中心からの距離を計算
	float dist = length( p );

	// 円のサイズ（レイヤーごとに変化）
	float radius = 0.7 + vLayerIndex.y * 0.1;

	// ボーダーの太さ
	float borderWidth = 0.05;

	// 円のボーダー（輪）を描画
	float outerEdge = smoothstep( radius - 0.01, radius + 0.01, dist );
	float innerEdge = smoothstep( radius - borderWidth - 0.01, radius - borderWidth + 0.01, dist );
	float circleBorder = innerEdge - outerEdge;

	// ボーダーの外側を破棄
	if( circleBorder < 0.1 ) {
		discard;
	}

	// 真っ白な色
	vec3 color = vec3( 1.0 );

	outColor = vec4( color, 1.0 );
	outRoughness = 0.5;
	outMetalic = 0.0;
	outEmission = vec3( 1.0 );
	outEnv = 0.0;
	outGradient = 1.0;

	#include <frag_out>

}
