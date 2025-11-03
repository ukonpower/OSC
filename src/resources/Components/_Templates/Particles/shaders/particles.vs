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

	// basic particle transformation
	outPos *= 0.1; // particle size

	// fade in/out based on lifetime
	float life = gpuPos.w;
	outPos *= smoothstep( 0.0, 0.1, life);
	outPos *= smoothstep( 1.0, 0.9, life);

	// apply GPU position
	outPos += gpuPos.xyz;

	vGPUPos = gpuPos;
	vId = id;

	// motion blur
	vec4 vel = ( uProjectionMatrix * uViewMatrix * uModelMatrix * vec4( vGPUVel.xyz, 0.0 ) );

	#include <vert_out>

	vVelocity += vel.xy * 0.1;

}
