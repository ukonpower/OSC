import Editor from '@monaco-editor/react';

interface CodePaneProps {
	code: string;
	onChange: ( value: string | undefined ) => void;
	compileStatus?: 'idle' | 'success' | 'error';
	errorMessage?: string;
}

export const CodePane = ( { code, onChange, compileStatus, errorMessage }: CodePaneProps ) => {

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
			{compileStatus && compileStatus !== 'idle' && (
				<div className={`shader-editor__status shader-editor__status--${compileStatus}`}>
					{compileStatus === 'success' && '✓ Compiled'}
					{compileStatus === 'error' && `✗ Error: ${errorMessage || 'Compilation failed'}`}
				</div>
			)}
		</div>
	);

};
