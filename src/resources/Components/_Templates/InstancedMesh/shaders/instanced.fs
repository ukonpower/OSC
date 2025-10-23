#include <common>
#include <packing>
#include <frag_h>

// 頂点シェーダーから受け取るインスタンスID
in vec4 vId;

void main( void ) {

	// 基本的なフラグメント処理
	#include <frag_in>

	// インスタンスIDを使った色のバリエーション例
	// vId.x: 正規化されたインデックス
	// vId.y, vId.z, vId.w: ランダム値

	// ラフネス調整
	outRoughness = 0.3;

	// インスタンスごとに色を変化させる例（コメントアウト）
	// outColor.xyz *= vec3(vId.y, vId.z, vId.w);
	// outColor.xyz *= smoothstep(1.0, 0.0, vId.x);

	// メタリック値の調整例
	// outMetalic = vId.y;

	// サブサーフェススキャタリング値の調整例
	// outSSN = vId.z;

	// 標準的なフラグメント出力処理
	#include <frag_out>

}
