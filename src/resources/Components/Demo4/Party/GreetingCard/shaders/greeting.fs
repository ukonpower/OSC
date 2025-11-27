#include <common>
#include <frag_h>

uniform sampler2D uTex;

void main( void ) {

	#include <frag_in>

	// テクスチャから色を取得
	vec4 tex = texture( uTex, vUv );
	outColor = tex;

	// 基本的なマテリアルプロパティ
	outRoughness = 0.8;
	outMetalic = 0.0;

	#include <frag_out>

}
