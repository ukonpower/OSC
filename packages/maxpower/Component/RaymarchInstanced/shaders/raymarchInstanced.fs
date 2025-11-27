#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>

#include <rm_h>

// 頂点シェーダーから受け取る変換マトリックス
in mat4 vTransformMatrix;

// SDF関数：レイマーチングで描画する形状を定義
// この関数をカスタマイズして好きな形状を作成してください
SDFResult D( vec3 p ) {

	vec3 pp = p;

	// ボックス形状の例（サイズと角の丸み具合を調整可能）
	vec2 d = vec2( sdBox( pp, vec3( 0.45, 0.2, 0.25) ) - 0.02, 0.0 );

	return SDFResult(
		d.x,
		p,
		d.y,
		vec4(0.0)
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>

	// vTransformMatrixの逆行列を計算してレイの座標をインスタンス空間に変換
	mat4 invMatrix = inverse(vTransformMatrix);
	vec3 localRayPos = (invMatrix * vec4(rayPos, 1.0)).xyz;
	vec3 localRayDir = normalize((invMatrix * vec4(rayDir, 0.0)).xyz);

	SDFResult dist;
	bool hit = false;

	// レイマーチングループ（最大64ステップ）
	for( int i = 0; i < 64; i++ ) {

		dist = D( localRayPos );
		localRayPos += dist.d * localRayDir * 1.0;

		if( dist.d < 0.001 ) {

			hit = true;
			break;

		}

	}

	// ヒットしなかった場合はピクセルを破棄
	if( !hit ) discard;

	// 法線計算（ローカル空間）
	vec3 localNormal = N( localRayPos, 0.01 );

	// 法線をワールド空間に変換
	outNormal = normalize((transpose(invMatrix) * vec4(localNormal, 0.0)).xyz);

	// ワールド空間の位置を計算
	rayPos = (vTransformMatrix * vec4(localRayPos, 1.0)).xyz;

	#include <rm_out_obj>

	// マテリアルプロパティの設定
	// ここをカスタマイズしてマテリアルの見た目を変更できます
	outColor.xyz = vec3(0.8);  // ベースカラー（白っぽい灰色）
	outRoughness = 0.3;        // ラフネス（0.0=鏡面, 1.0=完全拡散）
	outMetalic = 0.0;          // メタリック（0.0=非金属, 1.0=金属）

	#include <frag_out>

}
