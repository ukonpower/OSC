# コンポーネント開発ガイド

このプロジェクトでは`src/resources/Components/`内にカスタムコンポーネントを作成することが主な開発作業となります。以下は新規コンポーネント作成の完全ガイドです。

## コンポーネントの基本構造

### 1. コンポーネントクラスの作成

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

### 2. 実装のポイント

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

### 3. Serializableフィールドシステム

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

### 4. シェーダーを使用するコンポーネント

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

### 5. グローバルユニフォームの使用

グローバルユニフォームは`src/globals/index.ts`で定義されており、複数のコンポーネント間で共有される共通のユニフォーム値です。

**利用可能なグローバルユニフォームカテゴリ:**
- `globalUniforms.time`: 時間関連（`uTime`, `uTimeF`, `uTimeE`, `uTimeEF`）
- `globalUniforms.resolution`: 解像度関連（`uResolution`, `uAspectRatio`）
- `globalUniforms.camera`: カメラ行列（`projectionMatrix`, `viewMatrix`）
- `globalUniforms.gBuffer`: Gバッファテクスチャ（`uGBufferPos`, `uGBufferNormal`）
- `globalUniforms.tex`: 共有テクスチャ（動的に追加される）
- `globalUniforms.music`: 音楽関連（`uMusicFreqTex`, `uMusicDomainTex`）

**グローバルユニフォームの使用例:**
```typescript
import { globalUniforms } from '~/globals';

export class YourComponent extends MXP.Component {
    constructor( params: MXP.ComponentParams ) {
        super( params );

        const mat = new MXP.Material( {
            frag: shaderFrag,
            // 必要なグローバルユニフォームをマージ
            uniforms: MXP.UniformsUtils.merge(
                globalUniforms.resolution,
                globalUniforms.time,
                globalUniforms.tex,  // テクスチャが必要な場合
                {
                    // カスタムユニフォームも追加可能
                    uCustomValue: { type: "1f", value: 0 }
                }
            )
        } );
    }
}
```

**シェーダー側での使用:**
```glsl
// グローバルユニフォームは自動的に利用可能
uniform float uTimeE;           // globalUniforms.time から
uniform vec2 uResolution;        // globalUniforms.resolution から
uniform sampler2D uNoiseTex;    // globalUniforms.tex から（登録されている場合）

void main() {
    // グローバルユニフォームを使用
    vec2 uv = gl_FragCoord.xy / uResolution;
    float time = uTimeE;
    vec4 noise = texture(uNoiseTex, uv);
    // ...
}
```

**テクスチャのグローバルユニフォームへの登録:**

テクスチャを`globalUniforms.tex`に登録することで、全コンポーネントから共有アクセス可能になります：

```typescript
import { globalUniforms } from '~/globals';

// テクスチャをグローバルユニフォームに追加
globalUniforms.tex.uNoiseTex = {
    value: noiseTexture,
    type: "1i"
};
```

通常、テクスチャの登録はTextureGeneratorなどの専用コンポーネントで行われます。

## 実装例

### 例1: シンプルな回転コンポーネント

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

### 例2: LookAtコンポーネント（ターゲット追跡）

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

### 例3: テクスチャジェネレーター（リソース管理）

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

## コンポーネントの登録

**重要**: コンポーネントの登録は自動で実行されます。`src/resources/_data/componentList.ts`への手動追加は**不要**です。

適切なディレクトリ構造（`src/resources/Components/カテゴリ名/コンポーネント名/index.ts`）にファイルを配置するだけで、ビルドシステムが自動的にコンポーネントを認識し、登録します。

## ベストプラクティス

1. **64KB制約を意識する**: 不要な抽象化や冗長なコードは避ける
2. **リソース管理**: `dispose()`で必ずリソースをクリーンアップ
3. **一時オブジェクトの再利用**: `GLP.Vector`などは毎フレーム生成せず使い回す
4. **適切なライフサイクルメソッドを選ぶ**: 処理のタイミングに応じて適切なメソッドを使用
5. **orderプロパティの活用**: コンポーネント間の実行順序が重要な場合に設定
6. **コメントは積極的に**: ビルド時に削除されるので可読性重視で記述
7. **変数名はわかりやすく**: マングルされるので短縮不要

## デバッグのヒント

- `console.log()`はビルド時に削除されるので自由に使用可能
- エディタUIでコンポーネントのプロパティをリアルタイム編集可能（`field()`定義が必要）
- `this.enabled`を使ってコンポーネントの有効/無効を切り替え可能
- イベントシステム: `this.emit()`と`this.on()`でカスタムイベント送受信可能
