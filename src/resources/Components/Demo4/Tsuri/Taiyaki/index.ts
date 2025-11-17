import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import taiyakiFrag from './shaders/taiyaki.fs';

import { globalUniforms } from '~/globals';

/**
 * Taiyaki - たいやき形状のレイマーチングコンポーネント
 */
export class Taiyaki extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// geometry - たいやきの形状に合わせてSphereを使用

		const geo = new MXP.CubeGeometry( {
			width: 1,
			height: 1,
			depth: 1,
		} );

		// material

		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'taiyakiFrag', taiyakiFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
		} );

		this.mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		// HMR

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/taiyaki.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'taiyakiFrag', module.default );

					mat.requestUpdate();

				}

			} );

		}

	}

	protected disposeImpl(): void {

		// Meshコンポーネントを削除
		this._entity.removeComponent( MXP.Mesh );

	}

}
