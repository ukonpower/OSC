# シェーダーシステム

## シェーダーのincludeシステム

このプロジェクトでは、GLSLシェーダーファイル内で`#include <name>`ディレクティブを使用して共通コードを再利用できます。

### 仕組み

シェーダーは`packages/maxpower/Utils/ShaderParser/index.ts`の`shaderParse()`関数によってパースされ、`#include`ディレクティブが対応するGLSLコードに置換されます。

**処理フロー:**
1. `shaderInsertDefines()` - #defineディレクティブを挿入
2. バージョンディレクティブとprecisionを自動追加（`#version 300 es` + `precision highp float;`）
3. `shaderInclude()` - #includeディレクティブを置換
4. `shaderInsertLights()` - ライト数の定数を置換
5. `shaderUnrollLoop()` - ループ展開用プラグマを処理

### 利用可能なインクルード

インクルードファイルは2種類あります：

#### 1. shaderModules（共通ユーティリティ）
`packages/maxpower/Utils/ShaderParser/shaderModules/`に配置されている汎用関数群：

| インクルード名 | ファイル | 内容 |
|--------------|---------|------|
| `common` | `common.module.glsl` | 数学定数（PI等）、構造体（Geometry、Material）、基本関数 |
| `sdf` | `sdf.module.glsl` | SDF（符号付き距離関数）のプリミティブ（球体、ボックス、ピラミッド等） |
| `rotate` | `rotate.module.glsl` | 回転行列生成関数 |
| `random` | `random.module.glsl` | ランダム数生成関数 |
| `noise_simplex` | `noiseSimplex.module.glsl` | Simplexノイズ |
| `noise_cyclic` | `noiseCyclic.module.glsl` | 周期的なノイズ |
| `noise_value` | `noiseValue.module.glsl` | Valueノイズ |
| `light` | `light.module.glsl` | ライティング計算関数 |
| `pmrem` | `pmrem.module.glsl` | PMREM（Pre-filtered Mipmap Radiance Environment Map）関連 |
| `rm_normal` | `raymarch_normal.module.glsl` | レイマーチング法線計算 |

#### 2. shaderParts（レンダリングパイプライン部品）
`packages/maxpower/Utils/ShaderParser/shaderParts/`に配置されているレンダリングパイプライン用の定型コード：

| インクルード名 | ファイル | 内容 |
|--------------|---------|------|
| `vert_h` | `vert_h.part.glsl` | 頂点シェーダーヘッダー（ユニフォーム等） |
| `vert_in` | `vert_in.part.glsl` | 頂点シェーダー入力（attribute変数） |
| `vert_out` | `vert_out.part.glsl` | 頂点シェーダー出力（varying変数） |
| `frag_h` | `frag_h.part.glsl` | フラグメントシェーダーヘッダー（ユニフォーム、varying入力） |
| `frag_in` | `frag_in.part.glsl` | フラグメントシェーダー入力 |
| `frag_out` | `frag_out.part.glsl` | フラグメントシェーダー出力 |
| `rm_h` | `raymarch_h.part.glsl` | レイマーチングヘッダー |
| `rm_ray_obj` | `raymarch_ray_object.part.glsl` | レイマーチングレイ生成（オブジェクト空間） |
| `rm_ray_world` | `raymarch_ray_world.part.glsl` | レイマーチングレイ生成（ワールド空間） |
| `rm_out_obj` | `raymarch_out_obj.part.glsl` | レイマーチング出力（オブジェクト空間） |
| `uni_time` | `uniform_time.part.glsl` | 時間ユニフォーム |
| `lighting_light` | `lighting_light.part.glsl` | ライトユニフォーム |
| `lighting_env` | `lighting_env.part.glsl` | 環境マップライティング |
| `lighting_forwardIn` | `lighting_forwardIn.part.glsl` | フォワードレンダリング入力 |

### 使用例

```glsl
// raymarch.fs
#include <common>      // 数学定数と構造体
#include <packing>     // パッキングユーティリティ（外部ライブラリ）
#include <frag_h>      // フラグメントシェーダーヘッダー
#include <sdf>         // SDF関数群

#include <rm_h>        // レイマーチングヘッダー

// カスタムSDF定義
SDFResult D( vec3 p ) {
    p = mod( p, 10.0 ) - 5.0;
    float d = sdSphere( p, 1.0 );  // sdfからインクルードされた関数
    return SDFResult( d, p, 0.0, vec4(0.0) );
}

void main() {
    // シェーダーロジック
}
```

### 新しいインクルードファイルの追加方法

1. **ファイル作成**:
   - 共通ユーティリティ: `packages/maxpower/Utils/ShaderParser/shaderModules/yourmodule.module.glsl`
   - パイプライン部品: `packages/maxpower/Utils/ShaderParser/shaderParts/yourpart.part.glsl`

2. **ShaderParser/index.tsに登録**:
```typescript
// インポート
import yourmodule from './shaderModules/yourmodule.module.glsl';

// shaderInclude関数内のMapに追加
const dict = new Map<string, string>( [
    // ... 既存のエントリ
    [ "yourmodule", yourmodule ],
] );
```

3. **使用**:
```glsl
#include <yourmodule>
```

### 追加機能

#### ループ展開プラグマ
動的なループ展開が必要な場合に使用：

```glsl
#pragma loop_start 5
    // LOOP_INDEXは0〜4に置換される
    uniform sampler2D texture_LOOP_INDEX;
#pragma loop_end
```

#### ライト数の動的置換
シェーダー内で`NUM_LIGHT_DIR`、`NUM_SHADOWMAP_DIR`等の定数が自動的にシーンのライト数に置換されます。

