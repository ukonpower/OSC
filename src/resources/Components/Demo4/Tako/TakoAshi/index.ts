import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import takoAshiFrag from './shaders/takoashi.fs';

import { globalUniforms } from '~/globals';

/**
 * TakoAshi - タコの触手のようなレイマーチングコンポーネント
 */
export class TakoAshi extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( param: MXP.ComponentParams<{
		scrolling?: boolean;
		waving?: boolean;
		rolling?: boolean;
		sinWaving?: boolean;
	}> ) {

		super( param );

		// geometry - CylinderGeometryを使用

		const geo = new MXP.CylinderGeometry( {
			height: 5,
			radSegments: 16
		} );

		// material

		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'takoAshiFrag', takoAshiFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
		} );

		// defines - オプションに応じてdefinesを設定
		if ( param.args ) {

			if ( param.args.scrolling ) {

				mat.defines[ "IS_SCROLLING" ] = "";

			}

			if ( param.args.sinWaving ) {

				mat.defines[ "IS_SINWAVING" ] = "";

			}

			if ( param.args.waving ) {

				mat.defines[ "IS_WAVING" ] = "";

			}

			if ( param.args.rolling ) {

				mat.defines[ "IS_ROLLING" ] = "";

			}

		}

		this.mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		// HMR

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/takoashi.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'takoAshiFrag', module.default );

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
