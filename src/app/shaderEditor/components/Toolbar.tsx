interface ToolbarProps {
	compileStatus?: 'idle' | 'success' | 'error';
	errorMessage?: string;
	isComponentListOpen?: boolean;
	onToggleComponentList?: () => void;
}

export const Toolbar = ( { compileStatus, errorMessage, isComponentListOpen, onToggleComponentList }: ToolbarProps ) => {

	return (
		<div className="shader-editor__header">
			<div className="shader-editor__header-left">
				<button
					className="shader-editor__menu-toggle"
					onClick={onToggleComponentList}
					aria-label="Toggle component list"
				>
					☰
				</button>
				<h1 className="shader-editor__title">Shader Editor</h1>
			</div>

			{compileStatus === 'error' && errorMessage && (
				<div className="shader-editor__header-status shader-editor__header-status--error">
					✗ {errorMessage}
				</div>
			)}
		</div>
	);

};
