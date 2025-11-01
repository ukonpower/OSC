import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { OREngine, useOREngine } from 'orengine/react';
import { useEffect, useMemo, useRef } from 'react';

import { OrbitControls } from '~/resources/Components/_DevOnly/OrbitControls';

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

			// Camera作成
			const camera = new MXP.Entity();
			camera.name = "Camera";
			camera.position.set( 0, 0, 3 );
			camera.addComponent( MXP.Camera );
			camera.addComponent( OrbitControls );
			engine.root.add( camera );

			// カメラをエンジンに登録（レンダリングに必要）
			engine.setCamera( camera );

			// Light作成
			const light = new MXP.Entity();
			light.name = "Light";
			light.position.set( 2, 2, 2 );
			const lightComp = light.addComponent( MXP.Light );
			lightComp.lightType = "directional";
			engine.root.add( light );

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
				engine.root.remove( previewObject );

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
			engine.setSize( new GLP.Vector( width, height ) );

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

	// シェーダーエディター専用のcanvasとglコンテキストを作成
	const { canvas: previewCanvas, gl: previewGl } = useMemo( () => {

		const canvas = document.createElement( 'canvas' );
		const gl = canvas.getContext( 'webgl2', { antialias: false } );

		if ( ! gl ) {

			throw new Error( 'WebGL2 is not supported' );

		}

		return { canvas, gl };

	}, [] );

	// Canvasのマウント処理とリサイズ監視
	useEffect( () => {

		const wrapper = canvasWrapperRef.current;
		if ( ! wrapper ) return;

		// CanvasをDOMにマウント
		wrapper.appendChild( previewCanvas );

		// ResizeObserverでcanvas-wrapperのサイズ変更を監視し、canvasの解像度を更新
		const resizeObserver = new ResizeObserver( ( entries ) => {

			for ( const entry of entries ) {

				const { width, height } = entry.contentRect;
				previewCanvas.width = width;
				previewCanvas.height = height;

			}

		} );

		resizeObserver.observe( wrapper );

		return () => {

			resizeObserver.disconnect();

			// クリーンアップ: CanvasをDOMから削除
			if ( wrapper.contains( previewCanvas ) ) {

				wrapper.removeChild( previewCanvas );

			}

		};

	}, [ previewCanvas ] );

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
			<OREngine gl={previewGl} project={undefined}>
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
