import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import sashimiFrag from './shaders/sashimi.fs';

import { globalUniforms } from '~/globals';


export class Sashimi extends MXP.Component {

	// 刺身の種類（マグロ or サーモン or タコ）
	private sashimiType: 'maguro' | 'salmon' | 'tako';
	private material: MXP.Material;

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// デフォルトはマグロ
		this.sashimiType = 'maguro';

		// material

		this.material = new MXP.Material( {
			frag: MXP.hotGet( 'sashimiFrag', sashimiFrag ),
			uniforms: MXP.UniformsUtils.merge(
				globalUniforms.resolution,
				globalUniforms.time,
				globalUniforms.tex,
				{
					// 刺身の種類（0: マグロ, 1: サーモン, 2: タコ）
					uSashimiType: { type: '1f', value: 0 }
				}
			)
		} );

		// field設定（setterでuniformを更新）
		this.field( "sashimiType", () => this.sashimiType, ( v ) => {

			this.sashimiType = v;

			// タイプに応じてuniformの値を設定
			if ( v === 'salmon' ) {

				this.material.uniforms.uSashimiType.value = 1;

			} else if ( v === 'tako' ) {

				this.material.uniforms.uSashimiType.value = 2;

			} else {

				this.material.uniforms.uSashimiType.value = 0;

			}

		}, {
			format: {
				type: "select",
				list: [
					{ label: "マグロ", value: "maguro" },
					{ label: "サーモン", value: "salmon" },
					{ label: "タコ", value: "tako" }
				]
			}
		} );


		// geometry

		const geo = new MXP.CubeGeometry( {
			depth: 1.7,
			width: 0.7,
			height: 1.0
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


}
