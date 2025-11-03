import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import ikuraFluidsFrag from './shaders/ikuraFluids.fs';
import ikuraFluidsVert from './shaders/ikuraFluids.vs';
import ikuraFluidsCompute from './shaders/ikuraFluidsCompute.fs';

import { gl, globalUniforms } from '~/globals';

/**
 * IkuraFluids - GPUComputeベースの流体シミュレーション（いくらのようなプチプチした液体）
 *
 * 特徴:
 * - 高密度パーティクルによる流体表現
 * - 表面張力と粘性のシミュレーション
 * - 衝突・相互作用
 */
export class IkuraFluids extends MXP.Component {

	private gpu: MXP.GPUCompute;
	private mesh: MXP.Mesh;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// パーティクル数の設定（256x256 = 65536個）
		const particleSize = new GLP.Vector( 256, 256 );

		// GPUコンピュート初期化
		this.gpu = new MXP.GPUCompute( {
			passes: [
				new MXP.GPUComputePass(
					gl,
					{
						name: 'ikuraFluids',
						size: particleSize,
						dataLayerCount: 2, // 位置と速度の2レイヤー
						frag: MXP.hotGet( 'ikuraFluidsCompute', ikuraFluidsCompute ),
						uniforms: MXP.UniformsUtils.merge( globalUniforms.time ),
					}
				)
			]
		} );

		// GPUテクスチャの初期化
		this.gpu.passes[ 0 ].initTexture( ( layerIndex ) => {

			if ( layerIndex === 0 ) {

				// レイヤー0: 位置 (xyz) + 密度 (w)
				const r = Math.random() * 2.0;
				const theta = Math.random() * Math.PI * 2.0;
				const phi = Math.random() * Math.PI;

				return [
					r * Math.sin( phi ) * Math.cos( theta ),
					r * Math.sin( phi ) * Math.sin( theta ),
					r * Math.cos( phi ),
					1.0
				];

			} else {

				// レイヤー1: 速度 (xyz) + 予備 (w)
				return [ 0.0, 0.0, 0.0, 0.0 ];

			}

		} );

		// パーティクルのジオメトリ（小さな球体）
		const geometry = new MXP.SphereGeometry( {
			radius: 0.5,
			widthSegments: 4,
			heightSegments: 3
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
				name: 'ikuraFluids',
				phase: [ 'deferred', 'shadowMap' ],
				vert: MXP.hotGet( 'ikuraFluidsVert', ikuraFluidsVert ),
				frag: MXP.hotGet( 'ikuraFluidsFrag', ikuraFluidsFrag ),
				uniforms: MXP.UniformsUtils.merge(
					globalUniforms.time,
					this.gpu.passes[ 0 ].outputUniforms
				),
			} )
		} );

		// ホットリロード対応
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/ikuraFluidsCompute.fs', ( module ) => {

				if ( module ) {

					this.gpu.passes[ 0 ].frag = MXP.hotUpdate( 'ikuraFluidsCompute', module.default );
					this.gpu.passes[ 0 ].requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/ikuraFluids.vs', ( module ) => {

				if ( module ) {

					this.mesh.material.vert = MXP.hotUpdate( 'ikuraFluidsVert', module.default );
					this.mesh.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/ikuraFluids.fs', ( module ) => {

				if ( module ) {

					this.mesh.material.frag = MXP.hotUpdate( 'ikuraFluidsFrag', module.default );
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
