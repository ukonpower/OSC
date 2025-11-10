#include <common>
#include <vert_h>
#include <rotate>

layout (location = 4) in vec4 id;

uniform float uTime;

// フラグメントシェーダーに渡す変数
out vec4 vId;

void main( void ) {

	#include <vert_in>

	// 球のボリューム内のランダム座標を使用
	vec3 offset = id.yzw;

	// スケール調整（球のサイズ）
	offset *= 0.1;

	// 上部に配置
	// offset.y += 0.15;

	// イクラのサイズ（小さめの球体）
	outPos *= 0.06;
	outPos += offset;

	#include <vert_out>

	// インスタンスIDをフラグメントシェーダーに渡す
	vId = id;

}
