import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { Engine, TexProcedural } from 'orengine';

import hashFrag from './shaders/hash.fs';
import noiseFrag from './shaders/noise.fs';
import noiseCyclicFrag from './shaders/noiseCyclic.fs';
import noiseValueFrag from './shaders/noiseValue.fs';

import { gl, globalUniforms } from '~/globals';

export class TextureGenerator extends MXP.Component {

	private updateTextures: TexProcedural[];

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.updateTextures = [];

		const engine = Engine.getInstance( gl );

		const renderer = engine.renderer;

		// 静的テクスチャを生成してグローバルユニフォームに登録
		const noiseTex = new TexProcedural( renderer, {
			frag: noiseFrag,
			resolution: new GLP.Vector( 1024, 1024 )
		} );
		Engine.resources.addTexture( "noise", noiseTex );
		globalUniforms.tex.uNoiseTex = { type: "1i", value: noiseTex };

		const noiseCyclicTex = new TexProcedural( renderer, {
			frag: noiseCyclicFrag,
			resolution: new GLP.Vector( 1024, 1024 )
		} );
		Engine.resources.addTexture( "noiseCyclic", noiseCyclicTex );
		globalUniforms.tex.uNoiseCyclicTex = { type: "1i", value: noiseCyclicTex };

		const hashTex = new TexProcedural( renderer, {
			frag: hashFrag,
			resolution: new GLP.Vector( 512, 512 )
		} );

		hashTex.setting( {
			magFilter: gl.NEAREST,
			minFilter: gl.NEAREST
		} );

		hashTex.render();

		Engine.resources.addTexture( "hash", hashTex );
		globalUniforms.tex.uHashTex = { type: "1i", value: hashTex };

		const noiseCyclicAnimeTex = new TexProcedural( renderer, {
			frag: noiseCyclicFrag,
			uniforms: Engine.getInstance( gl ).uniforms,
			resolution: new GLP.Vector( 512, 512 ),
		} );
		noiseCyclicAnimeTex.setting( { wrapS: gl.REPEAT, wrapT: gl.REPEAT } );
		Engine.resources.addTexture( "noiseCyclic_anime", noiseCyclicAnimeTex );
		this.updateTextures.push( noiseCyclicAnimeTex );

		const noiseValueAnimeTex = new TexProcedural( renderer, {
			frag: noiseValueFrag,
			uniforms: Engine.getInstance( gl ).uniforms,
			resolution: new GLP.Vector( 512, 512 ),
		} );
		noiseValueAnimeTex.setting( { wrapS: gl.REPEAT, wrapT: gl.REPEAT } );
		Engine.resources.addTexture( "noiseValue_anime", noiseValueAnimeTex );
		globalUniforms.tex.uNoiseValueTex = { type: "1i", value: noiseValueAnimeTex };
		this.updateTextures.push( noiseValueAnimeTex );


		this.once( "dispose", () => {

			this.updateTextures.forEach( ( tex ) => {

				tex.dispose();

			} );

			this.updateTextures = [];

		} );

	}

	protected updateImpl(): void {

		for ( let i = 0; i < this.updateTextures.length; i ++ ) {

			const tex = this.updateTextures[ i ];

			tex.render();

		}

	}

}
