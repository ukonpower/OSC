import * as MXP from 'maxpower';

import raymarchFrag from './shaders/truchetSushiLane.fs';
import screenVert from '~/resources/shaders/screen.vs';

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
		const mesh = this._entity.addComponent( MXP.Mesh, {
			geometry: new MXP.CubeGeometry( { width: 2, height: 2, depth: 2 } ),
			material: new MXP.Material( {
				phase: [ "deferred", "shadowMap" ],
				vert: screenVert,
				frag: MXP.hotGet( "truchetSushiLaneFrag", raymarchFrag ),
				uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution, globalUniforms.tex )
			} )
		} );

		// ホットリロード対応（開発時のみ）
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/truchetSushiLane.fs', ( module ) => {

				if ( module ) {

					mesh.material.frag = MXP.hotUpdate( 'truchetSushiLaneFrag', module.default );
					mesh.material.requestUpdate();

				}

			} );

		}

	}

}
