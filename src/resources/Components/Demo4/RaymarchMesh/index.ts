import * as MXP from 'maxpower';

import raymarchFrag from './shaders/raymarch.fs';
import raymarchVert from './shaders/raymarch.vs';

import { globalUniforms } from '~/globals';

/**
 * RaymarchMesh - レイマーチング用のメッシュコンポーネント
 * とりあえず赤いPlaneを表示する
 */
export class RaymarchMesh extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// Meshコンポーネントを追加
		const mesh = this._entity.addComponent( MXP.Mesh );

		// Planeジオメトリを作成（XY平面）
		mesh.geometry = new MXP.CubeGeometry( { width: 2, height: 2 } );

		// マテリアルを作成
		mesh.material = new MXP.Material( {
			phase: [ "deferred" ], // Deferredレンダリングパイプラインを使用
			vert: MXP.hotGet( "raymarchVert", raymarchVert ),
			frag: MXP.hotGet( "raymarchFrag", raymarchFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.time ) // グローバルタイムユニフォームを使用
		} );

		console.log( "aaa" );


		// ホットリロード対応（開発時のみ）
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/raymarch.vs', ( module ) => {

				if ( module ) {

					mesh.material.vert = MXP.hotUpdate( 'raymarchVert', module.default );
					mesh.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/raymarch.fs', ( module ) => {

				if ( module ) {

					mesh.material.frag = MXP.hotUpdate( 'raymarchFrag', module.default );
					mesh.material.requestUpdate();

				}

			} );

		}

	}

}
