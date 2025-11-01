import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { OREngine, useOREngine } from 'orengine/react';
import { useEffect, useRef } from 'react';

import { gl, canvas } from '~/globals';
import { OrbitControls } from '~/resources/Components/_DevOnly/OrbitControls';
import { SkyBox } from '~/resources/Components/Demo4/Common/SkyBox';
import { TextureGenerator } from '~/resources/Components/Texture/TextureGenerator';
import { UniformControls } from '~/resources/Components/Utilities/UniformsControls';

interface PreviewPaneProps {
	componentClass?: typeof MXP.Component;
	componentName?: string;
	shaderCode?: string;
	onCompileError?: ( error: string ) => void;
	onCompileSuccess?: () => void;
	onApply?: () => void;
	onSave?: () => void;
	isSaving?: boolean;
	hasUnsavedChanges?: boolean;
}

// 内部コンポーネント: OREngineContextの中で動作し、シーンを構築・シェーダー更新を行う
const PreviewSceneManager = ( { componentClass, componentName, shaderCode, onCompileError, onCompileSuccess }: Pick<PreviewPaneProps, 'componentClass' | 'componentName' | 'shaderCode' | 'onCompileError' | 'onCompileSuccess'> ) => {

	const { engine } = useOREngine();

	// シーン構築
	useEffect( () => {

		if ( ! componentClass || ! componentName ) return;

		try {

			// TextureGeneratorとUniformControlsをrootに追加
			const textureGenerator = new MXP.Entity();
			textureGenerator.name = "TextureGenerator";
			textureGenerator.addComponent( TextureGenerator );
			engine.root.add( textureGenerator );

			const uniformControls = new MXP.Entity();
			uniformControls.name = "UniformControls";
			uniformControls.addComponent( UniformControls );
			engine.root.add( uniformControls );

			// Camera作成
			const camera = new MXP.Entity();
			camera.name = "Camera";
			camera.position.set( 0, 0, 3 );
			const renderCamera = camera.addComponent( MXP.RenderCamera, { gl: gl } );
			const orbitControls = camera.addComponent( OrbitControls );

			// グローバルcanvasがHTMLCanvasElementの場合のみOrbitControlsを有効化
			if ( canvas instanceof HTMLCanvasElement ) {

				orbitControls.setElm( canvas );
				orbitControls.enabled = true;

			}

			engine.root.add( camera );

			// カメラをエンジンに登録（レンダリングに必要）
			engine.setCamera( camera );

			// カメラパラメータの初期設定
			const resolution = new GLP.Vector( canvas.width, canvas.height );
			renderCamera.aspect = resolution.x / resolution.y;
			renderCamera.near = 0.001;
			renderCamera.far = 1000;
			renderCamera.fov = 50;
			renderCamera.needsUpdateProjectionMatrix = true;
			renderCamera.resize( resolution );

			// DOF設定（カメラから原点への距離をfocusDistanceに設定）
			const distanceToOrigin = camera.position.length();
			renderCamera.dofParams.focusDistance = distanceToOrigin;
			renderCamera.dofParams.kFilmHeight = 0.008;

			// Light作成
			const light = new MXP.Entity();
			light.name = "Light";
			light.position.set( 2, 2, 2 );
			const lightComp = light.addComponent( MXP.Light );
			lightComp.lightType = "directional";
			engine.root.add( light );

			// Skybox作成
			const skybox = new MXP.Entity();
			skybox.name = "Skybox";
			skybox.addComponent( SkyBox );
			engine.root.add( skybox );

			// PreviewObject作成
			const previewObject = new MXP.Entity();
			previewObject.name = "PreviewObject";
			previewObject.addComponent( componentClass );
			engine.root.add( previewObject );

			// 初期化成功を通知
			if ( onCompileSuccess ) onCompileSuccess();

			// クリーンアップ
			return () => {

				engine.setCamera( null );
				engine.root.remove( camera );
				engine.root.remove( light );
				engine.root.remove( skybox );
				engine.root.remove( previewObject );
				engine.root.remove( textureGenerator );
				engine.root.remove( uniformControls );

			};

		} catch ( error ) {

			console.error( 'Failed to create scene:', error );

			if ( onCompileError ) {

				onCompileError( error instanceof Error ? error.message : String( error ) );

			}

		}

	}, [ engine, componentClass, componentName, onCompileSuccess, onCompileError ] );

	// シェーダーコード適用
	useEffect( () => {

		if ( ! shaderCode || ! componentName ) return;

		try {

			// エンティティツリーからPreviewObjectを検索
			const previewObject = engine.root.findEntityByName( "PreviewObject" );

			if ( ! previewObject ) {

				console.error( 'PreviewObject not found in scene' );
				return;

			}

			// Meshコンポーネントを取得（ほとんどのシェーダーコンポーネントはMeshを持つ）
			const meshComponent = previewObject.getComponent( MXP.Mesh );

			if ( ! meshComponent ) {

				console.error( 'Mesh component not found on PreviewObject' );
				return;

			}

			const material = meshComponent.material;

			if ( ! material ) {

				console.error( 'Material not found on Mesh' );
				return;

			}

			// シェーダーコードを更新
			material.frag = shaderCode;

			// プログラムキャッシュをクリアして再コンパイルを強制
			material.requestUpdate();

			// コンパイル成功を通知
			if ( onCompileSuccess ) onCompileSuccess();

		} catch ( error ) {

			console.error( 'Failed to update shader:', error );

			if ( onCompileError ) {

				onCompileError( error instanceof Error ? error.message : String( error ) );

			}

		}

	}, [ engine, componentName, shaderCode, onCompileError, onCompileSuccess ] );

	// Engineのサイズを画面サイズに応じて更新
	useEffect( () => {

		const canvas = engine.gl.canvas;

		// OffscreenCanvasの場合はResizeObserverは使えない
		if ( canvas instanceof OffscreenCanvas ) return;

		// ResizeObserverでcanvasのリサイズを監視し、Engineのサイズを更新
		const resizeObserver = new ResizeObserver( () => {

			const width = canvas.width;
			const height = canvas.height;
			const resolution = new GLP.Vector( width, height );
			engine.setSize( resolution );

			// RenderCameraのresizeとパラメータ更新
			const cameraEntity = engine.root.findEntityByName( "Camera" );
			if ( cameraEntity ) {

				const renderCamera = cameraEntity.getComponent( MXP.RenderCamera );
				if ( renderCamera ) {

					renderCamera.aspect = width / height;
					renderCamera.needsUpdateProjectionMatrix = true;
					renderCamera.resize( resolution );

					// DOF設定（カメラから原点への距離をfocusDistanceに設定）
					const distanceToOrigin = cameraEntity.position.length();
					renderCamera.dofParams.focusDistance = distanceToOrigin;
					renderCamera.dofParams.kFilmHeight = 0.008;

				}

			}

		} );

		resizeObserver.observe( canvas );

		return () => {

			resizeObserver.disconnect();

		};

	}, [ engine ] );

	// レンダリングループ
	useEffect( () => {

		let animationId: number;

		const animate = () => {

			// DOF設定を毎フレーム更新（カメラがOrbitControlsで動くため）
			const cameraEntity = engine.root.findEntityByName( "Camera" );
			if ( cameraEntity ) {

				const renderCamera = cameraEntity.getComponent( MXP.RenderCamera );
				if ( renderCamera ) {

					const distanceToOrigin = cameraEntity.position.length();
					renderCamera.dofParams.focusDistance = distanceToOrigin;

				}

			}

			engine.update();
			animationId = requestAnimationFrame( animate );

		};

		animate();

		return () => {

			cancelAnimationFrame( animationId );

		};

	}, [ engine ] );

	return null;

};

