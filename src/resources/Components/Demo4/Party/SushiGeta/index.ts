import * as MXP from 'maxpower';

import sushiGetaFrag from './shaders/sushiGeta.fs';

import { globalUniforms } from '~/globals';

/**
 * SushiGeta - 寿司下駄コンポーネント
 */
export class SushiGeta extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// geometry

		const geo = new MXP.CubeGeometry( {
			width: 1.1,
			height: 0.4,
			depth: 1.1
		} );

		// material

		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'sushiGetaFrag', sushiGetaFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
		} );

		this.mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		// HMR

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/sushiGeta.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'sushiGetaFrag', module.default );

					mat.requestUpdate();

				}

			} );

		}

	}

	protected disposeImpl(): void {

		this._entity.removeComponent( MXP.Mesh );

	}

}
