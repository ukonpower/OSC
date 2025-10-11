
import * as MXP from 'maxpower';
import { OREngineProjectData } from 'packages/orengine/features/OREngine/core/ProjectSerializer';
import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MouseMenu } from '../../components/composites/MouseMenu';
import { MouseMenuContext } from '../../components/composites/MouseMenu/Context/MouseMenuContext';
import { useMouseMenuContext } from '../../components/composites/MouseMenu/Hooks/useMouseMenuContext';
import { Panel } from '../../components/composites/Panel';
import { PanelContainer } from '../../components/composites/PanelContainer';
import { EntityProperty } from '../../components/panels/EntityProperty';
import { Timer } from '../../components/panels/GPUTimer';
import { Hierarchy } from '../../components/panels/Hierarchy';
import { ProjectControl } from '../../components/panels/ProjectControl';
import { Screen } from '../../components/panels/Screen';
import { Timeline } from '../../components/panels/Timeline';
import { useLayout } from '../../hooks/useLayout';

import { OREditorContext } from './Context/OREditorContext';
import { useOREditorContext } from './Hooks/useOREditorContext';
import style from './index.module.scss';

 type OREditorSaveCallback = ( projectData: OREngineProjectData, editorData: MXP.SerializeField ) => void

export const OREditor: React.FC<{onSave?: OREditorSaveCallback, editorData?: MXP.SerializeField }> = ( props ) => {

	const editorContext = useOREditorContext( );

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


	const layout = useLayout();
	const mouseMenuContext = useMouseMenuContext();

	let editorElm = null;

	if ( layout.isPC ) {

		editorElm = (
			<>
				<div className={style.vert}>
					<div className={`${style.horiz} ${style.flex}`}>
						<div className={style.vert} style={{ width: '300px' }}>
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
							<div style={{ height: '20vh' }}>
								<PanelContainer>
									<Panel title='Timer' noPadding>
										<Timer />
									</Panel>
								</PanelContainer>
							</div>
						</div>
						<div className={`${style.flex}`}>
							<Screen />
						</div>
						<div style={{ width: '300px' }}>
							<PanelContainer>
								<Panel title='Property'>
									<EntityProperty />
								</Panel>
							</PanelContainer>
						</div>
					</div>
					<div style={{ height: '160px' }}>
						<PanelContainer>
							<Panel title='Timeline' noPadding>
								<Timeline />
							</Panel>
						</PanelContainer>
					</div>
				</div>
				<MouseMenu />
			</>
		);

	} else {

		editorElm = (
			<div className={style.editor}>
				<div className={style.vert}>
					<div style={{ height: '25vh' }}>
						<Screen />
					</div>
					<div className={style.horiz} style={{ height: '45vh' }}>
						<div className={style.vert} style={{ width: '45vw' }}>
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
							<div style={{ height: '12vh' }}>
								<PanelContainer>
									<Panel title='Timer' noPadding>
										<Timer />
									</Panel>
								</PanelContainer>
							</div>
						</div>
						<div className={`${style.flex}`}>
							<PanelContainer>
								<Panel title='Property'>
									<EntityProperty />
								</Panel>
							</PanelContainer>
						</div>
					</div>
					<div style={{ height: '30vh' }}>
						<PanelContainer>
							<Panel title='Timeline' noPadding>
								<ErrorBoundary fallback={<div>エラーだよ</div>}>
									<Timeline />
								</ErrorBoundary>
							</Panel>
						</PanelContainer>
					</div>
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
