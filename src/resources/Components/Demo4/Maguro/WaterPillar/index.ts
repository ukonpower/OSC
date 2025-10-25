import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import waterPillarFrag from './shaders/waterPillar.fs';

import { globalUniforms } from '~/globals';

/**
 * WaterPillar - 水柱コンポーネント
 * レイマーチングによる透明な円柱形状の水柱を描画
 */
export class WaterPillar extends MXP.Component {

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// geometry - 円柱形状に合わせてバウンディングボックスを調整

		const geo = new MXP.CubeGeometry( {
			width: 1,
			height: 4,
			depth: 1
		} );
		// material

		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'waterPillarFrag', waterPillarFrag ),
			phase: [ 'forward' ],
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
		} );

		this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		// HMR

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/waterPillar.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'waterPillarFrag', module.default );

					mat.requestUpdate();

				}

			} );

		}

	}

}
