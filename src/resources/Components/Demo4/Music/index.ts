import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { Engine } from 'orengine';

import musicFrag from './shaders/music.fs';
import musicVert from './shaders/music.vs';

import { gl, power, globalUniforms } from '~/globals';

const BPM = 100;
const MUSIC_DURATION = 60 * ( ( 8 * ( 32 + 1 ) ) / BPM );

// console.log( MUSIC_DURATION * 60 );

export class Music extends MXP.Component {

	private power: GLP.Power;
	private gl: WebGL2RenderingContext;

	private isAudioBufferReady: boolean;
	private audioContext: AudioContext;
	private audioBuffer: AudioBuffer;
	private implusBuffer: AudioBuffer;
	private audioSrcNode: AudioBufferSourceNode | null;
	private convolverNode: ConvolverNode;
	private gainNode: GainNode;

	// spectrum
	private analyser: AnalyserNode | null;
	private frequencyData: Uint8Array | null;
	private frequencyTexture: GLP.GLPowerTexture | null;

	// buffers

	private bufferLength: number;

	private blockLength: number;
	private numSampleBlocks: number;

	private bufferIn: GLP.GLPowerBuffer;
	private bufferL: GLP.GLPowerBuffer;
	private bufferR: GLP.GLPowerBuffer;

	private tmpOutputArrayL: Float32Array;
	private tmpOutputArrayR: Float32Array;

	private progress: [number, number];

	// play

	private timeCode: number;
	private playStartTime: number;
	private forcePlay: boolean;

	// render

	private currentRender: { stop: () => void } | null;


	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.power = power;
		this.gl = this.power.gl;
		this.audioSrcNode = null;
		this.isAudioBufferReady = false;
		this.timeCode = 0;
		this.playStartTime = - 1;
		this.forcePlay = false;

		/*-------------------------------
			Audio
		-------------------------------*/

		this.audioContext = new AudioContext();

		this.bufferLength = Math.floor( this.audioContext.sampleRate * MUSIC_DURATION );

		// samples

		this.progress = [ 0, 0 ];

		// 本番環境: 1024サイズの固定バッファ、開発環境: 細かく分割
		let len = 1024;

		if ( import.meta.env.DEV ) {

			len = 512 * 256;

		}

		this.blockLength = Math.min( len, this.bufferLength );
		this.numSampleBlocks = Math.ceil( ( this.audioContext.sampleRate * MUSIC_DURATION ) / this.blockLength );

		// tmpOutPut

		this.tmpOutputArrayL = new Float32Array( this.blockLength );
		this.tmpOutputArrayR = new Float32Array( this.blockLength );

		// buffer

		this.audioBuffer = this.audioContext.createBuffer( 2, this.bufferLength, this.audioContext.sampleRate );

		this.bufferIn = new GLP.GLPowerBuffer( this.gl );
		this.bufferIn.setData( new Float32Array( new Array( this.blockLength ).fill( 0 ).map( ( _, i ) => i ) ), 'vbo' );

		this.bufferL = new GLP.GLPowerBuffer( this.gl );
		this.bufferL.setData( new Float32Array( this.bufferLength ), 'vbo', this.gl.DYNAMIC_COPY );

		this.bufferR = new GLP.GLPowerBuffer( this.gl );
		this.bufferR.setData( new Float32Array( this.bufferLength ), 'vbo', this.gl.DYNAMIC_COPY );

		// render

		this.currentRender = this.render();

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/music.vs', ( module ) => {

