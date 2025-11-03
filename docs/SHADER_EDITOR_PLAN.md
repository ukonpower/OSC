# Shader Editor 実装計画

## 概要

ブラウザ上でレイマーチシェーダーを編集できる専用エディタ機能を追加する。
`/shaderEditor` という独立したURLでアクセスし、既存のコンポーネントのシェーダーをリアルタイムプレビューしながら編集できる。

## 目的

- シェーダー開発の効率化
- リアルタイムフィードバックによる試行錯誤の高速化
- エディタからシーンへの反映を容易にする

## UI設計

```
┌────────────────────────────────────────────────────────┐
│ 🎨 Shader Editor                                       │
│ Component: [Maguro        ▼] [Apply] [Save to File]   │
├─────────────────────┬──────────────────────────────────┤
│                     │                                  │
│  Code Editor        │      3D Preview                  │
│  (Monaco Editor)    │                                  │
│                     │    [Component Instance]          │
│  #include <sdf>     │                                  │
│  #include <rm_h>    │                                  │
│                     │                                  │
│  SDFResult D() {    │    OrbitControls enabled         │
│    ...              │                                  │
│  }                  │                                  │
│                     │                                  │
│  ✓ Compiled         │    FPS: 60                       │
└─────────────────────┴──────────────────────────────────┘
```

### レイアウト

- **左半分**: Monaco Editorでシェーダーコード編集
- **右半分**: WebGLによる3Dプレビュー
- **ヘッダー**: コンポーネント選択、Apply/Saveボタン
- **ステータスバー**: コンパイル状態、FPS等

## 機能要件

### 必須機能 (Phase 1)

1. **コンポーネント選択**
   - セレクトボックスでMeshを持つコンポーネントを選択
   - 選択時に自動的にインスタンス化してプレビュー表示

2. **コードエディタ**
   - Monaco Editorによる編集
   - GLSLシンタックスハイライト
   - 基本的な補完機能

3. **リアルタイムプレビュー**
   - 選択したコンポーネントのインスタンスを3D表示
   - OrbitControlsで視点変更可能

4. **Apply機能**
   - 編集したコードを一時的にプレビューに適用
   - コンパイルエラー時はエラー表示

5. **Save機能**
   - 実際のファイルシステムに書き込み
   - 開発サーバー経由でファイル更新

### 追加機能 (Phase 2)

1. **テンプレート機能**
   - Raymarch Cube, Raymarch Screen等のテンプレートから新規作成

2. **ユニフォーム編集**
   - シェーダー内のuniformを検出
   - GUI上で値を調整可能

3. **include編集**
   - タブで複数ファイルを開く
   - 共通モジュールの参照・編集

4. **エラー表示強化**
   - コンパイルエラーの行番号表示
   - リアルタイムバリデーション

## 技術設計

### ディレクトリ構造

```
src/
├── app/
│   ├── editor/          # 既存のエディタ
│   ├── player/          # 既存のプレイヤー
│   └── shaderEditor/    # 新規: シェーダーエディタ
│       ├── main.tsx     # エントリーポイント
│       ├── ShaderEditorApp.tsx
│       ├── components/
│       │   ├── CodePane.tsx
│       │   ├── PreviewPane.tsx
│       │   ├── ComponentSelector.tsx
│       │   └── Toolbar.tsx
│       └── hooks/
│           ├── useComponentList.ts
│           ├── useShaderCompile.ts
│           └── useFileSave.ts
├── shaderEditor.html    # 新規: エントリーHTML
└── ...

plugins/
└── FileWriter.ts        # 新規: ファイル書き込みAPIプラグイン
```

### データフロー

```
1. ページ読み込み
   ↓
2. コンポーネントリスト取得 (静的リストまたは自動検出)
   ↓
3. ユーザーがコンポーネント選択
   ↓
4. 動的import でコンポーネント読み込み
   ↓
5. シェーダーファイル (?raw) を読み込みエディタに表示
   ↓
6. プレビューシーンにコンポーネントインスタンス生成
   ↓
7. [コード編集]
   ↓
8. [Apply] → マテリアル一時更新 → プレビュー反映
   ↓
9. [Save] → Viteプラグイン経由で実ファイル更新
```

### コンポーネントリスト管理

**Option A: 静的リスト (Phase 1推奨)**

```typescript
// src/app/shaderEditor/componentList.ts
export const SHADER_COMPONENTS = [
  {
    name: "Maguro",
    path: "Demo4/Maguro/Maguro",
    shaderPath: "shaders/maguro.fs"
  },
  {
    name: "Sashimi",
    path: "Demo4/Maguro/Sashimi",
    shaderPath: "shaders/sashimi.fs"
  },
  // ...
];
```

