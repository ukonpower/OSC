import * as MXP from 'maxpower';

import takoGateFrag from './shaders/takogate.fs';
import takoGateVert from './shaders/takogate.vs';

import { globalUniforms } from '~/globals';
import { bindBlidgeUniform } from '~/shortcuts';

/**
 * TakoGate - レイマーチングで描画するゲートコンポーネント
 */
export class TakoGate extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// Meshコンポーネントを追加
		this.mesh = this._entity.addComponent( MXP.Mesh, {
			geometry: new MXP.PlaneGeometry( { width: 2, height: 2 } ),
			material: new MXP.Material( {
				phase: [ "deferred" ],
				vert: MXP.hotGet( "takoGateVert", takoGateVert ),
				frag: MXP.hotGet( "takoGateFrag", takoGateFrag ),
				uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution )
			} )
		} );

		bindBlidgeUniform( this.mesh.entity, this.mesh );

		// ホットリロード対応
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/takogate.vs', ( module ) => {

				if ( module ) {

					this.mesh.material.vert = MXP.hotUpdate( 'takoGateVert', module.default );
					this.mesh.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/takogate.fs', ( module ) => {

				if ( module ) {

					this.mesh.material.frag = MXP.hotUpdate( 'takoGateFrag', module.default );
					this.mesh.material.requestUpdate();

				}

			} );

		}

	}

	protected disposeImpl(): void {

		this._entity.removeComponent( MXP.Mesh );

	}

}
