import * as MXP from 'maxpower';
import { OREngine, useOREngine } from 'orengine/react';
import { useEffect, useRef } from 'react';

import { canvas, gl } from '~/globals/';
import { OrbitControls } from '~/resources/Components/_DevOnly/OrbitControls';

interface PreviewPaneProps {
	componentClass?: typeof MXP.Component;
	componentName?: string;
	shaderCode?: string;
	onCompileError?: ( error: string ) => void;
	onCompileSuccess?: () => void;
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

	return null;

};

export const PreviewPane = ( { componentClass, componentName, shaderCode, onCompileError, onCompileSuccess }: PreviewPaneProps ) => {

	const canvasWrapperRef = useRef<HTMLDivElement>( null );

	// Canvasのマウント処理
	useEffect( () => {

		const wrapper = canvasWrapperRef.current;
		if ( ! wrapper ) return;

		// CanvasをDOMにマウント
		wrapper.appendChild( canvas );

		return () => {

			// クリーンアップ: CanvasをDOMから削除
			if ( wrapper.contains( canvas ) ) {

				wrapper.removeChild( canvas );

			}

		};

	}, [] );

	return (
		<div className="shader-editor__pane shader-editor__pane--preview">
			<div ref={canvasWrapperRef} className="shader-editor__canvas-wrapper" />
			<OREngine gl={gl} project={undefined}>
				{componentClass && componentName ? (
					<PreviewSceneManager
						componentClass={componentClass}
						componentName={componentName}
						shaderCode={shaderCode}
						onCompileError={onCompileError}
						onCompileSuccess={onCompileSuccess}
					/>
				) : (
					<div className="shader-editor__empty">
						コンポーネントを選択してください
					</div>
				)}
			</OREngine>
		</div>
	);

};
