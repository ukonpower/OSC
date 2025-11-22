import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { TsuriZao } from '../Tsuri/TsuriZao';
import { UKPAshi } from '../UKPAshi';

import ukonpowerFrag from './shaders/ukonpower.fs';

import { globalUniforms } from '~/globals';

/**
 * Ukonpower - レイマーチング球体コンポーネント
 */
export class Ukonpower extends MXP.Component {

	private mesh: MXP.Mesh;
	private ashiEntities: MXP.Entity[] = [];
	private legInitialRotX: number[] = [];

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// geometry

		const geo = new MXP.SphereGeometry( {
			radius: 0.5
		} );

		// material

		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'ukonpowerFrag', ukonpowerFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
		} );

		this.mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		// 手足を追加（手2本、足2本）
		const limbs = [
			// 左手
			{ pos: [ - 0.31, 0.00, - 0.2 ], rot: [ Math.PI / 2.0, 0, 0.5 ] },
			// 右手
			{ pos: [ 0.31, 0.00, - 0.2 ], rot: [ Math.PI / 2.0, 0, - 0.5 ] },
			// 左足
			{ pos: [ - 0.2, - 0.3, - 0.1 ], rot: [ Math.PI / 2 * 0.9, 0, 0 ] },
			// 右足
			{ pos: [ 0.2, - 0.3, - 0.1 ], rot: [ Math.PI / 2 * 0.9, 0, 0 ] }
		];

		for ( let i = 0; i < limbs.length; i ++ ) {

			const limb = limbs[ i ];
			const ashi = new MXP.Entity();

			ashi.position.set( limb.pos[ 0 ], limb.pos[ 1 ], limb.pos[ 2 ] );
			ashi.quaternion.setFromEuler( new GLP.Euler( limb.rot[ 0 ], limb.rot[ 1 ], limb.rot[ 2 ] ) );
			ashi.scale.set( 0.3, 0.3, 0.3 );

			ashi.addComponent( UKPAshi );
			this.entity.add( ashi );
			this.ashiEntities.push( ashi );

			// 足（インデックス2, 3）の初期X軸回転を保存
			if ( i >= 2 ) {

				this.legInitialRotX.push( limb.rot[ 0 ] );

			}

		}

		// 釣り竿を両手の中央に追加
		const tsuriZaoEntity = new MXP.Entity();
		tsuriZaoEntity.position.set( 0, 0, - 0.45 );
		tsuriZaoEntity.quaternion.setFromEuler( new GLP.Euler( - Math.PI / 4, 0, 0 ) );
		tsuriZaoEntity.addComponent( TsuriZao );
		this.entity.add( tsuriZaoEntity );

		// HMR

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/ukonpower.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'ukonpowerFrag', module.default );

					mat.requestUpdate();

				}

			} );

		}

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		const time = event.timeCode;

		// 左足（インデックス2）
		const leftLeg = this.ashiEntities[ 2 ];
		const leftRotX = this.legInitialRotX[ 0 ] + Math.sin( time * 3 ) * 0.3;
		leftLeg.quaternion.setFromEuler( new GLP.Euler( leftRotX, 0, 0 ) );

		// 右足（インデックス3）- 位相をずらす
		const rightLeg = this.ashiEntities[ 3 ];
		const rightRotX = this.legInitialRotX[ 1 ] + Math.sin( time * 3 + Math.PI ) * 0.3;
		rightLeg.quaternion.setFromEuler( new GLP.Euler( rightRotX, 0, 0 ) );

	}

	protected disposeImpl(): void {

		// Meshコンポーネントを削除
		this._entity.removeComponent( MXP.Mesh );

		// 足を削除
		for ( const ashi of this.ashiEntities ) {

			this.entity.remove( ashi );

		}

		this.ashiEntities = [];

	}

}
