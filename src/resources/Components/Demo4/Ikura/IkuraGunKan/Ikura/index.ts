import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import ikuraFrag from './shaders/ikura.fs';
import ikuraVert from './shaders/ikura.vs';

import { globalUniforms } from '~/globals';
import { bindBlidgeUniform } from '~/shortcuts';

/**
 * Ikura - イクラの粒（InstancedMesh）
 * 複数のイクラの粒を球体のインスタンスメッシュとして描画
 */
export class Ikura extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// インスタンス数
		const instanceCount = 9;

		// ジオメトリを作成（球体）
		const geo = new MXP.SphereGeometry( { radius: 1.0 } );

		// インスタンスごとのID属性を追加
		const random = GLP.MathUtils.randomSeed( 1 );
		const idArray = [];

		for ( let i = 0; i < instanceCount; i ++ ) {

			idArray.push( i / instanceCount, random(), random(), random() );

		}

		geo.setAttribute( 'id', new Float32Array( idArray ), 4, { instanceDivisor: 1 } );

		// Meshコンポーネントを追加
		this.mesh = this._entity.addComponent( MXP.Mesh, {
			geometry: geo,
			material: new MXP.Material( {
				phase: [ "deferred", "shadowMap" ],
				vert: MXP.hotGet( "ikuraVert", ikuraVert ),
				frag: MXP.hotGet( "ikuraFrag", ikuraFrag ),
				uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution )
			} )
		} );

		// BLidgerのuniformsをマテリアルにバインド
		bindBlidgeUniform( this.mesh );

		// HMR（ホットモジュールリロード）
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/ikura.vs', ( module ) => {

				if ( module ) {

					this.mesh.material.vert = MXP.hotUpdate( 'ikuraVert', module.default );
					this.mesh.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/ikura.fs', ( module ) => {

				if ( module ) {

					this.mesh.material.frag = MXP.hotUpdate( 'ikuraFrag', module.default );
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