**Option B: 自動検出 (Phase 2検討)**

Viteプラグインで `src/resources/Components/**/*` をスキャンし、
Meshを含むコンポーネントを自動検出。

### シェーダーファイル読み込み

```typescript
// 動的importでrawテキストとして取得
const shaderModule = await import(
  `~/resources/Components/${componentPath}/${shaderPath}?raw`
);
const shaderCode = shaderModule.default;
```

### ファイル保存 (開発時)

**Viteプラグイン追加**

```typescript
// plugins/FileWriter.ts
import fs from 'fs/promises';
import path from 'path';

export function FileWriter() {
  return {
    name: 'file-writer',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/writeShader' && req.method === 'POST') {
          // リクエストボディ取得
          const body = await parseBody(req);
          const { filePath, code } = JSON.parse(body);

          // セキュリティチェック
          const fullPath = path.join(__dirname, 'src', filePath);
          if (!fullPath.startsWith(__dirname)) {
            res.statusCode = 403;
            res.end('Forbidden');
            return;
          }

          // ファイル書き込み
          await fs.writeFile(fullPath, code, 'utf-8');

          res.statusCode = 200;
          res.end('OK');
        } else {
          next();
        }
      });
    }
  };
}
```

**フロントエンド**

```typescript
// src/app/shaderEditor/hooks/useFileSave.ts
export const useFileSave = () => {
  const saveShader = async (filePath: string, code: string) => {
    const response = await fetch('/api/writeShader', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filePath, code })
    });

    if (!response.ok) {
      throw new Error('Failed to save file');
    }
  };

  return { saveShader };
};
```

### Monaco Editor統合

```typescript
// src/app/shaderEditor/components/CodePane.tsx
import Editor from '@monaco-editor/react';

export const CodePane = ({ code, onChange }) => {
  return (
    <Editor
      height="100%"
      language="glsl"
      theme="vs-dark"
      value={code}
      onChange={onChange}
      options={{
        minimap: { enabled: true },
        fontSize: 14,
        lineNumbers: 'on',
        renderWhitespace: 'selection',
        tabSize: 2,
      }}
    />
  );
};
```

### プレビューシーン構築

```typescript
// src/app/shaderEditor/components/PreviewPane.tsx
import { OREngine } from 'orengine';
import { useEffect, useRef } from 'react';

export const PreviewPane = ({ component, shaderCode }) => {
  const engineRef = useRef<Engine>();

  useEffect(() => {
    if (!component) return;

    // シーン構築
    const scene = engineRef.current?.root;
    const entity = scene.addEntity();

    // コンポーネントインスタンス化
    const instance = entity.addComponent(component);

    // シェーダーコード適用
    if (instance.material) {
      instance.material.frag = shaderCode;
      instance.material.requestUpdate();
    }

    return () => {
      entity.dispose();
    };
  }, [component, shaderCode]);

  return (
    <OREngine ref={engineRef} gl={gl}>
      {/* OrbitControls自動追加 */}
    </OREngine>
  );
};
```

## 実装ステップ

### Phase 1: 基本構造構築

#### Step 1: プロジェクト構造準備
- [ ] `src/shaderEditor.html` 作成
- [ ] `src/app/shaderEditor/main.tsx` 作成
- [ ] vite.config.tsにエントリーポイント追加

#### Step 2: UI骨組み
- [ ] ShaderEditorApp.tsx 作成
- [ ] 左右分割レイアウト実装
- [ ] ヘッダー、ツールバー配置

#### Step 3: Monaco Editor統合
- [ ] `@monaco-editor/react` インストール
- [ ] CodePane コンポーネント実装
- [ ] GLSLシンタックスハイライト確認

#### Step 4: 3Dプレビュー基盤
- [ ] PreviewPane コンポーネント実装
- [ ] OREngine統合
- [ ] OrbitControls追加

#### Step 5: コンポーネント選択
- [ ] componentList.ts 作成 (静的リスト)
- [ ] ComponentSelector UI実装
- [ ] 動的import実装

#### Step 6: シェーダー読み込み・適用
- [ ] ?raw インポート実装
- [ ] Apply機能実装
- [ ] エラーハンドリング

#### Step 7: ファイル保存
- [ ] FileWriter Viteプラグイン実装
- [ ] Save機能実装
- [ ] 成功/失敗トースト表示

### Phase 2: 機能拡張 (オプション)

- [ ] テンプレート機能
- [ ] ユニフォーム編集UI
- [ ] タブ機能 (複数ファイル)
- [ ] includeファイル編集
- [ ] コンパイルエラー行ハイライト
- [ ] スナップショット機能

