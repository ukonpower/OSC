import * as MXP from 'maxpower';

import hudFrag from './shaders/hud.fs';
import hudVert from './shaders/hud.vs';

import { globalUniforms } from '~/globals';
import { bindBlidgeUniform } from '~/shortcuts';


/**
 * HUD - UIフェーズでフルスクリーンに真っ白なフレームを表示
 */
export class HUD extends MXP.Component {

	private material: MXP.Material;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// PlaneGeometry(2,2)でフルスクリーン（頂点座標-1～1）
		const geometry = new MXP.PlaneGeometry( { width: 2, height: 2 } );

		// UIフェーズで描画される真っ白なマテリアル
		this.material = new MXP.Material( {
			phase: [ 'ui' ],
			vert: MXP.hotGet( 'hudVert', hudVert ),
			frag: MXP.hotGet( 'hudFrag', hudFrag ),
			depthTest: false,
			depthWrite: false,
			uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution )
		} );

		// Meshコンポーネントを追加
		this.entity.addComponent( MXP.Mesh, {
			geometry,
			material: this.material
		} );

		bindBlidgeUniform( this.entity, this.material );

		// HMR
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/hud.vs', ( module ) => {

				if ( module && this.material ) {

					this.material.vert = MXP.hotUpdate( 'hudVert', module.default );
					this.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/hud.fs', ( module ) => {

				if ( module && this.material ) {

					this.material.frag = MXP.hotUpdate( 'hudFrag', module.default );
					this.material.requestUpdate();

				}

			} );

		}

	}

}
