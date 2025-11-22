import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import ukonpowerFrag from './shaders/ukonpower.fs';

import { globalUniforms } from '~/globals';

/**
 * Ukonpower - レイマーチング球体コンポーネント
 */
export class Ukonpower extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// geometry

		const geo = new MXP.SphereGeometry( {
			radius: 1
		} );

		// material

		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'ukonpowerFrag', ukonpowerFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
		} );

		this.mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		// HMR

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/ukonpower.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'ukonpowerFrag', module.default );

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