## 技術スタック

### 新規追加パッケージ

```json
{
  "dependencies": {
    "@monaco-editor/react": "^4.6.0"
  }
}
```

### 使用する既存機能

- OREngine (プレビュー)
- Vite HMR (開発時)
- FileSystem API (既存のファイル管理)
- ShaderParser (既存のincludeシステム)

## セキュリティ考慮事項

1. **ファイル書き込み制限**
   - `src/resources/Components/` 配下のみ許可
   - パストラバーサル攻撃対策

2. **開発モードのみ有効**
   - プロダクションビルドでは保存機能無効化
   - ダウンロード機能のみ提供

3. **シェーダーコンパイルエラー**
   - 無限ループ等の危険なコードの検出
   - タイムアウト処理

## パフォーマンス考慮

1. **Applyの頻度制限**
   - デバウンス処理 (500ms程度)
   - 手動Applyボタンのみでも可

2. **Monaco Editorの遅延読み込み**
   - Code Splitting適用

3. **プレビューシーンの最適化**
   - 単一コンポーネントのみ表示
   - 不要なポストプロセス無効化

## 64KB制約への配慮

### ビルドからエディタコードを除外

**重要**: `npm run build`時には、エディタ関連のコードを一切バンドルしない。

#### 現状の問題

- `src/index.html` → `src/app/editor/main.tsx` を読み込み (エディタUI)
- `src/player.html` → `src/app/player/index.ts` を読み込み (プレイヤーのみ)
- 現在の`vite.config.ts`では`index.html`がビルド対象 → **エディタがバンドルされてしまう**

#### 解決策

**プロダクションビルドでは`player.html`のみをエントリーポイントにする**

```typescript
// vite.config.ts
build: {
  outDir: '../dist/',
  rollupOptions: {
    input: './src/player.html'  // エディタを含まないプレイヤー専用
  }
}
```

#### エントリーポイント整理

| ファイル | 用途 | ビルド対象 | 含むコード |
|---------|------|-----------|----------|
| `src/index.html` | 開発用エディタ | ❌ 除外 | editor/, orengine/react 等 |
| `src/player.html` | プロダクション | ✅ ビルド | player/のみ (最小限) |
| `src/shaderEditor.html` | シェーダーエディタ | ❌ 除外 | shaderEditor/, monaco-editor 等 |

#### 開発時の動作

- `npm run dev` → `index.html` (エディタモード) がデフォルト
- `/player.html` → プレイヤーモードで動作確認
- `/shaderEditor.html` → シェーダーエディタで開発

#### ビルド時の動作

- `npm run build` → `player.html`のみビルド
- `dist/index.html` → プレイヤー (エディタコード含まず)
- 最終成果物は64KB以内に収まる

#### vite.config.ts 修正案

```typescript
export default defineConfig( {
  root: 'src',
  publicDir: 'assets',
  base: basePath,
  server: {
    port: 3000,
    host: "0.0.0.0",
    watch: {
      ignored: [ "**/data/**/**.json" ],
    },
  },
  build: {
    outDir: '../dist/',
    rollupOptions: {
      input: './src/player.html'  // ← プレイヤーのみビルド
    }
  },
  // ... 以下同じ
} );
```

この設定により、`npm run build`時には:
- ✅ `src/app/editor/` 除外
- ✅ `src/app/shaderEditor/` 除外
- ✅ `@monaco-editor/react` 除外
- ✅ `orengine/react` (エディタUI) 除外
- ✅ プレイヤーコードのみバンドル

## テスト計画

### 手動テスト項目

- [ ] Maguroコンポーネント選択 → プレビュー表示
- [ ] コード編集 → Apply → 反映確認
- [ ] Save → ファイル更新確認
- [ ] コンパイルエラー → エラー表示確認
- [ ] OrbitControls動作確認
- [ ] 複数コンポーネント切り替え動作

## 既知の制限事項

1. **vsシェーダー未対応**
   - Phase 1ではfsのみ編集可能
   - Phase 2でタブ機能追加時に対応

2. **プロダクションビルド非対応**
   - 開発モードでのみ使用可能
   - 保存機能は開発サーバー依存

3. **複数ファイル同時編集不可**
   - Phase 1では単一ファイルのみ
   - includeファイルはreadonly表示

## 参考資料

- [Monaco Editor Documentation](https://microsoft.github.io/monaco-editor/)
- [OREngine Architecture](./ARCHITECTURE.md)
- [Shader System](./SHADER_SYSTEM.md)
- [Component Development Guide](./COMPONENT_DEVELOPMENT.md)

## 更新履歴

- 2025-10-30: 初版作成
