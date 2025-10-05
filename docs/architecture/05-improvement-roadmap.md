# 改善提案とロードマップ

## 概要

このドキュメントでは、OREngineの今後の改善点と実装ロードマップをまとめています。64KB制約という厳しい条件下で、パフォーマンスと保守性を両立させるための提案です。

## 優先度の高い改善

### 1. コンポーネントのライフサイクル管理

#### 現状の課題

- 基本的なライフサイクルメソッド（update, beforeRender, afterRender）のみ
- コンポーネントの初期化や有効/無効切り替え時の制御が不十分
- コンポーネント間の依存関係管理の仕組みがない

#### 改善案

```typescript
export abstract class Component {
  // ライフサイクルメソッドの拡張
  protected onStart(): void {}
  protected onEnable(): void {}
  protected onDisable(): void {}

  // 依存関係の明示
  public static dependencies: (typeof Component)[] = [];
}
```

#### 期待される効果

- コンポーネントの初期化処理が明確化
- 依存関係の自動解決
- デバッグの容易化

### 2. メモリとリソース管理の強化

#### 現状の課題

- dispose()メソッドの実装が不完全
- WebGLリソースの解放タイミングが不明確
- リソース解放のガイドラインがない

#### 改善案

```typescript
export abstract class Component {
  private _disposed: boolean = false;

  public dispose() {
    if (this._disposed) return;

    try {
      this.disposeResources();
      this._disposed = true;
      this.emit('dispose');
    } catch (error) {
      this.onError(error);
    }
  }

  // サブクラスで実装
  protected abstract disposeResources(): void;
}
```

#### 期待される効果

- メモリリークの防止
- WebGLリソースの適切な管理
- アプリケーションの安定性向上

### 3. エラー処理の強化

#### 現状の課題

- コンポーネントのエラー処理が不十分
- エラーからの復帰機能がない
- エラー報告の仕組みが整っていない

#### 改善案

```typescript
export abstract class Component {
  protected onError(error: Error): void {
    console.error(`Component ${this.constructor.name} error:`, error);

    // エラーイベントの発行
    this.emit('error', {
      component: this,
      error: error,
      timestamp: Date.now(),
    });
  }

  public update(event: ComponentUpdateEvent) {
    if (!this.enabled) return;

    try {
      this.updateImpl(event);
    } catch (error) {
      this.onError(error as Error);
    }
  }
}
```

#### 期待される効果

- エラーの早期検出
- デバッグの効率化
- ユーザー体験の向上

## レンダリングパイプラインの最適化

### 1. ポストプロセスパイプラインの改善

#### 現状の課題

- リソース管理が不完全
- パイプラインの実行順序の柔軟性が不足
- 条件付きレンダリングの仕組みがない

#### 改善案

```typescript
export class PostProcessPipeline extends Component {
  private _stages: Map<string, PostProcessStage> = new Map();
  private _dependencies: Map<string, Set<string>> = new Map();

  // ステージの追加
  public addStage(
    name: string,
    stage: PostProcessStage,
    dependencies: string[] = []
  ) {
    this._stages.set(name, stage);
    this._dependencies.set(name, new Set(dependencies));
  }

  // 条件付きレンダリング
  public setStageCondition(name: string, condition: () => boolean) {
    const stage = this._stages.get(name);
    if (stage) {
      stage.setRenderCondition(condition);
    }
  }

  // 自動最適化
  private optimizePipeline() {
    // 不要なステージのスキップ
    this._stages.forEach((stage, name) => {
      if (!stage.shouldRender()) {
        this.skipStage(name);
      }
    });
  }

  public dispose() {
    this._stages.forEach(stage => stage.dispose());
    super.dispose();
  }
}

export class PostProcessStage {
  private renderCondition: (() => boolean) | null = null;

  public setRenderCondition(condition: () => boolean) {
    this.renderCondition = condition;
  }

  public shouldRender(): boolean {
    return !this.renderCondition || this.renderCondition();
  }

  public dispose() {
    // リソースの解放
  }
}
```

#### 期待される効果

- リソースの自動管理
- 柔軟な実行制御
- パフォーマンスの向上

### 2. シェーダーシステムの改善

