# CLAUDE.md

このファイルは、このリポジトリで作業するときのClaude Code (claude.ai/code)向けのガイダンスを提供します。

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
- `src/ts/Resources/scene.json`: メインシーン設定
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
- シーンデータはJSONから読み込まれ、Blender統合（BLidgeシステム）で編集可能
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

### インテグレーション (`docs/integration/`)
- `blender.md`: BLidgeシステムによるBlender連携とアセットパイプライン

### ガイド (`docs/guides/`)
- `setup.md`: 詳細なインストール手順と開発環境構築