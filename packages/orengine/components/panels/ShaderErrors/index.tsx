import { useEffect, useState } from 'react';

import { Engine, ShaderError } from '../../../features/OREngine/core';

import style from './index.module.scss';

export const ShaderErrors = () => {

	const [ errors, setErrors ] = useState<ShaderError[]>( [] );
	const [ expandedErrors, setExpandedErrors ] = useState<Set<string>>( new Set() );

	useEffect( () => {

		if ( ! IS_EDITOR ) return;

		// エラーリスナーを登録
		const onErrorsChanged = ( newErrors: ShaderError[] ) => {

			setErrors( newErrors );

		};

		Engine.shaderErrorManager?.addListener( onErrorsChanged );

		// 初期エラーを取得
		setErrors( Engine.shaderErrorManager?.getErrors() ?? [] );

		return () => {

			Engine.shaderErrorManager?.removeListener( onErrorsChanged );

		};

	}, [] );

	const toggleError = ( id: string ) => {

		setExpandedErrors( ( prev ) => {

			const newSet = new Set( prev );

			if ( newSet.has( id ) ) {

				newSet.delete( id );

			} else {

				newSet.add( id );

			}

			return newSet;

		} );

	};

	const clearAllErrors = () => {

		Engine.shaderErrorManager?.clearErrors();

	};

	// クリップボードにコピーするヘルパー関数（iOS Safari対応のフォールバック付き）
	const copyToClipboard = async ( text: string ): Promise<boolean> => {

		// 最新のClipboard APIを試す
		try {

			await navigator.clipboard.writeText( text );
			return true;

		} catch ( err ) {

			// フォールバック: document.execCommand('copy')を使用（iOS Safari対応）
			const textarea = document.createElement( 'textarea' );
			textarea.value = text;
			textarea.style.position = 'fixed';
			textarea.style.opacity = '0';
			document.body.appendChild( textarea );
			textarea.select();

			try {

				const success = document.execCommand( 'copy' );
				document.body.removeChild( textarea );
				return success;

			} catch ( e ) {

				document.body.removeChild( textarea );
				return false;

			}

		}

	};

	// 個別エラーをクリップボードにコピー
	const copyErrorToClipboard = async ( error: ShaderError ) => {

		const typeLabel = error.type === 'vertex' ? '頂点シェーダー' : 'フラグメントシェーダー';
		let text = `[${typeLabel}] ${error.message}\n`;

		if ( error.filePath ) {

			text += `ファイル: ${error.filePath}\n`;

		}

		if ( error.line ) {

			text += `行: ${error.line}\n`;

		}

		if ( error.sourceContext ) {

			text += `\nソースコンテキスト:\n${error.sourceContext}`;

		}

		const success = await copyToClipboard( text );

		if ( success ) {

			console.log( 'エラー情報をクリップボードにコピーしました' );

		} else {

			console.error( 'クリップボードへのコピーに失敗しました' );

		}

	};

	// 全エラーをクリップボードにコピー
	const copyAllErrorsToClipboard = async () => {

		const text = errors.map( ( error ) => {

			const typeLabel = error.type === 'vertex' ? '頂点シェーダー' : 'フラグメントシェーダー';
			let errorText = `[${typeLabel}] ${error.message}\n`;

			if ( error.filePath ) {

				errorText += `ファイル: ${error.filePath}\n`;

			}

			if ( error.line ) {

				errorText += `行: ${error.line}\n`;

			}

			if ( error.sourceContext ) {

				errorText += `\nソースコンテキスト:\n${error.sourceContext}`;

			}

			return errorText;

		} ).join( '\n\n---\n\n' );

		const success = await copyToClipboard( text );

		if ( success ) {

			console.log( `${errors.length}件のエラー情報をクリップボードにコピーしました` );

		} else {

			console.error( 'クリップボードへのコピーに失敗しました' );

		}

	};

	if ( errors.length === 0 ) {

		return <div className={style.container}>
			<div className={style.noErrors}>シェーダーエラーはありません</div>
		</div>;

	}

	return <div className={style.container}>
		<div className={style.header}>
			<span className={style.errorCount}>{errors.length} 件のエラー</span>
			<div className={style.headerButtons}>
				<button className={style.copyButton} onClick={copyAllErrorsToClipboard}>
					全てコピー
				</button>
				<button className={style.clearButton} onClick={clearAllErrors}>クリア</button>
			</div>
		</div>
		<div className={style.errorList}>
			{errors.map( ( error ) => (
				<div key={error.id} className={style.errorItem}>
					<div
						className={style.errorHeader}
						onClick={() => toggleError( error.id )}
					>
						<span className={style.errorType}>
							[{error.type === 'vertex' ? '頂点' : 'フラグメント'}]
						</span>
						<span className={style.errorMessage}>{error.message}</span>
						<span className={style.expandIcon}>
							{expandedErrors.has( error.id ) ? '▼' : '▶'}
						</span>
					</div>
					{expandedErrors.has( error.id ) && (
						<div className={style.errorDetails}>
							<div className={style.errorDetailsHeader}>
								{error.filePath && (
									<div className={style.errorFilePath}>
										📄 {error.filePath}
									</div>
								)}
								<div className={style.errorMetaRow}>
									{error.line && (
										<div className={style.errorLine}>行 {error.line}</div>
									)}
									<button
										className={style.copyErrorButton}
										onClick={( e ) => {

											e.stopPropagation();
											copyErrorToClipboard( error );

										}}
									>
										コピー
									</button>
									{error.fullSource && (
										<button
											className={style.copySourceButton}
											onClick={async ( e ) => {

												e.stopPropagation();
												const success = await copyToClipboard( error.fullSource! );

												if ( success ) {

													console.log( 'ソースコードをクリップボードにコピーしました' );

												} else {

													console.error( 'クリップボードへのコピーに失敗しました' );

												}

											}}
										>
											ソース全体をコピー
										</button>
									)}
								</div>
							</div>
							{error.sourceContext && (
								<pre className={style.sourceContext}>{error.sourceContext}</pre>
							)}
						</div>
					)}
				</div>
			) )}
		</div>
	</div>;

};
