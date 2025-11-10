#include <common>
#include <noise_cyclic>
#include <rotate>

layout (location = 0) out vec4 outColor0;
layout (location = 1) out vec4 outColor1;

uniform sampler2D uGPUSampler0;
uniform sampler2D uGPUSampler1;
uniform float uTimeE;
uniform float uDeltaTime;

in vec2 vUv;

#include <random>

const float LIFE_TIME = 8.0; // パーティクルの寿命（秒）

void main( void ) {

	vec4 position = texture( uGPUSampler0, vUv );
	vec4 velocity = texture( uGPUSampler1, vUv );

	// velocity.wを時間として使用
	float time = velocity.w;
	time += uDeltaTime / (LIFE_TIME + vUv.y * 1.0);

	// 一定時間経ったらリセット
	if(time > 1.0) {

		
		// 位置をランダムにリセット
		float r = random(vUv + uTimeE) * 2.0;
		float theta = random(vUv * 2.0 + uTimeE) * 6.28318;
		float phi = random(vUv * 3.0 + uTimeE) * 3.14159;

		
		if( vUv.x < 0.1  ) {

			position.xyz = vec3(
				r * sin(phi) * cos(theta),
				r * sin(phi) * sin(theta),
				r * cos(phi)
			);
			
		} else {

			position.xyz = vec3(
				r * sin(phi) * cos(theta),
				r * sin(phi) * sin(theta),
				r * cos(phi)
			) * 0.03 + vec3( 
				0.7,
				0.5,
				-0.5
			);

		}


		velocity.xyz = vec3(0.0);
		time = 0.0;
	}

	// simplex noiseをvelocityに足す
	velocity.xyz *= 0.998;

	
	vec3 noiseForce = noiseCyc(position.xyz * 5.0 + vec3(0.0, 0.0, uTimeE * 0.5 + time + vUv.x * 0.0));
	velocity.xyz += noiseForce * 0.01;

	float dir = atan2( position.z, position.x ) - 1.0;
	vec3 rotateVec = vec3( sin( dir ), 0.0, -cos( dir ) );
	velocity.xz = mix( velocity.xz, rotateVec.xz, 0.01 );

	velocity.xyz += normalize(-position.xyz) * length( position.xyz ) * 0.005 * vec3( 1.4, 0.4, 1.0);

	

	// position update
	position.xyz += velocity.xyz * uDeltaTime;

	// 時間を保存
	velocity.w = time;

	// output
	outColor0 = position;
	outColor1 = velocity;

}
