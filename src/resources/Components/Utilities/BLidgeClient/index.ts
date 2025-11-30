import * as MXP from 'maxpower';
import { Engine } from 'orengine';

import { gl } from '~/globals';
import blidgeData from '~/resources/blidge-data.json';

const BASE_PATH = import.meta.env.BASE_URL || "/";

/**
 * BLidgeClient
 * BLidgeを使用してBlenderなどの3Dツールとリアルタイムに連携するためのコンポーネント
 * WebSocketまたはJSON形式でシーンデータを受信し、エンティティとして管理する
 */
export class BLidgeClient extends MXP.Component {

	/** BLidgeインスタンス */
	private blidge: MXP.BLidge;
	/** データ取得方法の種類（WebSocketまたはJSON） */
	private type: "websocket" | "json" | null;

	/** BLidgeルートエンティティ */
	private blidgeRoot: MXP.Entity | null;
	/** uuid/名前をキーとするエンティティのマップ（uuidが優先される） */
	private entities: Map<string, MXP.Entity>;

	/** アニメーション再生状態 */
	private animationState: {
		playing: boolean;
		scrubbing: boolean;
		currentFrame: number;
	};

	// connection
	/** WebSocket接続情報 */
	private connection: {
		enabled: boolean,
		url: string,
	};

	/** reload処理のデバウンス用タイマーID */
	private reloadTimerId: number | null;

	/** blidge-data.json保存処理のデバウンス用タイマーID */
	private saveSceneTimerId: number | null;

	/** WebSocket接続失敗時のタイムアウトタイマーID */
	private connectionTimeoutId: number | null;