#### 現状の課題

- シェーダーのキャッシュ機能が不足
- 最適化機能が限定的
- エラーハンドリングが不十分

#### 改善案

```typescript
export class ShaderSystem {
  private shaderCache: Map<string, CompiledShader> = new Map();
  private includeCache: Map<string, string> = new Map();

  // インテリジェントなキャッシング
  public compile(source: string, defines: Defines): CompiledShader {
    const key = this.generateCacheKey(source, defines);

    if (this.shaderCache.has(key)) {
      return this.shaderCache.get(key)!;
    }

    const compiled = this.compileShader(source, defines);
    this.shaderCache.set(key, compiled);
    return compiled;
  }

  // シェーダー最適化
  private optimizeShader(shader: string): string {
    // デッドコード除去
    shader = this.removeDeadCode(shader);
    // 定数畳み込み
    shader = this.foldConstants(shader);
    return shader;
  }

  // エラーハンドリング
  private validateShader(shader: string): void {
    const gl = this.getContext();
    const testCompile = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(testCompile!, shader);
    gl.compileShader(testCompile!);

    if (!gl.getShaderParameter(testCompile!, gl.COMPILE_STATUS)) {
      const error = gl.getShaderInfoLog(testCompile!);
      throw new Error(`シェーダーコンパイルエラー: ${error}`);
    }
  }
}
```

#### 期待される効果

- コンパイル時間の短縮
- シェーダーのパフォーマンス向上
- デバッグの容易化

## パフォーマンス最適化

### 1. コンポーネントの実行順序制御

#### 現状の課題

- 単純なorderプロパティのみによる制御
- 複雑な依存関係への対応が困難

#### 改善案

```typescript
export class ComponentManager {
  private updateGroups: Map<number, Set<Component>> = new Map();

  public updateAll(event: ComponentUpdateEvent) {
    // 優先度順にソート
    const priorities = Array.from(this.updateGroups.keys()).sort((a, b) => a - b);

    for (const priority of priorities) {
      const components = this.updateGroups.get(priority)!;
      components.forEach(component => {
        if (component.shouldUpdate()) {
          component.update(event);
        }
      });
    }
  }

  public addComponent(component: Component, priority: number = 0) {
    if (!this.updateGroups.has(priority)) {
      this.updateGroups.set(priority, new Set());
    }
    this.updateGroups.get(priority)!.add(component);
  }
}
```

### 2. 条件付き更新

#### 改善案

```typescript
export abstract class Component {
  protected shouldUpdate(): boolean {
    return true;
  }

  public update(event: ComponentUpdateEvent) {
    if (!this.enabled || !this.shouldUpdate()) return;

    try {
      this.updateImpl(event);
    } catch (error) {
      this.onError(error as Error);
    }
  }

  protected abstract updateImpl(event: ComponentUpdateEvent): void;
}
```

#### 期待される効果

- 不要な更新処理のスキップ
- CPUリソースの削減
- フレームレートの向上

## テスト体制の強化

### 1. コンポーネントテストの基盤

```typescript
export class ComponentTestBed {
  private entity: Entity;
  private component: Component;

  constructor(componentType: typeof Component) {
    this.entity = new Entity();
    this.component = new componentType({ entity: this.entity });
  }

  // ライフサイクルシミュレーション
  public simulateFrames(frames: number) {
    for (let i = 0; i < frames; i++) {
      this.component.update({
        timeElapsed: i * 16.67,
        timeDelta: 16.67,
        timeCode: i,
      });
    }
  }

  // 状態検証
  public assertComponentState(assertion: (component: Component) => boolean) {
    if (!assertion(this.component)) {
      throw new Error('Component state assertion failed');
    }
  }
}
```

### 2. パフォーマンステスト

```typescript
export class PerformanceTestUtil {
  private measurements: Map<string, number[]> = new Map();

  public measure(name: string, fn: () => void) {
    const start = performance.now();
    fn();
    const end = performance.now();

    if (!this.measurements.has(name)) {
      this.measurements.set(name, []);
    }
    this.measurements.get(name)!.push(end - start);
  }

  public getStats(name: string) {
    const measurements = this.measurements.get(name) || [];
    const avg = measurements.reduce((a, b) => a + b, 0) / measurements.length;
    const min = Math.min(...measurements);
    const max = Math.max(...measurements);

    return { avg, min, max, samples: measurements.length };
  }
}
```

