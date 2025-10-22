import { useEffect, useState } from 'react';

import { Engine, ShaderError } from '../../../features/OREngine/core';

import style from './index.module.scss';

export const ShaderErrors = () => {

	const [ errors, setErrors ] = useState<ShaderError[]>( [] );
	const [ expandedErrors, setExpandedErrors ] = useState<Set<string>>( new Set() );

	useEffect( () => {

		// エラーリスナーを登録
		const onErrorsChanged = ( newErrors: ShaderError[] ) => {

			setErrors( newErrors );

		};

		Engine.shaderErrorManager.addListener( onErrorsChanged );

		// 初期エラーを取得
		setErrors( Engine.shaderErrorManager.getErrors() );

		return () => {

			Engine.shaderErrorManager.removeListener( onErrorsChanged );

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

		Engine.shaderErrorManager.clearErrors();

	};

	if ( errors.length === 0 ) {

		return <div className={style.container}>
			<div className={style.noErrors}>シェーダーエラーはありません</div>
		</div>;

	}

	return <div className={style.container}>
		<div className={style.header}>
			<span className={style.errorCount}>{errors.length} 件のエラー</span>
			<button className={style.clearButton} onClick={clearAllErrors}>クリア</button>
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
							{error.line && (
								<div className={style.errorLine}>行 {error.line}</div>
							)}
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
