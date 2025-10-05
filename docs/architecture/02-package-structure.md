# パッケージ構成

## ディレクトリ構成

```
OREngine/
├── packages/                # メインパッケージ群
│   ├── glpower/           # WebGL基本機能
│   │   ├── src/          # ソースコード
│   │   └── examples/     # 使用例
│   │
│   ├── maxpower/         # コンポーネントシステム
│   │   ├── Component/    # 各種コンポーネント
│   │   ├── Entity/       # エンティティシステム
│   │   ├── Geometry/     # ジオメトリ定義
│   │   ├── Material/     # マテリアル定義
│   │   └── PostProcess/  # ポストプロセス効果
│   │
│   └── orengine/         # メインエンジン
│       ├── ts/          # TypeScriptソース
│       └── tsx/         # Reactコンポーネント
│
├── plugins/               # Viteプラグイン
│   ├── MangleManager/    # コード最適化用プラグイン
│   ├── ResourceManager/  # リソース管理用プラグイン
│   └── ShaderMinifier/   # シェーダー最適化用プラグイン
│
├── src/                  # デモ実装
│   ├── ts/              # TypeScriptソース
│   │   ├── Player/      # ビルドされたデモのエントリーポイント
│   │   ├── Resources/   # シーンデータ、コンポーネント、シェーダー
│   │   ├── Globals/     # グローバル状態とWebGLコンテキスト
│   │   └── Utils/       # ユーティリティ関数
│   ├── tsx/             # UIコンポーネント
│   └── styles/          # スタイルシート
│
├── data/                 # シーンデータ
│   ├── scene.json       # メインシーン設定（プロダクションビルド用）
│   └── editor.json      # エディタ設定
│
├── blend-files/          # Blenderファイル
│
├── BLidge/              # Blenderアドオン
│   ├── operators/       # エクスポート、同期、オブジェクト操作
│   ├── panels/          # Blender UIパネル
│   ├── utils/           # シーン/アニメーションパーサー、WebSocketサーバー
│   └── renderer/        # バーチャルメッシュレンダラーとシェーダー
│
└── tests/               # テストコード
    ├── e2e/            # E2Eテスト
    └── integration/    # 統合テスト
```

## パッケージの詳細

### 1. glpower パッケージ

WebGLの基本機能を提供する低レベルライブラリです。

