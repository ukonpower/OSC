import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import sashimiFrag from './shaders/sashimi.fs';

import { globalUniforms } from '~/globals';


export class Sashimi extends MXP.Component {

	// 刺身の種類（マグロ or サーモン）
	private sashimiType: 'maguro' | 'salmon';
	private material: MXP.Material;

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// デフォルトはマグロ
		this.sashimiType = 'maguro';

		// エディタフィールドの定義（開発環境のみ）
		if ( import.meta.env.DEV ) {

			this.field( "sashimiType", () => this.sashimiType, ( v ) => this.sashimiType = v, {
				format: {
					type: "select",
					list: [
						{ label: "マグロ", value: "maguro" },
						{ label: "サーモン", value: "salmon" }
					]
				}
			} );

		}

		// geometry

		const geo = new MXP.CubeGeometry( {
			depth: 1.7,
			width: 0.7,
			height: 1.0
		} );

		// material

		this.material = new MXP.Material( {
			frag: MXP.hotGet( 'sashimiFrag', sashimiFrag ),
			uniforms: MXP.UniformsUtils.merge(
				globalUniforms.resolution,
				globalUniforms.time,
				globalUniforms.tex,
				{
					// 刺身の種類（0: マグロ, 1: サーモン）
					uSashimiType: { type: '1f', value: 0 }
				}
			)
		} );

		this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: this.material
		} );

		// HMR

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/sashimi.fs', ( module ) => {

				if ( module ) {

					this.material.frag = MXP.hotUpdate( 'sashimiFrag', module.default );

					this.material.requestUpdate();

				}

			} );

		}

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		// 刺身の種類に応じてuniformを更新（0: マグロ, 1: サーモン）
		this.material.uniforms.uSashimiType.value = this.sashimiType === 'salmon' ? 1 : 0;

	}

}
