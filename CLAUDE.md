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

## アーキテクチャ

### コア構造
- **コンポーネントベースエンティティシステム**: エンティティは機能ごとにモジュラーコンポーネントを持つ
- **WebGLレンダリングパイプライン**: `glpower`パッケージのカスタムWebGL抽象化上に構築
- **リソース管理**: シーンデータ、シェーダー、アセットをJSON設定で管理
- **Deferredレンダリング**: ポストプロセス効果を含む高度なレンダリングパイプライン

### 主要パッケージ（モノレポ構造）
- `packages/glpower`: コアWebGL抽象化ライブラリ（gitサブモジュール）
- `packages/maxpower`: エンジンコアシステム（Entity、Component、Serializable、レンダリングパイプライン等）
- `packages/orengine`: React統合UIコンポーネント（エディタパネル、プリミティブ、フック等）

### ディレクトリ構造

#### ルート
- `plugins/`: ビルド最適化用カスタムViteプラグイン（ShaderMinifier、ResourceManager等）
- `data/`: プロダクションビルド用シーンデータ
- `blend-files/`: Blenderファイル

#### `src/` - アプリケーションコード
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

#### `packages/maxpower/` - エンジンコア
- `Entity/`: エンティティシステム
- `Component/`: 基本コンポーネント（Camera、Renderer、Mesh、Light等）
- `Serializable/`: シリアライズ可能オブジェクト
- `Material/`, `Geometry/`: マテリアル・ジオメトリシステム
- `PostProcess/`: ポストプロセスパス
- `Loaders/`: GLTFローダー、Gaussian Splattingローダー
- `BLidge/`: Blender統合
- `Utils/`: シェーダーパーサー、ユニフォーム管理等

#### `packages/orengine/` - React統合
- `features/`: メイン機能
  - `OREngine/`: エンジンコア機能（Resources、FrameDebugger、Keyboard、Pointer等）
  - `OREditor/`: エディタコア機能
- `components/`: UIコンポーネント
  - `panels/`: エディタパネル（Timeline、Hierarchy、EntityProperty、Screen等）
  - `composites/`: 複合コンポーネント（Panel、Block、Vector、Value等）
  - `primitives/`: 基本UIコンポーネント（Button、Input、Label、Canvas、Icons）
- `hooks/`: カスタムReactフック
- `stories/`: Storybookストーリー

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
コンポーネントは2層構造：
- **基本コンポーネント** (`packages/maxpower/Component/`): Camera、Renderer、Mesh、Light等のエンジン標準コンポーネント
- **カスタムコンポーネント** (`src/resources/Components/`): デモ固有コンポーネント
  - 各コンポーネントは`index.ts`エントリーポイントを持つ
  - 専用の`shaders/`サブディレクトリにシェーダーファイル
  - MainCameraのPostProcess、ObjectControls、Demo4固有機能等

### アーキテクチャ理解のための重要ファイル
- `src/app/player/index.ts`: プロダクションビルドのエントリーポイント
- `src/app/editor/main.tsx`: 開発エディタのエントリーポイント
- `data/scene.json`: プロダクションビルド用シーン設定
- `src/resources/scene.json`: 開発用シーン設定
- `src/resources/_data/componentList.ts`: カスタムコンポーネントのレジストリ
- `src/globals/index.ts`: グローバルWebGLコンテキストとユニフォーム
- `packages/orengine/index.tsx`: React統合のメインエクスポート
- `packages/maxpower/index.ts`: エンジンコアのメインエクスポート

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
- `import { ... } from 'glpower'` - WebGL基本機能（GLPowerクラス、テクスチャ、フレームバッファ等）
- `import { ... } from 'maxpower'` - エンジンコアシステム（Entity、Component、Material、Geometry等）
- `import { ... } from 'orengine'` - React統合（OREngine、OREditor、UIコンポーネント、フック等）
- `import { ... } from '~/...'` - プロジェクトルート（src/）からの相対パス

## カスタムコンポーネント開発ガイド

このプロジェクトでは`src/resources/Components/`内にカスタムコンポーネントを作成することが主な開発作業となります。以下は新規コンポーネント作成の完全ガイドです。

### コンポーネントの基本構造

#### 1. コンポーネントクラスの作成

すべてのコンポーネントは`maxpower`の`Component`クラスを継承します。`Component`は`Serializable`を継承しており、エディタUIとの連携機能を提供します。

**基本的な構造:**

