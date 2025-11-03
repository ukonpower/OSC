#include <common>
#include <vert_h>

// インスタンスごとのID属性（location = 4）
layout(location = 4) in vec4 id;

// GPGPUテクスチャから情報を取得
uniform sampler2D uGPUSampler0; // 位置情報
uniform sampler2D uGPUSampler1; // 速度情報

#include <rotate>

// フラグメントシェーダーに渡す変数
out vec4 vId;
out float vLife;
out vec3 vVelocity;

void main() {
	#include <vert_in>

	// GPUテクスチャ解像度から計算したUV座標を取得
	// id.x には正規化されたインスタンスIDが入っている
	vec2 gpuUv = vec2(
		mod(id.x * 100.0, 1.0),
		floor(id.x * 100.0) / 100.0
	);

	// GPGPUテクスチャから位置と速度を取得
	vec4 gpuPosition = texture(uGPUSampler0, gpuUv);
	vec4 gpuVelocity = texture(uGPUSampler1, gpuUv);

	// パーティクルの位置を設定
	vec3 particlePos = outPos;

	// パーティクルのスケールをライフタイムに応じて変化
	float life = gpuPosition.w;
	float scale = smoothstep(0.0, 0.1, life) * smoothstep(1.0, 0.8, life);
	particlePos *= scale * 0.1;

	// 速度方向に応じてパーティクルを回転
	vec3 vel = gpuVelocity.xyz;
	float velLength = length(vel);
	if (velLength > 0.01) {
		vec3 velDir = vel / velLength;
		float angle = atan(velDir.y, velDir.x);
		rotate(particlePos.xy, outNormal.xy, angle);
	}

	// GPGPUから取得した位置をパーティクル位置に加算
	particlePos += gpuPosition.xyz;

	outPos = particlePos;

	#include <vert_out>

	// フラグメントシェーダーに渡す
	vId = id;
	vLife = life;
	vVelocity = vel;
}
