# アーキテクチャ詳細

## ディレクトリ構造

### ルート
- `plugins/`: ビルド最適化用カスタムViteプラグイン（ShaderMinifier、ResourceManager等）
- `data/`: プロダクションビルド用シーンデータ
- `blend-files/`: Blenderファイル
- `docs/`: プロジェクトドキュメント

### `src/` - アプリケーションコード
- `src/app/`: アプリケーションエントリーポイント
  - `player/`: プロダクションビルド用プレイヤー（64KB demo実行環境）
  - `editor/`: 開発用エディタ（React統合開発環境）
- `src/resources/`: デモ固有リソース
  - `Components/`: カスタムコンポーネント実装（Camera、ObjectControls、Demo4、Texture、Utilities等）
  - `Fonts/`: フォントレンダラー
  - `_data/componentList.ts`: コンポーネントレジストリ
  - `scene.json`: 開発用シーン設定
- `src/globals/`: グローバル状態とWebGLコンテキスト管理
- `src/utils/`: ユーティリティ関数
- `src/types/`: TypeScript型定義
- `src/assets/`: 静的アセット
- `src/styles/`: グローバルスタイル

### `packages/maxpower/` - エンジンコア
- `Entity/`: エンティティシステム
- `Component/`: 基本コンポーネント（Camera、Renderer、Mesh、Light等）
- `Serializable/`: シリアライズ可能オブジェクト
- `Material/`, `Geometry/`: マテリアル・ジオメトリシステム
- `PostProcess/`: ポストプロセスパス
- `Loaders/`: GLTFローダー、Gaussian Splattingローダー
- `BLidge/`: Blender統合
- `Utils/`: シェーダーパーサー、ユニフォーム管理等

### `packages/orengine/` - React統合
- `features/`: メイン機能
  - `OREngine/`: エンジンコア機能（Resources、FrameDebugger、Keyboard、Pointer等）
  - `OREditor/`: エディタコア機能
- `components/`: UIコンポーネント
  - `panels/`: エディタパネル（Timeline、Hierarchy、EntityProperty、Screen等）
  - `composites/`: 複合コンポーネント（Panel、Block、Vector、Value等）
  - `primitives/`: 基本UIコンポーネント（Button、Input、Label、Canvas、Icons）
- `hooks/`: カスタムReactフック
- `stories/`: Storybookストーリー

## コア構造

### コンポーネントベースエンティティシステム
エンティティは機能ごとにモジュラーコンポーネントを持ちます。

**コンポーネントは2層構造：**
- **基本コンポーネント** (`packages/maxpower/Component/`): Camera、Renderer、Mesh、Light等のエンジン標準コンポーネント
- **カスタムコンポーネント** (`src/resources/Components/`): デモ固有コンポーネント
  - 各コンポーネントは`index.ts`エントリーポイントを持つ
  - 専用の`shaders/`サブディレクトリにシェーダーファイル
  - MainCameraのPostProcess、ObjectControls、Demo4固有機能等

### WebGLレンダリングパイプライン
`glpower`パッケージのカスタムWebGL抽象化上に構築されています。

### リソース管理
シーンデータ、シェーダー、アセットをJSON設定で管理します。

### Deferredレンダリング
ポストプロセス効果を含む高度なレンダリングパイプラインを実装しています。

## ビルドシステム

### 2つのビルド設定
- `vite.config.ts`: Reactサポート付き開発モード
- `vite-player.config.ts`: 64KBデモ用プロダクションビルド（積極的最適化）

### カスタムViteプラグイン
- `ShaderMinifierLoader`: サイズ最適化のためGLSLシェーダーを最小化
- `ResourceManager`: シーンデータとアセット処理
- `OREngineFileSystemPlugin`: ファイルシステムユーティリティ
- `MangleManager`: サイズ削減のためプロパティ名マングル

## 重要ファイル

### エントリーポイント
- `src/app/player/index.ts`: プロダクションビルドのエントリーポイント
- `src/app/editor/main.tsx`: 開発エディタのエントリーポイント

### 設定ファイル
- `data/scene.json`: プロダクションビルド用シーン設定
- `src/resources/scene.json`: 開発用シーン設定
- `src/resources/_data/componentList.ts`: カスタムコンポーネントのレジストリ

### コアモジュール
- `src/globals/index.ts`: グローバルWebGLコンテキストとユニフォーム
- `packages/orengine/index.tsx`: React統合のメインエクスポート
- `packages/maxpower/index.ts`: エンジンコアのメインエクスポート

## パス解決とモジュールエイリアス

両方のVite設定ファイル（`vite.config.ts`と`vite-player.config.ts`）で以下のパスエイリアスが設定されています：

```typescript
{
  "glpower": "packages/glpower/packages/glpower/src",
  "maxpower": "packages/maxpower",
  "orengine": "packages/orengine",
  "~": "src"
}
```

### インポート時の使用方法
- `import { ... } from 'glpower'` - WebGL基本機能（GLPowerクラス、テクスチャ、フレームバッファ等）
- `import { ... } from 'maxpower'` - エンジンコアシステム（Entity、Component、Material、Geometry等）
- `import { ... } from 'orengine'` - React統合（OREngine、OREditor、UIコンポーネント、フック等）
- `import { ... } from '~/...'` - プロジェクトルート（src/）からの相対パス
