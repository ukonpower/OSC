import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { Engine } from 'orengine';

import deferredShadingFrag from './shaders/deferredShading.fs';
import normalSelectorFrag from './shaders/normalSelector.fs';
import ssaoFrag from './shaders/ssao.fs';
import ssaoBlurFrag from './shaders/ssaoBlur.fs';

const ssaoKernel = ( kernelSize: number ) => {

	const kernel = [];
	for ( let i = 0; i < kernelSize; i ++ ) {

		const sample = new GLP.Vector();
		sample.x = Math.random() * 2.0 - 1.0;
		sample.y = Math.random() * 2.0 - 1.0;
		sample.z = i / kernelSize * 0.95 + 0.05;
		sample.normalize();

		sample.multiply( i / kernelSize * 0.95 + 0.05 );

		kernel.push( ...sample.getElm( "vec3" ) );

	}

	return kernel;

};

type Params = {
	gl: WebGL2RenderingContext;
	envMap: GLP.GLPowerTexture;
	envMapCube?: GLP.GLPowerTextureCube
}

export class DeferredRenderer extends GLP.EventEmitter {

	// uniforms

	private timeUniforms_: GLP.Uniforms;

	// renderer postprocess

	public postprocess: MXP.PostProcess;

	// nromal buffer

	public normalSelector_: MXP.PostProcessPass;

	// ssao

	public ssao: MXP.PostProcessPass;
	public rtSSAO1: GLP.GLPowerFrameBuffer;
	public rtSSAO2: GLP.GLPowerFrameBuffer;

	public ssaoBlur: MXP.PostProcessPass;
	private ssaoBlurUni: GLP.Uniforms;

	// shading

	public shading: MXP.PostProcessPass;

	constructor( params: Params ) {

		super();

		const gl = params.gl;

		// uniforms

		const timeUniforms: GLP.Uniforms = {
			uTimeEF: {
				value: 0,
				type: "1f"
			}
		};

		// normal buffer

		const normalSelector = new MXP.PostProcessPass( gl, {
			name: 'normalSelector',
			frag: normalSelectorFrag,
			renderTarget: null,
			uniforms: MXP.UniformsUtils.merge( {
				uNormalTexture: {
					value: null,
					type: '1i'
				},
				uPosTexture: {
					value: null,
					type: '1i'
				},
				uSelectorTexture: {
					value: null,
					type: '1i'
				},
			} ),
			passThrough: true,
		} );

		// ssao

		const rtSSAO1 = new GLP.GLPowerFrameBuffer( gl ).setTexture( [
			new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
		] );

		const rtSSAO2 = new GLP.GLPowerFrameBuffer( gl ).setTexture( [
			new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
		] );

		const ssao = new MXP.PostProcessPass( gl, {
			name: 'ssao',
			frag: ssaoFrag,
			renderTarget: MXP.hotGet( "ssao", rtSSAO1 ),
			uniforms: MXP.UniformsUtils.merge( timeUniforms, {
				uSSAOBackBuffer: {
					value: rtSSAO2.textures[ 0 ],
					type: '1i'
				},
				uSSAOKernel: {
					value: ssaoKernel( 16 ),
					type: "3fv"
				}
			} ),
			resolutionRatio: 0.5,
			passThrough: true,
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/ssao.fs", ( module ) => {

				if ( module ) {

					ssao.frag = MXP.hotUpdate( 'ssao', module.default );

				}

				ssao.requestUpdate();

			} );

		}

		const SSAOSAMPLE = 8;

		const ssaoBlurUni = MXP.UniformsUtils.merge( timeUniforms, {
			uSSAOTexture: {
				value: rtSSAO2.textures[ 0 ],
				type: '1i'
			},
			uDepthTexture: {
				value: null,
				type: '1i'
			},
			uNormalTexture: {
				value: null,
				type: '1i'
			},
			uWeights: {
				type: '1fv',
				value: GLP.MathUtils.gaussWeights( SSAOSAMPLE )
			},
		} );

		const ssaoBlurH = new MXP.PostProcessPass( gl, {
			name: 'ssaoBlur/h',
			frag: MXP.hotGet( "ssaoBlur", ssaoBlurFrag ),
			uniforms: ssaoBlurUni,
			resolutionRatio: 1.0,
			passThrough: true,
			defines: {
				SSAOSAMPLE
			}
		} );

