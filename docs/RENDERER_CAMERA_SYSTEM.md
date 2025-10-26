# レンダラーとカメラシステムの再設計

## 概要

OREngineのレンダラーとカメラシステムを、エディター/プレイヤーの明確な分離と64KBビルド制約に対応するために再設計します。

## 現状の課題

### 1. Rendererの問題点
- `Component`を継承しているが、実際にはシーングラフに追加されていない
- Engineが直接保持して使用する中途半端な設計
- システムレベルの存在なのにコンポーネントである必然性がない

### 2. Cameraの問題点
- `displayOut`という曖昧なbooleanフラグで画面出力を制御
- エディター用/プレイヤー用の区別が不明確
- どのカメラが何のためにレンダリングされているか不明確

### 3. エディター/プレイヤー分離の問題
- エディター機能とプレイヤー機能が混在
- プロダクションビルドにエディター用コードが含まれる可能性
- 64KB制約に対して不要なコードが含まれる

## 解決策

### アーキテクチャ概要

```
┌─────────────────────────────────────────┐
│           Engine                        │
│  ┌─────────────────────────────────┐   │
│  │  _gameRenderer: GameRenderer    │   │  常に存在
│  │  _editorRenderer?: EditorRenderer│   │  開発時のみ
│  │  _activeRenderer: RendererBase  │   │  アクティブなレンダラー
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
         │
         │ render()
         ▼
┌─────────────────────────────────────────┐
│       RendererBase (抽象クラス)          │
│  - Component継承をやめる                 │
│  - システムレベルの独立したクラス         │
└─────────────────────────────────────────┘
         │
         ├──────────────┬──────────────┐
         ▼              ▼              ▼
  ┌──────────┐  ┌──────────────┐  ┌─────────┐
  │  Game    │  │   Editor     │  │ 将来の  │
  │ Renderer │  │  Renderer    │  │拡張用   │
  │          │  │              │  │         │
  │(常に含む)│  │(DEVのみ)     │  │         │
  └──────────┘  └──────────────┘  └─────────┘
```

## 実装詳細

### 1. RendererBase（基底クラス）

```typescript
// packages/maxpower/Renderer/RendererBase.ts

/**
 * レンダラー基底クラス
 * Componentから完全に独立したシステムクラス
 */
export abstract class RendererBase extends GLP.EventEmitter {

  public readonly name: string;
  protected gl: WebGL2RenderingContext;
  protected programManager: MXP.ProgramManager;
  public resolution: GLP.Vector;

  constructor( gl: WebGL2RenderingContext, name: string ) {
    super();
    this.name = name;
    this.gl = gl;
    this.programManager = new MXP.ProgramManager( gl );
    this.resolution = new GLP.Vector();
  }

  /**
   * レンダリング実行（サブクラスで実装）
   */
  public abstract render( root: MXP.Entity, event: MXP.EntityUpdateEvent ): void;

  /**
   * リサイズ
   */
  public resize( resolution: GLP.Vector ): void {
    this.resolution.copy( resolution );
  }

  /**
   * アクティブ化時の処理
   */
  public abstract onActivate(): void;

  /**
   * 非アクティブ化時の処理
   */
  public abstract onDeactivate(): void;

  /**
   * シェーダーコンパイル
   */
  public compileShaders( root: MXP.Entity ): void {
    // 共通のシェーダーコンパイル処理
  }

  // 共通のレンダリングヘルパーメソッド
  protected getRenderStack( root: MXP.Entity ): RenderStack { /* ... */ }
  protected renderCamera( ... ) { /* ... */ }
  protected renderPostProcess( ... ) { /* ... */ }
  protected updateLights( ... ) { /* ... */ }
}
```

### 2. GameRenderer（プレイヤー用）

