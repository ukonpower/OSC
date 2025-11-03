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

// 流体シミュレーション定数
const float GRAVITY = -0.5;
const float VISCOSITY = 0.98;
const float SURFACE_TENSION = 0.02;
const float BOUNDARY_RADIUS = 3.0;
const float BOUNDARY_DAMPING = 0.7;

void main( void ) {

	vec4 position = texture( uGPUSampler0, vUv );
	vec4 velocity = texture( uGPUSampler1, vUv );

	// 近傍パーティクルとの相互作用
	vec3 pressureForce = vec3(0.0);
	float densitySum = 0.0;

	// サンプリング近傍（簡易SPH）
	for(int i = -1; i <= 1; i++) {
		for(int j = -1; j <= 1; j++) {
			vec2 offset = vec2(float(i), float(j)) / uGPUResolution;
			vec4 neighborPos = texture(uGPUSampler0, vUv + offset);

			vec3 diff = position.xyz - neighborPos.xyz;
			float dist = length(diff);

			if(dist > 0.001 && dist < 0.2) {
				// 圧力による反発
				pressureForce += normalize(diff) * (0.2 - dist) * 0.1;
				densitySum += 1.0 - dist / 0.2;
			}
		}
	}

	// 外力
	vec3 force = vec3(0.0);

	// 重力
	force.y += GRAVITY * uDeltaTime;

	// 圧力
	force += pressureForce;

	// 表面張力（中心に向かう力）
	vec3 toCenter = -position.xyz;
	float distToCenter = length(toCenter);
	if(distToCenter > BOUNDARY_RADIUS * 0.5) {
		force += normalize(toCenter) * SURFACE_TENSION;
	}

	// 境界からの斥力（ノイズベース）
	vec3 noiseField = noiseCyc(position.xyz * 0.5 + vec3(0.0, uTimeE * 0.1, 0.0)) * 0.5;
	force += noiseField * 0.05;

	// velocity update
	velocity.xyz += force;
	velocity.xyz *= VISCOSITY; // 粘性による減衰

	// position update
	position.xyz += velocity.xyz * uDeltaTime;

	// 境界条件（球状）
	if(distToCenter > BOUNDARY_RADIUS) {
		position.xyz = normalize(position.xyz) * BOUNDARY_RADIUS;
		velocity.xyz *= BOUNDARY_DAMPING;
		// 境界での反射
		vec3 normal = normalize(position.xyz);
		velocity.xyz = reflect(velocity.xyz, normal) * 0.5;
	}

	// 密度更新
	position.w = clamp(densitySum * 0.1, 0.5, 2.0);

	// output
	outColor0 = position;
	outColor1 = velocity;

}
