#include <common>
#include <vert_h>

void main( void ) {

	#include <vert_in>

	// カメラ変換を無視して、画面フルサイズでクリップ空間に直接描画
	// 頂点座標をそのままクリップ空間座標として使用（-1.0 ~ 1.0）
	gl_Position = vec4( position.xy, 0.0, 1.0 );

}