```typescript
// packages/maxpower/Renderer/GameRenderer.ts

/**
 * ゲーム（プレイヤー）用レンダラー
 * プロダクションビルドにも含まれる軽量レンダラー
 *
 * 特徴:
 * - メインカメラのみをレンダリング
 * - ギズモやグリッドなどのエディタ機能なし
 * - 最小限の処理で高速
 */
export class GameRenderer extends RendererBase {

  private _mainCamera: RenderCamera | null = null;
  private _deferredRenderer: DeferredRenderer;
  private _pipelinePostProcess: PipelinePostProcess;

  constructor( gl: WebGL2RenderingContext ) {
    super( gl, 'GameRenderer' );

    this._deferredRenderer = new DeferredRenderer( gl );
    this._pipelinePostProcess = new PipelinePostProcess( gl );
  }

  /**
   * メインカメラを設定
   */
  public setMainCamera( camera: RenderCamera | null ): void {
    this._mainCamera = camera;
  }

  public onActivate(): void {
    // ゲームモード開始時の処理
  }

  public onDeactivate(): void {
    // ゲームモード終了時の処理
  }

  public render( root: MXP.Entity, event: MXP.EntityUpdateEvent ): void {

    root.onBeforeRender( event );

    // メインカメラの自動検出
    if ( !this._mainCamera ) {
      this._mainCamera = this.findMainCamera( root );
    }

    if ( !this._mainCamera ) {
      root.onAfterRender( event );
      return;
    }

    const stack = this.getRenderStack( root );

    // ライト処理
    this.updateLights( stack.light );

    // シャドウマップレンダリング
    this.renderShadowMaps( stack.shadowMap );

    // 環境マップレンダリング
    this.renderEnvMaps( stack.envMap );

    // メインカメラレンダリング
    this.renderMainCamera( this._mainCamera, stack );

    // 画面出力
    this.outputToScreen( this._mainCamera );

    root.onAfterRender( event );
  }

  /**
   * usage='main'のカメラを探す
   */
  private findMainCamera( root: Entity ): RenderCamera | null {
    const cameras: RenderCamera[] = [];
    this.collectCameras( root, cameras );
    return cameras.find( c => c.usage === 'main' ) || cameras[ 0 ] || null;
  }

  private renderMainCamera( camera: RenderCamera, stack: RenderStack ): void {

    // Deferredレンダリング
    this.renderCamera( "deferred", camera, stack.deferred, camera.renderTarget.gBuffer );

    // Deferredシェーディング
    this._deferredRenderer.setRenderCamera( camera );
    this.renderPostProcess( this._deferredRenderer.postprocess );

    // Forwardレンダリング
    this.renderCamera( "forward", camera, stack.forward, camera.renderTarget.forwardBuffer );

    // シーンポストプロセス
    this._pipelinePostProcess.setRenderCamera( camera );
    this.renderPostProcess( this._pipelinePostProcess.postprocess );

    // カメラ固有のポストプロセス
    const postProcessPipeline = camera.entity.getComponent( PostProcessPipeline );
    if ( postProcessPipeline ) {
      this.renderPostProcess( postProcessPipeline.postprocess );
    }

    // UIレンダリング
    this.renderCamera( "ui", camera, stack.ui, camera.renderTarget.uiBuffer );
  }
}
```

### 3. EditorRenderer（エディター用）

