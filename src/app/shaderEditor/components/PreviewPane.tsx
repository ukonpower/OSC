import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { Button } from 'orengine/components/primitives/Button';
import { OREngine, useOREngine } from 'orengine/react';
import { useEffect, useRef } from 'react';

import { ShaderEditorScene } from '../ShaderEditorScene';

import { gl, canvas } from '~/globals';


interface PreviewPaneProps {
	componentClass?: typeof MXP.Component;
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
const PreviewSceneManager = ( { componentClass, shaderCode, onCompileError, onCompileSuccess, resolutionScale, showWireframe, onUniformsChange }: Pick<PreviewPaneProps, 'componentClass' | 'shaderCode' | 'onCompileError' | 'onCompileSuccess' | 'onUniformsChange'> & { resolutionScale: number; showWireframe: boolean } ) => {

	const { engine } = useOREngine();
	const sceneRef = useRef<ShaderEditorScene | null>( null );

	// シーン初期化（一度だけ実行）
	useEffect( () => {

		try {

			sceneRef.current = new ShaderEditorScene( engine );

			// 初期化成功を通知
			if ( onCompileSuccess ) onCompileSuccess();

		} catch ( error ) {

			console.error( 'Failed to create scene:', error );

			if ( onCompileError ) {

				onCompileError( error instanceof Error ? error.message : String( error ) );

			}

		}

		// クリーンアップ
		return () => {

			if ( sceneRef.current ) {

				sceneRef.current.dispose();
				sceneRef.current = null;

			}

		};

	}, [ engine, onCompileSuccess, onCompileError ] );

	// コンポーネントクラスが変更されたら更新
	useEffect( () => {

		if ( ! sceneRef.current || ! componentClass ) return;

		try {

			sceneRef.current.updateComponent( componentClass );

			// コンポーネント更新成功時にuniformsを通知
			const uniforms = sceneRef.current.getUniforms();
			if ( onUniformsChange ) {

				onUniformsChange( uniforms );

			}

			if ( onCompileSuccess ) onCompileSuccess();

		} catch ( error ) {

			console.error( 'Failed to update component:', error );

			if ( onCompileError ) {

				onCompileError( error instanceof Error ? error.message : String( error ) );

			}

		}

	}, [ componentClass, onCompileSuccess, onCompileError, onUniformsChange ] );

	// シェーダーコードが変更されたら更新
	useEffect( () => {

		if ( ! sceneRef.current || ! shaderCode ) return;

		const result = sceneRef.current.updateShader( shaderCode );

		if ( result.success ) {

			// uniformsを通知
			if ( result.uniforms && onUniformsChange ) {

				onUniformsChange( result.uniforms );

			}

			if ( onCompileSuccess ) onCompileSuccess();

		} else {

			if ( onCompileError && result.error ) {

				onCompileError( result.error );

			}

		}

	}, [ shaderCode, onCompileSuccess, onCompileError, onUniformsChange ] );

	// ワイヤーフレーム表示の切り替え
	useEffect( () => {

		if ( ! sceneRef.current ) return;

		sceneRef.current.setWireframe( showWireframe );

	}, [ showWireframe ] );

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

export const PreviewPane = ( { componentClass, shaderCode, onCompileError, onCompileSuccess, onApply, onSave, isSaving, hasUnsavedChanges, resolutionScale, showWireframe, onUniformsChange }: PreviewPaneProps ) => {

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
				{! componentClass && (
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
				{componentClass && (
					<PreviewSceneManager
						componentClass={componentClass}
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
