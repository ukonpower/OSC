import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { Engine } from 'orengine';

import { OrbitControls } from '../../_DevOnly/OrbitControls';
import { LookAt } from '../../ObjectControls/LookAt';
import { BLidgeClient } from '../../Utilities/BLidgeClient';

import { Bloom } from './PostProcess/Bloom';
import { ColorGrading } from './PostProcess/ColorGrading';
import { Finalize } from './PostProcess/Finalize';
import { FXAA } from './PostProcess/FXAA';

import { gl, globalUniforms, canvas } from '~/globals';

const emitter = new GLP.EventEmitter();

export const RenderCameraWaiter = new Promise<MXP.RenderCamera>( ( resolve ) => {

	emitter.once( "createdCamera", ( camera: MXP.RenderCamera ) => {

		resolve( camera );

	} );

} );

export class MainCamera extends MXP.Component {

	public renderCamera: MXP.RenderCamera;

	private _commonUniforms: GLP.Uniforms;
	private _renderTarget: MXP.RenderCameraTarget;
	private _lookAt: LookAt;
	private _orbitControls?: OrbitControls;
	private postProcessPipeline: MXP.PostProcessPipeline;
	private _resolution: GLP.Vector;
	private _resolutionInv: GLP.Vector;
	private _tmpVector1: GLP.Vector;
	private _tmpVector2: GLP.Vector;

	private _dofTarget: MXP.Entity | null;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		/*-------------------------------
			Init
		-------------------------------*/

		// resolution

		this._resolution = new GLP.Vector();
		this._resolutionInv = new GLP.Vector();

		// uniforms

		this._commonUniforms = MXP.UniformsUtils.merge( {
			uResolution: {
				type: "2f",
				value: this._resolution
			},
			uResolutionInv: {
				type: "2f",
				value: this._resolutionInv
			}
		} );

		/*-------------------------------
			Components
		-------------------------------*/

		this.renderCamera = this.entity.addComponent( MXP.RenderCamera, { gl: gl } );
		this._renderTarget = this.renderCamera.renderTarget;
		this._lookAt = this.entity.addComponent( LookAt );

		emitter.emit( "createdCamera", [ this.renderCamera ] );

		/*-------------------------------
			PostProcess
		-------------------------------*/

		this.postProcessPipeline = this.entity.addComponent( MXP.PostProcessPipeline );

		// fxaa

		this.postProcessPipeline.add( FXAA );

		// bloom

		const bloom = this.postProcessPipeline.add( Bloom, { srcTexture: this.renderCamera.renderTarget.shadingBuffer.textures[ 0 ] } );
		bloom.threshold = 1.0;
		bloom.brightness = 1;

		// colorGrading

		this.postProcessPipeline.add( ColorGrading );

		// finalize

		this.postProcessPipeline.add( Finalize );

		// dof

		this._dofTarget = null;

		/*-------------------------------
			Params
		-------------------------------*/


		// tmps

		this._tmpVector1 = new GLP.Vector();
		this._tmpVector2 = new GLP.Vector();

		/*-------------------------------
			BlidgeSceneApply
		-------------------------------*/

		const onSceneCreated = ( root: MXP.Entity, ) => {

			const camera = root.findEntityByName( "Camera" ) || null;

			const blidger = camera?.getComponent( MXP.BLidger );

			const prevBlidger = this.entity.getComponent( MXP.BLidger );

			if ( blidger ) {

				if ( prevBlidger ) {

					blidger.transformAutoUpdate = prevBlidger.transformAutoUpdate;

				}

			}

			const lookAtTarget = root.findEntityByName( "CamLook" ) || null;

			this._lookAt.setTarget( lookAtTarget );
			this._dofTarget = root.findEntityByName( 'CamDof' ) || null;

		};

		// Engine.rootからBLidgeClientを探してイベントをリッスン
		const engine = Engine.getInstance( gl );
		const blidgeClient = engine.root.getComponent( BLidgeClient );

		if ( blidgeClient ) {

			blidgeClient.on( 'sceneCreated', onSceneCreated );

			this.once( "dispose", () => {

				blidgeClient.off( 'sceneCreated', onSceneCreated );

			} );

		}

