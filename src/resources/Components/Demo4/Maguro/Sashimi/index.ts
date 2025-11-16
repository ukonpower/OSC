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
			)
		} );

		// field設定（setterでDefineを更新）
		this.field( "sashimiType", () => this.sashimiType, ( v ) => {

			this.sashimiType = v;

			// Defineを設定してシェーダーバリアントを切り替え
			const defines: { [ key: string ]: string } = {};

			if ( v === 'salmon' ) {

				defines.SALMON = '';

			} else if ( v === 'tako' ) {

				defines.TAKO = '';

			}

			this.material.defines = defines;
			this.material.requestUpdate();

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
