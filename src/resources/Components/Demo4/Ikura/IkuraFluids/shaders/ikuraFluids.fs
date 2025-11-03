#include <common>
#include <packing>
#include <frag_h>

in vec4 vGPUVel;
in vec4 vGPUPos;
in vec4 vId;

void main( void ) {

	#include <frag_in>

	// いくらっぽいオレンジ色の基本色
	vec3 baseColor = vec3( 1.0, 0.3, 0.1 );

	// 密度による色のバリエーション
	float density = vGPUPos.w;
	baseColor *= 0.8 + density * 0.4;

	// 個体差
	baseColor += (vId.xyz - 0.5) * 0.1;

	outColor = vec4( baseColor, 1.0 );
	outRoughness = 0.2;
	outMetalic = 0.1;
	outSSN = 0.0;

	// わずかな発光
	outEmission = baseColor * 0.05;

	#include <frag_out>

}
