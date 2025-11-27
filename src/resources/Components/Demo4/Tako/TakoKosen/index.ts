import * as MXP from 'maxpower';

import takoKosenFrag from './shaders/takokosen.fs';
import takoKosenVert from './shaders/takokosen.vs';

import { globalUniforms } from '~/globals';
import { bindBlidgeUniform } from '~/shortcuts';

/**
 * TakoKosen - タコの光線エフェクトを描画するコンポーネント
 */
export class TakoKosen extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// Meshコンポーネントを追加
		this.mesh = this._entity.addComponent( MXP.Mesh, {
			geometry: new MXP.SphereGeometry( { radius: 0.5, widthSegments: 32, heightSegments: 32 } ),
			material: new MXP.Material( {
				phase: [ "forward" ],
				vert: MXP.hotGet( "takoKosenVert", takoKosenVert ),
				frag: MXP.hotGet( "takoKosenFrag", takoKosenFrag ),
				uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution )
			} )
		} );

		bindBlidgeUniform( this.entity, this.mesh );

		// ホットリロード対応
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/takokosen.vs', ( module ) => {

				if ( module ) {

					this.mesh.material.vert = MXP.hotUpdate( 'takoKosenVert', module.default );
					this.mesh.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/takokosen.fs', ( module ) => {

				if ( module ) {

					this.mesh.material.frag = MXP.hotUpdate( 'takoKosenFrag', module.default );
					this.mesh.material.requestUpdate();

				}

			} );

		}

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		// カスタムユニフォームの更新などをここに記述可能

	}

	protected disposeImpl(): void {

		this._entity.removeComponent( MXP.Mesh );

	}

}
