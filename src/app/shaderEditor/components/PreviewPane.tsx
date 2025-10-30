import * as MXP from 'maxpower';
import { OREngineProjectData } from 'orengine';
import { OREngine, useOREngine } from 'orengine/react';
import { useEffect, useRef, useState } from 'react';

import { canvas, gl } from '~/globals/';

interface PreviewPaneProps {
	componentClass?: typeof MXP.Component;
	componentName?: string;
	shaderCode?: string;
	onCompileError?: ( error: string ) => void;
	onCompileSuccess?: () => void;
}

// 内部コンポーネント: OREngineContextの中で動作し、シェーダー更新を行う
const PreviewSceneManager = ( { componentName, shaderCode, onCompileError, onCompileSuccess }: Pick<PreviewPaneProps, 'componentName' | 'shaderCode' | 'onCompileError' | 'onCompileSuccess'> ) => {

	const { engine } = useOREngine();

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

	const [ projectData, setProjectData ] = useState<OREngineProjectData>();
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

	// プロジェクトデータ生成
	useEffect( () => {

		if ( ! componentClass || ! componentName ) {

			setProjectData( undefined );
			return;

		}

		// シンプルなシーンを生成
		const data: OREngineProjectData = {
			name: "ShaderEditor",
			scene: {
				name: "root",
				pos: [ 0, 0, 0 ],
				childs: [
					{
						name: "Camera",
						pos: [ 0, 0, 3 ]
					},
					{
						name: "Light",
						pos: [ 2, 2, 2 ]
					},
					{
						name: "PreviewObject"
					}
				]
			},
			overrides: [
				{
					path: "/root/Camera",
					components: [
						{
							name: "Camera"
						},
						{
							name: "OrbitControls"
						}
					]
				},
				{
					path: "/root/Light",
					components: [
						{
							name: "Light",
							props: {
								type: "directional"
							}
						}
					]
				},
				{
					path: "/root/PreviewObject",
					components: [
						{
							name: componentName
						}
					]
				}
			]
		};

		setProjectData( data );

		if ( onCompileSuccess ) onCompileSuccess();

	}, [ componentClass, componentName, onCompileSuccess ] );

	return (
		<div className="shader-editor__pane shader-editor__pane--preview">
			<div ref={canvasWrapperRef} className="shader-editor__canvas-wrapper" />
			{projectData ? (
				<OREngine gl={gl} project={projectData}>
					<PreviewSceneManager
						componentName={componentName}
						shaderCode={shaderCode}
						onCompileError={onCompileError}
						onCompileSuccess={onCompileSuccess}
					/>
				</OREngine>
			) : (
				<div className="shader-editor__empty">
					コンポーネントを選択してください
				</div>
			)}
		</div>
	);

};
