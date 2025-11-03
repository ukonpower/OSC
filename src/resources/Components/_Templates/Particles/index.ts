import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import particlesVert from './shaders/particles.vs';
import particlesFrag from './shaders/particles.fs';
import particlesComputeFrag from './shaders/particlesCompute.fs';

import { gl, globalUniforms } from '~/globals';

/**
 * Particles - GPGPUとInstancedMeshを使用したパーティクルシステム
 * GPUで位置と速度を計算し、InstancedMeshで描画する高性能パーティクル
 */
export class Particles extends MXP.Component {

	private mesh: MXP.Mesh;

	// GPGPU用のフレームバッファとテクスチャ
	private gpuFrameBuffers: GLP.GLPowerFrameBuffer[];
	private gpuTexturePositions: GLP.GLPowerTexture[];
	private gpuTextureVelocities: GLP.GLPowerTexture[];

	// GPGPU計算用のマテリアル
	private gpuComputeMaterial: MXP.Material;

	// パーティクル数（テクスチャサイズに基づく）
	private particleTextureSize: number;
	private particleCount: number;

	// ダブルバッファリング用のインデックス
	private gpuBufferIndex: number;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// パーティクル数の設定
		// テクスチャサイズで管理（例: 32x32 = 1024パーティクル）
		this.particleTextureSize = 32;
		this.particleCount = this.particleTextureSize * this.particleTextureSize;

		// GPGPU初期化
		this.gpuBufferIndex = 0;
		this.gpuFrameBuffers = [];
		this.gpuTexturePositions = [];
		this.gpuTextureVelocities = [];

		// ダブルバッファリング用に2セット作成
		for ( let i = 0; i < 2; i ++ ) {

			// 位置テクスチャ（RGBA: xyz位置 + wライフタイム）
			const positionTexture = new GLP.GLPowerTexture( gl ).setting( {
				type: gl.FLOAT,
				internalFormat: gl.RGBA32F,
				format: gl.RGBA,
				magFilter: gl.NEAREST,
				minFilter: gl.NEAREST,
			} );

			// 速度テクスチャ（RGBA: xyz速度 + w予備）
			const velocityTexture = new GLP.GLPowerTexture( gl ).setting( {
				type: gl.FLOAT,
				internalFormat: gl.RGBA32F,
				format: gl.RGBA,
				magFilter: gl.NEAREST,
				minFilter: gl.NEAREST,
			} );

			// 初期データ生成
			this.initGPUTexture( positionTexture, velocityTexture );

			this.gpuTexturePositions.push( positionTexture );
			this.gpuTextureVelocities.push( velocityTexture );

			// フレームバッファ作成（MRT用に2つのテクスチャをアタッチ）
			const fbo = new GLP.GLPowerFrameBuffer( gl ).setTexture( [
				positionTexture,
				velocityTexture,
			] );

			this.gpuFrameBuffers.push( fbo );

		}

		// GPGPU計算用マテリアル
		this.gpuComputeMaterial = new MXP.Material( {
			name: 'particles/compute',
			phase: [ 'postprocess' ],
			frag: MXP.hotGet( 'particlesComputeFrag', particlesComputeFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.time, {
				uGPUSampler0: {
					value: this.gpuTexturePositions[ 0 ],
					type: '1i'
				},
				uGPUSampler1: {
					value: this.gpuTextureVelocities[ 0 ],
					type: '1i'
				},
			} )
		} );

		// Meshコンポーネント作成
		this.mesh = this._entity.addComponent( MXP.Mesh );

		// ジオメトリ作成（パーティクル1つあたりの形状）
		const geo = new MXP.SphereGeometry( { radius: 0.5, widthSegments: 6, heightSegments: 4 } );

		// インスタンスID属性を追加
		const random = GLP.MathUtils.randomSeed( 1 );
		const idArray = [];

		for ( let i = 0; i < this.particleCount; i ++ ) {

			// x: 正規化されたインデックス（0~1）, y,z,w: ランダム値
			idArray.push( i / this.particleCount, random(), random(), random() );

		}

		geo.setAttribute( 'id', new Float32Array( idArray ), 4, { instanceDivisor: 1 } );

		this.mesh.geometry = geo;

