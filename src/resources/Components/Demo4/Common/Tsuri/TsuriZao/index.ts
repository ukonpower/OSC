import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import basicFrag from './shaders/basic.fs';
import basicVert from '~/resources/shaders/basic.vs';

import { globalUniforms } from '~/globals';

/**
 * TsuriZao - 釣り竿コンポーネント
 */
export class TsuriZao extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( param: MXP.ComponentParams ) {

		super( param );

		const h = 1.7;

		// geometry - 円錐状の釣り竿
		const geo = new MXP.CylinderGeometry( {
			radiusTop: 0.018,
			radiusBottom: 0.018,
			height: h,
			radSegments: 8,
			heightSegments: 16
		} );

		// 下端が原点に来るようにオフセット
		geo.applyMatrix( new GLP.Matrix().setFromTransform( new GLP.Vector( 0, h * 0.5, 0 ) ) );

		// material
		const mat = new MXP.Material( {
			vert: MXP.hotGet( 'tsuriZaoVert', basicVert ),
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
