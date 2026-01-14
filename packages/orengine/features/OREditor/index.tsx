
import * as MXP from 'maxpower';
import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MouseMenu } from '../../components/composites/MouseMenu';
import { MouseMenuContext } from '../../components/composites/MouseMenu/Context/MouseMenuContext';
import { useMouseMenuContext } from '../../components/composites/MouseMenu/Hooks/useMouseMenuContext';
import { Panel } from '../../components/composites/Panel';
import { PanelContainer } from '../../components/composites/PanelContainer';
import { SplitContainer } from '../../components/composites/SplitContainer';
import { EntityProperty } from '../../components/panels/EntityProperty';
import { Timer } from '../../components/panels/GPUTimer';
import { Hierarchy } from '../../components/panels/Hierarchy';
import { ProjectControl } from '../../components/panels/ProjectControl';
import { Screen } from '../../components/panels/Screen';
import { ShaderErrors } from '../../components/panels/ShaderErrors';
import { Timeline } from '../../components/panels/Timeline';
import { useLayout } from '../../hooks/useLayout';
import { Engine, OREngineProjectData } from '../OREngine/core';

import { OREditorContext } from './Context/OREditorContext';
import { useOREditorContext } from './Hooks/useOREditorContext';
import style from './index.module.scss';

 type OREditorSaveCallback = ( projectData: OREngineProjectData, editorData: MXP.SerializeField ) => void

export const OREditor: React.FC<{onSave?: OREditorSaveCallback, editorData?: MXP.SerializeField }> = ( props ) => {

	const editorContext = useOREditorContext( );
	const [ hasShaderErrors, setHasShaderErrors ] = useState( false );

	useEffect( () => {

		if ( ! editorContext.editor || ! props.onSave ) return;

		editorContext.editor.on( "save", props.onSave );

		return () => {

			editorContext.editor.off( "save", props.onSave );

		};

	}, [ editorContext.editor, props.onSave ] );

	useEffect( () => {

		if ( ! editorContext.editor || ! props.editorData ) return;

		editorContext.editor.deserialize( props.editorData );

	}, [ props.editorData, editorContext.editor ] );

	// シェーダーエラーの監視
	useEffect( () => {

		if ( ! IS_EDITOR ) return;

		const onErrorsChanged = ( errors: any[] ) => {

			setHasShaderErrors( errors.length > 0 );

		};

		Engine.shaderErrorManager?.addListener( onErrorsChanged );

		// 初期状態を設定
		setHasShaderErrors( ( Engine.shaderErrorManager?.getErrors().length ?? 0 ) > 0 );

		return () => {

			Engine.shaderErrorManager?.removeListener( onErrorsChanged );

		};

	}, [] );

	const layout = useLayout();
	const mouseMenuContext = useMouseMenuContext();

	let editorElm = null;

	if ( layout.isPC ) {

		editorElm = (
			<>
				<SplitContainer
					direction="vertical"
					sizes={[ 1, "150px" ]}
					minSizes={[ 300, 80 ]}
					storageKey="orengine-pc-main"
				>
					{/* メインコンテンツエリア（水平3分割） */}
					<SplitContainer
						direction="horizontal"
						sizes={[ "300px", 1, "300px" ]}
						minSizes={[ 200, 400, 200 ]}
						storageKey="orengine-pc-horizontal"
					>
						{/* 左パネル（Scene/Project + Timer） */}
						<SplitContainer
							direction="vertical"
							sizes={[ 1, "200px" ]}
							minSizes={[ 200, 100 ]}
							storageKey="orengine-pc-left"
						>
							<PanelContainer>
								<Panel title='Scene'>
									<Hierarchy />
								</Panel>
								<Panel title='Project'>
									<ProjectControl />
								</Panel>
							</PanelContainer>
							<PanelContainer>
								<Panel title='Timer' noPadding>
									<Timer />
								</Panel>
							</PanelContainer>
						</SplitContainer>

						{/* 中央（Screen） */}
						<Screen />

						{/* 右パネル（Property + ShaderErrors） */}
						{hasShaderErrors ? (
							<SplitContainer
								direction="vertical"
								sizes={[ 1, 1 ]}
								minSizes={[ 150, 150 ]}
								storageKey="orengine-pc-right"
							>
								<PanelContainer>
									<Panel title='Property'>
										<EntityProperty />
									</Panel>
								</PanelContainer>
								{IS_EDITOR && (
									<PanelContainer>
										<Panel title='Shader Errors'>
											<ShaderErrors />
										</Panel>
									</PanelContainer>
								)}
							</SplitContainer>
						) : (
							<PanelContainer>
								<Panel title='Property'>
									<EntityProperty />
								</Panel>
							</PanelContainer>
						)}
					</SplitContainer>

					{/* タイムライン */}
					<PanelContainer>
						<Panel title='Timeline' noPadding>
							<Timeline />
						</Panel>
					</PanelContainer>
				</SplitContainer>
				<MouseMenu />
			</>
		);

	} else {

		editorElm = (
			<>
				<SplitContainer
					direction="vertical"
					sizes={[ 250, 450, 300 ]}
					minSizes={[ 150, 200, 100 ]}
					storageKey="orengine-tablet-main"
				>
					{/* Screen */}
					<Screen />

					{/* 中央エリア（Scene/Project/Timer + Property/Errors） */}
					<SplitContainer
						direction="horizontal"
						sizes={[ 450, 1 ]}
						minSizes={[ 200, 300 ]}
						storageKey="orengine-tablet-middle"
					>
						{/* 左パネル（Scene/Project + Timer） */}
						<SplitContainer
							direction="vertical"
							sizes={[ 1, 120 ]}
							minSizes={[ 200, 80 ]}
							storageKey="orengine-tablet-left"
						>
							<PanelContainer>
								<Panel title='Scene'>
									<Hierarchy />
								</Panel>
								<Panel title='Project'>
									<ProjectControl />
								</Panel>
							</PanelContainer>
							<PanelContainer>
								<Panel title='Timer' noPadding>
									<Timer />
								</Panel>
							</PanelContainer>
						</SplitContainer>

						{/* 右パネル（Property + ShaderErrors） */}
						{hasShaderErrors ? (
							<SplitContainer
								direction="vertical"
								sizes={[ 1, 1 ]}
								minSizes={[ 150, 150 ]}
								storageKey="orengine-tablet-right"
							>
								<PanelContainer>
									<Panel title='Property'>
										<EntityProperty />
									</Panel>
								</PanelContainer>
								{IS_EDITOR && (
									<PanelContainer>
										<Panel title='Shader Errors'>
											<ShaderErrors />
										</Panel>
									</PanelContainer>
								)}
							</SplitContainer>
						) : (
							<PanelContainer>
								<Panel title='Property'>
									<EntityProperty />
								</Panel>
							</PanelContainer>
						)}
					</SplitContainer>

					{/* Timeline */}
					<PanelContainer>
						<Panel title='Timeline' noPadding>
							<ErrorBoundary fallback={<div>エラーだよ</div>}>
								<Timeline />
							</ErrorBoundary>
						</Panel>
					</PanelContainer>
				</SplitContainer>
				<MouseMenu />
			</>
		);

	}

	return <OREditorContext.Provider value={editorContext}>
		<MouseMenuContext.Provider value={mouseMenuContext}>
			<div className={style.editor}>
				{editorElm}
			</div>
		</MouseMenuContext.Provider>
	</OREditorContext.Provider>;

};
