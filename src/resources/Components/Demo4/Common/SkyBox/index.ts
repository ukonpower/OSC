import * as MXP from 'maxpower';

import skyboxFrag from './shaders/skybox.fs';

import { globalUniforms } from '~/globals';
import { bindBlidgeUniform } from '~/shortcuts';

export class SkyBox extends MXP.Component {

	// Skyboxのタイプ（default or tsuri）
	private skyboxType: 'default' | 'tsuri';
	private material: MXP.Material;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// デフォルトはdefault
		this.skyboxType = 'default';

		// material
		this.material = new MXP.Material( {
			phase: [ "forward", "envMap" ],
			frag: MXP.hotGet( 'skyboxFrag', skyboxFrag ),
			cullFace: false,
			uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.tex )
		} );

		// field設定（setterでDefineを更新）
		this.field( "skyboxType", () => this.skyboxType, ( v ) => {

			this.skyboxType = v;

			// Defineを設定してシェーダーバリアントを切り替え
			const defines: { [ key: string ]: string } = {};

			if ( v === 'tsuri' ) {

				defines.TSURI = '';

			}

			this.material.defines = defines;
			this.material.requestUpdate();

		}, {
			format: {
				type: "select",
				list: [
					{ label: "Default", value: "default" },
					{ label: "Tsuri", value: "tsuri" }
				]
			}
		} );

		const mesh = this._entity.addComponent( MXP.Mesh, {
			geometry: new MXP.SphereGeometry( { radius: 500, widthSegments: 32, heightSegments: 32 } ),
			material: this.material
		} );

		bindBlidgeUniform( mesh.entity, mesh );

		// HMR
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/skybox.fs', ( module ) => {

				if ( module ) {

					this.material.frag = MXP.hotUpdate( 'skyboxFrag', module.default );

					this.material.requestUpdate();

				}

			} );

		}

	}

}