		// マテリアル作成
		this.mesh.material = new MXP.Material( {
			name: 'particles',
			phase: [ "deferred", "shadowMap" ],
			vert: MXP.hotGet( 'particlesVert', particlesVert ),
			frag: MXP.hotGet( 'particlesFrag', particlesFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution, {
				uGPUSampler0: {
					value: this.gpuTexturePositions[ 0 ],
					type: '1i'
				},
				uGPUSampler1: {
					value: this.gpuTextureVelocities[ 0 ],
					type: '1i'
				},
			} ),
			// パーティクル用のブレンディング設定
			blending: 'ADD',
			depthWrite: false,
		} );

		// ホットリロード対応
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/particles.vs', ( module ) => {

				if ( module ) {

					this.mesh.material.vert = MXP.hotUpdate( 'particlesVert', module.default );
					this.mesh.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/particles.fs', ( module ) => {

				if ( module ) {

					this.mesh.material.frag = MXP.hotUpdate( 'particlesFrag', module.default );
					this.mesh.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/particlesCompute.fs', ( module ) => {

				if ( module ) {

					this.gpuComputeMaterial.frag = MXP.hotUpdate( 'particlesComputeFrag', module.default );
					this.gpuComputeMaterial.requestUpdate();

				}

			} );

		}

	}

	/**
	 * GPUテクスチャの初期化
	 */
	private initGPUTexture( positionTexture: GLP.GLPowerTexture, velocityTexture: GLP.GLPowerTexture ): void {

		const size = this.particleTextureSize;
		const random = GLP.MathUtils.randomSeed( 1 );

		// 位置データ初期化
		const positionData = new Float32Array( size * size * 4 );
		for ( let i = 0; i < size * size; i ++ ) {

			const i4 = i * 4;

			// xyz: 初期位置（中心付近にランダム配置）
			positionData[ i4 + 0 ] = ( random() - 0.5 ) * 2.0;
			positionData[ i4 + 1 ] = ( random() - 0.5 ) * 2.0;
			positionData[ i4 + 2 ] = ( random() - 0.5 ) * 2.0;

			// w: ライフタイム（0~1でランダム）
			positionData[ i4 + 3 ] = random();

		}

		// 速度データ初期化
		const velocityData = new Float32Array( size * size * 4 );
		for ( let i = 0; i < size * size; i ++ ) {

			const i4 = i * 4;

			// xyz: 初期速度（ランダム方向）
			const theta = random() * Math.PI * 2;
			const phi = random() * Math.PI;

			velocityData[ i4 + 0 ] = Math.sin( phi ) * Math.cos( theta );
			velocityData[ i4 + 1 ] = Math.sin( phi ) * Math.sin( theta );
			velocityData[ i4 + 2 ] = Math.cos( phi );

			// w: 予備
			velocityData[ i4 + 3 ] = 0.0;

		}

		// テクスチャにデータ設定
		positionTexture.attach( { width: size, height: size, data: positionData } );
		velocityTexture.attach( { width: size, height: size, data: velocityData } );

	}

	/**
	 * GPGPU計算を実行
	 */
	private updateGPGPU(): void {

		// 読み込み元のバッファインデックス
		const readIndex = this.gpuBufferIndex;
		// 書き込み先のバッファインデックス
		const writeIndex = ( this.gpuBufferIndex + 1 ) % 2;

		// 読み込み元テクスチャを設定
		const uniforms = this.gpuComputeMaterial.uniforms;
		uniforms.uGPUSampler0.value = this.gpuTexturePositions[ readIndex ];
		uniforms.uGPUSampler1.value = this.gpuTextureVelocities[ readIndex ];

		// 書き込み先フレームバッファにレンダリング
		const fbo = this.gpuFrameBuffers[ writeIndex ];

		// レンダリング（実際の描画はRendererが行う想定）
		// ここではセットアップのみ
		// 注: このコンポーネントを使用する場合、Rendererにgpgpuフェーズを追加する必要があります

		// バッファインデックスを入れ替え
		this.gpuBufferIndex = writeIndex;

		// メッシュマテリアルのテクスチャも更新
		this.mesh.material.uniforms.uGPUSampler0.value = this.gpuTexturePositions[ writeIndex ];
		this.mesh.material.uniforms.uGPUSampler1.value = this.gpuTextureVelocities[ writeIndex ];

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		// 毎フレームGPGPU計算を実行
		this.updateGPGPU();

	}

	protected disposeImpl(): void {

		// メッシュコンポーネント削除
		this._entity.removeComponent( MXP.Mesh );

		// GPGPUリソース解放
		for ( let i = 0; i < 2; i ++ ) {

			this.gpuFrameBuffers[ i ].dispose();
			this.gpuTexturePositions[ i ].dispose();
			this.gpuTextureVelocities[ i ].dispose();

		}

	}

}
