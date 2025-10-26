import * as MXP from 'maxpower';

import finalizeFrag from './shaders/finalize.fs';

import { gl, globalUniforms } from '~/globals';

export class Finalize extends MXP.PostProcess {

	constructor( params: MXP.PostProcessParams<void> ) {

		const { pipeline } = params;
		const blidger = pipeline.entity.getComponent( MXP.BLidger );

		const uniforms = MXP.UniformsUtils.merge( globalUniforms.time );

		// BLidgerのuniformsをバインド
		if ( blidger ) {

			blidger.bindUniforms( uniforms );

		}

		console.log( blidger );


		super( {
			name: "Finalize",
			passes: [
				new MXP.PostProcessPass( gl, {
					frag: finalizeFrag,
					uniforms: uniforms,
				} )
			]
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/finalize.fs", ( module ) => {

				if ( module ) {

					this.passes[ 0 ].frag = module.default;

				}

				this.passes[ 0 ].requestUpdate();

			} );

		}

	}

}
