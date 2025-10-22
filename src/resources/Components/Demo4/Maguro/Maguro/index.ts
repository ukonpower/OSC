import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import maguroFrag from './shaders/maguro.fs';

import { globalUniforms } from '~/globals';


export class Maguro extends MXP.Component {

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// geometry

		const geo = new MXP.CubeGeometry();

		// material

		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'maguroFrag', maguroFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
		} );

		this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		// HMR

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/maguro.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'maguroFrag', module.default );

					mat.requestUpdate();

				}

			} );

		}

	}

}
