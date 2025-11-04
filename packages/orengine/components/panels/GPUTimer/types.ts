// GPU Timer の型定義

/**
 * GPUタイマーの1サンプル
 */
export interface TimerSample {
	/** 描画パスの識別名 */
	name: string;
	/** GPU時間（ミリ秒） */
	duration: number;
	/** サンプリング時刻（performance.now()） */
	timestamp: number;
	/** レンダリングタイプ（deferred/forward/shadowMap等） */
	renderType: string;
}

/**
 * 統計情報
 */
export interface TimerStatistics {
	/** 描画パスの識別名 */
	name: string;
	/** レンダリングタイプ */
	renderType: string;
	/** 最新値（ms） */
	current: number;
	/** 移動平均（ms） */
	avg: number;
	/** 最大値（ms） */
	max: number;
	/** 最小値（ms） */
	min: number;
	/** サンプル数 */
	samples: number;
	/** 総時間に対する割合（0-100%） */
	percentage: number;
}

/**
 * Rendererから送信されるタイマーイベントのペイロード
 * （既存のTimerDuration型と互換性を保つ）
 */
export interface TimerDuration {
	name: string;
	duration: number;
}
