import * as MXP from 'maxpower';

import basicFrag from './shaders/basic.fs';
import basicVert from './shaders/basic.vs';

import { globalUniforms } from '~/globals';

/**
 * ShaderMesh - 任意のシェーダーを描画するためのPlaneメッシュコンポーネント
 * テンプレートとして使用し、シェーダーファイルを自由に編集可能
 */
export class ShaderMesh extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// Meshコンポーネントを追加
		this.mesh = this._entity.addComponent( MXP.Mesh, {
			geometry: new MXP.PlaneGeometry( { width: 1.0, height: 1.0 } ),
			material: new MXP.Material( {
				vert: MXP.hotGet( "basicVert", basicVert ),
				frag: MXP.hotGet( "basicFrag", basicFrag ),
				uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution )
			} )
		} );

		// ホットリロード対応（開発時のみ）
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/basic.vs', ( module ) => {

				if ( module ) {

					this.mesh.material.vert = MXP.hotUpdate( 'basicVert', module.default );
					this.mesh.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/basic.fs', ( module ) => {

				if ( module ) {

					this.mesh.material.frag = MXP.hotUpdate( 'basicFrag', module.default );
					this.mesh.material.requestUpdate();

				}

			} );

		}

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		// カスタムユニフォームの更新などをここに記述可能

	}

	protected disposeImpl(): void {

		// Meshコンポーネントを削除
		this._entity.removeComponent( MXP.Mesh );

	}

}