				if ( module ) {

					MXP.hotUpdate( "music", module.default );

					this.currentRender = this.render();

				}

			} );

		}

		// implus

		this.implusBuffer = this.audioContext.createBuffer( 2, this.audioContext.sampleRate * 1.5, this.audioContext.sampleRate );

		for ( let i = 0; i < this.implusBuffer.length; i ++ ) {

			const t = i / this.implusBuffer.length;

			this.implusBuffer.getChannelData( 0 )[ i ] = ( Math.random() * 2.0 - 1.0 ) * 0.9 * Math.exp( - t * 7 );
			this.implusBuffer.getChannelData( 1 )[ i ] = ( Math.random() * 2.0 - 1.0 ) * 0.9 * Math.exp( - t * 7 );

		}

		this.convolverNode = this.audioContext.createConvolver();
		this.convolverNode.buffer = this.implusBuffer;

		// gain

		this.gainNode = this.audioContext.createGain();
		this.gainNode.gain.value = 1.3;

		// spectrum analyser

		this.analyser = this.audioContext.createAnalyser();
		this.analyser.fftSize = 512;
		this.frequencyData = new Uint8Array( this.analyser.frequencyBinCount );

		this.frequencyTexture = new GLP.GLPowerTexture( this.gl );
		this.frequencyTexture.setting( {
			type: this.gl.UNSIGNED_BYTE,
			internalFormat: this.gl.LUMINANCE,
			format: this.gl.LUMINANCE,
			magFilter: this.gl.LINEAR,
			minFilter: this.gl.LINEAR,
			wrapS: this.gl.CLAMP_TO_EDGE,
			wrapT: this.gl.CLAMP_TO_EDGE,
		} );
		this.frequencyTexture.attach( { width: this.analyser.frequencyBinCount, height: 1, data: this.frequencyData } );

		globalUniforms.music.uMusicFreqTex.value = this.frequencyTexture;

		const engine = Engine.getInstance( gl );
		const deferredRenderer = engine.renderer && engine.renderer.deferredRenderer;

		if ( deferredRenderer ) {

			MXP.UniformsUtils.assign( deferredRenderer.shading.uniforms, globalUniforms.music );

		}

		// DEV環境でEngineに登録（Editorがリッスン）

		if ( import.meta.env.DEV ) {

			const engine = Engine.getInstance( gl );

			engine.registerMusic( this );

		}

	}

	private render() {

		this.progress = [ 0, 0 ];

		if ( this.currentRender ) {

			this.currentRender.stop();

		}

		this.stop();

		this.isAudioBufferReady = false;

		const program = new GLP.GLPowerProgram( this.gl );

		const tf = new GLP.GLPowerTransformFeedback( this.gl );

		tf.setBuffer( "left", this.bufferL, 0 );
		tf.setBuffer( "right", this.bufferR, 1 );

		tf.bind( () => {

			program.setShader( MXP.shaderParse( MXP.hotGet( "music", musicVert ) ), MXP.shaderParse( musicFrag ), { transformFeedbackVaryings: [ 'o_left', 'o_right' ] } );

		} );

		program.setUniform( 'uDuration', '1f', [ MUSIC_DURATION ] );
		program.setUniform( 'uBPM', '1f', [ BPM ] );
		program.setUniform( 'uSampleRate', '1f', [ this.audioContext.sampleRate ] );

		const vao = program.getVAO();

		let renderContinue = true;

		const stop = () => {

			renderContinue = false;

		};

		if ( vao ) {

			vao.setAttribute( 'aTime', this.bufferIn, 1 );

			// 本番環境: シンプルな順次レンダリング、開発環境: 双方向レンダリング
			if ( import.meta.env.DEV ) {

				const startPos = Math.floor( this.timeCode / ( this.bufferLength / this.audioBuffer.sampleRate / this.numSampleBlocks ) );

				const renderParts = async ( ) => {

					for ( let _i = 0; _i < this.numSampleBlocks; _i ++ ) {

						let i;

						if ( _i % 2 === 0 ) {

							i = startPos + Math.floor( _i / 2 );

						} else {

							i = startPos - Math.ceil( _i / 2 );

						}

						if ( i >= this.numSampleBlocks ) {

							i = i - this.numSampleBlocks;

						} else if ( i < 0 ) {

							i = i + this.numSampleBlocks;

						}

						await new Promise( r => {

							setTimeout( () => {

								this.isAudioBufferReady = true;
								r( null );

							}, 100 );

						} );

						if ( ! renderContinue ) return;

						program.setUniform( 'uTimeOffset', '1f', [ this.blockLength * i / this.audioContext.sampleRate ] );

						program.use( () => {

							program.uploadUniforms();

							tf.use( () => {

								this.gl.beginTransformFeedback( this.gl.POINTS );
								this.gl.enable( this.gl.RASTERIZER_DISCARD );

								vao.use( () => {

									this.gl.drawArrays( this.gl.POINTS, 0, vao.vertCount );

								} );

								this.gl.disable( this.gl.RASTERIZER_DISCARD );
								this.gl.endTransformFeedback();

							} );

							this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.bufferL.buffer );
							this.gl.getBufferSubData( this.gl.ARRAY_BUFFER, 0, this.tmpOutputArrayL );

							this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.bufferR.buffer );
							this.gl.getBufferSubData( this.gl.ARRAY_BUFFER, 0, this.tmpOutputArrayR );

							this.gl.bindBuffer( this.gl.ARRAY_BUFFER, null );

							for ( let j = 0; j < this.blockLength; j ++ ) {

								const t = i * this.blockLength + j;
								const enable = t < MUSIC_DURATION * this.audioContext.sampleRate ? 1 : 0;

								this.audioBuffer.getChannelData( 0 )[ t ] = this.tmpOutputArrayL[ j ] * enable;
								this.audioBuffer.getChannelData( 1 )[ t ] = this.tmpOutputArrayR[ j ] * enable;

							}

						} );

						this.progress = [ _i, ( this.numSampleBlocks - 1 ) ];

						this.notice();

					}

				};

				renderParts();

			} else {

				// 本番環境: シンプルに順次レンダリング
				const renderParts = () => {

					this.isAudioBufferReady = true;

					for ( let i = 0; i < this.numSampleBlocks; i ++ ) {

						if ( ! renderContinue ) return;

						program.setUniform( 'uTimeOffset', '1f', [ this.blockLength * i / this.audioContext.sampleRate ] );

						program.use( () => {

							program.uploadUniforms();

							tf.use( () => {

								this.gl.beginTransformFeedback( this.gl.POINTS );
								this.gl.enable( this.gl.RASTERIZER_DISCARD );

								vao.use( () => {

									this.gl.drawArrays( this.gl.POINTS, 0, vao.vertCount );

								} );

								this.gl.disable( this.gl.RASTERIZER_DISCARD );
								this.gl.endTransformFeedback();

							} );

							this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.bufferL.buffer );
							this.gl.getBufferSubData( this.gl.ARRAY_BUFFER, 0, this.tmpOutputArrayL );

							this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.bufferR.buffer );
							this.gl.getBufferSubData( this.gl.ARRAY_BUFFER, 0, this.tmpOutputArrayR );

							this.gl.bindBuffer( this.gl.ARRAY_BUFFER, null );

							for ( let j = 0; j < this.blockLength; j ++ ) {

								const t = i * this.blockLength + j;
								const enable = t < MUSIC_DURATION * this.audioContext.sampleRate ? 1 : 0;

								this.audioBuffer.getChannelData( 0 )[ t ] = this.tmpOutputArrayL[ j ] * enable;
								this.audioBuffer.getChannelData( 1 )[ t ] = this.tmpOutputArrayR[ j ] * enable;

							}

						} );

					}

				};

				renderParts();

			}

		}

		return {
			stop
		};

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		this.timeCode = event.timeCode;

		if ( ! event.playing || event.timeCode < 0 ) {

			this.stop();

			return;

		}

		this.play( event.timeCode, this.forcePlay );
		this.forcePlay = false;

		// スペクトラムテクスチャを更新
		if ( this.analyser && this.frequencyData && this.frequencyTexture && event.playing ) {

			this.analyser.getByteFrequencyData( this.frequencyData );
			this.frequencyTexture.attach( {
				width: this.analyser.frequencyBinCount,
				height: 1,
				data: this.frequencyData
			} );

		}

	}

	private notice() {

		queueMicrotask( () => {

			if ( this.entity ) {

				this.emit( 'update/music', [ this.audioBuffer, this.progress ] );

			}

		} );

	}

	public play( time: number = 0, force?: boolean ) {

		if ( this.audioSrcNode && ! force ) {

			if ( Math.abs( ( this.audioSrcNode.context.currentTime - this.playStartTime ) - time ) < 0.1 ) return;

		}

		this.stop();

		if ( ! this.isAudioBufferReady ) return;

		// src

		this.audioSrcNode = this.audioContext.createBufferSource();
		this.audioSrcNode.buffer = this.audioBuffer;
		this.audioSrcNode.loop = false;
		this.audioSrcNode.start( 0, time );

		this.playStartTime = this.audioSrcNode.context.currentTime - ( time || 0 );

		// connect

		this.audioSrcNode.connect( this.gainNode );
		this.audioSrcNode.connect( this.convolverNode );
		this.convolverNode.connect( this.gainNode );
		this.gainNode.connect( this.audioContext.destination );

		if ( this.analyser ) {

			this.gainNode.connect( this.analyser );

		}

	}

	public stop() {

		if ( this.audioSrcNode ) {

			this.audioSrcNode.stop();
			this.audioSrcNode.disconnect( this.gainNode );
			this.audioSrcNode = null;

		}

		if ( this.convolverNode ) {

			this.convolverNode.disconnect();

		}

	}

	public dispose(): void {

		super.dispose();

		this.stop();

		if ( this.frequencyTexture ) {

			this.frequencyTexture.dispose();
			this.frequencyTexture = null;

		}

		if ( this.analyser ) {

			this.analyser.disconnect();
			this.analyser = null;

		}

	}

}
