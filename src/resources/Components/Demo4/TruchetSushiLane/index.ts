import * as MXP from 'maxpower';

import raymarchFrag from './shaders/truchetSushiLane.fs';
import raymarchVert from './shaders/truchetSushiLane.vs';

import { globalUniforms } from '~/globals';

/**
 * TruchetSushiLane
 *
 * Truchetパターンを使用した寿司レーンのレイマーチングコンポーネント
 */
export class TruchetSushiLane extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// Meshコンポーネントを追加
		const mesh = this._entity.addComponent( MXP.Mesh );

		// Cubeジオメトリを作成（レイマーチング用のボリューム）
		mesh.geometry = new MXP.CubeGeometry( { width: 2, height: 2, depth: 2 } );

		// マテリアルを作成
		mesh.material = new MXP.Material( {
			phase: [ "deferred" ], // Deferredレンダリングパイプラインを使用
			vert: MXP.hotGet( "truchetSushiLaneVert", raymarchVert ),
			frag: MXP.hotGet( "truchetSushiLaneFrag", raymarchFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution, globalUniforms.tex )
		} );

		// ホットリロード対応（開発時のみ）
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/truchetSushiLane.vs', ( module ) => {

				if ( module ) {

					mesh.material.vert = MXP.hotUpdate( 'truchetSushiLaneVert', module.default );
					mesh.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/truchetSushiLane.fs', ( module ) => {

				if ( module ) {

					mesh.material.frag = MXP.hotUpdate( 'truchetSushiLaneFrag', module.default );
					mesh.material.requestUpdate();

				}

			} );

		}

	}

}
