import * as MXP from 'maxpower';

import { Engine } from '../../../OREngine/core';
import { Editor } from '../index';

/**
 * ScenePointer
 * エディタのCanvasでのマウスイベントを処理し、オブジェクト選択を実行する
 */
export class ScenePointer {

	private _engine: Engine;
	private _editor: Editor;
	private _raycaster: MXP.Raycaster;

	// 順番選択のための状態管理
	private _lastClickNDC: { x: number, y: number } | null = null;
	private _lastHits: MXP.RaycastHit[] = [];
	private _currentHitIndex: number = 0;
	private _clickThreshold: number = 0.01; // NDC空間での近接判定閾値

	constructor( engine: Engine, editor: Editor ) {

		this._engine = engine;
		this._editor = editor;
		this._raycaster = new MXP.Raycaster();

		// デバッグモードを有効化（詳細なレイキャストログを出力）
		this._raycaster.setDebug( true );

	}

	/**
	 * クリックイベントを処理
	 * @param clientX クライアント座標X
	 * @param clientY クライアント座標Y
	 * @param canvas キャンバス要素
	 */
	public handleClick( clientX: number, clientY: number, canvas: HTMLCanvasElement ): void {

		// キャンバスのバウンディングボックスを取得
		const rect = canvas.getBoundingClientRect();

		// キャンバス内の相対座標を計算
		const x = clientX - rect.left;
		const y = clientY - rect.top;

		// 正規化デバイス座標（NDC: -1〜1）に変換
		const ndcX = ( x / rect.width ) * 2 - 1;
		const ndcY = - ( y / rect.height ) * 2 + 1; // Y軸は反転

		// ログ: クリック座標情報
		console.log( '--- ScenePointer: Click Event ---' );
		console.log( `Client coordinates: (${clientX}, ${clientY})` );
		console.log( `Canvas relative: (${x.toFixed( 2 )}, ${y.toFixed( 2 )})` );
		console.log( `NDC coordinates: (${ndcX.toFixed( 3 )}, ${ndcY.toFixed( 3 )})` );
		console.log( `Canvas rect: width=${rect.width}, height=${rect.height}` );

		// レンダリングカメラを取得
		const camera = this._findMainCamera();

		if ( ! camera ) {

			console.warn( 'ScenePointer: No camera found for raycasting' );
			return;

		}

		// ログ: カメラ情報
		console.log( `Camera: ${camera.entity && camera.entity.name || 'unnamed'}` );
		console.log( `Camera displayOut: ${camera.displayOut}` );

		// 同じ位置をクリックしたかどうかを判定
		const isSameLocation = this._isSameClickLocation( ndcX, ndcY );

		// 全ヒット情報を取得
		const allHits = this._raycaster.raycastAll( ndcX, ndcY, camera, this._engine.root );

		// ログ: レイキャスト結果
		console.log( `✓ Total hits: ${allHits.length}` );

		if ( allHits.length > 0 ) {

			allHits.forEach( ( hit, index ) => {

				console.log( `  [${index}] "${hit.entity.name}" (distance: ${hit.distance.toFixed( 3 )})` );

			} );

		}

		let selectedEntity: MXP.Entity | null = null;

		if ( allHits.length > 0 ) {

			if ( isSameLocation && this._lastHits.length > 0 ) {

				// 同じ場所をクリック：次のオブジェクトを選択
				this._currentHitIndex = ( this._currentHitIndex + 1 ) % allHits.length;
				selectedEntity = allHits[ this._currentHitIndex ].entity;

				console.log( `🔄 Same location click: cycling to index ${this._currentHitIndex}` );

			} else {

				// 新しい場所をクリック：最も近いオブジェクトを選択
				this._currentHitIndex = 0;
				selectedEntity = allHits[ 0 ].entity;

				console.log( `🆕 New location click: selecting closest object` );

			}

			// 状態を保存
			this._lastClickNDC = { x: ndcX, y: ndcY };
			this._lastHits = allHits;

			// エンティティを選択
			this._editor.selectEntity( selectedEntity );

			console.log( `→ Selected entity: "${selectedEntity.name}" (${this._currentHitIndex + 1}/${allHits.length})` );

		} else {

			console.log( '✗ Raycast MISS: No objects hit' );

			// ヒットしなかった場合は選択解除と状態リセット
			this._editor.selectEntity( null );
			this._lastClickNDC = null;
			this._lastHits = [];
			this._currentHitIndex = 0;

			console.log( '→ Selection cleared' );

		}

		console.log( '--------------------------------' );

	}

	/**
	 * 前回のクリック位置と今回のクリック位置が近いかどうかを判定
	 */
	private _isSameClickLocation( ndcX: number, ndcY: number ): boolean {

		if ( ! this._lastClickNDC ) return false;

		const dx = ndcX - this._lastClickNDC.x;
		const dy = ndcY - this._lastClickNDC.y;
		const distance = Math.sqrt( dx * dx + dy * dy );

		return distance < this._clickThreshold;

	}

	/**
	 * メインカメラを検索
	 */
	private _findMainCamera(): MXP.Camera | null {

		// ルートエンティティからカメラを探す
		const cameras: MXP.Camera[] = [];

		this._traverseForCamera( this._engine.root, cameras );

		// displayOut=trueのカメラを優先
		for ( let i = 0; i < cameras.length; i ++ ) {

			const camera = cameras[ i ];

			if ( camera.displayOut ) {

				return camera;

			}

		}

		return cameras.length > 0 ? cameras[ 0 ] : null;

	}

	/**
	 * エンティティツリーを再帰的に走査してカメラを収集
	 */
	private _traverseForCamera( entity: MXP.Entity, cameras: MXP.Camera[] ): void {

		// CameraまたはRenderCameraコンポーネントを探す
		let camera = entity.getComponent( MXP.Camera );

		if ( ! camera ) {

			camera = entity.getComponent( MXP.RenderCamera );

		}

		if ( camera ) {

			cameras.push( camera );

		}

		const children = entity.children;

		for ( let i = 0; i < children.length; i ++ ) {

			this._traverseForCamera( children[ i ], cameras );

		}

	}

	/**
	 * 破棄処理
	 */
	public dispose(): void {

		// 現在は特に破棄するリソースはないが、将来のために用意

	}

}