export const PreviewPane = ( { componentClass, componentName, shaderCode, onCompileError, onCompileSuccess, onApply, onSave, isSaving, hasUnsavedChanges }: PreviewPaneProps ) => {

	const canvasWrapperRef = useRef<HTMLDivElement>( null );

	// Canvasのアタッチ処理
	useEffect( () => {

		const wrapperElm = canvasWrapperRef.current;
		if ( ! wrapperElm || ! canvas ) return;

		// キャンバスを追加
		wrapperElm.appendChild( canvas );

		// クリーンアップ関数
		return () => {

			if ( wrapperElm.contains( canvas ) ) {

				wrapperElm.removeChild( canvas );

			}

		};

	}, [] );

	return (
		<div className="shader-editor__pane shader-editor__pane--preview">
			<div className="shader-editor__preview-controls">
				<button
					className="shader-editor__control-btn shader-editor__control-btn--apply"
					onClick={onApply}
					disabled={! componentClass}
				>
					Apply (Ctrl+Enter)
				</button>
				<button
					className="shader-editor__control-btn shader-editor__control-btn--save"
					onClick={onSave}
					disabled={! componentClass || isSaving}
				>
					{isSaving ? 'Saving...' : hasUnsavedChanges ? 'Save *' : 'Save'}
				</button>
			</div>

			<div ref={canvasWrapperRef} className="shader-editor__canvas-wrapper" />
			{! ( componentClass && componentName ) && (
				<div className="shader-editor__empty">
					コンポーネントを選択してください
				</div>
			)}
			<OREngine gl={gl} project={undefined}>
				{componentClass && componentName && (
					<PreviewSceneManager
						componentClass={componentClass}
						componentName={componentName}
						shaderCode={shaderCode}
						onCompileError={onCompileError}
						onCompileSuccess={onCompileSuccess}
					/>
				)}
			</OREngine>
		</div>
	);

};