		// Engineにカメラエンティティを設定
		engine.setCamera( this.entity );

		/*-------------------------------
			DEV: OrbitControls
		-------------------------------*/

		if ( import.meta.env.DEV ) {

			if ( import.meta.env.DEV ) {

				this._orbitControls = this.entity.addComponent( OrbitControls );
				this._orbitControls.setElm( canvas );
				this._orbitControls.enabled = false;

			}

			const activeOrbitControls = ( activeOrbitcontrols: boolean ) => {

				if ( this._orbitControls ) {

					this._orbitControls.enabled = activeOrbitcontrols;

				}

				const blidger = this._entity.getComponent( MXP.BLidger );
				const lookat = this._entity.getComponent( LookAt );

				if ( blidger ) {

					blidger.transformAutoUpdate = ! activeOrbitcontrols;

				}

				if ( lookat ) {

					lookat.enabled = ! activeOrbitcontrols;

				}

			};

			const onMouseDown = ( e: PointerEvent ) => {

				if ( this._orbitControls && this._orbitControls.enabled ) return;

				const elm = e.target as HTMLElement;

				elm.setPointerCapture( e.pointerId );

				activeOrbitControls( true );

			};

			const onWheel = () => {

				if ( this._orbitControls && this._orbitControls.enabled ) return;

				activeOrbitControls( true );

			};

			const onKeyDown = ( e: KeyboardEvent ) => {

				if ( e.key === 'Escape' ) {

					activeOrbitControls( false );

				}

			};

			canvas.addEventListener( "pointerdown", onMouseDown );
			canvas.addEventListener( "wheel", onWheel );
			window.addEventListener( "keydown", onKeyDown );

			const onDispose = () => {

				canvas.removeEventListener( "pointerdown", onMouseDown );
				canvas.removeEventListener( "wheel", onWheel );
				window.removeEventListener( "keydown", onKeyDown );

			};

			this.once( "dispose", onDispose );

		}

		globalUniforms.gBuffer.uGBufferPos.value = this.renderCamera.gBuffer.textures[ 0 ];
		globalUniforms.gBuffer.uGBufferNormal.value = this.renderCamera.gBuffer.textures[ 1 ];

		const root = this.entity.getRootEntity();

		// lookat

		const lookAtTarget = root.findEntityByName( "CamLook" ) || null;
		this._lookAt.setTarget( lookAtTarget );

		// dof

		this._dofTarget = root.findEntityByName( 'CamDof' ) || null;

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		this.resize( event.resolution );

		this.updateCameraParams();

		// dof params

		this.entity.matrixWorld.decompose( this._tmpVector1 );

		if ( this._dofTarget ) {

			this._dofTarget.matrixWorld.decompose( this._tmpVector2 );

		}

		this.renderCamera.dofParams.focusDistance = this._tmpVector1.sub( this._tmpVector2 ).length();

	}

	public resize( resolution: GLP.Vector ): void {

		if ( resolution.x == this._resolution.x && resolution.y == this._resolution.y ) return;

		this._resolution.copy( resolution );
		this._resolutionInv.set( 1.0 / resolution.x, 1.0 / resolution.y, 0.0, 0.0 );

		this.renderCamera.resize( this._resolution );

		this.postProcessPipeline.resize( resolution );

		this.updateCameraParams();

	}

	private updateCameraParams() {

		this.renderCamera.aspect = this._resolution.x / this._resolution.y;
		this.renderCamera.near = 0.5;
		this.renderCamera.far = 3000;
		this.renderCamera.needsUpdateProjectionMatrix = true;

		// BLidgeアニメーションからカメラパラメータを制御
		const blidger = this.entity.getComponent( MXP.BLidger );

		if ( blidger ) {


			const cameraState = blidger.animations.get( "state" );


			if ( cameraState ) {

				// fov
				this.renderCamera.fov = 2 * Math.atan( 12 / ( 2 * cameraState.value.x ) ) / Math.PI * 180;

				// lookat
				this._lookAt.enabled = cameraState.value.y > 0.5;

			}

		}

	}

}
