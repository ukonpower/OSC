import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import mizuBallFrag from './shaders/mizuBall.fs';

import { globalUniforms } from '~/globals';


export class MizuBall extends MXP.Component {

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// geometry

		const geo = new MXP.SphereGeometry( {
			radius: 1
		} );

		// material

		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'mizuBallFrag', mizuBallFrag ),
			phase: [ 'forward' ],
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
		} );

		this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		// HMR

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/mizuBall.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'mizuBallFrag', module.default );

					mat.requestUpdate();

				}

			} );

		}

	}

}
