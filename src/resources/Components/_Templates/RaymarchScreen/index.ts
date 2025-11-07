import * as MXP from 'maxpower';

import raymarchFrag from './shaders/raymarch.fs';
import raymarchVert from './shaders/raymarch.vs';

import { globalUniforms } from '~/globals';

/**
 * RaymarchScreen - レイマーチング用のスクリーンコンポーネント
 * とりあえず赤いPlaneを表示する
 */
export class RaymarchScreen extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// Meshコンポーネントを追加
		this.mesh = this._entity.addComponent( MXP.Mesh );

		// Planeジオメトリを作成（XY平面）
		this.mesh.geometry = new MXP.PlaneGeometry( { width: 2, height: 2 } );

		// マテリアルを作成
		this.mesh.material = new MXP.Material( {
			phase: [ "deferred" ], // Deferredレンダリングパイプラインを使用
			vert: MXP.hotGet( "raymarchVert", raymarchVert ),
			frag: MXP.hotGet( "raymarchFrag", raymarchFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution )
		} );

		// ホットリロード対応（開発時のみ）
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/raymarch.vs', ( module ) => {

				if ( module ) {

					this.mesh.material.vert = MXP.hotUpdate( 'raymarchVert', module.default );
					this.mesh.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/raymarch.fs', ( module ) => {

				if ( module ) {

					this.mesh.material.frag = MXP.hotUpdate( 'raymarchFrag', module.default );
					this.mesh.material.requestUpdate();

				}

			} );

		}

	}

	protected disposeImpl(): void {

		// Meshコンポーネントを削除
		this._entity.removeComponent( MXP.Mesh );

	}

}
