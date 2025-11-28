#include <common>
#include <packing>
#include <frag_h>

in vec2 vLayerIndex;
uniform float uTime;
uniform float uTimeOffset;
uniform sampler2D uNoiseTex;
uniform vec4 uState;

void main( void ) {

	#include <frag_in>

	// タイムオフセットを適用
	float time = uTime + uTimeOffset;

	// UV座標
	vec2 uv = vUv;

	// グリッドの分割数（レイヤーごとに変化）
	float gridSize = 8.0 + vLayerIndex.y * 4.0;

	// グリッド座標を計算
	vec2 gridUV = fract( uv * gridSize );
	vec2 gridID = floor( uv * gridSize );
	vec2 gridCenter = gridUV * 2.0 - 1.0;

	// 各グリッドセルごとのノイズ値（ノイズテクスチャを使用）
	vec2 noiseUV = gridID * 0.1 + time * 0.05;
	vec4 noiseTex = texture( uNoiseTex, noiseUV );
	float noiseValue = noiseTex.r;

	// ノイズ値が閾値を超えたドットのみ表示
	float threshold = sin( time * 2.0 ) * 0.3 + 0.5;
	if( noiseValue < threshold ) {
		discard;
	}

	// 各グリッドセル内での中心からの距離
	float dist = length( gridCenter );

	// ドットの半径（レイヤーごとに変化）
	float dotRadius = 0.4 + vLayerIndex.y * 0.2;

	// ドットのエッジをスムーズに描画
	float dot = 1.0 - smoothstep( dotRadius - 0.05, dotRadius + 0.05, dist );

	// ドットの外側を破棄
	if( dot < 0.1 ) {
		discard;
	}

	// 真っ白な色
	vec3 color = vec3( 1.0 );

	outColor = vec4( color, 1.0 );
	outRoughness = 0.6;
	outMetalic = 0.0;
	outEmission = vec3( 1.0 );
	outEnv = 0.0;
	outGradient = 1.0;

	#include <frag_out>

}
