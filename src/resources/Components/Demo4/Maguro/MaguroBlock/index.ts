import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import maguroBlockFrag from './shaders/maguroBlock.fs';

import { globalUniforms } from '~/globals';

/**
 * MaguroBlock - ブロック状のマグロコンポーネント
 */
export class MaguroBlock extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// geometry
		const geo = new MXP.SphereGeometry( {
			radius: 1
		} );

		// material
		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'maguroBlockFrag', maguroBlockFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
		} );

		this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		// HMR
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/maguroBlock.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'maguroBlockFrag', module.default );

					mat.requestUpdate();

				}

			} );

		}

	}

	protected disposeImpl(): void {

		// Meshコンポーネントを削除
		this._entity.removeComponent( MXP.Mesh );

	}

}
