import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { Button } from 'orengine/components/primitives/Button';
import { OREngine, useOREngine } from 'orengine/react';
import { useEffect, useRef, useState } from 'react';

import { parseShaderUniforms, toGLPUniforms } from '../utils/shaderUniformParser';

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
	resolutionScale: number;
	showWireframe: boolean;
	onUniformsChange?: ( uniforms: GLP.Uniforms | null ) => void;
}

// 内部コンポーネント: OREngineContextの中で動作し、シーンを構築・シェーダー更新を行う
const PreviewSceneManager = ( { componentClass, componentName, shaderCode, onCompileError, onCompileSuccess, resolutionScale, showWireframe, onUniformsChange }: Pick<PreviewPaneProps, 'componentClass' | 'componentName' | 'shaderCode' | 'onCompileError' | 'onCompileSuccess' | 'onUniformsChange'> & { resolutionScale: number; showWireframe: boolean } ) => {

	const { engine } = useOREngine();

	// カメラ状態の保存用キー
	const STORAGE_KEY_CAMERA = 'shaderEditor.camera';

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

			// カメラ位置をlocalStorageから復元（保存されていればそれを使用、なければデフォルト）
			const savedCamera = localStorage.getItem( STORAGE_KEY_CAMERA );
			if ( savedCamera ) {

				try {

					const { position, quaternion } = JSON.parse( savedCamera );
					camera.position.copy( position );
					camera.quaternion.copy( quaternion );

				} catch ( e ) {

					// パースエラー時はデフォルト位置
					camera.position.set( 0, 0, 3 );

				}

			} else {

				camera.position.set( 0, 0, 3 );

			}

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

			// シェーダーエディターではDOFを無効化（パフォーマンス向上のため）
			const renderer = engine.renderer as any;
			renderer._pipelinePostProcess.dofCoc.enabled = false;
			renderer._pipelinePostProcess.dofBokeh.enabled = false;
			renderer._pipelinePostProcess.dofComposite.enabled = false;

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

	}, [ engine, componentClass, componentName, onCompileSuccess, onCompileError, STORAGE_KEY_CAMERA ] );

	// カメラ状態の定期保存
	useEffect( () => {

		const saveInterval = setInterval( () => {

			const cameraEntity = engine.root.findEntityByName( "Camera" );
			if ( cameraEntity ) {

				const cameraState = {
					position: {
						x: cameraEntity.position.x,
						y: cameraEntity.position.y,
						z: cameraEntity.position.z
					},
					quaternion: {
						x: cameraEntity.quaternion.x,
						y: cameraEntity.quaternion.y,
						z: cameraEntity.quaternion.z,
						w: cameraEntity.quaternion.w
					}
				};

				localStorage.setItem( STORAGE_KEY_CAMERA, JSON.stringify( cameraState ) );

			}

		}, 500 ); // 500msごとに保存

		return () => {

			clearInterval( saveInterval );

		};

	}, [ engine, STORAGE_KEY_CAMERA ] );

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

			// シェーダーから自動検出したuniformsをmaterialに追加（既存のuniformsは保持）
			const parsedUniforms = parseShaderUniforms( shaderCode );
			const detectedUniforms = toGLPUniforms( parsedUniforms );

			// 検出されたuniformsのうち、まだ存在しないものだけをmaterialに追加
			Object.keys( detectedUniforms ).forEach( key => {

				if ( ! material.uniforms[ key ] ) {

					material.uniforms[ key ] = detectedUniforms[ key ];

				}

			} );

			// シェーダーコードを更新
			material.frag = shaderCode;

			// プログラムキャッシュをクリアして再コンパイルを強制
			material.requestUpdate();

			// materialのuniformsを直接参照として親に通知（参照を保持して変更が即座に反映されるようにする）
			if ( onUniformsChange ) {

				onUniformsChange( material.uniforms );

			}

			// コンパイル成功を通知
			if ( onCompileSuccess ) onCompileSuccess();

		} catch ( error ) {

			console.error( 'Failed to update shader:', error );

			if ( onCompileError ) {

				onCompileError( error instanceof Error ? error.message : String( error ) );

			}

		}

	}, [ engine, componentName, shaderCode, onCompileError, onCompileSuccess, onUniformsChange ] );

	// ワイヤーフレーム表示の切り替え
	useEffect( () => {

		// EditorRendererのshowWireframeプロパティを設定
		const renderer = engine.renderer as any;

		if ( renderer && renderer.showWireframe !== undefined ) {

			renderer.showWireframe = showWireframe;

		}

	}, [ engine, showWireframe ] );

	// Engineのサイズを画面サイズに応じて更新
	useEffect( () => {

		const canvas = engine.gl.canvas;

		// OffscreenCanvasの場合はResizeObserverは使えない
		if ( canvas instanceof OffscreenCanvas ) return;

		// ResizeObserverでcanvasのリサイズを監視し、Engineのサイズを更新
		const resizeObserver = new ResizeObserver( ( entries ) => {

			// ResizeObserverEntryからDOM要素の実際の表示サイズを取得
			const entry = entries[ 0 ];
			const displayWidth = entry.contentRect.width;
			const displayHeight = entry.contentRect.height;

			// 解像度スケールを適用（表示サイズを基準に計算）
			const width = displayWidth * resolutionScale;
			const height = displayHeight * resolutionScale;
			const resolution = new GLP.Vector( width, height );
			engine.setSize( resolution );

			// RenderCameraのresizeとパラメータ更新
			const cameraEntity = engine.root.findEntityByName( "Camera" );
			if ( cameraEntity ) {

				const renderCamera = cameraEntity.getComponent( MXP.RenderCamera );
				if ( renderCamera ) {

					renderCamera.aspect = displayWidth / displayHeight;
					renderCamera.needsUpdateProjectionMatrix = true;
					renderCamera.resize( resolution );

				}

			}

		} );

		resizeObserver.observe( canvas );

		return () => {

			resizeObserver.disconnect();

		};

	}, [ engine, resolutionScale ] );

	// レンダリングループ
	useEffect( () => {

		let animationId: number;

		const animate = () => {

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

export const PreviewPane = ( { componentClass, componentName, shaderCode, onCompileError, onCompileSuccess, onApply, onSave, isSaving, hasUnsavedChanges, resolutionScale, showWireframe, onUniformsChange }: PreviewPaneProps ) => {

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
			<div className="shader-editor__canvas-container">
				<div ref={canvasWrapperRef} className="shader-editor__canvas-wrapper" />
				{! ( componentClass && componentName ) && (
					<div className="shader-editor__empty">
						コンポーネントを選択してください
					</div>
				)}
			</div>

			<div className="shader-editor__preview-controls">
				<div className="shader-editor__control-group">
					<Button onClick={onApply} disabled={! componentClass}>
						Apply
					</Button>
				</div>
				<div className="shader-editor__control-group">
					<Button onClick={onSave} disabled={! componentClass || isSaving}>
						{isSaving ? 'Saving...' : hasUnsavedChanges ? 'Save *' : 'Save'}
					</Button>
				</div>
			</div>

			<OREngine gl={gl} project={undefined}>
				{componentClass && componentName && (
					<PreviewSceneManager
						componentClass={componentClass}
						componentName={componentName}
						shaderCode={shaderCode}
						onCompileError={onCompileError}
						onCompileSuccess={onCompileSuccess}
						resolutionScale={resolutionScale}
						showWireframe={showWireframe}
						onUniformsChange={onUniformsChange}
					/>
				)}
			</OREngine>
		</div>
	);

};
