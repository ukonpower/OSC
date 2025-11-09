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

	private engine: Engine;
	private camera: MXP.Entity;
	private light: MXP.Entity;
	private skybox: MXP.Entity;
	private textureGenerator: MXP.Entity;
	private uniformControls: MXP.Entity;
	private previewObject: MXP.Entity | null = null;

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
		this.camera.position.set( 0, 0, 3 );

		const renderCamera = this.camera.addComponent( MXP.RenderCamera, { gl: gl } );
		const orbitControls = this.camera.addComponent( OrbitControls );

		// グローバルcanvasがHTMLCanvasElementの場合のみOrbitControlsを有効化
		if ( canvas instanceof HTMLCanvasElement ) {

			orbitControls.setElm( canvas );
			orbitControls.enabled = true;

		}

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

	// クリーンアップ
	dispose(): void {

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