```typescript
// packages/orengine/features/OREditor/EditorRenderer.ts

/**
 * エディター用レンダラー
 * 開発ビルドのみに含まれる機能豊富なレンダラー
 *
 * 特徴:
 * - ギズモ、グリッド、アウトラインなどのエディタ機能
 * - エディターカメラからのレンダリング
 * - 選択エンティティのハイライト
 *
 * ⚠️ このクラスはimport.meta.env.DEVガード内でのみimportされる
 */
export class EditorRenderer extends RendererBase {

  private _editorCamera: RenderCamera | null = null;
  private _gizmoRenderer: GizmoRenderer;
  private _gridRenderer: GridRenderer;
  private _outlineRenderer: OutlineRenderer;
  private _selectedEntity: Entity | null = null;

  constructor( gl: WebGL2RenderingContext ) {
    super( gl, 'EditorRenderer' );

    // エディター専用の描画システム
    this._gizmoRenderer = new GizmoRenderer( gl );
    this._gridRenderer = new GridRenderer( gl );
    this._outlineRenderer = new OutlineRenderer( gl );
  }

  /**
   * エディターカメラを設定
   */
  public setEditorCamera( camera: RenderCamera | null ): void {
    this._editorCamera = camera;
  }

  /**
   * 選択エンティティを設定（ギズモやアウトライン表示用）
   */
  public setSelectedEntity( entity: Entity | null ): void {
    this._selectedEntity = entity;
  }

  public onActivate(): void {
    console.log( '[EditorRenderer] Activated' );
    // エディターカメラを自動検出または作成
  }

  public onDeactivate(): void {
    console.log( '[EditorRenderer] Deactivated' );
  }

  public render( root: MXP.Entity, event: MXP.EntityUpdateEvent ): void {

    root.onBeforeRender( event );

    // エディターカメラの自動検出
    if ( !this._editorCamera ) {
      this._editorCamera = this.findEditorCamera( root );
    }

    if ( !this._editorCamera ) {
      root.onAfterRender( event );
      return;
    }

    const stack = this.getRenderStack( root );

    // 通常のシーンレンダリング（GameRendererと同じ）
    this.updateLights( stack.light );
    this.renderShadowMaps( stack.shadowMap );
    this.renderEnvMaps( stack.envMap );
    this.renderMainCamera( this._editorCamera, stack );

    // === エディター専用の追加描画 ===

    // グリッド表示
    this._gridRenderer.render( this._editorCamera );

    // 選択エンティティのアウトライン
    if ( this._selectedEntity ) {
      this._outlineRenderer.render( this._editorCamera, this._selectedEntity );
    }

    // ギズモ表示
    if ( this._selectedEntity ) {
      this._gizmoRenderer.render( this._editorCamera, this._selectedEntity );
    }

    // 画面出力
    this.outputToScreen( this._editorCamera );

    root.onAfterRender( event );
  }

  /**
   * usage='editor'のカメラを探す
   */
  private findEditorCamera( root: Entity ): RenderCamera | null {
    const cameras: RenderCamera[] = [];
    this.collectCameras( root, cameras );
    return cameras.find( c => c.usage === 'editor' ) || null;
  }
}
```

### 4. Engine側の統合

```typescript
// packages/orengine/features/OREngine/core/index.ts

export class Engine extends GLP.EventEmitter {

  private _gl: WebGL2RenderingContext;
  private _gameRenderer: GameRenderer;
  private _editorRenderer?: EditorRenderer; // 開発時のみ存在
  private _activeRenderer: RendererBase;

  constructor( gl: WebGL2RenderingContext ) {

    super();

    this._gl = gl;

    // GameRendererは常に作成（プロダクションビルドで必要）
    this._gameRenderer = new GameRenderer( gl );
    this._activeRenderer = this._gameRenderer;

    // EditorRendererは開発時のみ作成可能
    // ここでは作成せず、必要になったら動的にimportして作成

    // ... その他の初期化処理 ...
  }

  /**
   * 現在アクティブなレンダラーを取得
   */
  public get renderer(): RendererBase {
    return this._activeRenderer;
  }

  /**
   * ゲームレンダラーに切り替え
   */
  public switchToGameRenderer(): void {

    if ( this._activeRenderer === this._gameRenderer ) return;

    this._activeRenderer.onDeactivate();
    this._activeRenderer = this._gameRenderer;
    this._activeRenderer.onActivate();

    console.log( '[Engine] Switched to GameRenderer' );
    this.emit( 'renderer/changed', [ this._activeRenderer ] );
  }

  /**
   * エディターレンダラーに切り替え（開発時のみ）
   *
   * @returns 切り替えに成功したらtrue、プロダクションビルドならfalse
   */
  public async switchToEditorRenderer(): Promise<boolean> {

    // プロダクションビルドでは使用不可
    if ( !import.meta.env.DEV ) {
      console.warn( '[Engine] EditorRenderer is not available in production build' );
      return false;
    }

    // エディターレンダラーが未作成なら動的にimportして作成
    if ( !this._editorRenderer ) {

      // 動的import: この部分全体がDEVガード内なのでビルド時に除外される
      const { EditorRenderer } = await import( '../../../OREditor/EditorRenderer' );
      this._editorRenderer = new EditorRenderer( this._gl );
    }

    if ( this._activeRenderer === this._editorRenderer ) return true;

    this._activeRenderer.onDeactivate();
    this._activeRenderer = this._editorRenderer;
    this._activeRenderer.onActivate();

    console.log( '[Engine] Switched to EditorRenderer' );
    this.emit( 'renderer/changed', [ this._activeRenderer ] );

    return true;
  }

  /**
   * レンダラーモードを設定（文字列指定で切り替え）
   */
  public async setRendererMode( mode: 'game' | 'editor' ): Promise<boolean> {

    if ( mode === 'game' ) {
      this.switchToGameRenderer();
      return true;
    } else if ( mode === 'editor' ) {
      return await this.switchToEditorRenderer();
    }

    return false;
  }

  public update( param?: Partial<MXP.EntityUpdateEvent> ) {

    const newTime = new Date().getTime();
    this._time.delta = ( newTime - this._time.current ) / 1000;
    this._time.current = newTime;
    this._time.engine += this._time.delta;
    this._time.code += this._time.delta * ( this._frame.playing ? 1 : 0 );
    this._frame.current = this._time.code * this._frameSetting.fps;

    const event = this.createEntityUpdateEvent( { forceDraw: param?.forceDraw } );

    this._uniforms.uTime.value = this._time.code;
    this._uniforms.uTimeE.value = this._time.engine;

    this._root.update( event );

    if ( this.enableRender ) {

      // アクティブなレンダラーでレンダリング
      this._activeRenderer.render( this._root, event );
    }

    if ( this._frame.playing ) {
      this.emit( "update/frame/play", [ this._frame ] );
    }

    return this._time.delta;
  }

  public resize( resolution: GLP.Vector ): void {
    this._activeRenderer.resize( resolution );
  }

  public compileShaders(): void {
    this._activeRenderer.compileShaders( this._root );
  }
}
```