#### 外部ライブラリ
一部のシェーダーでは`#include <packing>`など、ビルド時に外部（glslifyなど）から提供されるインクルードも使用可能です。

### ベストプラクティス

1. **共通処理は積極的にインクルード化**: 64KB制約があるため、重複コードは共通モジュールに移動
2. **インクルード順序に注意**: 依存関係のあるインクルードは依存先を先に記述
3. **モジュールは小さく保つ**: 必要な関数だけをインクルードできるよう、機能ごとに分割
4. **コメントを記述**: インクルードファイル内のコメントは自動削除されるので積極的に記述

## gバッファーレイアウト

このエンジンはDeferred Renderingを採用しており、gバッファーには5つのテクスチャが割り当てられています。

### テクスチャ構成

定義場所: `packages/maxpower/Component/Camera/RenderCamera/index.ts:43-49`

```typescript
this._gBuffer.setTexture( [
    new GLP.GLPowerTexture( gl ).setting( { type: gl.FLOAT, internalFormat: gl.RGBA32F, format: gl.RGBA, magFilter: gl.NEAREST, minFilter: gl.NEAREST } ),  // texture[0]
    new GLP.GLPowerTexture( gl ).setting( { type: gl.FLOAT, internalFormat: gl.RGBA32F, format: gl.RGBA } ),  // texture[1]
    new GLP.GLPowerTexture( gl ),  // texture[2] - RGBA8
    new GLP.GLPowerTexture( gl ),  // texture[3] - RGBA8
    new GLP.GLPowerTexture( gl ).setting( { type: gl.FLOAT, internalFormat: gl.RGBA32F, format: gl.RGBA } ),  // texture[4]
] );
```

### Deferredレンダリング時のチャンネル割り当て

シェーダー出力定義: `packages/maxpower/Utils/ShaderParser/shaderParts/frag_out.part.glsl:43-47`

```glsl
outColor0 = vec4( outPos, outEmission.x );
outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), outEmission.y );
outColor2 = vec4( outColor.xyz, outGradient );
outColor3 = vec4( outRoughness, outMetalic, outSSN, outEnv );
outColor4 = vec4( vVelocity, 0.0, outEmission.z );
```

| テクスチャ | 形式 | R | G | B | A | 用途 |
|-----------|------|---|---|---|---|------|
| **texture[0]** | RGBA32F (NEAREST) | outPos.x | outPos.y | outPos.z | outEmission.x | ワールド座標 + エミッション(R) |
| **texture[1]** | RGBA32F | outNormal.x | outNormal.y | outNormal.z | outEmission.y | ワールド法線 + エミッション(G) |
| **texture[2]** | RGBA8 | outColor.r | outColor.g | outColor.b | **outGradient** | アルベドカラー + **グラデーションパラメータ** |
| **texture[3]** | RGBA8 | outRoughness | outMetalic | outSSN | outEnv | マテリアルパラメータ (Selector使用中) |
| **texture[4]** | RGBA32F | vVelocity.x | vVelocity.y | **未使用** | outEmission.z | モーションベクター + エミッション(B) |

### Forwardレンダリング時の出力

```glsl
outColor0 = outColor;
outColor1 = vec4(outPos, 1.0);
outColor2 = vec4(vVelocity, 0.0, 1.0);
```

### 利用可能な空きチャンネル

- **texture[4].b** (32bit浮動小数点) - 現在未使用

### outGradient パラメータの使い方

**outGradient** (texture[2].a, 8bit整数):
- グラデーション効果を適用する強度パラメータ（デフォルト値: `0.0`）
- 0.0～1.0の範囲で、ノイズテクスチャによる色相変調の強度を制御

**使用例:**

```glsl
// マテリアルシェーダー内（.fs）
#include <common>
#include <frag_h>

void main() {
    outColor = vec4(1.0, 0.5, 0.0, 1.0);
    outGradient = 1.0;   // グラデーション質感を最大強度で適用
}
```

**deferred shadingシェーダーでの利用:**

`Material`構造体の`gradient`フィールドとしてアクセス可能です:

```glsl
// deferredShading.fs内
Material mat = Material(...);
// mat.gradientに値が格納されている

// グラデーション質感効果
if( mat.gradient > 0.0 ) {
    float rnd = random( vUv );
    vec3 noise = texture( uNoiseSimpleTex, vUv * 0.3 ).xyz;
    vec3 hsv = rgb2hsv( outColor.xyz );
    hsv.x += noise.x * 0.1 * mix( 0.5, 1.0, rnd );
    outColor.xyz = hsv2rgb( hsv );
}
```

### グローバルユニフォームでの公開

`src/globals/index.ts`では以下の2つのみがグローバルユニフォームとして公開されています：

```typescript
gBuffer: {
    uGBufferPos: texture[0],      // Position
    uGBufferNormal: texture[1],   // Normal
}
```

### 使用箇所

- **DeferredRenderer** (`packages/maxpower/Component/Renderer/DeferredRenderer/index.ts:349-376`)
  - SSAO: texture[0], texture[1]を使用
  - Shading: texture[0], texture[1]を使用
  - NormalSelector: texture[1], texture[0], texture[3]を使用
  - LightShaft: depthTextureを使用

- **Maguroコンポーネント**: texture[3]をセレクタテクスチャとして使用

### 注意事項

- texture[3]は現在Maguroコンポーネントで使用されているため、新規利用時は競合に注意
- 空きチャンネルを使用する場合は`frag_out.part.glsl`を編集して出力を追加
- グローバルユニフォームに追加する場合は`src/globals/index.ts`も更新
