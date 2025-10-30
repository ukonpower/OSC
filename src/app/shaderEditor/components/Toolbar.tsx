import { Button } from 'orengine/components/primitives/Button';
import { InputSelect } from 'orengine/components/primitives/Input/InputSelect';
import { Label } from 'orengine/components/primitives/Label';

import { SHADER_COMPONENTS, ShaderComponent } from '../componentList';

interface ToolbarProps {
	selectedComponent?: ShaderComponent;
	onComponentChange: ( component: ShaderComponent | undefined ) => void;
	onApply: () => void;
	onSave: () => void;
	isSaving?: boolean;
}

export const Toolbar = ( { selectedComponent, onComponentChange, onApply, onSave, isSaving }: ToolbarProps ) => {

	const selectList = [
		{ value: '', label: '-- Select Component --' },
		...SHADER_COMPONENTS.map( comp => ( {
			value: comp.path,
			label: comp.name
		} ) )
	];

	const handleSelectChange = ( value: string ) => {

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

			<Label title="Component:">
				<InputSelect
					value={selectedComponent?.path || ''}
					selectList={selectList}
					onChange={handleSelectChange}
				/>
			</Label>

			<Button onClick={onApply}>
				Apply
			</Button>

			<Button onClick={onSave}>
				{isSaving ? 'Saving...' : 'Save to File'}
			</Button>
		</div>
	);

};
