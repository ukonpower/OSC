import { Button } from 'orengine/components/primitives/Button';
import { InputSelect } from 'orengine/components/primitives/Input/InputSelect';
import { Label } from 'orengine/components/primitives/Label';

import { SHADER_COMPONENTS, ShaderComponent, ShaderFile } from '../componentList';

interface ToolbarProps {
	selectedComponent?: ShaderComponent;
	selectedShader?: ShaderFile;
	onComponentChange: ( component: ShaderComponent | undefined ) => void;
	onShaderChange: ( shader: ShaderFile | undefined ) => void;
	compileStatus?: 'idle' | 'success' | 'error';
	errorMessage?: string;
}

export const Toolbar = ( { selectedComponent, selectedShader, onComponentChange, onShaderChange, compileStatus, errorMessage }: ToolbarProps ) => {

	const componentSelectList = [
		{ value: '', label: '-- Select Component --' },
		...SHADER_COMPONENTS.map( comp => ( {
			value: comp.path,
			label: comp.name
		} ) )
	];

	const shaderSelectList = selectedComponent ? [
		{ value: '', label: '-- Select Shader --' },
		...selectedComponent.shaders.map( shader => ( {
			value: shader.path,
			label: `${shader.type.toUpperCase()} - ${shader.path.split( '/' ).pop()}`
		} ) )
	] : [];

	const handleComponentChange = ( value: string ) => {

		if ( value === '' ) {

			onComponentChange( undefined );
			onShaderChange( undefined );

		} else {

			const component = SHADER_COMPONENTS.find( c => c.path === value );
			onComponentChange( component );

			// 最初のシェーダーを自動選択（fsを優先）
			if ( component ) {

				const defaultShader = component.shaders.find( s => s.type === 'fs' ) || component.shaders[ 0 ];
				onShaderChange( defaultShader );

			}

		}

	};

	const handleShaderChange = ( value: string ) => {

		if ( value === '' || ! selectedComponent ) {

			onShaderChange( undefined );

		} else {

			const shader = selectedComponent.shaders.find( s => s.path === value );
			onShaderChange( shader );

		}

	};

	return (
		<div className="shader-editor__header">
			<div className="shader-editor__header-left">
				<h1 className="shader-editor__title">Shader Editor</h1>
				<Label title="Component">
					<InputSelect
						value={selectedComponent?.path || ''}
						selectList={componentSelectList}
						onChange={handleComponentChange}
					/>
				</Label>
				{selectedComponent && selectedComponent.shaders.length > 1 && (
					<Label title="Shader">
						<InputSelect
							value={selectedShader?.path || ''}
							selectList={shaderSelectList}
							onChange={handleShaderChange}
						/>
					</Label>
				)}
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
