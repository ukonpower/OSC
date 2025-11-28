import * as MXP from 'maxpower';

import raymarchFrag from './shaders/tableStage.fs';

import { globalUniforms } from '~/globals';
import screenVert from '~/resources/shaders/screen.vs';
import { bindBlidgeUniform } from '~/shortcuts';

/**
 * TableStage - テーブルステージ用のレイマーチングコンポーネント
 * RaymarchScreenをベースにしたテーブル表示用コンポーネント
 */
export class TableStage extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// Meshコンポーネントを追加
		this.mesh = this._entity.addComponent( MXP.Mesh, {
			geometry: new MXP.PlaneGeometry( { width: 2, height: 2 } ),
			material: new MXP.Material( {
				phase: [ "deferred", "shadowMap" ],
				vert: screenVert,
				frag: MXP.hotGet( "tableStageFrag", raymarchFrag ),
				uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution )
			} )
		} );

		// 子entityを作成
		const cubeEntity = new MXP.Entity();
		this._entity.add( cubeEntity );

		bindBlidgeUniform( this.entity, this.mesh );

		// 子entityにMeshコンポーネントを追加
		// const cubeMesh = cubeEntity.addComponent( MXP.Mesh, {
		// 	geometry: new MXP.CubeGeometry( { width: 1, height: 1, depth: 1 } ),
		// 	material: new MXP.Material( {
		// 		phase: [ "deferred" ],
		// 		uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution ),
		// 		drawType: "LINES"
		// 	} )
		// } );

		// ホットリロード対応(開発時のみ)
		if ( import.meta.hot ) {

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
