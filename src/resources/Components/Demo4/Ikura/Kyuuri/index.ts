import * as MXP from 'maxpower';

import kyuuriFrag from './shaders/kyuuri.fs';

import { globalUniforms } from '~/globals';
import { bindBlidgeUniform } from '~/shortcuts';

/**
 * Kyuuri - きゅうりのレイマーチングコンポーネント
 * 円柱形状に表面のイボイボを持つ緑色のきゅうり
 */
export class Kyuuri extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// geometry - 球体ジオメトリを使用（レイマーチング用のバウンディングボリューム）
		const geo = new MXP.SphereGeometry( {
			radius: 0.5
		} );

		// material
		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'kyuuriFrag', kyuuriFrag ),
			uniforms: MXP.UniformsUtils.merge(
				globalUniforms.resolution,
				globalUniforms.time
			)
		} );

		this.mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: geo,
			material: mat
		} );

		// BLidgerのuniformsをマテリアルにバインド
		bindBlidgeUniform( this.mesh.entity, this.mesh );

		// HMR（ホットモジュールリロード）
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/kyuuri.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'kyuuriFrag', module.default );
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
