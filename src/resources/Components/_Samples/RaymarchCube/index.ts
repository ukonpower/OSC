import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import raymarchCubeFrag from './shaders/raymarchCube.fs';

import { globalUniforms } from '~/globals';


export class RaymarchCube extends MXP.Component {

	constructor( param: MXP.ComponentParams ) {

		super( param );

		console.log( "init" );


		// geometry

		const geo = new MXP.SphereGeometry( {
			radius: 1
		} );

		// material

		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'raymarchCubeFrag', raymarchCubeFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
		} );

		this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		// HMR

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/raymarchCube.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'raymarchCubeFrag', module.default );

					mat.requestUpdate();

				}

			} );

		}

	}

}
