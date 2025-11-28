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

	// クロスの太さ（レイヤーごとに変化）
	float thickness = 0.15 + vLayerIndex.y * 0.1;

	// 縦線と横線を計算
	float vertical = step( abs( p.x ), thickness );
	float horizontal = step( abs( p.y ), thickness );

	// 縦線または横線があればクロス
	float cross = max( vertical, horizontal );

	// クロスの外側を破棄
	if( cross < 0.5 ) {
		discard;
	}

	// 真っ白な色
	vec3 color = vec3( 1.0 );

	outColor = vec4( color, 1.0 );
	outRoughness = 0.4;
	outMetalic = 0.1;
	outEmission = vec3( 1.0 );
	outEnv = 0.0;
	outGradient = 1.0;

	#include <frag_out>

}
