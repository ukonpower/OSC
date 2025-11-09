import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Engine } from 'orengine/features/OREngine/core';

import { gl, canvas } from '~/globals';
import { OrbitControls } from '~/resources/Components/_DevOnly/OrbitControls';
import { SkyBox } from '~/resources/Components/Demo4/Common/SkyBox';
import { TextureGenerator } from '~/resources/Components/Texture/TextureGenerator';
import { UniformControls } from '~/resources/Components/Utilities/UniformsControls';

/**
 * シェーダーエディター専用のシーン管理クラス
 * 一度初期化したら、コンポーネントやシェーダーの更新のみを行う
 */
export class ShaderEditorScene {

	private static readonly STORAGE_KEY_CAMERA = 'shaderEditor.camera';

	private engine: Engine;
	private camera: MXP.Entity;
	private orbitControls: OrbitControls | null = null;
	private light: MXP.Entity;
	private skybox: MXP.Entity;
	private textureGenerator: MXP.Entity;
	private uniformControls: MXP.Entity;
	private previewObject: MXP.Entity | null = null;
	private cameraSaveInterval: number | null = null;

	constructor( engine: Engine ) {

		this.engine = engine;

		// TextureGeneratorとUniformControlsをrootに追加
		this.textureGenerator = new MXP.Entity();
		this.textureGenerator.name = "TextureGenerator";
		this.textureGenerator.addComponent( TextureGenerator );
		this.engine.root.add( this.textureGenerator );

		this.uniformControls = new MXP.Entity();
		this.uniformControls.name = "UniformControls";
		this.uniformControls.addComponent( UniformControls );
		this.engine.root.add( this.uniformControls );

		// Camera作成
		this.camera = new MXP.Entity();
		this.camera.name = "Camera";

		// カメラ位置とクォータニオンをlocalStorageから復元（OrbitControls追加前）
		this.restoreCameraPositionAndRotation();

		const renderCamera = this.camera.addComponent( MXP.RenderCamera, { gl: gl } );
		this.orbitControls = this.camera.addComponent( OrbitControls );

		// OrbitControlsのtargetをlocalStorageから復元
		this.restoreCameraTarget();

		// グローバルcanvasがHTMLCanvasElementの場合のみOrbitControlsを有効化
		if ( canvas instanceof HTMLCanvasElement ) {

			this.orbitControls.setElm( canvas );
			this.orbitControls.enabled = true;

		}

		// カメラ状態の定期保存を開始
		this.startCameraSaving();

		this.engine.root.add( this.camera );

		// カメラをエンジンに登録（レンダリングに必要）
		this.engine.setCamera( this.camera );

		// カメラパラメータの初期設定
		const resolution = new GLP.Vector( canvas.width, canvas.height );
		renderCamera.aspect = resolution.x / resolution.y;
		renderCamera.near = 0.001;
		renderCamera.far = 1000;
		renderCamera.fov = 50;
		renderCamera.needsUpdateProjectionMatrix = true;
		renderCamera.resize( resolution );

		// シェーダーエディターではDOFを無効化（パフォーマンス向上のため）
		const renderer = this.engine.renderer as any;
		renderer._pipelinePostProcess.dofCoc.enabled = false;
		renderer._pipelinePostProcess.dofBokeh.enabled = false;
		renderer._pipelinePostProcess.dofComposite.enabled = false;

		// Light作成
		this.light = new MXP.Entity();
		this.light.name = "Light";
		this.light.position.set( 2, 2, 2 );
		const lightComp = this.light.addComponent( MXP.Light );
		lightComp.lightType = "directional";
		this.engine.root.add( this.light );

		// Skybox作成
		this.skybox = new MXP.Entity();
		this.skybox.name = "Skybox";
		this.skybox.addComponent( SkyBox );
		this.engine.root.add( this.skybox );

	}

	// コンポーネントを更新（既存のpreviewObjectを削除して新しいものを追加）
	updateComponent( componentClass: typeof MXP.Component ): void {

		// 既存のpreviewObjectを削除
		if ( this.previewObject ) {

			this.engine.root.remove( this.previewObject );
			this.previewObject = null;

		}

		// 新しいpreviewObjectを作成
		this.previewObject = new MXP.Entity();
		this.previewObject.name = "PreviewObject";
		this.previewObject.addComponent( componentClass );
		this.engine.root.add( this.previewObject );

	}

