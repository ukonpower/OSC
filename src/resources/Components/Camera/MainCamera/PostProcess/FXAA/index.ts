import * as MXP from 'maxpower';

import fxaaFrag from './shaders/fxaa.fs';

import { gl } from '~/globals';

export class FXAA extends MXP.PostProcess {

	constructor( params: MXP.PostProcessParams<void> ) {

		super( {
			name: "FXAA",
			passes: [
				new MXP.PostProcessPass( gl, {
					name: 'fxaa',
					frag: fxaaFrag,
				} )
			],
		} );

	}

}

