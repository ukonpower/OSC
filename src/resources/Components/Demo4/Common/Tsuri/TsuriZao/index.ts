import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import basicFrag from './shaders/basic.fs';

import { globalUniforms } from '~/globals';

/**
 * TsuriZao - 釣り竿コンポーネント
 */
export class TsuriZao extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// geometry - 円錐状の釣り竿
		const geo = new MXP.CylinderGeometry( {
			radiusTop: 0.03,
			radiusBottom: 0.03,
			height: 1.5,
			radSegments: 8,
			heightSegments: 1
		} );

		// 下端が原点に来るようにオフセット
		geo.applyMatrix( new GLP.Matrix().setFromTransform( new GLP.Vector( 0, 0.75, 0 ) ) );

		// material
		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'tsuriZaoFrag', basicFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
		} );

		this.mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		// HMR
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/basic.fs', ( module ) => {

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
