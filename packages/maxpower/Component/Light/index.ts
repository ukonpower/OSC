import * as GLP from 'glpower';

import { ComponentParams } from '..';
import { ShadowMapCamera } from '../Camera/ShadowMapCamera';

export type LightType = 'directional' | 'spot'

export class Light extends ShadowMapCamera {

	private _lightType: LightType;

	// common

	public color: GLP.Vector;
	public intensity: number;

	public castShadow: boolean;
	private _shadowMapSize: GLP.Vector;

	// spot

	public angle: number;
	public blend: number;
	public distance: number;
	public decay: number;

	// animation

	constructor( params: ComponentParams ) {

		super( params );

		this._lightType = 'spot';
		this.cameraType = "perspective";

		this.color = new GLP.Vector( 1.0, 1.0, 1.0, 0.0 );
		this.intensity = 1;

		// shadow

		this.castShadow = true;
		this._shadowMapSize = new GLP.Vector( 1024, 1024 );

		// directional

		this.orthWidth = 4;
		this.orthHeight = 4;

		// spot

		this.angle = Math.PI * 0.5;
		this.blend = 1;
		this.distance = 30;
		this.decay = 2;

		// field

		this.field(
			"type",
			() => this._lightType,
			( value: LightType ) => {

				this._lightType = value;
				this.updateProjectionMatrix();

			},
			{
				format: {
					type: "select",
					list: [
						{ label: "Directional", value: "directional" },
						{ label: "Spot", value: "spot" }
					]
				}
			}
		);

		this.field(
			"intensity",
			() => this.intensity,
			( value: number ) => this.intensity = value,
			{
				noExport: true
			}
		);

		this.updateProjectionMatrix();

	}

	public get lightType() {

		return this._lightType;

	}

	public updateProjectionMatrix(): void {

		this.fov = this.angle / Math.PI * 180;

		super.updateProjectionMatrix();

	}

	public setShadowMap( renderTarget: GLP.GLPowerFrameBuffer ) {

		this.renderTarget = renderTarget;
		this.renderTarget.setSize( this._shadowMapSize );

	}

	public setShadowMapSize( size: GLP.Vector ) {

		this._shadowMapSize.copy( size );

		if ( this.renderTarget ) {

			this.renderTarget.setSize( this._shadowMapSize );

		}

	}

	public lookAt( targetWorldPos: GLP.Vector ) {

		this.entity.lookAt( targetWorldPos );
		this.entity.quaternion.multiply( new GLP.Quaternion( ).setFromEuler( new GLP.Euler( Math.PI / 2 ) ) );

	}

}
