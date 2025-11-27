import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import saraFrag from './shaders/sara.fs';
import saraVert from './shaders/sara.vs';

import { globalUniforms } from '~/globals';

/**
 * Sara - インスタンシング描画による皿コンポーネント
 */
export class Sara extends MXP.Component {

	public uniforms: GLP.Uniforms;

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// インスタンス数は常に15枚固定
		const instanceCount = 15;

		// geometry
		const geo = new MXP.CylinderGeometry( {
			radiusTop: 0.5,
			radiusBottom: 0.5,
			height: 0.2
		} );

		// インスタンスごとのID属性を追加
		const random = GLP.MathUtils.randomSeed( 2 );
		const idArray = [];
		const id2Array = [];

		for ( let i = 0; i < instanceCount; i ++ ) {

			// x: 正規化されたインデックス, y,z,w: ランダム値
			idArray.push( i / instanceCount, random(), random(), random() );

			// id2: 全てランダム値
			id2Array.push( random(), random(), random(), random() );

		}

		// instanceDivisor: 1 でインスタンスごとに異なる値を設定
		geo.setAttribute( 'id', new Float32Array( idArray ), 4, { instanceDivisor: 1 } );
		geo.setAttribute( 'id2', new Float32Array( id2Array ), 4, { instanceDivisor: 1 } );

		// uniformで表示枚数を制御
		this.uniforms = {
			uVisibleCount: {
				value: instanceCount,
				type: '1f'
			}
		};

		// material
		const mat = new MXP.Material( {
			phase: [ "deferred", "shadowMap" ],
			vert: MXP.hotGet( 'saraVert', saraVert ),
			frag: MXP.hotGet( 'saraFrag', saraFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time, this.uniforms )
		} );

		const mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		// HMR
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/sara.vs', ( module ) => {

				if ( module ) {

					mat.vert = MXP.hotUpdate( 'saraVert', module.default );
					mat.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/sara.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'saraFrag', module.default );
					mat.requestUpdate();

				}

			} );

		}

	}

}
