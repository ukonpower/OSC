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
6. **オプショナルチェーン(`?.`)は避ける** - トランスパイル時に冗長なコードになるため、代わりに`&&`演算子を使用する
   - 悪い例: `obj?.prop || defaultValue` → トランスパイル後に余計な変数や条件分岐が生成される
   - 良い例: `obj && obj.prop || defaultValue` → コンパクトにトランスパイルされる

コードレビュー時は常にファイルサイズへの影響を考慮してください。

## 📚 開発ドキュメント

**重要**: 以下のドキュメントは開発時に必ず参照してください。各実装タスクに応じて該当するドキュメントを確認することで、正しいアーキテクチャとベストプラクティスに従った開発が可能になります。

- **[アーキテクチャ詳細](./docs/ARCHITECTURE.md)** - ディレクトリ構造、コア構造、ビルドシステム、パス解決
  - プロジェクト全体の構造を理解する際に参照
  - モジュールのインポートパスやファイル配置に迷った際に参照

- **[コンポーネント開発ガイド](./docs/COMPONENT_DEVELOPMENT.md)** - カスタムコンポーネントの作成方法
  - **新規コンポーネントを実装する際は必ず参照すること**
  - ライフサイクルメソッド、グローバルユニフォーム、Serializableフィールドの使い方

- **[シェーダーシステム](./docs/SHADER_SYSTEM.md)** - シェーダーincludeシステム、gバッファーレイアウト
  - **シェーダーを実装・編集する際は必ず参照すること**
  - gバッファーの空きチャンネルを使用する際は必ず確認

- **[音楽シェーダーシステム](./MUSIC.md)** - GLSLによる音楽生成システム
  - 音楽関連機能を実装する際に参照

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

### 品質チェック
```bash
npm run lint        # ESLintチェック
npm run type-check  # TypeScript型チェック
```

### ドキュメント
```bash
npm run storybook       # ポート6006でStorybook開発サーバー起動
npm run build:storybook # Storybookビルド
```

## 主要パッケージ（モノレポ構造）

- `packages/glpower`: コアWebGL抽象化ライブラリ（gitサブモジュール）
- `packages/maxpower`: エンジンコアシステム（Entity、Component、Serializable、レンダリングパイプライン等）
- `packages/orengine`: React統合UIコンポーネント（エディタパネル、プリミティブ、フック等）

詳細は [アーキテクチャドキュメント](./docs/ARCHITECTURE.md) を参照してください。

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

### Claude Code開発時の注意事項

- **開発サーバー**: ユーザーは通常`localhost:3000`で開発サーバーを起動しているため、**新たにサーバーを立ち上げないこと**
- **型チェック**: コード変更後は必ず最後に`npm run type-check`を実行してTypeScriptの型エラーがないことを確認すること
- **ビルドサイズ**: 変更によるファイルサイズへの影響を常に意識し、必要に応じて`npm run build`で確認すること
- **実装時のコメント**: 実装の差分を説明するコメント（「ここで〜を変更」「〜に対応するため」など）は残さないこと。コードそのものが自明であるべき
- **BLidger uniformsのバインド**: BLidgerコンポーネントのuniformsをバインドする際は、以下の優先順位で使用すること
  1. `src/shortcuts.ts`の`bindBlidgeUniform()`が使える場合（Mesh向け）: それを使用
  2. それ以外の場合: `blidger.bindUniforms(targetUniforms)`を直接使用
  - ❌ 悪い例: `blidger.uniforms`を直接マージする
  - ✅ 良い例: `blidger.bindUniforms(uniforms)`でバインドする

