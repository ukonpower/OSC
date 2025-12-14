# OSC

SESSIONS 2025 で発表した 64KB intro demo です。

デモページ: https://ukonpower.github.io/OSC/

![OSC screen shot](./screenshot/osc.jpg)

## インストール

### 1. サブモジュールと依存パッケージの取得

`packages/glpower` は git submodule として提供されています。このサブモジュールを含む依存パッケージ一式を取得するため、以下のコマンドを実行します。

```bash
npm run init
```

### 2. ShaderMinifier の準備

[Shader_Minifier](https://github.com/laurentlb/Shader_Minifier) を取得し、実行ファイルへのパスを通してください。

#### Windows

ShaderMinifier をインストール後、システムの環境変数 PATH に追加します。

#### macOS

`shader_minifier.exe` を `~/shader_minifier/shader_minifier.exe` に配置し、Mono をインストールします。

```bash
brew install mono
```

## 実行

```bash
npm run dev
```

## ビルド

```bash
npm run build
```

## クレジット

ビルドサイズを 64KB 以下に抑えるにあたり、以下のツールに多大な助力をいただきました。
作者の皆さまに心より感謝いたします。

- [compeko](https://gist.github.com/0b5vr/09ee96ca2efbe5bf9d64dad7220e923b) by **0b5vr**
- [Shader Minifier](https://github.com/laurentlb/shader-minifier?tab=readme-ov-file) by **Ctrl-Alt-Test**

## ライセンス

このプロジェクトは [MIT License](./LICENSE) の下で公開されています。
