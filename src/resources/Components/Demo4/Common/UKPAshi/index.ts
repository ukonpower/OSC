import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import basicFrag from './shaders/basic.fs';
import basicVert from './shaders/basic.vs';

import { globalUniforms } from '~/globals';

/**
 * UKPAshi - CylinderとSphereを組み合わせたコンポーネント
 */
export class UKPAshi extends MXP.Component {

	private cylinderMesh: MXP.Mesh;
	private sphereTopEntity: MXP.Entity;
	private sphereBottomEntity: MXP.Entity;

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// material共通設定

		const mat = new MXP.Material( {
			vert: MXP.hotGet( 'ukpashiVert', basicVert ),
			frag: MXP.hotGet( 'ukpashiFrag', basicFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
		} );

		// Cylinder部分

		const cylinderGeo = new MXP.CylinderGeometry( {
			height: 2,
			radiusTop: 0.3,
			radiusBottom: 0.3,
			radSegments: 16
		} );

		this.cylinderMesh = this.entity.addComponent( MXP.Mesh, {
			geometry: cylinderGeo, material: mat
		} );

		// 上部Sphere

		this.sphereTopEntity = new MXP.Entity();
		this.sphereTopEntity.position.set( 0, 0.7, 0 );
		this.sphereTopEntity.addComponent( MXP.Mesh, {
			geometry: new MXP.SphereGeometry( { radius: 0.4 } ),
			material: mat
		} );
		this.entity.add( this.sphereTopEntity );

		// 下部Sphere

		this.sphereBottomEntity = new MXP.Entity();
		this.sphereBottomEntity.position.set( 0, -0.7, 0 );
		this.sphereBottomEntity.addComponent( MXP.Mesh, {
			geometry: new MXP.SphereGeometry( { radius: 0.4 } ),
			material: mat
		} );
		this.entity.add( this.sphereBottomEntity );

		// HMR

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/basic.vs', ( module ) => {

				if ( module ) {

					mat.vert = MXP.hotUpdate( 'ukpashiVert', module.default );

					mat.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/basic.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'ukpashiFrag', module.default );

					mat.requestUpdate();

				}

			} );

		}

	}

	protected disposeImpl(): void {

		this._entity.removeComponent( MXP.Mesh );
		this.entity.remove( this.sphereTopEntity );
		this.entity.remove( this.sphereBottomEntity );

	}

}
