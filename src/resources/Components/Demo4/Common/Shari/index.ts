import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import shariFrag from './shaders/shari.fs';
import shariVert from './shaders/shari.vs';

import { globalUniforms } from '~/globals';

/**
 * Shari - インスタンシング描画によるシャリコンポーネント
 */
export class Shari extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// Meshコンポーネントを追加
		const mesh = this._entity.addComponent( MXP.Mesh );

		// ジオメトリを作成（シャリ形状用のキューブ）
		const instanceCount = 64;
		const geo = new MXP.CubeGeometry( {
		} );

		// インスタンスごとのID属性を追加
		const random = GLP.MathUtils.randomSeed( 1 );
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

		mesh.geometry = geo;

		// マテリアルを作成
		mesh.material = new MXP.Material( {
			phase: [ "deferred", "shadowMap" ], // deferred + shadowMapで描画
			vert: MXP.hotGet( "shariVert", shariVert ),
			frag: MXP.hotGet( "shariFrag", shariFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution )
		} );

		// ホットリロード対応（開発時のみ）
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/shari.vs', ( module ) => {

				if ( module ) {

					mesh.material.vert = MXP.hotUpdate( 'shariVert', module.default );
					mesh.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/shari.fs', ( module ) => {

				if ( module ) {

					mesh.material.frag = MXP.hotUpdate( 'shariFrag', module.default );
					mesh.material.requestUpdate();

				}

			} );

		}

	}

}
