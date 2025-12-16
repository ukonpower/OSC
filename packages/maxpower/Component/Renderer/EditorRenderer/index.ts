import { Renderer } from '../';
import { Geometry } from '../../../Geometry';
import { Material } from '../../../Material';
import { WireframeMaterial } from '../../../Material/WireframeMaterial';
import { Mesh } from '../../Mesh';

import type { RenderHookContext } from '../';

/**
 * Blenderスタイルの十字ワイヤーフレームジオメトリを作成
 * X, Y, Z軸の3本の線（6頂点）を持つ
 */
function createEmptyCrossGeometry(): Geometry {

	const size = 0.5;

	// 6頂点：各軸の正負方向の端点
	const positions = new Float32Array( [
		// X軸
		- size, 0, 0,
		size, 0, 0,
		// Y軸
		0, - size, 0,
		0, size, 0,
		// Z軸
		0, 0, - size,
		0, 0, size,
	] );

	// LINES描画用のインデックス（3本の線 = 6インデックス）
	const indices = new Uint16Array( [
		0, 1, // X軸
		2, 3, // Y軸
		4, 5, // Z軸
	] );

	const geometry = new Geometry();
	geometry.setAttribute( 'position', positions, 3 );
	geometry.setAttribute( 'index', indices, 1 );

	return geometry;

}

/**
 * エディター専用のレンダラー
 * 通常のレンダリングに加えて、ワイヤーフレーム描画などのエディター固有の機能を提供
 */
export class EditorRenderer extends Renderer {

	private _wireframeMaterial: Material;
	private _wireframeMaterialSelected: Material;
	private _emptyWireframeGeometry: Geometry;
	public showWireframe: boolean = true;
	public selectedEntityId: string | null = null;

	constructor( gl: WebGL2RenderingContext ) {

		super( gl );

		// ワイヤーフレームマテリアルの初期化
		// 通常のワイヤーフレーム（黒色）
		this._wireframeMaterial = new WireframeMaterial( [ 0.0, 0.0, 0.0 ] );

		// 選択時のワイヤーフレーム（オレンジ色）
		this._wireframeMaterialSelected = new WireframeMaterial( [ 1.0, 0.5, 0.0 ] );

		// Empty用の十字ワイヤーフレームジオメトリを作成
		this._emptyWireframeGeometry = createEmptyCrossGeometry();

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

		if ( ! this.showWireframe ) return;

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

			for ( let i = 0; i < stack.empty.length; i ++ ) {

				const entity = stack.empty[ i ];

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
