import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import sashimiFrag from './shaders/sashimi.fs';

import { globalUniforms } from '~/globals';


export class Sashimi extends MXP.Component {

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// geometry

		const geo = new MXP.CubeGeometry( {
			depth: 1.7,
			width: 0.7,
			height: 1.0
		} );

		// material

		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'sashimiFrag', sashimiFrag ),
			uniforms: MXP.UniformsUtils.merge(
				globalUniforms.resolution,
				globalUniforms.time,
				globalUniforms.tex
			)
		} );

		this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		// HMR

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/sashimi.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'sashimiFrag', module.default );

					mat.requestUpdate();

				}

			} );

		}

	}

}
