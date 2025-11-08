import * as MXP from 'maxpower';

import oceanFrag from './shaders/ocean.fs';
import oceanVert from './shaders/ocean.vs';

import { globalUniforms } from '~/globals';

/**
 * Ocean - 海洋レンダリングコンポーネント
 * レイマーチングベースの海洋表現
 */
export class Ocean extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// Meshコンポーネントを追加
		this.mesh = this._entity.addComponent( MXP.Mesh, {
			geometry: new MXP.CubeGeometry( { width: 2, height: 2 } ),
			material: new MXP.Material( {
				phase: [ "deferred" ], // Deferredレンダリングパイプラインを使用
				vert: MXP.hotGet( "oceanVert", oceanVert ),
				frag: MXP.hotGet( "oceanFrag", oceanFrag ),
				uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution )
			} )
		} );

		// ホットリロード対応（開発時のみ）
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/ocean.vs', ( module ) => {

				if ( module ) {

					this.mesh.material.vert = MXP.hotUpdate( 'oceanVert', module.default );
					this.mesh.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/ocean.fs', ( module ) => {

				if ( module ) {

					this.mesh.material.frag = MXP.hotUpdate( 'oceanFrag', module.default );
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
