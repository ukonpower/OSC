import * as MXP from 'maxpower';
import { OREngineProjectData } from 'orengine';
import { OREngine } from 'orengine/react';
import { useEffect, useState } from 'react';

import { gl } from '~/globals';

interface PreviewPaneProps {
	componentClass?: typeof MXP.Component;
	componentName?: string;
	shaderCode?: string;
	onCompileError?: ( error: string ) => void;
	onCompileSuccess?: () => void;
}

export const PreviewPane = ( { componentClass, componentName, shaderCode, onCompileError, onCompileSuccess }: PreviewPaneProps ) => {

	const [ projectData, setProjectData ] = useState<OREngineProjectData>();

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
							name: "DirectionalLight"
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

	}, [ componentClass, componentName ] );

	// シェーダーコード適用は別のアプローチが必要
	// TODO: OREngineのAPIを使ってランタイムでシェーダー更新する方法を検討

	return (
		<div className="shader-editor__pane shader-editor__pane--preview">
			{projectData ? (
				<OREngine gl={gl} project={projectData} />
			) : (
				<div className="shader-editor__empty">
					コンポーネントを選択してください
				</div>
			)}
		</div>
	);

};
