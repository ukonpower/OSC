#include <common>
#include <packing>
#include <frag_h>

in vec2 vLayerIndex;
uniform float uTime;
uniform float uTimeOffset;
uniform vec4 uState;

void main( void ) {

	#include <frag_in>

	// タイムオフセットを適用
	float time = uTime + uTimeOffset;

	// UV座標を中心基準に変換
	vec2 uv = vUv;
	vec2 p = uv * 2.0 - 1.0;

	// 中心からの距離を計算
	float dist = length( p );

	// 中心からの角度を計算（円周上での位置を決定）
	float angle = atan( p.y, p.x );
	float normalizedAngle = ( angle + PI ) / ( 2.0 * PI );

	// アニメーション：円が描かれて消える
	float animationSpeed = 1.5;
	float animationPhase = fract( time * animationSpeed );

	// 円周上での描画進行（0.0 ~ 1.0）
	float drawProgress = animationPhase;

	// 描画されていない部分を破棄
	if( normalizedAngle > drawProgress ) {
		discard;
	}

	// 円のサイズ（レイヤーごとに変化）
	float radius = 0.7 + vLayerIndex.y * 0.1;

	// ボーダーの太さ
	float borderWidth = 0.05;

	// 円のボーダー（輪）を描画
	float outerEdge = smoothstep( radius - 0.01, radius + 0.01, dist );
	float innerEdge = smoothstep( radius - borderWidth - 0.01, radius - borderWidth + 0.01, dist );
	float circleBorder = innerEdge - outerEdge;

	// ボーダーの外側を破棄
	if( circleBorder < 0.1 ) {
		discard;
	}

	// 真っ白な色
	vec3 color = vec3( 1.0 );

	outColor = vec4( color, 1.0 );
	outRoughness = 0.5;
	outMetalic = 0.0;
	outEmission = vec3( 1.0 );
	outEnv = 0.0;
	outGradient = 1.0;

	#include <frag_out>

}
