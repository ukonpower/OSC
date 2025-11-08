import * as MXP from 'maxpower';

import skyboxDefaultFrag from './shaders/skybox.fs';
import skyboxTsuriFrag from './shaders/skybox_tsuri.fs';

import { globalUniforms } from '~/globals';
import { bindBlidgeUniform } from '~/shortcuts';

export class SkyBox extends MXP.Component {

	// Skyboxのタイプ（default or tsuri）
	public type: string = "default";

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// エディタフィールドの定義
		if ( import.meta.env.DEV ) {

			this.field( "type", () => this.type, ( v ) => this.type = v );

		}

		const mesh = this._entity.addComponent( MXP.Mesh );
		mesh.geometry = new MXP.SphereGeometry( { radius: 500, widthSegments: 32, heightSegments: 32 } );

		// typeに応じてシェーダーを切り替え
		const frag = this.type === "tsuri" ? skyboxTsuriFrag : skyboxDefaultFrag;
		const hotKey = this.type === "tsuri" ? "skybox_tsuri" : "skybox_default";

		mesh.material = new MXP.Material( {
			phase: [ "deferred", "envMap" ],
			frag: MXP.hotGet( hotKey, frag ),
			cullFace: false,
			uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.tex )
		} );

		bindBlidgeUniform( mesh );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/skybox.fs', ( module ) => {

				if ( module && this.type === "default" ) {

					mesh.material.frag = MXP.hotUpdate( 'skybox_default', module.default );

					mesh.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/skybox_tsuri.fs', ( module ) => {

				if ( module && this.type === "tsuri" ) {

					mesh.material.frag = MXP.hotUpdate( 'skybox_tsuri', module.default );

					mesh.material.requestUpdate();

				}

			} );

		}

	}

}
