import * as MXP from 'maxpower';

import gunkanShariFrag from './shaders/gunkanShari.fs';
import gunkanShariVert from './shaders/gunkanShari.vs';

import { globalUniforms } from '~/globals';
import { bindBlidgeUniform } from '~/shortcuts';

/**
 * GunkanShari - 軍艦のシャリ（RaymarchInstanced）
 * 底部の白いご飯の円柱形状
 */
export class GunkanShari extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// RaymarchInstancedコンポーネントを追加（インスタンス数は1）
		this._entity.addComponent( MXP.RaymarchInstanced, {
			instanceCount: 1,
			randomSeed: 1,
			geometry: new MXP.CubeGeometry()
		} );

		// Meshコンポーネントを取得してマテリアルをカスタマイズ
		const mesh = this._entity.getComponent( MXP.Mesh );

		if ( mesh ) {

			mesh.material = new MXP.Material( {
				phase: [ "deferred", "shadowMap" ],
				vert: MXP.hotGet( "gunkanShariVert", gunkanShariVert ),
				frag: MXP.hotGet( "gunkanShariFrag", gunkanShariFrag ),
				uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution )
			} );

			// BLidgerのuniformsをマテリアルにバインド
			bindBlidgeUniform( mesh );

			// HMR（ホットモジュールリロード）
			if ( import.meta.hot ) {

				import.meta.hot.accept( './shaders/gunkanShari.vs', ( module ) => {

					if ( module && mesh.material ) {

						mesh.material.vert = MXP.hotUpdate( 'gunkanShariVert', module.default );
						mesh.material.requestUpdate();

					}

				} );

				import.meta.hot.accept( './shaders/gunkanShari.fs', ( module ) => {

					if ( module && mesh.material ) {

						mesh.material.frag = MXP.hotUpdate( 'gunkanShariFrag', module.default );
						mesh.material.requestUpdate();

					}

				} );

			}

		}

	}

}
