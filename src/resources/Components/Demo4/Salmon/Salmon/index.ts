import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import salmonFrag from './shaders/salmon.fs';

import { globalUniforms } from '~/globals';
import { bindBlidgeUniform } from '~/shortcuts';


export class Salmon extends MXP.Component {

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// geometry

		const geo = new MXP.CubeGeometry( {
			width: 1.5,
			height: 0.8,
			depth: 1
		} );

		// material

		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'salmonFrag', salmonFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time, globalUniforms.tex )
		} );


		const mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		bindBlidgeUniform( mesh );

		// HMR

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/salmon.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'salmonFrag', module.default );

					mat.requestUpdate();

				}

			} );

		}

	}

}
