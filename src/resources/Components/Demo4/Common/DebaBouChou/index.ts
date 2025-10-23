import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import debaBouChouFrag from './shaders/debaBouChou.fs';

import { globalUniforms } from '~/globals';

/**
 * DebaBouChou - 出刃包丁コンポーネント（cube形状のまま）
 */
export class DebaBouChou extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// geometry - cube形状を保持

		const geo = new MXP.SphereGeometry( {
			radius: 1
		} );

		// material

		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'debaBouChouFrag', debaBouChouFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
		} );

		this.mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		// HMR

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/debaBouChou.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'debaBouChouFrag', module.default );

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