		const ssaoBlurV = new MXP.PostProcessPass( gl, {
			name: 'ssaoBlur/v',
			frag: MXP.hotGet( "ssaoBlur", ssaoBlurFrag ),
			uniforms: MXP.UniformsUtils.merge( ssaoBlurUni, {
				uSSAOTexture: {
					value: ssaoBlurH.renderTarget!.textures[ 0 ],
					type: '1i'
				},
			} ),
			defines: {
				SSAOSAMPLE,
				IS_VIRT: ''
			},
			resolutionRatio: 1.0,
			passThrough: true,
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/ssaoBlur.fs", ( module ) => {

				if ( module ) {

					ssaoBlurH.frag = ssaoBlurV.frag = MXP.hotUpdate( 'ssaoBlur', module.default );

				}

				ssaoBlurH.requestUpdate();
				ssaoBlurV.requestUpdate();

			} );

		}

		// shading

		const shading = new MXP.PostProcessPass( gl, {
			name: "deferredShading",
			frag: MXP.hotGet( "deferredShading", deferredShadingFrag ),
			uniforms: MXP.UniformsUtils.merge( {
				uSSAOTexture: {
					value: ssaoBlurV.renderTarget!.textures[ 0 ],
					type: '1i'
				},
				uSSAOResolutionInv: {
					value: ssao.resolutionInv,
					type: '2fv'
				},
				uEnvMap: {
					value: params.envMap,
					type: '1i'
				},
			} ),
		} );

		this.postprocess = new MXP.PostProcess( { passes: [
			normalSelector,
			ssao,
			ssaoBlurH,
			ssaoBlurV,
			shading,
		] } );

		this.timeUniforms_ = timeUniforms;
		this.shading = shading;
		this.ssao = ssao;

		this.rtSSAO1 = rtSSAO1;
		this.rtSSAO2 = rtSSAO2;

		this.ssaoBlur = ssaoBlurH;
		this.ssaoBlurUni = ssaoBlurUni;

		this.normalSelector_ = normalSelector;

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/deferredShading.fs", ( module ) => {

				if ( module ) {

					shading.frag = MXP.hotUpdate( 'deferredShading', module.default );

				}

				shading.requestUpdate();

			} );

		}

	}

	public update( event: MXP.EntityUpdateEvent ): void {

		// uniforms

		this.timeUniforms_.uTimeEF.value = ( this.timeUniforms_.uTimeEF.value + event.timeDelta ) % 1;

		// ssao swap

		let tmp = this.rtSSAO1;
		this.rtSSAO1 = this.rtSSAO2;
		this.rtSSAO2 = tmp;

		this.ssao.setRendertarget( this.rtSSAO1 );
		this.ssaoBlur.uniforms.uSSAOTexture.value = this.rtSSAO1.textures[ 0 ];
		this.ssao.uniforms.uSSAOBackBuffer.value = this.rtSSAO2.textures[ 0 ];

	}

	public setRenderCamera( renderCamera: MXP.RenderCamera ) {

		const renderTarget = renderCamera.renderTarget;

		if ( ! renderTarget	) return;

		for ( let i = 0; i < renderTarget.gBuffer.textures.length; i ++ ) {

			let tex = renderTarget.gBuffer.textures[ i ];

			if ( i === 1 ) {

				tex = renderTarget.normalBuffer.textures[ 0 ];

			}

			this.shading.uniforms[ "sampler" + i ] = this.ssao.uniforms[ "sampler" + i ] = {
				type: '1i',
				value: tex
			};

		}

		this.ssaoBlur.uniforms.uDepthTexture.value = renderTarget.gBuffer.textures[ 0 ];
		this.shading.renderTarget = renderTarget.shadingBuffer;

		this.normalSelector_.renderTarget = renderTarget.normalBuffer;
		this.normalSelector_.uniforms.uNormalTexture.value = renderTarget.gBuffer.textures[ 1 ];
		this.normalSelector_.uniforms.uPosTexture.value = renderTarget.gBuffer.textures[ 0 ];
		this.normalSelector_.uniforms.uSelectorTexture.value = renderTarget.gBuffer.textures[ 3 ];

		this.ssaoBlurUni.uNormalTexture.value = renderTarget.normalBuffer.textures[ 0 ];

	}

	public resize( resolution: GLP.Vector ) {

		this.postprocess.resize( resolution );

	}

}
