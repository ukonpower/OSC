import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import basicFrag from './shaders/basic.fs';
import basicVert from '~/resources/shaders/basic.vs';

import { globalUniforms } from '~/globals';

/**
 * UKPAshi - CylinderとSphereを組み合わせたコンポーネント
 */
export class UKPAshi extends MXP.Component {

	private cylinderMesh: MXP.Mesh;
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

		const h = 1.1;

		const cylinderGeo = new MXP.CylinderGeometry( {
			height: h,
			radiusTop: 0.1,
			radiusBottom: 0.1,
			radSegments: 16
		} );

		cylinderGeo.applyMatrix( new GLP.Matrix().setFromTransform( new GLP.Vector( 0.0, - h / 2, 0.0 ) ) );

		this.cylinderMesh = this.entity.addComponent( MXP.Mesh, {
			geometry: cylinderGeo, material: mat
		} );

		// 下部Sphere

		this.sphereBottomEntity = new MXP.Entity();
		this.sphereBottomEntity.position.set( 0, - h, 0 );
		this.sphereBottomEntity.addComponent( MXP.Mesh, {
			geometry: new MXP.SphereGeometry( { radius: 0.2 } ),
			material: mat
		} );
		this.entity.add( this.sphereBottomEntity );

		// HMR

		if ( import.meta.hot ) {

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
		this.entity.remove( this.sphereBottomEntity );

	}

}