**構成:**
- **src/**: コアソースコード
  - WebGLコンテキスト管理
  - シェーダープログラム
  - バッファ操作
  - テクスチャ処理
- **examples/**: 使用例と動作確認用サンプル

**主要機能:**
- WebGL 2.0の抽象化レイヤー
- シェーダーのコンパイルとリンク
- バッファオブジェクトの管理
- テクスチャのロードと管理
- フレームバッファオブジェクト(FBO)の制御

**使用例:**
```typescript
import * as GLP from 'glpower';

const gl = new GLP.GLPowerContext();
const shader = new GLP.GLPowerShader(gl);
const geometry = new GLP.GLPowerGeometry(gl);
```

### 2. maxpower パッケージ

glpowerの上に構築された高レベルなコンポーネントシステムです。

#### Component/

標準コンポーネントを提供します：

- **Camera/** - カメラ機能
  - PerspectiveCamera
  - OrthographicCamera
  - CameraControls

- **Light/** - ライティング
  - DirectionalLight
  - PointLight
  - SpotLight

- **Mesh/** - メッシュ描画
  - MeshComponent
  - InstancedMesh

- **Renderer/** - レンダリングシステム
  - DeferredRenderer
  - ForwardRenderer

- **GPUCompute/** - GPU演算
  - ComputeShader
  - ParticleSystem

- **PostProcessPipeline/** - ポストプロセス
  - Bloom
  - ToneMapping
  - SSAO

#### Entity/

エンティティ管理システムを提供します：

- エンティティクラス定義
- シーングラフ管理
- コンポーネント管理システム
- 階層変換の計算

#### Geometry/

基本的な形状とジオメトリユーティリティを提供します：

- **Primitives/**
  - Cube
  - Sphere
  - Plane
  - Cylinder

- **Custom/**
  - カスタムジオメトリの構築
  - 頂点データの操作

- **Utilities/**
  - ジオメトリのマージ
  - 法線の計算
  - UV座標の生成

#### Material/

マテリアルシステムを提供します：

- **PBR/** - 物理ベースレンダリング
  - StandardMaterial
  - MetallicRoughnessMaterial

- **Custom/** - カスタムシェーダー
  - ShaderMaterial
  - UnlitMaterial

- **Library/** - マテリアルライブラリ
  - プリセットマテリアル
  - マテリアルパラメータ管理

### 3. orengine パッケージ

エンジンのメイン機能とエディタを提供します。

**構成:**
- **ts/**: TypeScript実装
  - Editor/ - エディタ機能
  - Engine/ - エンジンコア

- **tsx/**: Reactコンポーネント
  - UI要素
  - エディタパネル
  - プロパティインスペクタ

**主要機能:**
- エディタのUIとロジック
- シーンの保存と読み込み
- コンポーネントのインスペクタ
- リアルタイムプレビュー

## プラグインシステム

### Viteプラグイン

ビルド時の最適化を担当します：

#### MangleManager
コードサイズを削減するためのプロパティ名マングルを行います：

- プロパティ名の短縮化
- 未使用コードの削除
- 変数名の最適化

**設定例:**
```typescript
// vite-player.config.ts
MangleManager({
  mangle: {
    properties: {
      regex: /^_/,
    },
  },
})
```

#### ResourceManager
アセットとリソースの管理を行います：

- リソースのロードと管理
- キャッシュ制御
- 依存関係の解決
- JSONシーンデータの処理

**機能:**
- シーンデータの自動ロード
- アセットパスの解決
- リソースの事前ロード

#### ShaderMinifier
GLSLシェーダーコードの最適化を行います：

- GLSLの圧縮
- インクルード処理
- プリプロセッサ制御
- 変数名の短縮化

**外部ツール連携:**
- [Shader_Minifier](https://github.com/laurentlb/Shader_Minifier)との統合
- カスタム最適化パス
- デバッグモードのサポート

## デモとテスト

### src/ (デモ実装)

エンジンの使用例とデモアプリケーションを提供します：

**主要ディレクトリ:**
- **Player/** - プロダクションビルドのエントリーポイント
- **Resources/** - シーンデータとコンポーネント
- **Globals/** - グローバル状態管理
- **Utils/** - ユーティリティ関数

**開発ワークフロー:**
1. `npm run dev` で開発サーバー起動
2. エディタでシーン編集
3. `npm run build` でプロダクションビルド

### tests/ (テストコード)

テストスイートを提供します：

- **e2e/**: エンドツーエンドテスト
  - エディタ機能のテスト
  - 統合シナリオ

- **integration/**: 統合テスト
  - コンポーネント間の連携
  - システム全体の動作

**テスト実行:**
```bash
npm run test        # 全テスト実行
npm run test:watch  # ウォッチモード
```

## 設定ファイル

### ビルド設定

**vite.config.ts**: 開発モード
- Reactサポート
- 高速リロード
- デバッグ情報の保持

**vite-player.config.ts**: プロダクションビルド
- 積極的な最適化
- ShaderMinifier統合
- プロパティマングル
- サイズ制約への最適化

### TypeScript設定

**tsconfig.json**:
```json
{
  "compilerOptions": {
    "paths": {
      "glpower": ["packages/glpower/packages/glpower/src"],
      "maxpower": ["packages/maxpower"],
      "orengine": ["packages/orengine"],
      "~/*": ["src/*"]
    }
  }
}
```

### パスエイリアス

以下のエイリアスが使用できます：
```typescript
import { ... } from 'glpower';    // WebGL基本機能
import { ... } from 'maxpower';   // コンポーネントシステム
import { ... } from 'orengine';   // エンジンコア
import { ... } from '~/ts/...';   // プロジェクトルート
```

## リソース管理

### シーンデータ

**data/scene.json**: プロダクション用シーン設定
- エンティティ定義
- コンポーネント設定
- アニメーション情報

**src/ts/Resources/scene.json**: 開発用シーン設定
- エディタで編集可能
- ホットリロード対応

### アセット管理

- **data/**: JSON設定ファイル
- **blend-files/**: Blenderソースファイル
- **src/public/**: 静的アセット（テクスチャ、モデル等）

### コンポーネントレジストリ

**src/ts/Resources/_data/componentList.ts**:
利用可能なコンポーネントの一覧を管理します。

```typescript
export const componentList = {
  Camera: CameraComponent,
  Light: LightComponent,
  Mesh: MeshComponent,
  // ...
};
```

## 次のセクション

- [01. システム全体概要](./01-system-overview.md) - アーキテクチャの基礎
- [03. レンダリングパイプライン](./03-rendering-pipeline.md) - レンダリングシステムの詳細
- [04. ビルド最適化](./04-build-optimization.md) - 64KB制約への対応
- [05. 改善提案](./05-improvement-roadmap.md) - 今後の改善計画
