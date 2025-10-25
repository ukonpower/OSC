#include <common>
#include <packing>
#include <frag_h>

// 頂点シェーダーから渡されるレイヤー値（0.0〜1.0）
in float vLayer;

// Shader 0: シンプルなグラデーション
void main( void ) {

	#include <frag_in>

	// UV座標に基づいたグラデーション
	vec3 color = vec3( vUv.x, vUv.y, 0.5 );

	outColor = vec4( color, 1.0 );
	outRoughness = 0.5;
	outMetalic = 0.0;

	#include <frag_out>

}
