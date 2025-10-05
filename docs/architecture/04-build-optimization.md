# ビルド最適化

## 64KB制約への対応

OREngineの最も重要な設計目標は、**最終的なHTMLファイルサイズを64KB以下に抑える**ことです。この制約下で高品質な3Dレンダリングを実現するため、多層的な最適化戦略を採用しています。

## ビルドシステム

### 2つのビルド設定

#### vite.config.ts（開発モード）

開発効率を最優先した設定：

```typescript
export default defineConfig({
  plugins: [
    react(),
    // 開発用プラグイン
  ],
  server: {
    port: 3000,
    hot: true,
  },
  build: {
    sourcemap: true,
    minify: false,
  },
});
```

**特徴:**
- Reactサポート
- ホットリロード
- ソースマップ生成
- デバッグ情報の保持

#### vite-player.config.ts（プロダクションモード）

サイズ最適化を最優先した設定：

```typescript
export default defineConfig({
  plugins: [
    ShaderMinifierLoader({
      enabled: !process.env.SKIP_SHADER_MINIFIER,
    }),
    MangleManager({
      mangle: {
        properties: {
          regex: /^_/,
        },
      },
    }),
    ResourceManager(),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        passes: 3,
        pure_funcs: ['console.log'],
      },
      mangle: {
        toplevel: true,
        properties: {
          regex: /^_/,
        },
      },
    },
  },
});
```

**特徴:**
- 積極的なコード圧縮
- ShaderMinifier統合
- プロパティ名マングル
- 複数パス最適化

## カスタムViteプラグイン

### 1. ShaderMinifierLoader

GLSLシェーダーコードを最小化します。

#### 機能

- **変数名の短縮化**: 長い変数名を1〜2文字に圧縮
- **ホワイトスペースの削除**: 不要な空白・改行を削除
- **コメントの削除**: すべてのコメントを削除
- **プリプロセッサ処理**: `#include`の展開と`#ifdef`の処理

#### 使用例

```typescript
// plugins/ShaderMinifierLoader/index.ts
export function ShaderMinifierLoader(options) {
  return {
    name: 'shader-minifier-loader',
    transform(code, id) {
      if (id.endsWith('.glsl') || id.endsWith('.vert') || id.endsWith('.frag')) {
        return {
          code: minifyShader(code, options),
          map: null,
        };
      }
    },
  };
}
```

#### ShaderMinifierのセットアップ

**macOS:**
```bash
# Shader_Minifierを配置
# /Documents/application/shader_minifier/shader_minifier.exe

# Monoをインストール
brew install mono
```

**Windows:**
```bash
# Shader_MinifierをインストールしてPATHに追加
```

**スキップ（開発時）:**
```bash
SKIP_SHADER_MINIFIER=true npm run build
```

#### 最適化例

**元のシェーダー:**
```glsl
// Vertex Shader
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

varying vec3 vNormal;
varying vec2 vUv;

void main() {
  vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
  vUv = uv;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
```

**最小化後:**
```glsl
uniform mat4 m,v,p;attribute vec3 a,n;attribute vec2 u;varying vec3 b;varying vec2 c;void main(){b=normalize((m*vec4(n,0.)).xyz);c=u;gl_Position=p*v*m*vec4(a,1.);}
```

### 2. MangleManager

JavaScriptコードのプロパティ名を短縮化します。

#### 機能

- **プロパティ名マングル**: `_`で始まるプロパティを短縮
- **トップレベル変数マングル**: グローバル変数名を短縮
- **未使用コード削除**: 参照されていないコードを削除

#### 設定例

```typescript
// vite-player.config.ts
MangleManager({
  mangle: {
    properties: {
      regex: /^_/,  // _で始まるプロパティをマングル
    },
  },
  compress: {
    dead_code: true,
    drop_console: true,
  },
})
```

#### マングル対象の命名規則

```typescript
// マングル対象（_で始まる）
class Renderer {
  private _gl: WebGLRenderingContext;
  private _framebuffer: WebGLFramebuffer;
  private _texture: WebGLTexture;

  private _render() {
    // ...
  }
}

// マングル非対象（公開API）
class Renderer {
  public render() {
    this._render();
  }
}
```

### 3. ResourceManager

リソースとアセットの効率的な管理を行います。

#### 機能

- **シーンデータの処理**: JSON設定を最適化
- **依存関係の解決**: 必要なリソースのみをバンドル
- **リソースのインライン化**: 小さなリソースをコードに埋め込み

#### 使用例

```typescript
// data/scene.jsonを自動的にロードして最適化
import scene from '@/data/scene.json';

// 最適化されたシーンデータが返される
const optimizedScene = ResourceManager.process(scene);
```

## コード最適化手法

### 1. プロパティマングル

**最適化前:**
```typescript
class Camera {
  private _position: Vector3;
  private _rotation: Quaternion;
  private _projectionMatrix: Matrix4;

  public updateProjectionMatrix() {
    this._projectionMatrix.makePerspective(/*...*/);
  }
}
```

**最適化後:**
```typescript
class Camera {
  private a: Vector3;  // _position
  private b: Quaternion;  // _rotation
  private c: Matrix4;  // _projectionMatrix

  public updateProjectionMatrix() {
    this.c.makePerspective(/*...*/);
  }
}
```

### 2. フラットな構造

複雑な抽象化を避け、直接的な実装を優先します。