```typescript
import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class YourComponent extends MXP.Component {

    // プライベート変数（内部状態）
    private someValue: number;
    private someVector: GLP.Vector;

    constructor( params: MXP.ComponentParams ) {
        super( params );

        // 初期化処理
        this.someValue = 1.0;
        this.someVector = new GLP.Vector();

        // エディタフィールドの定義（オプション）
        if ( import.meta.env.DEV ) {
            this.field( "someValue", () => this.someValue, ( v ) => this.someValue = v );
        }

        // orderプロパティで実行順序を制御可能（デフォルトは0）
        this.order = 0;
    }

    // 毎フレーム実行（エンティティのupdateフェーズ）
    protected updateImpl( event: MXP.ComponentUpdateEvent ): void {
        // アニメーションロジックや状態更新
    }

    // updateの後に実行
    protected postUpdateImpl( event: MXP.ComponentUpdateEvent ): void {
        // 他のコンポーネントのupdateが完了した後の処理
    }

    // レンダリング前に実行
    protected beforeRenderImpl( event: MXP.ComponentUpdateEvent ): void {
        // レンダリング前の最終調整
    }

    // レンダリング後に実行
    protected afterRenderImpl( event: MXP.ComponentUpdateEvent ): void {
        // レンダリング後の後処理
    }

    // コンポーネント破棄時
    public dispose() {
        super.dispose();
        // リソースのクリーンアップ
    }
}
```

#### 2. 実装のポイント

**ComponentUpdateEventの内容:**
- `event.timeDelta`: 前フレームからの経過時間（秒）
- `event.time`: アプリケーション起動からの経過時間（秒）
- `event.resolution`: 画面解像度（GLP.Vector）

**Entityへのアクセス:**
- `this.entity`: コンポーネントがアタッチされているエンティティ
- `this.entity.matrixWorld`: ワールド変換行列
- `this.entity.position`, `this.entity.quaternion`, `this.entity.scale`: トランスフォーム
- `this.entity.getComponent<T>()`: 他のコンポーネントの取得
- `this.entity.addComponent()`: コンポーネントの追加
- `this.entity.findEntityByName()`: 名前でエンティティ検索

**ライフサイクルメソッドの実行順序:**
1. `updateImpl()` - 全エンティティの更新
2. `postUpdateImpl()` - 全エンティティのポスト更新
3. `beforeRenderImpl()` - 全エンティティのレンダリング前処理
4. レンダリング実行
5. `afterRenderImpl()` - 全エンティティのレンダリング後処理

**enabledプロパティ:**
- `this.enabled`: コンポーネントの有効/無効を制御
- `false`の場合、すべてのライフサイクルメソッドがスキップされる

#### 3. Serializableフィールドシステム

エディタUIに表示・編集可能なフィールドを定義できます。

```typescript
// 基本的なフィールド定義
this.field( "fieldName", () => this.value, ( v ) => this.value = v );

// オプション付きフィールド
this.field( "speed", () => this.speed, ( v ) => this.speed = v, {
    readOnly: false,  // 読み取り専用
    noExport: false,  // シーン出力時に除外
    hidden: false,    // エディタで非表示
    min: 0,           // 最小値
    max: 10,          // 最大値
    step: 0.1,        // ステップ値
});

// ベクトルフィールド
this.field( "position", () => this.position, ( v ) => this.position.copy( v ), {
    format: { type: "vector" }
});

// 配列フィールド
this.field( "items", () => this.items, ( v ) => this.items = v, {
    format: { type: "array" }
});

// 選択リストフィールド
this.field( "mode", () => this.mode, ( v ) => this.mode = v, {
    format: {
        type: "select",
        list: [
            { label: "Mode A", value: "a" },
            { label: "Mode B", value: "b" }
        ]
    }
});

// フォルダ構造
const folder = this.fieldDir( "Settings" );
folder.field( "value1", () => this.value1, ( v ) => this.value1 = v );
folder.field( "value2", () => this.value2, ( v ) => this.value2 = v );
```

#### 4. シェーダーを使用するコンポーネント

シェーダーファイルは`shaders/`サブディレクトリに配置します。

**ディレクトリ構造例:**
```
Components/
  YourComponent/
    index.ts
    shaders/
      shader.vs
      shader.fs
```

**シェーダーのインポートと使用:**
```typescript
import shaderVert from './shaders/shader.vs';
import shaderFrag from './shaders/shader.fs';

export class YourComponent extends MXP.Component {
    private material: MXP.Material;

    constructor( params: MXP.ComponentParams ) {
        super( params );

        // マテリアルの作成
        this.material = new MXP.Material( {
            phase: [ "deferred" ],  // レンダリングフェーズ
            vert: shaderVert,
            frag: shaderFrag,
            uniforms: {
                uCustomValue: { type: "1f", value: 0 }
            }
        } );
    }

    protected updateImpl( event: MXP.ComponentUpdateEvent ): void {
        // ユニフォームの更新
        this.material.uniforms.uCustomValue.value = Math.sin( event.time );
    }
}
```

### 実装例

#### 例1: シンプルな回転コンポーネント

```typescript
// src/resources/Components/ObjectControls/ObjectRotate/index.ts
import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class ObjectRotate extends MXP.Component {
    private speed: number;
    private rotQuaternion: GLP.Quaternion;

    constructor( params: MXP.ComponentParams ) {
        super( params );
        this.speed = 1;
        this.rotQuaternion = new GLP.Quaternion();
    }

    protected updateImpl( event: MXP.ComponentUpdateEvent ): void {
        // Y軸を中心に回転
        this.rotQuaternion.setFromEuler(
            new GLP.Euler( 0, -0.4 * event.timeDelta * this.speed, 0 )
        );
        this.entity.quaternion.multiply( this.rotQuaternion );
    }
}
```