	/**
	 * コンストラクタ
	 * @param params コンポーネントのパラメータ
	 */
	constructor( params: MXP.ComponentParams ) {

		super( params );

		// 初期化
		this.entities = new Map();
		this.type = "websocket";
		this.connection = {
			enabled: true,
			url: "ws://localhost:3100",
		};
		this.reloadTimerId = null;
		this.saveSceneTimerId = null;
		this.connectionTimeoutId = null;

		// アニメーション状態を初期化
		this.animationState = {
			playing: false,
			scrubbing: false,
			currentFrame: 0,
		};

		/*-------------------------------
			BLidge初期化
		-------------------------------*/

		this.blidgeRoot = null;

		this.blidge = new MXP.BLidge( gl );

		// シーン同期イベントハンドラ
		const onSyncScene = this.onSyncScene.bind( this );

		// タイムライン同期イベントハンドラ
		const onSyncTimeline = ( frame: MXP.BLidgeFrame ) => {

			if ( this.entity ) {

				// アニメーション状態を更新
				this.animationState.playing = frame.playing || false;
				this.animationState.scrubbing = frame.scrubbing || false;
				this.animationState.currentFrame = frame.current;

				// スクラブ中はアニメーション補間を無効化
				const shouldInterpolate = ! this.animationState.scrubbing;

				// フレーム情報とともにオプションを送信
				this.emit( "update/blidge/frame", [ frame, {
					interpolate: shouldInterpolate,
					scrubbing: this.animationState.scrubbing
				} ] );

			}

		};

		// 選択同期イベントハンドラ
		const onSyncSelection = ( selection: MXP.BLidgeSelection ) => {

			if ( this.entity ) {

				// 選択の最初のオブジェクトをイベントとして通知
				const firstSelected = selection.selected[ 0 ];

				if ( firstSelected && firstSelected.uuid ) {

					const targetEntity = this.entities.get( firstSelected.uuid );

					if ( targetEntity ) {

						// BLidgeClientからselectionイベントを発火
						this.emit( "update/blidge/selection", [ targetEntity ] );

					}

				}

			}

		};

		// イベントリスナー登録
		this.blidge.on( 'sync/scene', onSyncScene );
		this.blidge.on( 'sync/timeline', onSyncTimeline );
		this.blidge.on( 'sync/selection', onSyncSelection );

		// コンポーネント破棄時のイベントリスナー削除
		this.once( "dispose", () => {

			this.blidge.off( 'sync/scene', onSyncScene );
			this.blidge.off( 'sync/timeline', onSyncTimeline );
			this.blidge.off( 'sync/selection', onSyncSelection );

		} );

		/*-------------------------------
			UIフィールド設定
		-------------------------------*/

		/**
		 * 再読み込み処理（即座実行）
		 * 選択されたタイプに基づいてシーンを読み込み直す
		 */
		const reloadImmediate = async () => {

			// タイムアウトタイマーをクリア
			if ( this.connectionTimeoutId !== null ) {

				clearTimeout( this.connectionTimeoutId );
				this.connectionTimeoutId = null;

			}

			if ( this.type == "json" ) {

				// JSONデータからシーンを読み込む
				await this.blidge.loadScene( blidgeData as unknown as MXP.BLidgeScene );

				this.emit( "loaded" );

			} else {

				// WebSocketで接続してシーンを読み込む
				this.blidge.connect( this.connection.url );

				// WebSocket接続のタイムアウト処理(3秒)
				// 接続失敗時はJSONへフォールバック
				this.connectionTimeoutId = window.setTimeout( async () => {

					console.warn( '[BLidgeClient] WebSocket connection timeout. Falling back to JSON...' );

					// JSONからシーンを読み込む
					await this.blidge.loadScene( blidgeData as unknown as MXP.BLidgeScene );

					this.emit( "loaded" );

					this.connectionTimeoutId = null;

				}, 1000 );

			}

		};

		/**
		 * 再読み込み処理（デバウンス付き）
		 * フィールド更新時に呼ばれ、短時間に複数回更新があった場合でも
		 * 最後の更新から一定時間（500ms）後に一度だけreloadが実行される
		 */
		const reload = () => {

			// 既存のタイマーをキャンセル
			if ( this.reloadTimerId !== null ) {

				clearTimeout( this.reloadTimerId );

			}

			// 500ms後にreloadを実行
			this.reloadTimerId = window.setTimeout( () => {

				this.reloadTimerId = null;
				reloadImmediate();

			}, 500 );

		};

		// モード選択フィールド (websocket/json)
		this.field( "mode", () => this.type, v => {

			this.type = v;

			reload();

		}, import.meta.env.DEV ? {
			format: {
				type: "select",
				list: [ "websocket", "json" ],
			}
		} : undefined );

		// WebSocket設定用ディレクトリ（WebSocketモード時のみ表示）
		const ws = this.fieldDir( "websocket", { hidden: () => this.type != "websocket" } );
		// 再接続ボタン（即座に実行）
		ws.field( "reconnect", () => () => reloadImmediate(), undefined, {
			label: "Reconnect",
		} );
		// WebSocket URL設定
		ws.field( "url", () => this.connection.url, v => this.connection.url = v );


		const engine = Engine.getInstance( gl );
		engine.registerBLidgeClient( this );

	}

