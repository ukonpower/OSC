import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import teiboFrag from './shaders/teibo.fs';

import { globalUniforms } from '~/globals';

/**
 * Teibo - 釣りの堤防コンポーネント
 */
export class Teibo extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// geometry

		const geo = new MXP.SphereGeometry( {
			radius: 1
		} );

		// material

		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'teiboFrag', teiboFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
		} );

		this.mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		// HMR

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/teibo.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'teiboFrag', module.default );

					mat.requestUpdate();

				}

			} );

		}

	}

	protected disposeImpl(): void {

		this._entity.removeComponent( MXP.Mesh );

	}

}
