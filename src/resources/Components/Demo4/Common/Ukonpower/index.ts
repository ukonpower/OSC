import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { UKPAshi } from '../UKPAshi';

import ukonpowerFrag from './shaders/ukonpower.fs';

import { globalUniforms } from '~/globals';

/**
 * Ukonpower - レイマーチング球体コンポーネント
 */
export class Ukonpower extends MXP.Component {

	private mesh: MXP.Mesh;
	private ashiEntities: MXP.Entity[] = [];

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// geometry

		const geo = new MXP.SphereGeometry( {
			radius: 1
		} );

		// material

		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'ukonpowerFrag', ukonpowerFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
		} );

		this.mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		// 足を追加
		const ashiCount = 6;
		for ( let i = 0; i < ashiCount; i ++ ) {

			const ashi = new MXP.Entity();
			const angle = ( i / ashiCount ) * Math.PI * 2;
			const radius = 0.5;

			ashi.position.set(
				Math.cos( angle ) * radius,
				- 0.8,
				Math.sin( angle ) * radius
			);

			ashi.quaternion.setFromEuler( new GLP.Euler(
				Math.PI * 0.1,
				0,
				Math.sin( angle ) * 0.3
			) );

			ashi.scale.set( 0.3, 0.3, 0.3 );

			ashi.addComponent( UKPAshi );
			this.entity.add( ashi );
			this.ashiEntities.push( ashi );

		}

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
