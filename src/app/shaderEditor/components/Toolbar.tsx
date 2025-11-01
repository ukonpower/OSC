import { Button } from 'orengine/components/primitives/Button';
import { InputSelect } from 'orengine/components/primitives/Input/InputSelect';
import { Label } from 'orengine/components/primitives/Label';

import { SHADER_COMPONENTS, ShaderComponent } from '../componentList';

interface ToolbarProps {
	selectedComponent?: ShaderComponent;
	onComponentChange: ( component: ShaderComponent | undefined ) => void;
	compileStatus?: 'idle' | 'success' | 'error';
	errorMessage?: string;
}

export const Toolbar = ( { selectedComponent, onComponentChange, compileStatus, errorMessage }: ToolbarProps ) => {

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
			<div className="shader-editor__header-left">
				<h1 className="shader-editor__title">Shader Editor</h1>
				<Label title="Component">
					<InputSelect
						value={selectedComponent?.path || ''}
						selectList={selectList}
						onChange={handleSelectChange}
					/>
				</Label>
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
