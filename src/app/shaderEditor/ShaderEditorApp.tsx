import * as MXP from 'maxpower';
import { useCallback, useEffect, useState } from 'react';

import { MouseMenu } from 'orengine/components/composites/MouseMenu';
import { MouseMenuContext } from 'orengine/components/composites/MouseMenu/Context/MouseMenuContext';
import { useMouseMenuContext } from 'orengine/components/composites/MouseMenu/Hooks/useMouseMenuContext';

import { CodePane } from './components/CodePane';
import { ComponentList } from './components/ComponentList';
import { PreviewPane } from './components/PreviewPane';
import { Toolbar } from './components/Toolbar';
import { loadComponent, loadShader, SHADER_COMPONENTS, ShaderComponent, ShaderFile } from './componentList';

import './styles/shaderEditor.scss';

export const ShaderEditorApp = () => {

	const mouseMenuContext = useMouseMenuContext();

	const [ selectedComponent, setSelectedComponent ] = useState<ShaderComponent>();
	const [ selectedShader, setSelectedShader ] = useState<ShaderFile>();
	const [ componentClass, setComponentClass ] = useState<typeof MXP.Component>();
	const [ originalShaderCode, setOriginalShaderCode ] = useState<string>( '' );
	const [ currentShaderCode, setCurrentShaderCode ] = useState<string>( '' );
	const [ appliedShaderCode, setAppliedShaderCode ] = useState<string>();
	const [ compileStatus, setCompileStatus ] = useState<'idle' | 'success' | 'error'>( 'idle' );
	const [ compileError, setCompileError ] = useState<string>();
	const [ isSaving, setIsSaving ] = useState( false );
	const [ isComponentListOpen, setIsComponentListOpen ] = useState( false );

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

	// Apply処理（シェーダー適用のみ、保存はしない）
	const handleApply = useCallback( () => {

		if ( ! selectedComponent || ! selectedShader ) return;

		// シェーダーコードを適用
		setAppliedShaderCode( currentShaderCode );
		setCompileStatus( 'idle' );

	}, [ currentShaderCode, selectedComponent, selectedShader ] );

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

	// コンポーネント選択ハンドラ
	const handleComponentSelect = useCallback( ( component: ShaderComponent ) => {

		setSelectedComponent( component );

		// 最初のシェーダーを自動選択（fsを優先）
		const defaultShader = component.shaders.find( s => s.type === 'fs' ) || component.shaders[ 0 ];
		setSelectedShader( defaultShader );

	}, [] );

	// 未保存の変更があるかチェック
	const hasUnsavedChanges = originalShaderCode !== currentShaderCode;

	// ComponentListトグルハンドラ
	const handleToggleComponentList = useCallback( () => {

		setIsComponentListOpen( prev => ! prev );

	}, [] );

	const handleCloseComponentList = useCallback( () => {

		setIsComponentListOpen( false );

	}, [] );

	return (
		<MouseMenuContext.Provider value={mouseMenuContext}>
			<div className="shader-editor">
				<Toolbar
					compileStatus={compileStatus}
					errorMessage={compileError}
					isComponentListOpen={isComponentListOpen}
					onToggleComponentList={handleToggleComponentList}
				/>

				<div className="shader-editor__content">
					<ComponentList
						components={SHADER_COMPONENTS}
						selectedComponent={selectedComponent}
						onSelect={handleComponentSelect}
						isOpen={isComponentListOpen}
						onClose={handleCloseComponentList}
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

					<CodePane
						code={currentShaderCode}
						onChange={handleCodeChange}
					/>
				</div>

				<MouseMenu />
			</div>
		</MouseMenuContext.Provider>
	);

};
