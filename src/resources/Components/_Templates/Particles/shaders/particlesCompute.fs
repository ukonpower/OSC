#include <common>
#include <noise_cyclic>

layout (location = 0) out vec4 outColor0;
layout (location = 1) out vec4 outColor1;

uniform sampler2D uGPUSampler0;
uniform sampler2D uGPUSampler1;
uniform vec2 uGPUResolution;
uniform float uTimeE;
uniform float uDeltaTime;

in vec2 vUv;

#include <random>

void main( void ) {

	vec4 position = texture( uGPUSampler0, vUv );
	vec4 velocity = texture( uGPUSampler1, vUv );

	// velocity update
	vec3 noisePosition = position.xyz * 1.0 + vUv.y;
	vec3 noise = noiseCyc( noisePosition + vec3( 0.0, -uTimeE * 0.5, 0.0 ) ) * 0.03;

	velocity.xyz += noise;
	velocity.xyz *= 0.95; // damping
	velocity.y += 0.001; // gravity

	// position update
	position.xyz += velocity.xyz;

	// lifetime
	if( position.w > 1.0 ) {

		// reset particle
		position = vec4( 0.0, 0.0, 0.0, random( vUv ) );
		velocity = vec4( 0.0 );

	}

	position.w += uDeltaTime * 0.5;

	// output
	outColor0 = position;
	outColor1 = velocity;

}
