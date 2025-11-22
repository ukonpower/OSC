import * as MXP from 'maxpower';

import tsuriZaoFrag from './shaders/tsuriZao.fs';

import { globalUniforms } from '~/globals';

/**
 * TsuriZao - 釣り竿のレイマーチングコンポーネント
 */
export class TsuriZao extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// geometry
		const geo = new MXP.CylinderGeometry( {
			radiusTop: 0.02,
			radiusBottom: 0.05,
			height: 3,
			radSegments: 8,
			heightSegments: 1
		} );

		// material
		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'tsuriZaoFrag', tsuriZaoFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
		} );

		this.mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		// HMR
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/tsuriZao.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'tsuriZaoFrag', module.default );
					mat.requestUpdate();

				}

			} );

		}

	}

	protected disposeImpl(): void {

		this._entity.removeComponent( MXP.Mesh );

	}

}
