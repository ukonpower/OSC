/**
 * シェーダーコンパイルエラー情報
 */
export interface ShaderError {
	/** エラーの一意なID */
	id: string;
	/** シェーダー識別キー（ソースのハッシュ） */
	shaderKey: string;
	/** シェーダータイプ（頂点/フラグメント） */
	type: 'vertex' | 'fragment';
	/** エラーメッセージ */
	message: string;
	/** エラーが発生した行番号 */
	line?: number;
	/** エラー周辺のソースコード（コンテキスト表示用） */
	sourceContext?: string;
	/** 完全なシェーダーソース */
	fullSource?: string;
	/** タイムスタンプ */
	timestamp: number;
}

/**
 * シェーダーエラー管理クラス（開発環境専用）
 */
export class ShaderErrorManager {

	private errors: Map<string, ShaderError>;
	private listeners: Set<( errors: ShaderError[] ) => void>;

	constructor() {

		this.errors = new Map();
		this.listeners = new Set();

	}

	/**
	 * エラーを追加
	 */
	public addError( error: Omit<ShaderError, 'id' | 'timestamp'> ): void {

		const id = `${error.type}_${Date.now()}_${Math.random()}`;
		const shaderError: ShaderError = {
			...error,
			id,
			timestamp: Date.now(),
		};

		this.errors.set( id, shaderError );
		this.notifyListeners();

	}

	/**
	 * エラーをクリア
	 */
	public clearErrors(): void {

		this.errors.clear();
		this.notifyListeners();

	}

	/**
	 * 特定のエラーを削除
	 */
	public removeError( id: string ): void {

		this.errors.delete( id );
		this.notifyListeners();

	}

	/**
	 * 特定のシェーダーキーに関連するエラーをクリア
	 * シェーダーコンパイル成功時に呼ばれる
	 */
	public clearErrorsByShaderKey( shaderKey: string ): void {

		if ( this.errors.size === 0 ) {

			return;

		}

		// 該当するshaderKeyを持つエラーをすべて削除
		let clearedCount = 0;

		this.errors.forEach( ( error, id ) => {

			if ( error.shaderKey === shaderKey ) {

				this.errors.delete( id );
				clearedCount ++;

			}

		} );

		if ( clearedCount > 0 ) {

			console.log( `[ShaderErrorManager] Cleared ${clearedCount} error(s) for shaderKey: ${shaderKey}` );
			this.notifyListeners();

		}

	}

	/**
	 * 全エラーを取得
	 */
	public getErrors(): ShaderError[] {

		return Array.from( this.errors.values() );

	}

	/**
	 * エラーリスナーを追加
	 */
	public addListener( listener: ( errors: ShaderError[] ) => void ): void {

		this.listeners.add( listener );

	}

	/**
	 * エラーリスナーを削除
	 */
	public removeListener( listener: ( errors: ShaderError[] ) => void ): void {

		this.listeners.delete( listener );

	}

	/**
	 * リスナーに変更を通知
	 */
	private notifyListeners(): void {

		const errors = this.getErrors();
		this.listeners.forEach( ( listener ) => listener( errors ) );

	}

}

/**
 * シンプルなハッシュ関数（文字列からハッシュ値を生成）
 */
export function hashString( str: string ): string {

	let hash = 0;

	for ( let i = 0; i < str.length; i ++ ) {

		const char = str.charCodeAt( i );
		hash = ( ( hash << 5 ) - hash ) + char;
		hash = hash & hash; // 32bit整数に変換

	}

	return hash.toString( 36 );

}
