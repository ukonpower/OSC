# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ 重要：64KB制約によるコーディングガイドライン

**このプロジェクトは64KBのソースコードにビルドする必要があります。これは最優先の制約です。**

以下の原則を**必ず**守ってコーディングしてください：

1. **過剰な関数やファイルの切り分けは控える** - 必要最小限のモジュール分割に留める
2. **多少人間が読みづらくても処理的に正しければ短いコードを書く** - 簡潔さを優先
3. **似たような処理があれば適度に共通化** - 重複コードを削減してサイズ削減
4. **コメントはビルド時に自動で削除されるので気にせず、人間が読みやすいようにちゃんとコメントをする** - 保守性のため積極的にコメント記述
5. **変数名はビルド時に自動的にマングルされるので、文字数などは気にせずわかりやすく記述する** - 可読性のため明確な変数名を使用

コードレビュー時は常にファイルサイズへの影響を考慮してください。

## プロジェクト概要

OREngineは64KB intro demo制作を目的とした軽量WebGL 3Dエンジンです。TypeScriptで構築され、コンポーネントベースアーキテクチャとReact統合サポートを特徴としています。

## セットアップコマンド

### 初期セットアップ
```bash
npm run init
```
gitサブモジュールを初期化し、依存関係をインストールします。**プロジェクトセットアップやビルド・テスト前に必ず最初に実行してください。**

### 開発
```bash
npm run dev
```
ポート3000で開発サーバーを起動します。

### ビルド
```bash
# プロダクションビルド（ShaderMinifier最適化を含む）
npm run build

# 開発ビルド（ShaderMinifierをスキップして高速ビルド）
npm run build:dev
```

### テストと品質チェック
```bash
npm run test    # vitestテスト実行
npm run lint    # ESLintチェック
```

### ドキュメント
```bash
npm run storybook       # ポート6006でStorybook開発サーバー起動
npm run build:storybook # Storybookビルド
```

## アーキテクチャ

### コア構造
- **コンポーネントベースエンティティシステム**: エンティティは機能ごとにモジュラーコンポーネントを持つ
- **WebGLレンダリングパイプライン**: `glpower`パッケージのカスタムWebGL抽象化上に構築
- **リソース管理**: シーンデータ、シェーダー、アセットをJSON設定で管理
- **Deferredレンダリング**: ポストプロセス効果を含む高度なレンダリングパイプライン

### 主要パッケージ（モノレポ構造）
- `packages/glpower`: コアWebGL抽象化ライブラリ（gitサブモジュール）
- `packages/orengine`: Reactバインディングを含むメインエンジン実装
- `packages/maxpower`: 追加ユーティリティ

### ディレクトリ構造
- `src/ts/`: コアTypeScriptエンジンコード
  - `Player/`: ビルドされたデモのエントリーポイント
  - `Resources/`: シーンデータ、コンポーネント、シェーダー
  - `Globals/`: グローバル状態とWebGLコンテキスト
  - `Utils/`: ユーティリティ関数
- `src/tsx/`: React統合コンポーネント
- `plugins/`: ビルド最適化用カスタムViteプラグイン
- `docs/`: 包括的なアーキテクチャドキュメント

### ビルドシステム詳細
- **2つのビルド設定**: 
  - `vite.config.ts`: Reactサポート付き開発モード
  - `vite-player.config.ts`: 64KBデモ用プロダクションビルド（積極的最適化）
- **カスタムViteプラグイン**:
  - `ShaderMinifierLoader`: サイズ最適化のためGLSLシェーダーを最小化
  - `ResourceManager`: シーンデータとアセット処理
  - `OREngineFileSystemPlugin`: ファイルシステムユーティリティ
  - `MangleManager`: サイズ削減のためプロパティ名マングル

### コンポーネントシステム
コンポーネントは`src/ts/Resources/Components/`にあり、以下のパターンに従います：
- 各コンポーネントは`index.ts`エントリーポイントを持つ
- 専用の`shaders/`サブディレクトリにシェーダーファイル
- コンポーネントはカメラコントロール、マテリアル、ポストプロセス効果、ユーティリティが可能

### アーキテクチャ理解のための重要ファイル
- `data/scene.json`: メインシーン設定（プロダクションビルドで使用）
- `src/ts/Resources/scene.json`: 開発用シーン設定
- `src/ts/Resources/_data/componentList.ts`: 利用可能コンポーネントのレジストリ
- `src/ts/Globals/index.ts`: グローバルWebGLコンテキストとユニフォーム
- `packages/orengine/index.tsx`: メインエンジンエントリーポイント

## ShaderMinifierセットアップ

プロダクションビルドには[Shader_Minifier](https://github.com/laurentlb/Shader_Minifier)が必要です：

**macOS**: `shader_minifier.exe`を`/Documents/application/shader_minifier/shader_minifier.exe`に配置し、`brew install mono`でMonoをインストール

**Windows**: ShaderMinifierをインストールしてPATHに設定

開発中にシェーダー最小化をスキップするには`SKIP_SHADER_MINIFIER=true`環境変数を設定してください。

## 開発ノート

- プロジェクトはNode.jsバージョン管理にVoltaを使用（v23.3.0）
- WebGLコンテキストとグローバルユニフォームは`Globals`モジュールで管理
- シーンデータはJSONから読み込まれる
- 開発モードでコンポーネントホットリロードをサポート
- ビルドシステムはサイズ最適化のため積極的な最小化とプロパティマングルを含む

## ドキュメント（docsディレクトリ）

詳細なアーキテクチャドキュメントが`docs/`ディレクトリに整理されています：

### アーキテクチャ (`docs/architecture/`)
- `overview.md`: システム全体の構成とパッケージ構造
- `core.md`: システムの基盤とデータフロー
- `project-structure.md`: ディレクトリ構成とビルドシステム
- `improvements.md`: 改善点とロードマップ

### コア機能 (`docs/core/`)
- `entity.md`: エンティティシステムとシーングラフ管理
- `components.md`: コンポーネントシステムの設計と標準コンポーネント
- `render-pipeline.md`: レンダリングパイプラインとシェーダーシステム

### ガイド (`docs/guides/`)
- `setup.md`: 詳細なインストール手順と開発環境構築

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

インポート時は以下のように使用：
- `import { ... } from 'glpower'` - WebGL基本機能
- `import { ... } from 'maxpower'` - コンポーネントシステム
- `import { ... } from 'orengine'` - エンジンコア
- `import { ... } from '~/ts/...'` - プロジェクトルート（src/）からの相対パス

## 音楽シェーダーシステム

このプロジェクトではGLSLシェーダーで音楽を生成する独自システムを実装しています。詳細は [`MUSIC.md`](./MUSIC.md) を参照してください。