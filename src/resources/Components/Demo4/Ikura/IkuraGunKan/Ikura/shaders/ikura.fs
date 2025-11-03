#include <common>
#include <packing>
#include <frag_h>

// 頂点シェーダーから受け取るインスタンスID
in vec4 vId;

void main( void ) {

	#include <frag_in>

	// イクラの色 - オレンジ色
	vec3 color = vec3(1.0, 0.4, 0.2);

	// フレネル効果で半透明感を演出
	vec3 viewDir = normalize(-vPos);
	float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.0);
	color += fresnel * 0.3;

	outColor = vec4(color, 1.0);
	outRoughness = 0.2;
	outMetalic = 0.0;

	#include <frag_out>

}
