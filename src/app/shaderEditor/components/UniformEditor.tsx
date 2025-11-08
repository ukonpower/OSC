import * as GLP from 'glpower';
import { useCallback, useMemo } from 'react';

interface UniformEditorProps {
	uniforms: GLP.Uniforms | null;
	onUniformChange: ( key: string, value: any ) => void;
}

// uniformの型に応じた入力フィールドを生成
const UniformInput = ( { uniformKey, uniform, onChange }: { uniformKey: string; uniform: { value: any; type: GLP.UniformType }; onChange: ( value: any ) => void } ) => {

	const handleChange = useCallback( ( e: React.ChangeEvent<HTMLInputElement>, index?: number ) => {

		const newValue = parseFloat( e.target.value );

		// 配列型の場合
		if ( index !== undefined && Array.isArray( uniform.value ) ) {

			const newArray = [ ...uniform.value ];
			newArray[ index ] = newValue;
			onChange( newArray );

		} else {

			onChange( newValue );

		}

	}, [ uniform.value, onChange ] );

	// スカラー値（1f, 1i）
	if ( uniform.type === '1f' || uniform.type === '1i' ) {

		return (
			<input
				type="number"
				step={uniform.type === '1i' ? '1' : '0.01'}
				value={uniform.value}
				onChange={( e ) => handleChange( e )}
				className="shader-editor__uniform-input"
			/>
		);

	}

	// ベクトル型（2f, 3f, 4f）
	if ( uniform.type === '2f' || uniform.type === '3f' || uniform.type === '4f' ) {

		const componentCount = parseInt( uniform.type.charAt( 0 ) );
		const values = Array.isArray( uniform.value ) ? uniform.value : [];

		return (
			<div className="shader-editor__uniform-vector">
				{Array.from( { length: componentCount }, ( _, i ) => (
					<input
						key={i}
						type="number"
						step="0.01"
						value={values[ i ] || 0}
						onChange={( e ) => handleChange( e, i )}
						className="shader-editor__uniform-input shader-editor__uniform-input--vector"
					/>
				) )}
			</div>
		);

	}

	// その他の型は文字列表示のみ
	return (
		<span className="shader-editor__uniform-readonly">
			{JSON.stringify( uniform.value )}
		</span>
	);

};

export const UniformEditor = ( { uniforms, onUniformChange }: UniformEditorProps ) => {

	// グローバルuniformsを除外したローカルuniformsをフィルタリング
	const localUniforms = useMemo( () => {

		if ( ! uniforms ) return {};

		// グローバルuniformsのプレフィックス（一般的なパターン）
		const globalPrefixes = [ 'u_g', 'uTime', 'uResolution', 'uAspectRatio', 'uCameraMatrix', 'uViewMatrix', 'uProjectionMatrix' ];

		const filtered: GLP.Uniforms = {};

		Object.keys( uniforms ).forEach( key => {

			// グローバルuniformsを除外
			const isGlobal = globalPrefixes.some( prefix => key.startsWith( prefix ) );

			if ( ! isGlobal ) {

				filtered[ key ] = uniforms[ key ];

			}

		} );

		return filtered;

	}, [ uniforms ] );

	const handleUniformChange = useCallback( ( key: string, value: any ) => {

		onUniformChange( key, value );

	}, [ onUniformChange ] );

	if ( ! uniforms || Object.keys( localUniforms ).length === 0 ) {

		return (
			<div className="shader-editor__uniform-editor shader-editor__uniform-editor--empty">
				<div className="shader-editor__uniform-empty-message">
					編集可能なuniformがありません
				</div>
			</div>
		);

	}

	return (
		<div className="shader-editor__uniform-editor">
			<div className="shader-editor__uniform-header">
				<h3>Uniforms</h3>
			</div>
			<div className="shader-editor__uniform-list">
				{Object.entries( localUniforms ).map( ( [ key, uniform ] ) => (
					<div key={key} className="shader-editor__uniform-item">
						<label className="shader-editor__uniform-label">
							<span className="shader-editor__uniform-name">{key}</span>
							<span className="shader-editor__uniform-type">({uniform.type})</span>
						</label>
						<UniformInput
							uniformKey={key}
							uniform={uniform}
							onChange={( value ) => handleUniformChange( key, value )}
						/>
					</div>
				) )}
			</div>
		</div>
	);

};
