import { InputSelect } from 'orengine/components/primitives/Input/InputSelect';
import { InputBoolean } from 'orengine/components/primitives/Input/InputCheckBox';
import { Button } from 'orengine/components/primitives/Button';

interface SettingsBarProps {
	resolutionScale: number;
	onResolutionScaleChange: ( value: number ) => void;
	showWireframe: boolean;
	onWireframeChange: ( checked: boolean ) => void;
	onResetCamera?: () => void;
}

export const SettingsBar = ( { resolutionScale, onResolutionScaleChange, showWireframe, onWireframeChange, onResetCamera }: SettingsBarProps ) => {

	// 解像度スケールの選択肢を生成（editorのScreenパネルと同じ形式）
	const resolutionScaleList = new Array( 6 ).fill( 0 ).map( ( _, i ) => {

		const invScale = Math.pow( 2, i );
		const value = 1.0 / invScale;
		const label = value == 1 ? '1' : '1/' + invScale;

		return { value: value, label: label };

	} );

	return (
		<div className="shader-editor__settings-bar">
			<div className="shader-editor__settings-group">
				<label className="shader-editor__settings-label">Resolution:</label>
				<InputSelect
					value={resolutionScale}
					selectList={resolutionScaleList}
					onChange={( value: number ) => onResolutionScaleChange( Number( value ) )}
				/>
			</div>
			<div className="shader-editor__settings-group">
				<label className="shader-editor__settings-label">Wireframe:</label>
				<InputBoolean
					checked={showWireframe}
					onChange={( checked: boolean ) => onWireframeChange( checked )}
				/>
			</div>
			<div className="shader-editor__settings-group">
				<Button onClick={onResetCamera} disabled={! onResetCamera}>
					Reset Camera
				</Button>
			</div>
		</div>
	);

};
