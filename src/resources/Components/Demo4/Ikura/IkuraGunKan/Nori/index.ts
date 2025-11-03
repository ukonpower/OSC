import * as MXP from 'maxpower';

import noriFrag from './shaders/nori.fs';

import { globalUniforms } from '~/globals';
import { bindBlidgeUniform } from '~/shortcuts';

/**
 * Nori - 海苔（RaymarchCube）
 * 軍艦巻きの外側を包む海苔のシェル形状
 */
export class Nori extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// geometry - レイマーチング用のバウンディングボリューム
		const geo = new MXP.SphereGeometry( {
			radius: 0.5
		} );

		// material
		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'noriFrag', noriFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
		} );

		this.mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: geo,
			material: mat
		} );

		// BLidgerのuniformsをマテリアルにバインド
		bindBlidgeUniform( this.mesh );

		// HMR（ホットモジュールリロード）
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/nori.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'noriFrag', module.default );
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