	/**
	 * シーンデータをローカルJSONファイルに保存（デバウンス付き）
	 * 開発環境でのみ使用される
	 * @param sceneData 保存するシーンデータ
	 */
	private saveSceneToLocal( sceneData: MXP.BLidgeScene ): void {

		// 既存のタイマーをキャンセル
		if ( this.saveSceneTimerId !== null ) {

			clearTimeout( this.saveSceneTimerId );

		}

		// 1秒後に保存を実行（複数回の更新をまとめる）
		this.saveSceneTimerId = window.setTimeout( async () => {

			this.saveSceneTimerId = null;

			try {

				const response = await fetch( '/api/writeScene', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify( { sceneData } ),
				} );

				if ( ! response.ok ) {

					const text = await response.text();
					throw new Error( `HTTP error! status: ${response.status}, body: ${text}` );

				}

			} catch ( error ) {

				console.error( '[BLidgeClient] Failed to save blidge-data.json:', error );

			}

		}, 1000 );

	}

	/**
	 * シーン同期イベントハンドラ
	 * BLidgeからシーンデータを受け取った際に呼ばれる
	 * @param blidge BLidgeインスタンス
	 */
	private onSyncScene( blidge: MXP.BLidge ) {

		// WebSocket接続成功時、タイムアウトタイマーをクリア
		if ( this.connectionTimeoutId !== null ) {

			clearTimeout( this.connectionTimeoutId );
			this.connectionTimeoutId = null;

		}

		// 開発環境でWebSocket経由の場合、ローカルJSONを更新
		if ( import.meta.env.DEV && this.type === "websocket" && blidge.currentData ) {

			// this.saveSceneToLocal( blidge.currentData );

		}

		// 現在のタイムスタンプを取得（更新されたエンティティを追跡するため）
		const timeStamp = new Date().getTime();

		/**
		 * ノードからエンティティを再帰的に作成/更新する内部関数
		 * @param node BLidgeノード
		 * @returns 作成/更新されたエンティティ
		 */
		const createEntityFromNode = ( node: MXP.BLidgeNode ): MXP.Entity => {

			// uuid優先でエンティティを検索、なければnameで検索、それでもなければ新規作成
			let entity: MXP.Entity | undefined;

			if ( node.uuid ) {

				entity = this.entities.get( node.uuid );

			}

			if ( ! entity ) {

				entity = this.entities.get( node.name );

			}

			if ( ! entity ) {

				entity = new MXP.Entity();

			}

			// カメラノードの場合、カメラパラメータを設定
			if ( node.type == 'camera' ) {

				const cameraParam = node.param as MXP.BLidgeCameraParam;
				entity.userData.cameraParam = cameraParam;

			}

			// BLidgerコンポーネントを更新（いったん削除して再追加）
			entity.removeComponent( MXP.BLidger );
			entity.addComponent( MXP.BLidger, { blidge, node } );

			// 子ノードを再帰的に処理
			node.children.forEach( c => {

				const child = createEntityFromNode( c );

				entity.add( child );

			} );

			// エンティティをマップに保存（uuidがあればuuidで、なければnameで）
			const key = node.uuid || entity.name;
			this.entities.set( key, entity );
			entity.userData.updateTime = timeStamp;

			return entity;

		};

		// ルートノードからエンティティツリーを作成
		const newBLidgeRoot = blidge.root && createEntityFromNode( blidge.root );

		if ( newBLidgeRoot ) {

			// 新しいルートエンティティに名前を設定
			newBLidgeRoot.name = "blidgeRoot";

			// 既存のルートがあれば削除
			if ( this.blidgeRoot && this.entity ) {

				this.entity.remove( this.blidgeRoot );

			}

			// 新しいルートを設定
			this.blidgeRoot = newBLidgeRoot;

			// 親エンティティに追加
			if ( this.entity ) {

				this.entity.add( this.blidgeRoot );

			}

		}

		// 古いエンティティ（タイムスタンプが更新されていないもの）を削除
		this.entities.forEach( item => {

			if ( item.userData.updateTime != timeStamp ) {

				const parent = item.parent;

				if ( parent ) {

					parent.remove( item );

				}

				item.dispose();
				this.entities.delete( item.name );

			}

		} );

		// イベント通知
		if ( this.entity && this.blidgeRoot ) {

			const engine = Engine.getInstance( gl );
			engine.applyProjectOverrides( this.blidgeRoot );

			this.emit( "sceneCreated", [ this.blidgeRoot ] );

		}

	}

	/**
	 * 現在のアニメーション状態を取得
	 * @returns アニメーション状態のコピー
	 */
	public getAnimationState() {

		return { ...this.animationState };

	}

	/**
	 * コンポーネントの破棄処理
	 * リソースの解放とエンティティの削除を行う
	 */
	public dispose(): void {

		super.dispose();

		// デバウンスタイマーをクリア
		if ( this.reloadTimerId !== null ) {

			clearTimeout( this.reloadTimerId );
			this.reloadTimerId = null;

		}

		// scene保存タイマーをクリア
		if ( this.saveSceneTimerId !== null ) {

			clearTimeout( this.saveSceneTimerId );
			this.saveSceneTimerId = null;

		}

		// WebSocket接続タイムアウトタイマーをクリア
		if ( this.connectionTimeoutId !== null ) {

			clearTimeout( this.connectionTimeoutId );
			this.connectionTimeoutId = null;

		}

		// BLidgeルートエンティティがある場合は破棄
		if ( this.blidgeRoot ) {

			this.blidgeRoot.disposeRecursive();
			this.entity.remove( this.blidgeRoot );
			this.blidgeRoot = null;

		}

	}

}
