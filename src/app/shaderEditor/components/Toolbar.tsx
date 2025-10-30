import { SHADER_COMPONENTS, ShaderComponent } from '../componentList';

interface ToolbarProps {
	selectedComponent?: ShaderComponent;
	onComponentChange: ( component: ShaderComponent | undefined ) => void;
	onApply: () => void;
	onSave: () => void;
	isSaving?: boolean;
}

export const Toolbar = ( { selectedComponent, onComponentChange, onApply, onSave, isSaving }: ToolbarProps ) => {

	const handleSelectChange = ( e: React.ChangeEvent<HTMLSelectElement> ) => {

		const value = e.target.value;

		if ( value === '' ) {

			onComponentChange( undefined );

		} else {

			const component = SHADER_COMPONENTS.find( c => c.path === value );
			onComponentChange( component );

		}

	};

	return (
		<div className="shader-editor__header">
			<h1 className="shader-editor__title">🎨 Shader Editor</h1>

			<div className="shader-editor__selector">
				<label htmlFor="component-select">Component:</label>
				<select
					id="component-select"
					value={selectedComponent?.path || ''}
					onChange={handleSelectChange}
				>
					<option value="">-- Select Component --</option>
					{SHADER_COMPONENTS.map( ( comp ) => (
						<option key={comp.path} value={comp.path}>
							{comp.name}
						</option>
					) )}
				</select>
			</div>

			<button
				className="shader-editor__button"
				onClick={onApply}
				disabled={! selectedComponent}
			>
				Apply
			</button>

			<button
				className="shader-editor__button shader-editor__button--save"
				onClick={onSave}
				disabled={! selectedComponent || isSaving}
			>
				{isSaving ? 'Saving...' : 'Save to File'}
			</button>
		</div>
	);

};
