#include <common>

// GPGPUで使用するテクスチャ
uniform sampler2D uGPUSampler0; // 位置情報
uniform sampler2D uGPUSampler1; // 速度情報

uniform float uTime;
uniform float uDeltaTime;

in vec2 vUv;

// 位置と速度を同時に出力（layout必須）
layout (location = 0) out vec4 outPosition;
layout (location = 1) out vec4 outVelocity;

#include <rotate>
#include <noise_simplex>

void main() {
	// 現在の位置と速度を取得
	vec4 position = texture(uGPUSampler0, vUv);
	vec4 velocity = texture(uGPUSampler1, vUv);

	// パーティクルのライフタイム管理
	// position.w にライフタイムを格納
	float life = position.w;

	// ライフタイムの更新
	life -= uDeltaTime * 0.5;

	// パーティクルがリセット必要か判定
	if (life <= 0.0) {
		// 初期位置にリセット（中心付近）
		position.xyz = vec3(
			(vUv.x - 0.5) * 0.1,
			(vUv.y - 0.5) * 0.1,
			0.0
		);

		// ランダムな初期速度
		vec3 randomDir = vec3(
			snoise(vec4(vUv * 10.0, 0.0, uTime)),
			snoise(vec4(vUv * 10.0, 1.0, uTime)),
			snoise(vec4(vUv * 10.0, 2.0, uTime))
		);

		velocity.xyz = normalize(randomDir) * 2.0;
		life = 1.0;
	}

	// 物理シミュレーション
	// 重力的な力を加える
	vec3 force = vec3(0.0, -0.5, 0.0) * uDeltaTime;

	// カールノイズで複雑な動きを追加
	vec3 noisePos = position.xyz * 0.5 + uTime * 0.1;
	vec3 curl = vec3(
		snoise(vec4(noisePos.yzx, 0.0)),
		snoise(vec4(noisePos.zxy, 1.0)),
		snoise(vec4(noisePos.xyz, 2.0))
	);
	force += curl * 0.5 * uDeltaTime;

	// 速度更新
	velocity.xyz += force;
	velocity.xyz *= 0.98; // 減衰

	// 位置更新
	position.xyz += velocity.xyz * uDeltaTime;
	position.w = life;

	// 出力
	outPosition = position;
	outVelocity = velocity;
}
