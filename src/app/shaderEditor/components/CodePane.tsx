import Editor from '@monaco-editor/react';

interface CodePaneProps {
	code: string;
	onChange: ( value: string | undefined ) => void;
}

export const CodePane = ( { code, onChange }: CodePaneProps ) => {

	return (
		<div className="shader-editor__pane shader-editor__pane--code">
			<Editor
				height="100%"
				defaultLanguage="glsl"
				language="glsl"
				theme="vs-dark"
				value={code}
				onChange={onChange}
				options={{
					minimap: { enabled: true },
					fontSize: 14,
					lineNumbers: 'on',
					renderWhitespace: 'selection',
					tabSize: 2,
					automaticLayout: true,
					scrollBeyondLastLine: false,
					wordWrap: 'on',
				}}
			/>
		</div>
	);

};
