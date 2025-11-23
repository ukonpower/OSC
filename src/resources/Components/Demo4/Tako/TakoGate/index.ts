import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import takoGateFrag from './shaders/takogate.fs';
import screenVert from '~/resources/shaders/screen.vs';

import { globalUniforms } from '~/globals';
import { bindBlidgeUniform } from '~/shortcuts';

/**
 * TakoGate - レイマーチングで描画するゲートコンポーネント
 */
export class TakoGate extends MXP.Component {

	private mesh: MXP.Mesh;
	private prevState: GLP.Vector;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// 前フレームの状態を保存するVectorを初期化
		this.prevState = new GLP.Vector();

		// Meshコンポーネントを追加
		this.mesh = this._entity.addComponent( MXP.Mesh, {
			geometry: new MXP.PlaneGeometry( { width: 2, height: 2 } ),
			material: new MXP.Material( {
				phase: [ "deferred" ],
				vert: screenVert,
				frag: MXP.hotGet( "takoGateFrag", takoGateFrag ),
				uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution, {
					uPrevState: {
						value: this.prevState,
						type: "4f"
					}
				} )
			} )
		} );

		bindBlidgeUniform( this.mesh.entity, this.mesh );

		// ホットリロード対応
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/takogate.fs', ( module ) => {

				if ( module ) {

					this.mesh.material.frag = MXP.hotUpdate( 'takoGateFrag', module.default );
					this.mesh.material.requestUpdate();

				}

			} );

		}

	}

	protected afterRenderImpl( _event: MXP.ComponentUpdateEvent ): void {

		// 現在のuStateを取得して次フレーム用にprevStateに保存
		const currentState = this.mesh.material.uniforms.uState;

		if ( currentState && currentState.value ) {

			this.prevState.copy( currentState.value );

		}


	}

	protected disposeImpl(): void {

		this._entity.removeComponent( MXP.Mesh );

	}

}
