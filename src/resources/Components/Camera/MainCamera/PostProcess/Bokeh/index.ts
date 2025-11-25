import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import gaussBlur from '../../shaders/gaussBlur.fs';

import { gl } from '~/globals';

export class Bokeh extends MXP.PostProcess {

	public bokehV: MXP.PostProcessPass;
	public bokehH: MXP.PostProcessPass;

	constructor( params: MXP.PostProcessParams<void> ) {

		const bSample = 8;
		const bokehParam: MXP.PostProcessPassParam = {
			name: 'bokeh/v',
			frag: gaussBlur,
			uniforms: {
				uIsVertical: { type: '1i', value: true },
				uWeights: { type: '1fv', value: GLP.MathUtils.gaussWeights( bSample ) },
				uBlurRange: { value: 6.0, type: '1f' }
			},
			defines: { GAUSS_WEIGHTS: bSample.toString() },
			resolutionRatio: 1.0
		};

		const bokehV = new MXP.PostProcessPass( gl, bokehParam );
		const bokehH = new MXP.PostProcessPass( gl, {
			...bokehParam,
			name: 'bokeh/h',
			uniforms: {
				...bokehParam.uniforms,
				uIsVertical: { type: '1i', value: false }
			}
		} );

		super( {
			name: "Bokeh",
			passes: [ bokehV, bokehH ]
		} );

		this.bokehV = bokehV;
		this.bokehH = bokehH;

		this.enabled = false;

	}

}
