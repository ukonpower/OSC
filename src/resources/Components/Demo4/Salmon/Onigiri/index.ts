import * as MXP from 'maxpower';

import onigirifrag from './shaders/onigiri.fs';

import { globalUniforms } from '~/globals';

/**
 * Onigiri - レイマーチングによるおにぎりコンポーネント
 */
export class Onigiri extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// geometry
		const geo = new MXP.SphereGeometry( {
			radius: 1
		} );

		// material
		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'onigirifrag', onigirifrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
		} );

		this.mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		// HMR
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/onigiri.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'onigirifrag', module.default );

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
