#include <common>
#include <packing>
#include <frag_h>

in vec2 vLayerIndex;
uniform float uTime;
uniform float uTimeOffset;
uniform vec4 uState;

void main( void ) {

	#include <frag_in>
	
	// UV座標
	vec2 uv = vUv;

	float t = uTime + uTimeOffset * 10.0;

	// 横スクロール（時間に応じて移動）
	float scrollSpeed = 0.3;
	uv.x += t * scrollSpeed;

	// ボーダーパターン（横線、レイヤーごとに密度が変化）
	float stripeFreq = 3.0 + vLayerIndex.y * 2.0;

	// 横方向の縞々パターン
	float stripes = fract( (uv.x + uv.y) * stripeFreq );
	float pattern = step( 0.5, stripes );

	pattern *= (sin( t * 100.0 ) * 0.5 + 0.5) * 0.3 + sin( t * 2.0 );

	// パターンの外側を破棄
	if( pattern < 0.5 ) {
		discard;
	}

	// 真っ白な色
	vec3 color = vec3( 1.0 );
	outEmission = vec3( 1.0 );
	#include <frag_out>

}
