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

	constructor( engine: Engine, editor: Editor ) {

		this._engine = engine;
		this._editor = editor;
		this._raycaster = new MXP.Raycaster();

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

		// レンダリングカメラを取得
		const camera = this._findMainCamera();

		if ( ! camera ) return;

		// レイキャストを実行
		const hit = this._raycaster.raycast( ndcX, ndcY, camera, this._engine.root );

		if ( hit ) {

			// ヒットしたエンティティを選択
			this._editor.selectEntity( hit.entity );

		} else {

			// ヒットしなかった場合は選択解除
			this._editor.selectEntity( null );

		}

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
