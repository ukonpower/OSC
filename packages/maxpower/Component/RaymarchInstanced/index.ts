import * as GLP from 'glpower';

import { Component, ComponentParams } from '..';
import { CubeGeometry } from '../../Geometry/CubeGeometry';
import { Material } from '../../Material';
import { hotGet, hotUpdate } from '../../Utils/Hot';
import { Mesh } from '../Mesh';

import raymarchInstancedFrag from './shaders/raymarchInstanced.fs';
import raymarchInstancedVert from './shaders/raymarchInstanced.vs';

export type RaymarchInstancedArgs = {
	instanceCount?: number;
	geometry?: CubeGeometry;
	randomSeed?: number;
};

export type RaymarchInstancedParams = ComponentParams<RaymarchInstancedArgs>;

/**
 * RaymarchInstanced - インスタンシング描画とレイマーチングを組み合わせたコンポーネント
 *
 * このコンポーネントは、複数のレイマーチングオブジェクトを効率的に描画するためのテンプレートです。
 * 各インスタンスは独立した変換マトリックスを持ち、Fragment Shaderでレイマーチングが実行されます。
 *
 * 使い方:
 * 1. このコンポーネントをエンティティに追加
 * 2. shaders/raymarchInstanced.fsのD()関数をカスタマイズして形状を定義
 * 3. マテリアルプロパティ（color, roughness, metalic）を調整
 */
export class RaymarchInstanced extends Component {

	constructor( params: RaymarchInstancedParams ) {

		super( params );

		// パラメータのデフォルト値
		const args = params.args;
		const instanceCount = args?.instanceCount ?? 64;
		const randomSeed = args?.randomSeed ?? 1;

		// Meshコンポーネントを追加
		const mesh = this._entity.addComponent( Mesh );

		// ジオメトリを作成（レイマーチング用のバウンディングボックスとして使用）
		const geo = args?.geometry ?? new CubeGeometry();

		// インスタンスごとのID属性を追加
		const random = GLP.MathUtils.randomSeed( randomSeed );
		const idArray = [];
		const id2Array = [];

		for ( let i = 0; i < instanceCount; i ++ ) {

			// id: x=正規化されたインデックス, y,z,w=ランダム値（回転などに使用）
			idArray.push( i / instanceCount, random(), random(), random() );

			// id2: 全てランダム値（位置などに使用）
			id2Array.push( random(), random(), random(), random() );

		}

		// instanceDivisor: 1 でインスタンスごとに異なる値を設定
		geo.setAttribute( 'id', new Float32Array( idArray ), 4, { instanceDivisor: 1 } );
		geo.setAttribute( 'id2', new Float32Array( id2Array ), 4, { instanceDivisor: 1 } );

		mesh.geometry = geo;

		// マテリアルを作成
		mesh.material = new Material( {
			phase: [ "deferred", "shadowMap" ], // deferred + shadowMapで描画
			vert: hotGet( "raymarchInstancedVert", raymarchInstancedVert ),
			frag: hotGet( "raymarchInstancedFrag", raymarchInstancedFrag ),
		} );

		// ホットリロード対応（開発時のみ）
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/raymarchInstanced.vs', ( module ) => {

				if ( module ) {

					mesh.material.vert = hotUpdate( 'raymarchInstancedVert', module.default );
					mesh.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/raymarchInstanced.fs', ( module ) => {

				if ( module ) {

					mesh.material.frag = hotUpdate( 'raymarchInstancedFrag', module.default );
					mesh.material.requestUpdate();

				}

			} );

		}

	}

}
