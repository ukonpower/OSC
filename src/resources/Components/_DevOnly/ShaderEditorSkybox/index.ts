import * as MXP from 'maxpower';

import shaderEditorSkyboxFrag from './shaders/shaderEditorSkybox.fs';

import { globalUniforms } from '~/globals';
import { bindBlidgeUniform } from '~/shortcuts';

export class ShaderEditorSkybox extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const mesh = this._entity.addComponent( MXP.Mesh, {
			geometry: new MXP.SphereGeometry( { radius: 500, widthSegments: 32, heightSegments: 32 } ),
			material: new MXP.Material( {
				phase: [ "deferred", "envMap" ],
				frag: MXP.hotGet( 'shaderEditorSkybox', shaderEditorSkyboxFrag ),
				cullFace: false,
				uniforms: MXP.UniformsUtils.merge( globalUniforms.time )
			} )
		} );

		bindBlidgeUniform( mesh.entity, mesh );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/shaderEditorSkybox.fs', ( module ) => {

				if ( module ) {

					mesh.material.frag = MXP.hotUpdate( 'shaderEditorSkybox', module.default );

					mesh.material.requestUpdate();

				}

			} );

		}

	}

}
