import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { OREngine, useOREngine } from 'orengine/react';
import { useEffect, useRef, useState } from 'react';

import { gl, canvas } from '~/globals';
import { OrbitControls } from '~/resources/Components/_DevOnly/OrbitControls';
import { SkyBox } from '~/resources/Components/Demo4/Common/SkyBox';
import { TextureGenerator } from '~/resources/Components/Texture/TextureGenerator';
import { UniformControls } from '~/resources/Components/Utilities/UniformsControls';

import { InputSelect } from 'orengine/components/primitives/Input/InputSelect';
import { InputBoolean } from 'orengine/components/primitives/Input/InputCheckBox';
import { Button } from 'orengine/components/primitives/Button';

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
const PreviewSceneManager = ( { componentClass, componentName, shaderCode, onCompileError, onCompileSuccess, resolutionScale, showWireframe }: Pick<PreviewPaneProps, 'componentClass' | 'componentName' | 'shaderCode' | 'onCompileError' | 'onCompileSuccess'> & { resolutionScale: number; showWireframe: boolean } ) => {

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

	// ワイヤーフレーム表示の切り替え
	useEffect( () => {

		const previewObject = engine.root.findEntityByName( "PreviewObject" );
		if ( ! previewObject ) return;

		const meshComponent = previewObject.getComponent( MXP.Mesh );
		if ( ! meshComponent ) return;

		const material = meshComponent.material;
		if ( ! material ) return;

		// ワイヤーフレーム表示の設定
		material.drawType = showWireframe ? 'LINES' : 'TRIANGLES';

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

	}, [ engine, resolutionScale ] );

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

	// ローカルストレージのキー
	const STORAGE_KEY_RESOLUTION = 'shaderEditor.resolutionScale';
	const STORAGE_KEY_WIREFRAME = 'shaderEditor.showWireframe';

	// 解像度スケールの状態管理（ローカルストレージから初期値を読み込み）
	const [ resolutionScale, setResolutionScale ] = useState<number>( () => {

		const saved = localStorage.getItem( STORAGE_KEY_RESOLUTION );
		return saved ? parseFloat( saved ) : 1.0;

	} );

	// ワイヤーフレーム表示の状態管理（ローカルストレージから初期値を読み込み）
	const [ showWireframe, setShowWireframe ] = useState<boolean>( () => {

		const saved = localStorage.getItem( STORAGE_KEY_WIREFRAME );
		return saved ? saved === 'true' : false;

	} );

	// 解像度スケールの選択肢を生成（editorのScreenパネルと同じ形式）
	const resolutionScaleList = new Array( 6 ).fill( 0 ).map( ( _, i ) => {

		const invScale = Math.pow( 2, i );
		const value = 1.0 / invScale;
		const label = value == 1 ? '1' : '1/' + invScale;

		return { value: value, label: label };

	} );

	// 解像度スケールが変更されたらローカルストレージに保存
	useEffect( () => {

		localStorage.setItem( STORAGE_KEY_RESOLUTION, resolutionScale.toString() );

	}, [ resolutionScale, STORAGE_KEY_RESOLUTION ] );

	// ワイヤーフレーム表示が変更されたらローカルストレージに保存
	useEffect( () => {

		localStorage.setItem( STORAGE_KEY_WIREFRAME, showWireframe.toString() );

	}, [ showWireframe, STORAGE_KEY_WIREFRAME ] );

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
					<label className="shader-editor__control-label">Resolution:</label>
					<InputSelect
						value={resolutionScale}
						selectList={resolutionScaleList}
						onChange={( value: number ) => setResolutionScale( Number( value ) )}
					/>
				</div>
				<div className="shader-editor__control-group">
					<label className="shader-editor__control-label">Wireframe:</label>
					<InputBoolean
						checked={showWireframe}
						onChange={( checked: boolean ) => setShowWireframe( checked )}
					/>
				</div>
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
					/>
				)}
			</OREngine>
		</div>
	);

};
