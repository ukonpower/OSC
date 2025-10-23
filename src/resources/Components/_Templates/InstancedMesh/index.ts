import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import instancedVert from './shaders/instanced.vs';
import instancedFrag from './shaders/instanced.fs';

import { globalUniforms } from '~/globals';

/**
 * InstancedMesh - インスタンシング描画を行うコンポーネント
 * 同じジオメトリを複数描画する際にパフォーマンスを向上させるテンプレート
 */
export class InstancedMesh extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// Meshコンポーネントを追加
		const mesh = this._entity.addComponent( MXP.Mesh );

		// ジオメトリを作成（例：キューブジオメトリ）
		// インスタンス数の設定
		const instanceCount = 32;
		const geo = new MXP.CubeGeometry( { segmentsHeight: 16 } );

		// インスタンスごとのID属性を追加
		// 各インスタンスに一意のIDと乱数値を格納
		const random = GLP.MathUtils.randomSeed( 1 );
		const idArray = [];

		for ( let i = 0; i < instanceCount; i ++ ) {

			// x: 正規化されたインデックス, y,z,w: ランダム値
			idArray.push( i / instanceCount, random(), random(), random() );

		}

		// instanceDivisor: 1 でインスタンスごとに異なる値を設定
		geo.setAttribute( 'id', new Float32Array( idArray ), 4, { instanceDivisor: 1 } );

		mesh.geometry = geo;

		// マテリアルを作成
		mesh.material = new MXP.Material( {
			phase: [ "deferred", "shadowMap" ], // deferred + shadowMapで描画
			vert: MXP.hotGet( "instancedVert", instancedVert ),
			frag: MXP.hotGet( "instancedFrag", instancedFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution, {
				// カスタムユニフォームを追加可能
				// 例: テクスチャやパラメータなど
			} )
		} );

		// ホットリロード対応（開発時のみ）
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/instanced.vs', ( module ) => {

				if ( module ) {

					mesh.material.vert = MXP.hotUpdate( 'instancedVert', module.default );
					mesh.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/instanced.fs', ( module ) => {

				if ( module ) {

					mesh.material.frag = MXP.hotUpdate( 'instancedFrag', module.default );
					mesh.material.requestUpdate();

				}

			} );

		}

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		// カスタムユニフォームの更新などをここに記述可能
		// 例: アニメーション用のパラメータ更新など

	}

}
