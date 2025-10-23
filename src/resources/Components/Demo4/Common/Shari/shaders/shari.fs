#include <common>
#include <packing>
#include <frag_h>

// 頂点シェーダーから受け取るインスタンスID
in vec4 vId;

void main( void ) {

	// 基本的なフラグメント処理
	#include <frag_in>

	// シャリらしい見た目を設定
	// 白っぽいベースカラーにインスタンスごとの微妙なバリエーション
	outColor.xyz = vec3(1.0, 0.95, 0.9) * (0.9 + vId.y * 0.1);

	// ラフネス調整（少し光沢を持たせる）
	outRoughness = 0.3 + vId.z * 0.2;

	// メタリック値（非金属）
	outMetalic = 0.0;

	// 標準的なフラグメント出力処理
	#include <frag_out>

}
