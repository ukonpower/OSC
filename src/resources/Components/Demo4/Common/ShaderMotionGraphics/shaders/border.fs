#include <common>
#include <packing>
#include <frag_h>

in vec2 vLayerIndex;
uniform float uTime;
uniform float uTimeOffset;
uniform vec4 uState;

void main( void ) {

	#include <frag_in>

	// タイムオフセットを適用
	float time = uTime + uTimeOffset;

	// UV座標
	vec2 uv = vUv;

	// 横スクロール（時間に応じて移動）
	float scrollSpeed = 0.3;
	uv.x += time * scrollSpeed;

	// ボーダーパターン（横線、レイヤーごとに密度が変化）
	float stripeFreq = 3.0 + vLayerIndex.y * 2.0;

	// 横方向の縞々パターン
	float stripes = fract( uv.x * stripeFreq );
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
