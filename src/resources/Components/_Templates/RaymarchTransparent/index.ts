import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import raymarchTransparentFrag from './shaders/raymarchTransparent.fs';

import { globalUniforms } from '~/globals';

/**
 * RaymarchTransparent - レイマーチング用の透明体コンポーネント（テンプレート）
 * 屈折や反射を含む透明オブジェクトの描画に使用
 */
export class RaymarchTransparent extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// geometry

		const geo = new MXP.SphereGeometry( {
			radius: 1
		} );

		// material

		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'raymarchTransparentFrag', raymarchTransparentFrag ),
			phase: [ 'forward' ],
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
		} );

		this.mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		// HMR

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/raymarchTransparent.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'raymarchTransparentFrag', module.default );

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
