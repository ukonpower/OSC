#include <common>
#include <packing>
#include <frag_h>

in vec2 vLayerIndex;

void main( void ) {

	#include <frag_in>

	// UV座標に基づいたグラデーション
	// レイヤーの正規化値で色調を変化
	vec3 color = vec3( vUv.x, vUv.y, vLayerIndex.y );

	outColor = vec4( color, 1.0 );
	outRoughness = 0.5;
	outMetalic = 0.0;

	#include <frag_out>

}