### 3. ビジュアルリグレッションテスト

```typescript
export class VisualRegressionTest {
  private canvas: HTMLCanvasElement;
  private context: WebGLRenderingContext;

  public takeSnapshot(name: string): ImageData {
    const pixels = new Uint8Array(
      this.canvas.width * this.canvas.height * 4
    );
    this.context.readPixels(
      0, 0,
      this.canvas.width, this.canvas.height,
      this.context.RGBA,
      this.context.UNSIGNED_BYTE,
      pixels
    );

    return new ImageData(
      new Uint8ClampedArray(pixels),
      this.canvas.width,
      this.canvas.height
    );
  }

  public compareSnapshot(
    current: ImageData,
    reference: ImageData,
    threshold: number = 0.01
  ): boolean {
    // ピクセル単位で比較
    const diff = this.calculateDiff(current, reference);
    return diff < threshold;
  }
}
```

## 64KB制約下での最適化

### 重要な指針

1. **フラットな構造を優先**
   - 過度な抽象化を避ける
   - 直接的な実装を選択

2. **コードの重複を許容**
   - 小さな重複ならインライン化
   - 関数呼び出しのオーバーヘッド削減

3. **メモリアロケーションの最小化**
   - TypedArrayの再利用
   - オブジェクトプールの活用

### 推奨パターン

```typescript
// シンプルで効率的な実装
const renderer = {
  _d: [],  // drawcalls
  _l: [],  // lights
  _b: new Float32Array(16),  // 再利用バッファ

  render() {
    // 最小限のコード
  }
};
```

### アンチパターン

```typescript
// 避けるべき: 過度な抽象化
abstract class AbstractComponent {
  abstract execute(): void;
}

class ConcreteComponent extends AbstractComponent {
  execute() { /* ... */ }
}

// 避けるべき: 複雑な依存関係
class ServiceLocator {
  private services: Map<string, any>;
  resolve<T>(name: string): T { /* ... */ }
}
```

## 実装ロードマップ

### フェーズ1: 基盤改善（1-2ヶ月）

- [ ] コンポーネントライフサイクルの拡張
- [ ] メモリ管理の強化
- [ ] エラーハンドリングの実装
- [ ] 基本的なテスト体制の構築

### フェーズ2: パフォーマンス最適化（2-3ヶ月）

- [ ] ポストプロセスパイプラインの改善
- [ ] シェーダーシステムの最適化
- [ ] WebGL状態管理の効率化
- [ ] バッチ処理の改善

### フェーズ3: テストとドキュメント（1-2ヶ月）

- [ ] 包括的なテストスイートの作成
- [ ] パフォーマンステストの実装
- [ ] ビジュアルリグレッションテスト
- [ ] ドキュメントの整備

### フェーズ4: 最終最適化（1ヶ月）

- [ ] ビルドサイズの削減
- [ ] 実行パフォーマンスの向上
- [ ] 64KB制約への適合確認
- [ ] リリース準備

## 評価指標

### パフォーマンス

- フレームレート: 60fps維持
- ドローコール数: < 100
- メモリ使用量: < 100MB

### コード品質

- テストカバレッジ: > 80%
- ビルドサイズ: < 64KB
- ビルド時間: < 30秒

### 保守性

- ドキュメントカバレッジ: 100%
- コードの複雑度: 低〜中
- 依存関係: 最小限

## 次のステップ

改善提案の実装を開始する前に:

1. 現在のコードベースの詳細な分析
2. 各改善案の優先度付け
3. 実装計画の策定
4. チームでのレビューと合意

## 前のセクション

- [01. システム全体概要](./01-system-overview.md) - アーキテクチャの基礎
- [02. パッケージ構成](./02-package-structure.md) - 各パッケージの詳細
- [03. レンダリングパイプライン](./03-rendering-pipeline.md) - レンダリングシステムの詳細
- [04. ビルド最適化](./04-build-optimization.md) - 64KB制約への対応
