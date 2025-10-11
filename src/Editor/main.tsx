import * as MXP from 'maxpower';
import { OREditor, OREngine } from "orengine/react";
import { OREngineProjectData } from "packages/orengine/ts/Engine/ProjectSerializer";
import { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';

import ProjectData from "~/../data/scene.json";
import { gl } from "~/Globals";
import { initResouces } from "~/Resources";
import { FileSystem } from "~/Utils/FileSystem";

import '~/styles/style.scss';

const fileSystem = new FileSystem();

initResouces();

const EditorPage = () => {

	const [ projectData, setProjectData ] = useState<OREngineProjectData>();
	const [ editorData, setEditorData ] = useState<MXP.SerializeField>();

	useEffect( () => {

		fileSystem.get<OREngineProjectData>( "scene.json" ).then( ( data ) => {

			if ( ! data ) return;

			setProjectData( data );

		} );

		fileSystem.get<MXP.SerializeField>( "editor.json" ).then( ( data ) => {

			if ( ! data ) return;

			setEditorData( data );

		} );

		if ( import.meta.env.MODE === "production" ) {

			setProjectData( ProjectData );

		}

	}, [] );

	return (
		<OREngine gl={gl} project={projectData} >
			<OREditor editorData={editorData} onSave={( projectData, editorData ) => {

				fileSystem.set( "scene.json", projectData );
				fileSystem.set( "editor.json", editorData );

			}} />
		</OREngine>
	);

};

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
	<>
		{/* <React.StrictMode> */}
		<EditorPage />
		{/* </React.StrictMode> */}
	</>
);
