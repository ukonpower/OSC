import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { useCallback, useEffect, useState } from 'react';

import { MouseMenu } from 'orengine/components/composites/MouseMenu';
import { MouseMenuContext } from 'orengine/components/composites/MouseMenu/Context/MouseMenuContext';
import { useMouseMenuContext } from 'orengine/components/composites/MouseMenu/Hooks/useMouseMenuContext';
import { SplitContainer } from 'orengine/components/composites/SplitContainer';
import { useLayout } from 'orengine/hooks/useLayout';

import { CodePane } from './components/CodePane';
import { ComponentList } from './components/ComponentList';
import { PreviewPane } from './components/PreviewPane';
import { SettingsBar } from './components/SettingsBar';
import { Toolbar } from './components/Toolbar';
import { UniformEditor } from './components/UniformEditor';
import { loadComponent, loadShader, SHADER_COMPONENTS, ShaderComponent, ShaderFile } from './componentList';

import './styles/shaderEditor.scss';

export const ShaderEditorApp = () => {

	const mouseMenuContext = useMouseMenuContext();
	const layout = useLayout();

	const [ selectedComponent, setSelectedComponent ] = useState<ShaderComponent>();
	const [ selectedShader, setSelectedShader ] = useState<ShaderFile>();
	const [ componentClass, setComponentClass ] = useState<typeof MXP.Component>();
	const [ originalShaderCode, setOriginalShaderCode ] = useState<string>( '' );
	const [ currentShaderCode, setCurrentShaderCode ] = useState<string>( '' );
	const [ appliedShaderCode, setAppliedShaderCode ] = useState<string>();
	const [ compileStatus, setCompileStatus ] = useState<'idle' | 'success' | 'error'>( 'idle' );
	const [ compileError, setCompileError ] = useState<string>();
	const [ isSaving, setIsSaving ] = useState( false );
	// ComponentListはデフォルトで閉じる（オーバーレイ表示）
	const [ isComponentListOpen, setIsComponentListOpen ] = useState( false );
	// uniformsの状態管理
	const [ currentUniforms, setCurrentUniforms ] = useState<GLP.Uniforms | null>( null );

	// ローカルストレージのキー
	const STORAGE_KEY_RESOLUTION = 'shaderEditor.resolutionScale';
	const STORAGE_KEY_WIREFRAME = 'shaderEditor.showWireframe';
	const STORAGE_KEY_SELECTED_COMPONENT = 'shaderEditor.selectedComponent';
	const STORAGE_KEY_SELECTED_SHADER = 'shaderEditor.selectedShader';

	// 解像度スケールの状態管理（ローカルストレージから初期値を読み込み）
	const [ resolutionScale, setResolutionScale ] = useState<number>( () => {

		const saved = localStorage.getItem( STORAGE_KEY_RESOLUTION );
		return saved ? parseFloat( saved ) : 1.0;

	} );

	// ワイヤーフレーム表示の状態管理（ローカルストレージから初期値を読み込み）
	const [ showWireframe, setShowWireframe ] = useState<boolean>( () => {

		const saved = localStorage.getItem( STORAGE_KEY_WIREFRAME );
		return saved ? saved === 'true' : false;

	} );

	// 解像度スケールが変更されたらローカルストレージに保存
	useEffect( () => {

		localStorage.setItem( STORAGE_KEY_RESOLUTION, resolutionScale.toString() );

	}, [ resolutionScale, STORAGE_KEY_RESOLUTION ] );

	// ワイヤーフレーム表示が変更されたらローカルストレージに保存
	useEffect( () => {

		localStorage.setItem( STORAGE_KEY_WIREFRAME, showWireframe.toString() );

	}, [ showWireframe, STORAGE_KEY_WIREFRAME ] );

	// 選択中のコンポーネントが変更されたらローカルストレージに保存
	useEffect( () => {

		if ( selectedComponent ) {

			localStorage.setItem( STORAGE_KEY_SELECTED_COMPONENT, selectedComponent.path );

		}

	}, [ selectedComponent, STORAGE_KEY_SELECTED_COMPONENT ] );

	// 選択中のシェーダーが変更されたらローカルストレージに保存
	useEffect( () => {

		if ( selectedShader ) {

			localStorage.setItem( STORAGE_KEY_SELECTED_SHADER, selectedShader.path );

		}

	}, [ selectedShader, STORAGE_KEY_SELECTED_SHADER ] );

	// 起動時にローカルストレージから前回選択していたコンポーネントを復元
	useEffect( () => {

		const savedComponentPath = localStorage.getItem( STORAGE_KEY_SELECTED_COMPONENT );
		const savedShaderPath = localStorage.getItem( STORAGE_KEY_SELECTED_SHADER );

		if ( savedComponentPath ) {

			// コンポーネントリストから該当するコンポーネントを検索
			const component = SHADER_COMPONENTS.find( c => c.path === savedComponentPath );

			if ( component ) {

				setSelectedComponent( component );

				// シェーダーも復元を試みる
				if ( savedShaderPath ) {

					const shader = component.shaders.find( s => s.path === savedShaderPath );

					if ( shader ) {

						setSelectedShader( shader );

					} else {

						// 保存されていたシェーダーが見つからない場合はデフォルト選択
						const defaultShader = component.shaders.find( s => s.type === 'fs' ) || component.shaders[ 0 ];
						setSelectedShader( defaultShader );

					}

				} else {

					// シェーダーが保存されていない場合はデフォルト選択
					const defaultShader = component.shaders.find( s => s.type === 'fs' ) || component.shaders[ 0 ];
					setSelectedShader( defaultShader );

				}

			}

		}

	}, [ STORAGE_KEY_SELECTED_COMPONENT, STORAGE_KEY_SELECTED_SHADER ] );

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

	// Save処理（保存前に自動的にApplyも実行）
	const handleSave = useCallback( async () => {

		if ( ! selectedComponent || ! selectedShader ) return;

		// 保存前にApplyを実行してシェーダーコードを適用
		setAppliedShaderCode( currentShaderCode );
		setCompileStatus( 'idle' );

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

	// uniformsの変更を受け取る
	const handleUniformsChange = useCallback( ( uniforms: GLP.Uniforms | null ) => {

		setCurrentUniforms( uniforms );

	}, [] );

	// uniformの値を更新
	const handleUniformChange = useCallback( ( key: string, value: any ) => {

		if ( ! currentUniforms || ! currentUniforms[ key ] ) return;

		// currentUniformsは material.uniforms への参照なので、直接変更することでリアルタイム反映
		currentUniforms[ key ].value = value;

		// React側のUIを更新するため、新しいオブジェクトを作成して状態更新をトリガー
		setCurrentUniforms( { ...currentUniforms } );

	}, [ currentUniforms ] );

	// キーボードショートカット: Alt+Enter でApply, Ctrl+S でSave
	useEffect( () => {

		const handleKeyDown = ( e: KeyboardEvent ) => {

			// Alt+Enter でApply
			if ( e.altKey && e.key === 'Enter' ) {

				e.preventDefault();
				handleApply();

			}

			// Ctrl+S または Cmd+S でSave（Saveは自動的にApplyも実行）
			if ( ( e.ctrlKey || e.metaKey ) && e.key === 's' ) {

				e.preventDefault();
				handleSave();

			}

		};

		window.addEventListener( 'keydown', handleKeyDown );

		return () => {

			window.removeEventListener( 'keydown', handleKeyDown );

		};

	}, [ handleApply, handleSave ] );

	return (
		<MouseMenuContext.Provider value={mouseMenuContext}>
			<div className="shader-editor">
				<Toolbar
					compileStatus={compileStatus}
					errorMessage={compileError}
					isComponentListOpen={isComponentListOpen}
					onToggleComponentList={handleToggleComponentList}
				/>

				<SettingsBar
					resolutionScale={resolutionScale}
					onResolutionScaleChange={setResolutionScale}
					showWireframe={showWireframe}
					onWireframeChange={setShowWireframe}
				/>

				<div className="shader-editor__content">
					<ComponentList
						components={SHADER_COMPONENTS}
						selectedComponent={selectedComponent}
						onSelect={handleComponentSelect}
						isOpen={isComponentListOpen}
						onClose={handleCloseComponentList}
					/>

					{layout.isPC ? (
						// PC時: SplitContainerで分割してリサイズ可能に
						<SplitContainer
							direction="horizontal"
							sizes={[ 1, 1 ]}
							minSizes={[ 300, 300 ]}
							storageKey="shader-editor-split"
						>
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
								resolutionScale={resolutionScale}
								showWireframe={showWireframe}
								onUniformsChange={handleUniformsChange}
							/>

							<div className="shader-editor__code-wrapper">
								<UniformEditor
									uniforms={currentUniforms}
									onUniformChange={handleUniformChange}
								/>
								<CodePane
									code={currentShaderCode}
									onChange={handleCodeChange}
								/>
							</div>
						</SplitContainer>
					) : (
						// モバイル時: 従来通りの縦並び
						<>
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
								resolutionScale={resolutionScale}
								showWireframe={showWireframe}
								onUniformsChange={handleUniformsChange}
							/>

							<div className="shader-editor__code-wrapper">
								<UniformEditor
									uniforms={currentUniforms}
									onUniformChange={handleUniformChange}
								/>
								<CodePane
									code={currentShaderCode}
									onChange={handleCodeChange}
								/>
							</div>
						</>
					)}
				</div>

				<MouseMenu />
			</div>
		</MouseMenuContext.Provider>
	);

};