**避けるべきパターン:**
```typescript
// 過度なクラス分割
class AbstractRenderer {
  abstract render(): void;
}

class DeferredRenderer extends AbstractRenderer {
  render() { /* ... */ }
}

class ForwardRenderer extends AbstractRenderer {
  render() { /* ... */ }
}
```

**推奨パターン:**
```typescript
// シンプルな実装
const renderer = {
  _targets: [],
  _lights: [],
  render() {
    // 直接的な実装
  },
};
```

### 3. Typed Arrayの再利用

メモリアロケーションを最小化します。

**最適化前:**
```typescript
function updateUniforms(matrix: Matrix4) {
  const buffer = new Float32Array(16);
  matrix.toArray(buffer);
  gl.uniformMatrix4fv(location, false, buffer);
}
```

**最適化後:**
```typescript
class Renderer {
  private _matrixBuffer = new Float32Array(16);

  updateUniforms(matrix: Matrix4) {
    matrix.toArray(this._matrixBuffer);
    gl.uniformMatrix4fv(location, false, this._matrixBuffer);
  }
}
```

### 4. 定数の事前計算

ビルド時に計算可能なものは事前計算します。

```typescript
// 最適化前
const fov = Math.PI / 4;

// 最適化後（ビルド時に計算）
const fov = 0.7853981633974483;
```

## シェーダー最適化

### 1. 共通コードの関数化

```glsl
// 共通関数を定義
vec3 N(vec3 v) { return normalize(v); }
vec2 P(vec4 p) { return p.xy / p.w * 0.5 + 0.5; }

// 使用
vec3 normal = N(vNormal);
vec2 screenUv = P(gl_FragCoord);
```

### 2. マクロの活用

```glsl
#define PI 3.14159
#define saturate(x) clamp(x, 0.0, 1.0)

float intensity = saturate(dot(normal, lightDir));
```

### 3. プリプロセッサによる条件分岐

実行時の条件分岐を避けます。

```glsl
#ifdef USE_NORMALMAP
  vec3 normal = texture(normalMap, vUv).rgb * 2.0 - 1.0;
#else
  vec3 normal = vNormal;
#endif
```

### 4. 精度の最適化

必要最小限の精度を使用します。

```glsl
// 高精度が必要な場合のみhighp
highp vec3 worldPosition;

// 通常はmediump
mediump vec3 normal;
mediump vec2 uv;

// 低精度で十分な場合はlowp
lowp vec4 color;
```

## 最適化のベストプラクティス

### コード容量削減

1. **不要なライブラリの削除**
   - tree-shakingを活用
   - 必要最小限の依存関係

2. **コードの重複排除**
   - 共通処理の関数化
   - ユーティリティ関数の集約

3. **条件付きビルド**
   - 開発用コードの除外
   - デバッグ機能の削除

### パフォーマンス最適化

1. **WebGL状態変更の最小化**
   ```typescript
   // 状態が変わる場合のみ更新
   if (this._currentProgram !== program) {
     gl.useProgram(program);
     this._currentProgram = program;
   }
   ```

2. **バッチ処理**
   ```typescript
   // マテリアルごとにソートして描画
   const sorted = entities.sort((a, b) =>
     a.material.id - b.material.id
   );
   ```

3. **メモリ管理**
   ```typescript
   // オブジェクトプールの活用
   const pool = new ObjectPool(() => new Vector3());
   const vec = pool.acquire();
   // 使用後
   pool.release(vec);
   ```

## ビルドプロセス

### 開発ビルド

```bash
# ShaderMinifierをスキップして高速ビルド
npm run build:dev
```

### プロダクションビルド

```bash
# 完全な最適化を適用
npm run build
```

### ビルドサイズの確認

```bash
# ビルド後のサイズを確認
ls -lh dist/index.html

# gzip圧縮後のサイズを確認
gzip -c dist/index.html | wc -c
```

## サイズ削減のチェックリスト

- [ ] ShaderMinifierが有効
- [ ] プロパティマングルが有効
- [ ] Terserの複数パス最適化が有効
- [ ] console.logが削除されている
- [ ] 未使用のコードが削除されている
- [ ] ソースマップが無効
- [ ] 開発用コードが除外されている
- [ ] GLSLシェーダーが最小化されている
- [ ] アセットが最適化されている
- [ ] 最終サイズが64KB以下

## トラブルシューティング

### ShaderMinifierが動作しない

```bash
# macOS: Monoがインストールされているか確認
mono --version

# 実行権限を確認
chmod +x /Documents/application/shader_minifier/shader_minifier.exe

# 一時的にスキップ
SKIP_SHADER_MINIFIER=true npm run build
```

### ビルドサイズが大きすぎる

```bash
# バンドルアナライザで確認
npm install --save-dev rollup-plugin-visualizer

# ビルド後に分析
npm run build && npm run analyze
```

### マングルによる実行時エラー

```typescript
// 公開APIは_なしで命名
class Component {
  // 公開メソッド - マングルされない
  public update() {
    this._updateInternal();
  }

  // 内部メソッド - マングルされる
  private _updateInternal() {
    // ...
  }
}
```

## 次のセクション

- [01. システム全体概要](./01-system-overview.md) - アーキテクチャの基礎
- [02. パッケージ構成](./02-package-structure.md) - 各パッケージの詳細
- [03. レンダリングパイプライン](./03-rendering-pipeline.md) - レンダリングシステムの詳細
- [05. 改善提案](./05-improvement-roadmap.md) - 今後の改善計画
