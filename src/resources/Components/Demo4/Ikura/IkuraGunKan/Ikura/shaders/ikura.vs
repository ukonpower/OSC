#include <common>
#include <vert_h>
#include <rotate>

layout (location = 4) in vec4 id;

uniform float uTime;

// フラグメントシェーダーに渡す変数
out vec4 vId;

void main( void ) {

	#include <vert_in>

	// インスタンスIDに基づいた配置
	vec3 offset = vec3(0.0);

	// 格子状に配置
	float gridSize = 3.0;
	float index = id.x * 9.0; // 9個のイクラを配置
	offset.x = mod(index, gridSize) - 1.0;
	offset.z = floor(index / gridSize) - 1.0;
	offset *= 0.08; // 間隔調整

	// 上部に配置
	offset.y = 0.15;

	// 軽い揺れアニメーション
	offset.y += sin(uTime * 2.0 + id.y * 10.0) * 0.02;

	// イクラのサイズ（小さめの球体）
	outPos *= 0.05;
	outPos += offset;

	#include <vert_out>

	// インスタンスIDをフラグメントシェーダーに渡す
	vId = id;

}