	// シェーダーコードを更新
	updateShader( shaderCode: string ): { success: boolean; uniforms?: GLP.Uniforms; error?: string } {

		if ( ! this.previewObject ) {

			return { success: false, error: 'PreviewObject not found in scene' };

		}

		// Meshコンポーネントを取得
		const meshComponent = this.previewObject.getComponent( MXP.Mesh );

		if ( ! meshComponent ) {

			return { success: false, error: 'Mesh component not found on PreviewObject' };

		}

		const material = meshComponent.material;

		if ( ! material ) {

			return { success: false, error: 'Material not found on Mesh' };

		}

		try {

			// シェーダーコードを更新
			material.frag = shaderCode;

			// プログラムキャッシュをクリアして再コンパイルを強制
			material.requestUpdate();

			return { success: true, uniforms: material.uniforms };

		} catch ( error ) {

			return {
				success: false,
				error: error instanceof Error ? error.message : String( error )
			};

		}

	}

	// 現在のpreviewObjectのuniformsを取得
	getUniforms(): GLP.Uniforms | null {

		if ( ! this.previewObject ) return null;

		const meshComponent = this.previewObject.getComponent( MXP.Mesh );
		if ( ! meshComponent ) return null;

		const material = meshComponent.material;
		if ( ! material ) return null;

		return material.uniforms;

	}

	// ワイヤーフレーム表示の切り替え
	setWireframe( enabled: boolean ): void {

		const renderer = this.engine.renderer as any;

		if ( renderer && renderer.showWireframe !== undefined ) {

			renderer.showWireframe = enabled;

		}

	}

	// カメラ位置と回転の復元（OrbitControls追加前に実行）
	private restoreCameraPositionAndRotation(): void {

		const savedCamera = localStorage.getItem( ShaderEditorScene.STORAGE_KEY_CAMERA );

		if ( savedCamera ) {

			try {

				const { position, quaternion } = JSON.parse( savedCamera );
				this.camera.position.copy( position );
				this.camera.quaternion.copy( quaternion );

			} catch ( e ) {

				// パースエラー時はデフォルト位置
				this.camera.position.set( 0, 0, 3 );

			}

		} else {

			this.camera.position.set( 0, 0, 3 );

		}

	}

	// OrbitControlsのtarget復元（OrbitControls追加後に実行）
	private restoreCameraTarget(): void {

		const savedCamera = localStorage.getItem( ShaderEditorScene.STORAGE_KEY_CAMERA );

		if ( savedCamera && this.orbitControls ) {

			try {

				const { target } = JSON.parse( savedCamera );

				if ( target ) {

					// targetを復元した後、setPositionを呼び出してorbit_とdistance_を再計算
					const targetVec = new GLP.Vector( target.x, target.y, target.z );
					this.orbitControls.setPosition( this.camera.position, targetVec );

				}

			} catch ( e ) {

				// エラー時は何もしない（デフォルトのtargetを使用）

			}

		}

	}

	// カメラ位置とターゲットをデフォルト値にリセット
	resetCamera(): void {

		// デフォルト位置にリセット
		this.camera.position.set( 0, 0, 3 );
		this.camera.quaternion.set( 0, 0, 0, 1 );

		// OrbitControlsのターゲットをリセット
		if ( this.orbitControls ) {

			const defaultTarget = new GLP.Vector( 0, 0, 0 );
			this.orbitControls.setPosition( this.camera.position, defaultTarget );

		}

		// カメラ状態を保存
		this.saveCameraState();

	}

	// カメラ状態の保存
	private saveCameraState(): void {

		const cameraState: any = {
			position: {
				x: this.camera.position.x,
				y: this.camera.position.y,
				z: this.camera.position.z
			},
			quaternion: {
				x: this.camera.quaternion.x,
				y: this.camera.quaternion.y,
				z: this.camera.quaternion.z,
				w: this.camera.quaternion.w
			}
		};

		// OrbitControlsのtargetも保存
		if ( this.orbitControls ) {

			const target = ( this.orbitControls as any ).target_;
			cameraState.target = {
				x: target.x,
				y: target.y,
				z: target.z
			};

		}

		localStorage.setItem( ShaderEditorScene.STORAGE_KEY_CAMERA, JSON.stringify( cameraState ) );

	}

	// カメラ状態の定期保存を開始
	private startCameraSaving(): void {

		this.cameraSaveInterval = window.setInterval( () => {

			this.saveCameraState();

		}, 500 ); // 500msごとに保存

	}

	// カメラ状態の定期保存を停止
	private stopCameraSaving(): void {

		if ( this.cameraSaveInterval !== null ) {

			clearInterval( this.cameraSaveInterval );
			this.cameraSaveInterval = null;

		}

	}

	// クリーンアップ
	dispose(): void {

		// カメラ状態の定期保存を停止
		this.stopCameraSaving();

		this.engine.setCamera( null );
		this.engine.root.remove( this.camera );
		this.engine.root.remove( this.light );
		this.engine.root.remove( this.skybox );
		this.engine.root.remove( this.textureGenerator );
		this.engine.root.remove( this.uniformControls );

		if ( this.previewObject ) {

			this.engine.root.remove( this.previewObject );

		}

	}

}
