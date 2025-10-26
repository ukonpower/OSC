# レイキャスター機能 実装ドキュメント

## 概要

マウスクリックによるシーン内オブジェクト選択機能。

**実装ステータス**: ✅ 完了

## 実装アーキテクチャ

### 主要コンポーネント

#### 1. Raycasterクラス (`packages/maxpower/Utils/Raycaster/index.ts`)

カメラとマウス座標からレイを生成し、シーン内のMeshとの交差判定を行うユーティリティクラス。

**主な機能:**
- レイの生成（カメラの投影行列とビュー行列から）
- Entityツリーの再帰的走査
- Meshコンポーネントを持つオブジェクトとの交差判定
- バウンディングボックスベースの高速判定

**公開API:**
```typescript
class Raycaster {
  // マウス座標（正規化デバイス座標: -1〜1）とカメラから交差判定を実行
  raycast(ndcX: number, ndcY: number, camera: Camera, rootEntity: Entity): RaycastHit | null
}

interface RaycastHit {
  entity: Entity;      // ヒットしたエンティティ
  distance: number;    // カメラからの距離
  point: Vector;       // 交差点のワールド座標
}
```

#### 2. ScenePointerクラス (`packages/orengine/features/OREditor/core/ScenePointer/index.ts`)

エディタのCanvasでのマウスイベントを処理し、オブジェクト選択を実行するクラス。

**主な機能:**
- マウス座標の正規化（-1〜1のNDC座標系へ変換）
- レイキャストの実行
- 選択されたエンティティをEditorに通知
- イベントハンドリング（クリック、ホバー）

**公開API:**
```typescript
class ScenePointer {
  constructor(engine: Engine, editor: Editor)
  handleClick(clientX: number, clientY: number, canvas: HTMLCanvasElement): void
  dispose(): void
}
```

#### 3. Canvas拡張 (`packages/orengine/components/primitives/Canvas/index.tsx`)

マウスイベントリスナーを追加し、ScenePointerと連携。

**追加機能:**
- onClickイベントハンドラー
- ScenePointerへのイベント転送

#### 4. Editor拡張 (`packages/orengine/features/OREditor/core/index.ts`)

ScenePointerの管理と統合。

**追加機能:**
- ScenePointerインスタンスの生成・破棄
- オブジェクト選択機能の管理

## 実装の詳細

### レイキャスティングアルゴリズム

1. **レイの生成**
   ```
   マウス座標(screenX, screenY)
   → 正規化デバイス座標(ndcX, ndcY) ∈ [-1, 1]
   → カメラ逆投影 → ワールド空間のレイ(origin, direction)
   ```

2. **交差判定フロー**
   ```
   rootEntity から再帰的走査
   → Meshコンポーネントを持つEntityを抽出
   → バウンディングボックスとレイの交差判定
   → 最近傍のヒットを選択
   → Editor.selectEntity()で選択状態を更新
   ```

3. **バウンディングボックス判定**
   - AABB（Axis-Aligned Bounding Box）とレイの交差テスト
   - Slab method（スラブ法）を使用した高速判定
   - 64KB制約を考慮し、三角形レベル判定は実装しない

### ビルド設定

レイキャスター関連コードは `import.meta.env.DEV` でガードされており、Viteのビルド時に最適化される。

## ファイル構成

```
packages/maxpower/Utils/
└── Raycaster/
    └── index.ts          # Raycasterクラス

packages/maxpower/Utils/
└── index.ts              # Raycasterのエクスポート追加

packages/orengine/features/OREditor/core/
└── ScenePointer/
    └── index.ts          # ScenePointerクラス

packages/orengine/components/primitives/Canvas/
└── index.tsx             # マウスイベントハンドリング追加

packages/orengine/features/OREditor/core/
└── index.ts              # ScenePointer統合
```

## 使用方法

### エディタでの使用

1. エディタのScreenパネル内のCanvasをクリック
2. クリック位置のレイキャストが自動実行
3. ヒットしたオブジェクトがHierarchyとPropertyパネルで選択状態になる

### 開発者向け

```typescript
// Raycasterの直接使用例
import { Raycaster } from 'maxpower';

const raycaster = new Raycaster();
const hit = raycaster.raycast(ndcX, ndcY, camera, scene);

if (hit) {
  console.log('Hit entity:', hit.entity.name);
  console.log('Distance:', hit.distance);
  console.log('World position:', hit.point);
}
```

## パフォーマンス考慮事項

- **レイキャスト実行タイミング**: クリック時のみ（毎フレーム実行しない）
- **判定対象**: Meshコンポーネントを持つEntityのみ
- **判定精度**: バウンディングボックスレベル（三角形判定は不使用）
- **シーン規模**: 数百〜数千のEntityまで対応可能

## 将来の拡張案

- [ ] ホバー時のビジュアルハイライト
- [ ] 複数選択（Shift+クリック）
- [ ] 選択ボックス（ドラッグ選択）
- [ ] レイヤーによる選択フィルタリング
- [ ] 選択可/不可フラグの実装
- [ ] より詳細な三角形レベル判定（オプション）

## 実装完了チェックリスト

- ✅ Raycasterクラス実装 (`packages/maxpower/Utils/Raycaster/index.ts`)
- ✅ Raycasterのエクスポート追加 (`packages/maxpower/index.ts`)
- ✅ ScenePointerクラス実装 (`packages/orengine/features/OREditor/core/ScenePointer/index.ts`)
- ✅ Canvasコンポーネント拡張（クリックイベント追加）
- ✅ Editorクラス統合（ScenePointer初期化・破棄）
- ✅ 型チェック通過（`npm run type-check`）

## 技術的な実装ポイント

### glpowerのVectorクラス仕様

- `divideScalar()` → `divide(number)` を使用
- `multiplyScalar()` → `multiply(number)` を使用
- `applyMatrix4()` は1引数のみ（第2引数なし）

### getComponentの型定義

```typescript
// 正しい使い方
const mesh = entity.getComponent(Mesh);  // クラスコンストラクタを渡す

// 間違った使い方
const mesh = entity.getComponent<Mesh>(Mesh);  // ジェネリクスは不要
```

### 動的インポート

```typescript
let ScenePointer: any = null;
if (import.meta.env.DEV) {
  ScenePointer = await import('./ScenePointer').then(m => m.ScenePointer);
}
```
