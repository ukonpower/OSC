import { Renderer } from '../';
import { Material } from '../../../Material';
import { Mesh } from '../../Mesh';

import type { RenderHookContext } from '../';

// WireframeMaterialは開発環境でのみインポート
let WireframeMaterial: typeof Material | undefined;

if ( import.meta.env.DEV ) {

	WireframeMaterial = ( await import( '../../../Material/WireframeMaterial' ) ).WireframeMaterial;

}

/**
 * エディター専用のレンダラー
 * 通常のレンダリングに加えて、ワイヤーフレーム描画などのエディター固有の機能を提供
 */
export class EditorRenderer extends Renderer {

	private _wireframeMaterial?: Material;

	constructor( gl: WebGL2RenderingContext ) {

		super( gl );

		// ワイヤーフレームマテリアルの初期化（開発環境のみ）
		if ( WireframeMaterial ) {

			this._wireframeMaterial = new WireframeMaterial();

		}

		// UI描画後のフックを設定
		this.onAfterUI = ( context: RenderHookContext ) => {

			this.renderEditorOverlays( context );

		};

	}

	/**
	 * エディター専用のオーバーレイ描画
	 * ワイヤーフレーム、グリッド、ギズモなどを描画
	 */
	private renderEditorOverlays( context: RenderHookContext ): void {

		// ワイヤーフレーム描画
		this.renderWireframes( context );

	}

	/**
	 * ワイヤーフレーム描画
	 */
	private renderWireframes( context: RenderHookContext ): void {

		if ( ! this._wireframeMaterial ) return;

		const { stack, cameraEntity, camera } = context;

		// ワイヤーフレーム描画対象: deferredとforwardのメッシュ
		const wireframeEntities = [ ...stack.deferred, ...stack.forward ];

		// ポリゴンオフセットでワイヤーフレームを手前に表示
		this.gl.enable( this.gl.POLYGON_OFFSET_FILL );
		this.gl.polygonOffset( - 1, - 1 );

		// 各メッシュをワイヤーフレームマテリアルで描画
		for ( let i = 0; i < wireframeEntities.length; i ++ ) {

			const entity = wireframeEntities[ i ];
			const mesh = entity.getComponent( Mesh );

			if ( ! mesh || ! mesh.geometry ) continue;

			// 元のマテリアルがTRIANGLESの場合のみワイヤーフレーム描画
			if ( mesh.material.drawType !== 'TRIANGLES' ) continue;

			// ワイヤーフレームマテリアルで描画
			this.draw(
				entity.uuid + '_wireframe',
				'forward',
				mesh.geometry,
				this._wireframeMaterial,
				{
					viewMatrix: camera.viewMatrix,
					projectionMatrix: camera.projectionMatrix,
					cameraMatrixWorld: cameraEntity.matrixWorld,
					modelMatrixWorld: entity.matrixWorld,
					cameraNear: camera.near,
					cameraFar: camera.far,
					label: 'wireframe'
				}
			);

		}

		// ポリゴンオフセットを無効化
		this.gl.disable( this.gl.POLYGON_OFFSET_FILL );

	}

}
