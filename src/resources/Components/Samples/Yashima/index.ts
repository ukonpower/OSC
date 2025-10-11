import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import yashimaFrag from './shaders/yashima.fs';

import { globalUniforms } from '~/globals';


export class Yashima extends MXP.Component {

	constructor( param: MXP.ComponentParams ) {

		super( param );

		console.log( "init" );


		// geometry

		const geo = new MXP.SphereGeometry( {
			radius: 1
		} );

		// material

		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'yashimaFrag', yashimaFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
		} );

		this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		// HMR

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/yashima.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'yashimaFrag', module.default );

					mat.requestUpdate();

				}

			} );

		}

	}

}
