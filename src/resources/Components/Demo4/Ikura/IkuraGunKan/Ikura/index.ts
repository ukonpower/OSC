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
		const instanceCount = 150;

		// ジオメトリを作成(球体)
		const geo = new MXP.SphereGeometry( { radius: 1.0, widthSegments: 16, heightSegments: 12 } );

		// インスタンスごとのID属性を追加
		// id.x: インスタンスのインデックス (0~1)
		// id.yzw: 球のボリューム内に均一分布する3D座標
		const random = GLP.MathUtils.randomSeed( 1 );
		const idArray = [];

		for ( let i = 0; i < instanceCount; i ++ ) {

			// 球の内部に均一分布する座標を生成
			const pos = GLP.MathUtils.randomInSphere( 2.0, random );
			pos.z *= 1.5;
			pos.y = Math.abs( pos.y ) * 1.5;

			idArray.push( i / instanceCount, pos.x, pos.y, pos.z );

		}

		geo.setAttribute( 'id', new Float32Array( idArray ), 4, { instanceDivisor: 1 } );

		// Meshコンポーネントを追加
		this.mesh = this._entity.addComponent( MXP.Mesh, {
			geometry: geo,
			material: new MXP.Material( {
				phase: [ "forward", "shadowMap" ],
				vert: MXP.hotGet( "ikuraVert", ikuraVert ),
				frag: MXP.hotGet( "ikuraFrag", ikuraFrag ),
				uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution )
			} )
		} );

		// BLidgerのuniformsをマテリアルにバインド
		bindBlidgeUniform( this.mesh.entity, this.mesh );

		// HMR(ホットモジュールリロード)
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