### 5. Camera側の変更

```typescript
// packages/maxpower/Component/Camera/index.ts

/**
 * カメラの用途
 * - main: メインカメラ（プレイヤー視点、画面に出力される）
 * - editor: エディターカメラ（エディター視点、開発時のみ使用）
 * - offscreen: オフスクリーンカメラ（テクスチャへの描画のみ）
 */
export type CameraUsage = 'main' | 'editor' | 'offscreen';

export class Camera extends Component {

  // ... 既存のプロパティ ...

  /**
   * カメラの用途
   * displayOutプロパティの代わりに使用
   */
  public usage: CameraUsage;

  constructor( params: ComponentParams ) {

    super( params );

    // デフォルトはオフスクリーン（何も出力しない）
    this.usage = 'offscreen';

    // ... 既存の初期化処理 ...
  }
}
```

### 6. 使用例

#### プレイヤー用メインカメラの設定

```typescript
// src/resources/Components/Camera/MainCamera/index.ts

export class MainCamera extends MXP.Component {

  public renderCamera: MXP.RenderCamera;

  constructor( params: MXP.ComponentParams ) {

    super( params );

    // RenderCameraコンポーネントを追加
    this.renderCamera = this.entity.addComponent( MXP.RenderCamera, { gl: gl } );

    // プレイヤー用メインカメラとして設定
    this.renderCamera.usage = 'main';

    // ... その他の初期化処理 ...
  }
}
```

#### エディターでの切り替え

```typescript
// packages/orengine/features/OREditor/core/index.ts

export class Editor extends GLP.EventEmitter {

  private _engine: Engine;

  async initialize( engine: Engine ) {

    this._engine = engine;

    // エディターモードに切り替え
    if ( import.meta.env.DEV ) {

      const success = await this._engine.switchToEditorRenderer();

      if ( success ) {
        console.log( '[Editor] EditorRenderer activated' );

        // 選択エンティティの反映
        this.on( 'entity/select', ( entity: Entity | null ) => {

          const renderer = this._engine.renderer;

          if ( renderer.name === 'EditorRenderer' ) {
            ( renderer as EditorRenderer ).setSelectedEntity( entity );
          }
        } );
      }
    }
  }

  public dispose(): void {

    // エディター終了時はゲームモードに戻す
    this._engine.switchToGameRenderer();
  }
}
```

#### UIからのレンダラー切り替え

