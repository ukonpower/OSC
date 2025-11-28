import type { Plugin } from 'vite';

/**
 * ビルド時にMXP.hotGet()呼び出しを静的インポートに置き換えるプラグイン
 *
 * 開発時: MXP.hotGet('key', module) → ホットリロード対応
 * ビルド時: MXP.hotGet('key', module) → module に置き換え
 *
 * これにより、ビルドサイズを削減し、不要なランタイムコードを除去
 */
export function HotGetRemover(): Plugin {

	return {
		name: 'hot-get-remover',
		enforce: 'pre',

		transform( code, id ) {

			// ビルド時のみ実行
			if ( process.env.NODE_ENV !== 'production' ) return null;

			// TypeScript/JavaScriptファイルのみ対象
			if ( ! /\.[jt]sx?$/.test( id ) ) return null;

			// MXP.hotGet()呼び出しを検出して置き換え
			// パターン: MXP.hotGet('key', module) → module
			// または: MXP.hotGet("key", module) → module
			const hotGetPattern = /MXP\.hotGet\s*\(\s*['"`][^'"`]*['"`]\s*,\s*([^)]+)\s*\)/g;

			if ( ! hotGetPattern.test( code ) ) return null;

			// 置き換え実行
			const transformed = code.replace( hotGetPattern, '$1' );

			return {
				code: transformed,
				map: null, // ソースマップは生成しない（サイズ削減のため）
			};

		},
	};

}
