import * as MXP from 'maxpower';
import { useCallback, useEffect, useState } from 'react';

import { CodePane } from './components/CodePane';
import { PreviewPane } from './components/PreviewPane';
import { Toolbar } from './components/Toolbar';
import { loadComponent, loadShader, ShaderComponent, ShaderFile } from './componentList';

import './styles/shaderEditor.scss';

export const ShaderEditorApp = () => {

	const [ selectedComponent, setSelectedComponent ] = useState<ShaderComponent>();
	const [ selectedShader, setSelectedShader ] = useState<ShaderFile>();
	const [ componentClass, setComponentClass ] = useState<typeof MXP.Component>();
	const [ originalShaderCode, setOriginalShaderCode ] = useState<string>( '' );
	const [ currentShaderCode, setCurrentShaderCode ] = useState<string>( '' );
	const [ appliedShaderCode, setAppliedShaderCode ] = useState<string>();
	const [ compileStatus, setCompileStatus ] = useState<'idle' | 'success' | 'error'>( 'idle' );
	const [ compileError, setCompileError ] = useState<string>();
	const [ isSaving, setIsSaving ] = useState( false );

	// コンポーネント選択時の処理
	useEffect( () => {

		if ( ! selectedComponent ) {

			setComponentClass( undefined );
			setSelectedShader( undefined );
			return;

		}

		const loadComp = async () => {

			try {

				// コンポーネントクラスを読み込み
				const CompClass = await loadComponent( selectedComponent );
				setComponentClass( () => CompClass );

			} catch ( error ) {

				console.error( 'Failed to load component:', error );
				alert( `Failed to load component: ${error}` );

			}

		};

		loadComp();

	}, [ selectedComponent ] );

	// シェーダー選択時の処理
	useEffect( () => {

		if ( ! selectedComponent || ! selectedShader ) {

			setOriginalShaderCode( '' );
			setCurrentShaderCode( '' );
			setAppliedShaderCode( undefined );
			setCompileStatus( 'idle' );
			return;

		}

		const loadShaderCode = async () => {

			try {

				// シェーダーファイルを読み込み
				const shaderCode = await loadShader( selectedComponent, selectedShader );
				setOriginalShaderCode( shaderCode );
				setCurrentShaderCode( shaderCode );
				setAppliedShaderCode( shaderCode );
				setCompileStatus( 'idle' );

			} catch ( error ) {

				console.error( 'Failed to load shader:', error );
				alert( `Failed to load shader: ${error}` );

			}

		};

		loadShaderCode();

	}, [ selectedComponent, selectedShader ] );

	// コード変更ハンドラ
	const handleCodeChange = useCallback( ( value: string | undefined ) => {

		setCurrentShaderCode( value || '' );

	}, [] );

	// Apply処理
	const handleApply = useCallback( () => {

		setAppliedShaderCode( currentShaderCode );
		setCompileStatus( 'idle' );

	}, [ currentShaderCode ] );

	// Save処理
	const handleSave = useCallback( async () => {

		if ( ! selectedComponent || ! selectedShader ) return;

		setIsSaving( true );

		try {

			const filePath = `resources/Components/${selectedComponent.path}/${selectedShader.path}`;

			const response = await fetch( '/api/writeShader', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify( {
					filePath,
					code: currentShaderCode
				} )
			} );

			if ( ! response.ok ) {

				throw new Error( `Failed to save: ${response.statusText}` );

			}

			alert( '✓ Shader saved successfully!' );
			setOriginalShaderCode( currentShaderCode );

		} catch ( error ) {

			console.error( 'Save error:', error );
			alert( `Failed to save shader: ${error}` );

		} finally {

			setIsSaving( false );

		}

	}, [ selectedComponent, selectedShader, currentShaderCode ] );

	// コンパイルエラーハンドラ
	const handleCompileError = useCallback( ( error: string ) => {

		setCompileStatus( 'error' );
		setCompileError( error );

	}, [] );

	// コンパイル成功ハンドラ
	const handleCompileSuccess = useCallback( () => {

		setCompileStatus( 'success' );
		setCompileError( undefined );

	}, [] );

	// 未保存の変更があるかチェック
	const hasUnsavedChanges = originalShaderCode !== currentShaderCode;

	return (
		<div className="shader-editor">
			<Toolbar
				selectedComponent={selectedComponent}
				selectedShader={selectedShader}
				onComponentChange={setSelectedComponent}
				onShaderChange={setSelectedShader}
				compileStatus={compileStatus}
				errorMessage={compileError}
			/>

			<div className="shader-editor__content">
				<CodePane
					code={currentShaderCode}
					onChange={handleCodeChange}
				/>

				<PreviewPane
					componentClass={componentClass}
					componentName={selectedComponent?.name}
					shaderCode={appliedShaderCode}
					onCompileError={handleCompileError}
					onCompileSuccess={handleCompileSuccess}
					onApply={handleApply}
					onSave={handleSave}
					isSaving={isSaving}
					hasUnsavedChanges={hasUnsavedChanges}
				/>
			</div>
		</div>
	);

};
