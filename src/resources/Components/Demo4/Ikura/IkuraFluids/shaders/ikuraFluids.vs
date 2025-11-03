#include <common>
#include <vert_h>

#include <rotate>

layout (location = 3) in vec2 cuv;
layout (location = 4) in vec4 id;

uniform sampler2D uGPUSampler0;
uniform sampler2D uGPUSampler1;

out vec4 vGPUVel;
out vec4 vGPUPos;
out vec4 vId;

void main( void ) {

	#include <vert_in>

	vGPUVel = texture(uGPUSampler1, cuv );
	vec4 gpuPos = texture(uGPUSampler0, cuv );

	// いくら粒のサイズ調整
	outPos *= 0.05;

	// 密度に基づくサイズ変化
	float density = gpuPos.w;
	outPos *= 0.8 + density * 0.4;

	// 速度に基づく引き伸ばし
	float speed = length(vGPUVel.xyz);
	vec3 stretchDir = normalize(vGPUVel.xyz + vec3(0.001));
	outPos += stretchDir * dot(outPos, stretchDir) * speed * 0.5;

	// apply GPU position
	outPos += gpuPos.xyz;

	vGPUPos = gpuPos;
	vId = id;

	// motion blur
	vec4 vel = ( uProjectionMatrix * uViewMatrix * uModelMatrix * vec4( vGPUVel.xyz, 0.0 ) );

	#include <vert_out>

	vVelocity += vel.xy * 0.002;

}
