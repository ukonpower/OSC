
import * as MXP from 'maxpower';
import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MouseMenu } from '../../components/composites/MouseMenu';
import { MouseMenuContext } from '../../components/composites/MouseMenu/Context/MouseMenuContext';
import { useMouseMenuContext } from '../../components/composites/MouseMenu/Hooks/useMouseMenuContext';
import { Panel } from '../../components/composites/Panel';
import { PanelContainer } from '../../components/composites/PanelContainer';
import { ResizableWrapper } from '../../components/composites/ResizableWrapper';
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

	// シェーダーエラーの監視（DEV環境のみ）
	useEffect( () => {

		if ( ! import.meta.env.DEV ) return;

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
				<div className={style.vert}>
					<div className={`${style.horiz} ${style.flex}`}>
						<ResizableWrapper
							direction="horizontal"
							defaultSize={{ width: 300 }}
							minSize={{ width: 200 }}
							maxSize={{ width: 600 }}
							storageKey="orengine-leftPanel"
						>
							<div className={style.vert} style={{ width: '100%', height: '100%' }}>
								<div className={style.flex}>
									<PanelContainer>
										<Panel title='Scene'>
											<Hierarchy />
										</Panel>
										<Panel title='Project'>
											<ProjectControl />
										</Panel>
									</PanelContainer>
								</div>
								<ResizableWrapper
									direction="vertical"
									defaultSize={{ height: '20vh' }}
									minSize={{ height: 100 }}
									maxSize={{ height: 400 }}
									storageKey="orengine-timerPanel"
								>
									<PanelContainer>
										<Panel title='Timer' noPadding>
											<Timer />
										</Panel>
									</PanelContainer>
								</ResizableWrapper>
							</div>
						</ResizableWrapper>
						<div className={`${style.flex}`}>
							<Screen />
						</div>
						<ResizableWrapper
							direction="horizontal"
							defaultSize={{ width: 300 }}
							minSize={{ width: 200 }}
							maxSize={{ width: 600 }}
							storageKey="orengine-rightPanel"
						>
							<div className={style.vert} style={{ width: '100%', height: '100%' }}>
								<div className={style.flex} style={hasShaderErrors ? { flex: '1 1 50%' } : undefined}>
									<PanelContainer>
										<Panel title='Property'>
											<EntityProperty />
										</Panel>
									</PanelContainer>
								</div>
								{import.meta.env.DEV && hasShaderErrors && (
									<div className={style.flex} style={{ flex: '1 1 50%' }}>
										<PanelContainer>
											<Panel title='Shader Errors'>
												<ShaderErrors />
											</Panel>
										</PanelContainer>
									</div>
								)}
							</div>
						</ResizableWrapper>
					</div>
					<ResizableWrapper
						direction="vertical"
						defaultSize={{ height: 160 }}
						minSize={{ height: 80 }}
						maxSize={{ height: 400 }}
						storageKey="orengine-timelinePanel"
					>
						<PanelContainer>
							<Panel title='Timeline' noPadding>
								<Timeline />
							</Panel>
						</PanelContainer>
					</ResizableWrapper>
				</div>
				<MouseMenu />
			</>
		);

	} else {

		editorElm = (
			<div className={style.editor}>
				<div className={style.vert}>
					<ResizableWrapper
						direction="vertical"
						defaultSize={{ height: '25vh' }}
						minSize={{ height: 150 }}
						maxSize={{ height: 600 }}
						storageKey="orengine-tablet-screen"
					>
						<Screen />
					</ResizableWrapper>
					<ResizableWrapper
						direction="vertical"
						defaultSize={{ height: '45vh' }}
						minSize={{ height: 200 }}
						storageKey="orengine-tablet-middle"
					>
						<div className={style.horiz} style={{ width: '100%', height: '100%' }}>
							<ResizableWrapper
								direction="horizontal"
								defaultSize={{ width: '45vw' }}
								minSize={{ width: 200 }}
								storageKey="orengine-tablet-leftPanel"
							>
								<div className={style.vert} style={{ width: '100%', height: '100%' }}>
									<div style={{ flex: '1' }}>
										<PanelContainer>
											<Panel title='Scene'>
												<Hierarchy />
											</Panel>
											<Panel title='Project'>
												<ProjectControl />
											</Panel>
										</PanelContainer>
									</div>
									<ResizableWrapper
										direction="vertical"
										defaultSize={{ height: '12vh' }}
										minSize={{ height: 80 }}
										maxSize={{ height: 300 }}
										storageKey="orengine-tablet-timerPanel"
									>
										<PanelContainer>
											<Panel title='Timer' noPadding>
												<Timer />
											</Panel>
										</PanelContainer>
									</ResizableWrapper>
								</div>
							</ResizableWrapper>
							<div className={`${style.flex} ${style.vert}`}>
								<div className={style.flex} style={hasShaderErrors ? { flex: '1 1 50%' } : undefined}>
									<PanelContainer>
										<Panel title='Property'>
											<EntityProperty />
										</Panel>
									</PanelContainer>
								</div>
								{import.meta.env.DEV && hasShaderErrors && (
									<div className={style.flex} style={{ flex: '1 1 50%' }}>
										<PanelContainer>
											<Panel title='Shader Errors'>
												<ShaderErrors />
											</Panel>
										</PanelContainer>
									</div>
								)}
							</div>
						</div>
					</ResizableWrapper>
					<ResizableWrapper
						direction="vertical"
						defaultSize={{ height: '30vh' }}
						minSize={{ height: 100 }}
						maxSize={{ height: 400 }}
						storageKey="orengine-tablet-timeline"
					>
						<PanelContainer>
							<Panel title='Timeline' noPadding>
								<ErrorBoundary fallback={<div>エラーだよ</div>}>
									<Timeline />
								</ErrorBoundary>
							</Panel>
						</PanelContainer>
					</ResizableWrapper>
				</div>
				<MouseMenu />
			</div>
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