#### 例2: LookAtコンポーネント（ターゲット追跡）

```typescript
// src/resources/Components/ObjectControls/LookAt/index.ts
import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class LookAt extends MXP.Component {
    public target: MXP.Entity | null;
    private up: GLP.Vector;
    private entityWorldPos: GLP.Vector;
    private targetWorldPos: GLP.Vector;

    constructor( params: MXP.ComponentParams ) {
        super( params );
        this.target = null;
        this.entityWorldPos = new GLP.Vector();
        this.targetWorldPos = new GLP.Vector();
        this.up = new GLP.Vector( 0.0, 1.0, 0.0 );

        // カメラより後に実行されるように順序を設定
        this.order = 9999;
    }

    public setTarget( target: MXP.Entity | null ) {
        this.target = target;
    }

    protected beforeRenderImpl( event: MXP.ComponentUpdateEvent ): void {
        if ( this.target && this._enabled ) {
            // 現在位置とターゲット位置を取得
            this.entity.matrixWorld.decompose( this.entityWorldPos );
            this.target.matrixWorld.decompose( this.targetWorldPos );

            // ターゲットを向く
            this.entity.matrixWorld.lookAt(
                this.entityWorldPos,
                this.targetWorldPos,
                this.up
            );

            // カメラコンポーネントがあればビュー行列を更新
            const camera = this.entity.getComponentsByTag<MXP.Camera>( "camera" )[ 0 ];
            if ( camera ) {
                camera.viewMatrix.copy( this.entity.matrixWorld ).inverse();
            }
        }
    }
}
```

#### 例3: テクスチャジェネレーター（リソース管理）

```typescript
// src/resources/Components/Texture/TextureGenerator/index.ts
import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { Engine, TexProcedural } from 'orengine';

import noiseFrag from './shaders/noise.fs';

import { gl } from '~/globals';

export class TextureGenerator extends MXP.Component {
    private updateTextures: TexProcedural[];

    constructor( params: MXP.ComponentParams ) {
        super( params );

        this.updateTextures = [];

        const engine = Engine.getInstance( gl );
        const renderer = engine.renderer;

        // 静的テクスチャの生成
        Engine.resources.addTexture( "noise", new TexProcedural( renderer, {
            frag: noiseFrag,
            resolution: new GLP.Vector( 1024, 1024 )
        } ) );

        // 動的テクスチャの生成（毎フレーム更新）
        this.updateTextures.push(
            Engine.resources.addTexture( "noise_anime", new TexProcedural( renderer, {
                frag: noiseFrag,
                uniforms: engine.uniforms,  // グローバルユニフォーム使用
                resolution: new GLP.Vector( 512, 512 ),
            } ) )
        );

        // クリーンアップ処理の登録
        this.once( "dispose", () => {
            this.updateTextures.forEach( ( tex ) => tex.dispose() );
            this.updateTextures = [];
        } );
    }

    protected updateImpl( event: MXP.ComponentUpdateEvent ): void {
        // 動的テクスチャを毎フレーム更新
        for ( let i = 0; i < this.updateTextures.length; i++ ) {
            this.updateTextures[ i ].render();
        }
    }
}
```

### コンポーネントの登録

**重要**: コンポーネントの登録は自動で実行されます。`src/resources/_data/componentList.ts`への手動追加は**不要**です。

適切なディレクトリ構造（`src/resources/Components/カテゴリ名/コンポーネント名/index.ts`）にファイルを配置するだけで、ビルドシステムが自動的にコンポーネントを認識し、登録します。

### ベストプラクティス

1. **64KB制約を意識する**: 不要な抽象化や冗長なコードは避ける
2. **リソース管理**: `dispose()`で必ずリソースをクリーンアップ
3. **一時オブジェクトの再利用**: `GLP.Vector`などは毎フレーム生成せず使い回す
4. **適切なライフサイクルメソッドを選ぶ**: 処理のタイミングに応じて適切なメソッドを使用
5. **orderプロパティの活用**: コンポーネント間の実行順序が重要な場合に設定
6. **コメントは積極的に**: ビルド時に削除されるので可読性重視で記述
7. **変数名はわかりやすく**: マングルされるので短縮不要

### デバッグのヒント

- `console.log()`はビルド時に削除されるので自由に使用可能
- エディタUIでコンポーネントのプロパティをリアルタイム編集可能（`field()`定義が必要）
- `this.enabled`を使ってコンポーネントの有効/無効を切り替え可能
- イベントシステム: `this.emit()`と`this.on()`でカスタムイベント送受信可能

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
    return SDFResult( d, p, 0.0 );
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

## 音楽シェーダーシステム

このプロジェクトではGLSLシェーダーで音楽を生成する独自システムを実装しています。詳細は [`MUSIC.md`](./MUSIC.md) を参照してください。