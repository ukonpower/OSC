import { Renderer } from '../';
import { Geometry } from '../../../Geometry';
import { CubeGeometry } from '../../../Geometry/CubeGeometry';
import { Material } from '../../../Material';
import { Mesh } from '../../Mesh';

import type { RenderHookContext } from '../';

// WireframeMaterialは開発環境でのみインポート
type WireframeMaterialConstructor = new ( color?: [number, number, number] ) => Material;
let WireframeMaterial: WireframeMaterialConstructor | undefined;

if ( import.meta.env.DEV ) {

	WireframeMaterial = ( await import( '../../../Material/WireframeMaterial' ) ).WireframeMaterial;

}

/**
 * エディター専用のレンダラー
 * 通常のレンダリングに加えて、ワイヤーフレーム描画などのエディター固有の機能を提供
 */
export class EditorRenderer extends Renderer {

	private _wireframeMaterial?: Material;
	private _wireframeMaterialSelected?: Material;
	private _emptyWireframeGeometry?: Geometry;
	public showWireframe: boolean = true;
	public selectedEntityId: string | null = null;

	constructor( gl: WebGL2RenderingContext ) {

		super( gl );

		// ワイヤーフレームマテリアルの初期化（開発環境のみ）
		if ( WireframeMaterial ) {

			// 通常のワイヤーフレーム（黒色）
			this._wireframeMaterial = new WireframeMaterial( [ 0.0, 0.0, 0.0 ] );

			// 選択時のワイヤーフレーム（オレンジ色）
			this._wireframeMaterialSelected = new WireframeMaterial( [ 1.0, 0.5, 0.0 ] );

			// Empty用のワイヤーフレームジオメトリを作成（0.5サイズのキューブ）
			this._emptyWireframeGeometry = new CubeGeometry( { width: 0.5, height: 0.5, depth: 0.5 } );

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
	 * すべてのエンティティを描画し、選択されているものはオレンジ色、それ以外は黒色で描画
	 */
	private renderWireframes( context: RenderHookContext ): void {

		if ( ! this._wireframeMaterial || ! this._wireframeMaterialSelected || ! this.showWireframe ) return;

		const { stack, cameraEntity, camera } = context;

		// ワイヤーフレーム描画対象: deferredとforwardのメッシュ
		const wireframeEntities = [ ...stack.deferred, ...stack.forward ];

		// Meshを持たないエンティティも追加（Empty描画用）
		const emptyEntities = [ ...stack.ui, ...stack.shadowMap ];

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

			// 選択されているエンティティはオレンジ色、それ以外は黒色
			const isSelected = entity.uuid === this.selectedEntityId;
			const material = isSelected ? this._wireframeMaterialSelected : this._wireframeMaterial;

			// ワイヤーフレームマテリアルで描画
			this.draw(
				entity.uuid + '_wireframe',
				'forward',
				mesh.geometry,
				material,
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

		// Meshを持たないエンティティをEmpty用ワイヤーフレームで描画
		if ( this._emptyWireframeGeometry ) {

			for ( let i = 0; i < emptyEntities.length; i ++ ) {

				const entity = emptyEntities[ i ];
				const mesh = entity.getComponent( Mesh );

				// Meshを持つエンティティはスキップ
				if ( mesh ) continue;

				console.log( "yaahhhho" );


				// 選択されているエンティティはオレンジ色、それ以外は黒色
				const isSelected = entity.uuid === this.selectedEntityId;
				const material = isSelected ? this._wireframeMaterialSelected : this._wireframeMaterial;

				// Empty用ワイヤーフレームで描画
				this.draw(
					entity.uuid + '_empty_wireframe',
					'forward',
					this._emptyWireframeGeometry,
					material,
					{
						viewMatrix: camera.viewMatrix,
						projectionMatrix: camera.projectionMatrix,
						cameraMatrixWorld: cameraEntity.matrixWorld,
						modelMatrixWorld: entity.matrixWorld,
						cameraNear: camera.near,
						cameraFar: camera.far,
						label: 'empty_wireframe'
					}
				);

			}

		}

		// ポリゴンオフセットを無効化
		this.gl.disable( this.gl.POLYGON_OFFSET_FILL );

	}

}
