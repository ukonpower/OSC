import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import particlesFrag from './shaders/particles.fs';
import particlesVert from './shaders/particles.vs';
import particlesCompute from './shaders/particlesCompute.fs';

import { gl, globalUniforms } from '~/globals';

/**
 * Particles - GPUComputeとInstancedMeshを使用したパーティクルシステムテンプレート
 *
 * 使い方:
 * 1. particleSize でパーティクル数を調整 (例: 32x32 = 1024個)
 * 2. particlesCompute.fs で物理シミュレーションをカスタマイズ
 * 3. particles.vs でパーティクルの形状・配置をカスタマイズ
 * 4. particles.fs でマテリアル・色をカスタマイズ
 */
export class Particles extends MXP.Component {

	private gpu: MXP.GPUCompute;
	private mesh: MXP.Mesh;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// パーティクル数の設定（32x32 = 1024個）
		const particleSize = new GLP.Vector( 128, 128 );

		// GPUコンピュート初期化
		this.gpu = new MXP.GPUCompute( {
			passes: [
				new MXP.GPUComputePass(
					gl,
					{
						name: 'particles',
						size: particleSize,
						dataLayerCount: 2, // 位置と速度の2レイヤー
						frag: MXP.hotGet( 'particlesCompute', particlesCompute ),
						uniforms: MXP.UniformsUtils.merge( globalUniforms.time ),
					}
				)
			]
		} );

		// GPUテクスチャの初期化
		this.gpu.passes[ 0 ].initTexture( ( layerIndex ) => {

			if ( layerIndex === 0 ) {

				// レイヤー0: 位置 (xyz) + ライフタイム (w)
				return [
					( Math.random() - 0.5 ) * 2.0,
					( Math.random() - 0.5 ) * 2.0,
					( Math.random() - 0.5 ) * 2.0,
					Math.random()
				];

			} else {

				// レイヤー1: 速度 (xyz) + 予備 (w)
				return [ 0.0, 0.0, 0.0, 0.0 ];

			}

		} );

		// パーティクルのジオメトリ（球体）
		const geometry = new MXP.SphereGeometry( {
			radius: 0.5,
			widthSegments: 6,
			heightSegments: 4
		} );

		// インスタンス属性の準備
		const computeUVArray = [];
		const idArray = [];

		for ( let i = 0; i < particleSize.x; i ++ ) {

			for ( let j = 0; j < particleSize.y; j ++ ) {

				// cuv: GPUテクスチャのUV座標
				computeUVArray.push( i / particleSize.x, j / particleSize.y );

				// id: ランダム値
				idArray.push( Math.random(), Math.random(), Math.random(), Math.random() );

			}

		}

		geometry.setAttribute( 'cuv', new Float32Array( computeUVArray ), 2, { instanceDivisor: 1 } );
		geometry.setAttribute( 'id', new Float32Array( idArray ), 4, { instanceDivisor: 1 } );

		// Meshコンポーネント作成
		this.mesh = this._entity.addComponent( MXP.Mesh, {
			geometry,
			material: new MXP.Material( {
				name: 'particles',
				phase: [ 'deferred', 'shadowMap' ],
				vert: MXP.hotGet( 'particlesVert', particlesVert ),
				frag: MXP.hotGet( 'particlesFrag', particlesFrag ),
				uniforms: MXP.UniformsUtils.merge(
					globalUniforms.time,
					this.gpu.passes[ 0 ].outputUniforms
				),
			} )
		} );

		// ホットリロード対応
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/particlesCompute.fs', ( module ) => {

				if ( module ) {

					this.gpu.passes[ 0 ].frag = MXP.hotUpdate( 'particlesCompute', module.default );
					this.gpu.passes[ 0 ].requestUpdate();

				}

			} );

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

		}

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		// 毎フレームGPUコンピュートを実行
		this.gpu.compute( event.renderer );

	}

	protected disposeImpl(): void {

		this._entity.removeComponent( MXP.Mesh );
		this.gpu.dispose();

	}

}
