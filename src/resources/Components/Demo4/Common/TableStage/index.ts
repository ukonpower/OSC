import * as MXP from 'maxpower';

import raymarchFrag from './shaders/tableStage.fs';
import raymarchVert from './shaders/tableStage.vs';

import { globalUniforms } from '~/globals';

/**
 * TableStage - テーブルステージ用のレイマーチングコンポーネント
 * RaymarchScreenをベースにしたテーブル表示用コンポーネント
 */
export class TableStage extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// Meshコンポーネントを追加
		this.mesh = this._entity.addComponent( MXP.Mesh );

		// Planeジオメトリを作成(XY平面)
		this.mesh.geometry = new MXP.PlaneGeometry( { width: 2, height: 2 } );

		// マテリアルを作成
		this.mesh.material = new MXP.Material( {
			phase: [ "deferred" ], // Deferredレンダリングパイプラインを使用
			vert: MXP.hotGet( "tableStageVert", raymarchVert ),
			frag: MXP.hotGet( "tableStageFrag", raymarchFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution )
		} );

		// 子entityを作成
		const cubeEntity = new MXP.Entity();
		this._entity.add( cubeEntity );

		// 子entityにMeshコンポーネントを追加
		const cubeMesh = cubeEntity.addComponent( MXP.Mesh );

		// サイズ1のCubeジオメトリを設定
		cubeMesh.geometry = new MXP.CubeGeometry( { width: 1, height: 1, depth: 1 } );

		// シンプルなマテリアルを設定
		cubeMesh.material = new MXP.Material( {
			phase: [ "deferred" ],
			uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution )
		} );

		// ホットリロード対応(開発時のみ)
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/tableStage.vs', ( module ) => {

				if ( module ) {

					this.mesh.material.vert = MXP.hotUpdate( 'tableStageVert', module.default );
					this.mesh.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/tableStage.fs', ( module ) => {

				if ( module ) {

					this.mesh.material.frag = MXP.hotUpdate( 'tableStageFrag', module.default );
					this.mesh.material.requestUpdate();

				}

			} );

		}

	}

	protected disposeImpl(): void {

		// Meshコンポーネントを削除
		this._entity.removeComponent( MXP.Mesh );

	}

}
