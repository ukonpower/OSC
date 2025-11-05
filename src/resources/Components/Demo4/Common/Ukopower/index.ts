import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import ukopowerFrag from './shaders/ukopower.fs';

import { globalUniforms } from '~/globals';

/**
 * Ukopower - レイマーチング球体コンポーネント
 */
export class Ukopower extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// geometry

		const geo = new MXP.SphereGeometry( {
			radius: 1
		} );

		// material

		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'ukopowerFrag', ukopowerFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
		} );

		this.mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		// HMR

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/ukopower.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'ukopowerFrag', module.default );

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
