#include <common>
#include <vert_h>
#include <rotate>

layout (location = 4) in vec4 id;

uniform float uTime;
uniform vec4 uState;

// フラグメントシェーダーに渡す変数
out vec4 vId;

void main( void ) {

	#include <vert_in>

	// 球のボリューム内のランダム座標を使用
	vec3 instancePos = id.yzw;

	vec3 offsetPos = ( vec4( vec3(0.0, pow(instancePos.y, 2.0) * uState.x, 0.0 ), 1.0 ) * uModelMatrix ).xyz;

	// スケール調整（球のサイズ）
	instancePos += offsetPos * 0.3 * id.x;
	instancePos *= 0.1;

	// 上部に配置
	// instancePos.y += 0.15;

	// イクラのサイズ（小さめの球体）
	outPos *= 0.06;

	outPos += instancePos;

	#include <vert_out>

	// インスタンスIDをフラグメントシェーダーに渡す
	vId = id;

}
