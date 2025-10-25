#include <common>
#include <vert_h>

// インスタンス属性：レイヤーインデックス（0.0〜1.0の正規化された値）
// レイヤー数が1の場合は使用されないが、シェーダーの互換性のため定義
layout(location = 4) in float layerIndex;

// ユニフォーム：レイヤー数とレイヤー間隔
uniform int uLayers;
uniform float uLayerSpacing;

// フラグメントシェーダーに渡すレイヤー値
out float vLayer;

void main( void ) {

	#include <vert_in>

	// レイヤーインデックスをフラグメントシェーダーに渡す
	vLayer = uLayers > 1 ? layerIndex : 0.0;

	// レイヤー数が1より大きい場合、z方向に位置をずらす
	if (uLayers > 1) {
		// レイヤーを中央揃えにするためのオフセット
		float centerOffset = float(uLayers - 1) * 0.5;
		// z位置を調整（レイヤー0を最も手前に、最後のレイヤーを最も奥に）
		outPos.z += (layerIndex * float(uLayers - 1) - centerOffset) * uLayerSpacing;
	}

	#include <vert_out>

}
