interface ToolbarProps {
	compileStatus?: 'idle' | 'success' | 'error';
	errorMessage?: string;
}

export const Toolbar = ( { compileStatus, errorMessage }: ToolbarProps ) => {

	return (
		<div className="shader-editor__header">
			<div className="shader-editor__header-left">
				<h1 className="shader-editor__title">Shader Editor</h1>
			</div>

			{compileStatus && compileStatus !== 'idle' && (
				<div className={`shader-editor__header-status shader-editor__header-status--${compileStatus}`}>
					{compileStatus === 'success' && '✓ Compiled Successfully'}
					{compileStatus === 'error' && `✗ ${errorMessage || 'Compilation failed'}`}
				</div>
			)}
		</div>
	);

};
