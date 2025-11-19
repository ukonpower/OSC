import * as MXP from 'maxpower';

import saraFrag from './shaders/sara.fs';

import { globalUniforms } from '~/globals';

/**
 * Sara - 皿のレイマーチングコンポーネント
 */
export class Sara extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// geometry
		const geo = new MXP.SphereGeometry( {
			radius: 1
		} );

		// material
		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'saraFrag', saraFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
		} );

		this.mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		// HMR
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/sara.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'saraFrag', module.default );
					mat.requestUpdate();

				}

			} );

		}

	}

	protected disposeImpl(): void {

		this._entity.removeComponent( MXP.Mesh );

	}

}