```typescript
// エディターUI内での切り替えボタン

const handleToggleRenderer = async () => {

  const engine = Engine.getInstance( gl );
  const currentMode = engine.renderer.name === 'GameRenderer' ? 'game' : 'editor';

  if ( currentMode === 'game' ) {
    await engine.setRendererMode( 'editor' );
  } else {
    await engine.setRendererMode( 'game' );
  }
};
```

## ビルドサイズ最適化

### Tree-shaking（ツリーシェイキング）

プロダクションビルド時、`import.meta.env.DEV`で囲まれた部分は完全に除外されます：

```typescript
// 開発ビルド
if ( import.meta.env.DEV ) {
  const { EditorRenderer } = await import( '...' ); // ✅ 実行される
  this._editorRenderer = new EditorRenderer( gl );
}

// プロダクションビルド
if ( false ) { // import.meta.env.DEV = false に置換される
  // ❌ この部分全体が最適化で削除される
  // EditorRendererのimportも除外される
}
```

### サイズ削減効果

- **GameRenderer**: 約10-15KB（圧縮後）
- **EditorRenderer**: 約20-30KB（圧縮後）+ ギズモ/グリッド等のアセット
- **プロダクションビルド**: EditorRenderer関連コードが完全除外され、20-30KB削減

## 移行手順

### Phase 1: 基盤構築
1. `RendererBase`を作成
2. 現在の`Renderer`を`GameRenderer`にリファクタリング
3. `Camera.usage`プロパティを追加

### Phase 2: Engine統合
4. `Engine`に動的レンダラー切り替え機能を追加
5. 既存の`this._renderer.render()`呼び出しを`this._activeRenderer.render()`に変更

### Phase 3: EditorRenderer実装
6. `EditorRenderer`を新規作成
7. ギズモ、グリッド、アウトラインレンダラーを実装
8. `Editor`クラスで`switchToEditorRenderer()`を呼び出し

### Phase 4: 既存コード更新
9. `Camera.displayOut`を`Camera.usage`に置き換え
10. 既存のカメラに適切な`usage`を設定

### Phase 5: テストと最適化
11. 開発モードでの動的切り替えをテスト
12. プロダクションビルドのサイズを確認
13. `npm run build`でEditorRenderer除外を検証

## 注意点

### 1. 非同期切り替え

`switchToEditorRenderer()`は動的importのため非同期です：

```typescript
// ❌ 誤り
engine.switchToEditorRenderer();
const renderer = engine.renderer; // まだGameRendererの可能性

// ✅ 正しい
await engine.switchToEditorRenderer();
const renderer = engine.renderer; // EditorRendererが確実に取得できる
```

### 2. import.meta.env.DEVガードの重要性

EditorRenderer関連のimportは必ずDEVガード内で行う：

```typescript
// ✅ 正しい - ビルド時に除外される
if ( import.meta.env.DEV ) {
  const { EditorRenderer } = await import( '...' );
}

// ❌ 誤り - プロダクションビルドにも含まれる
const { EditorRenderer } = await import( '...' );
if ( import.meta.env.DEV ) {
  // ...
}
```

### 3. カメラの自動検出

カメラが見つからない場合の挙動を明確にする：

```typescript
// GameRenderer: mainカメラがなければ最初のカメラを使用
this._mainCamera = cameras.find( c => c.usage === 'main' ) || cameras[ 0 ] || null;

// EditorRenderer: editorカメラがなければnull（レンダリングスキップ）
this._editorCamera = cameras.find( c => c.usage === 'editor' ) || null;
```

## まとめ

この再設計により：

- ✅ **明確な責任分離**: システムレベルのRendererとコンポーネントのCameraが分離
- ✅ **エディター/プレイヤー分離**: 用途に応じた最適なレンダラー
- ✅ **64KB対応**: プロダクションビルドからエディターコードを完全除外
- ✅ **動的切り替え**: 開発時にエディター/ゲームモードを自由に切り替え
- ✅ **拡張性**: 新しいレンダラー（例: ThumbnailRenderer）の追加が容易

プロダクションビルドサイズを大幅に削減しながら、開発体験を向上させることができます。
