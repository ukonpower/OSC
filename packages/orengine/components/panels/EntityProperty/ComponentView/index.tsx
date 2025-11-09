
import * as MXP from 'maxpower';
import { MouseEvent, useCallback, useMemo } from 'react';

import { Block } from '../../../../components/composites/Block';
import { SerializeFieldView } from '../../../../components/composites/SerializeFieldView';
import { CrossIcon } from '../../../../components/primitives/Icons/CrossIcon';
import { EditIcon } from '../../../../components/primitives/Icons/EditIcon';

import { SHADER_COMPONENTS } from '~/app/shaderEditor/componentList';

import style from './index.module.scss';

type ComponentViewProps = {
	component: MXP.Component
};

export const ComponentView = ( { component }: ComponentViewProps ) => {

	// const [ enabled, setEnabled ] = useSerializableField<boolean>( component, "enabled" );

	const disableEdit = component.initiator !== "user";

	const onClickDelete = useCallback( ( e: MouseEvent ) => {

		e.stopPropagation();

		const entity = component.entity;

		if ( entity ) {

			entity.removeComponentByUUID( component.uuid );

		}

	}, [ component ] );

	// コンポーネントがShaderEditorで編集可能かチェック
	const shaderComponentInfo = useMemo( () => {

		// コンポーネントクラス名から対応するShaderComponentを検索
		const className = component.constructor.name;

		// nameフィールドでマッチングする
		const shaderComp = SHADER_COMPONENTS.find( c => c.name === className );

		return shaderComp;

	}, [ component ] );

	const onClickOpenShaderEditor = useCallback( ( e: MouseEvent ) => {

		e.stopPropagation();

		if ( shaderComponentInfo ) {

			// ShaderEditorをURLパラメータ付きで新しいタブで開く
			const url = `/shaderEditor?component=${encodeURIComponent( shaderComponentInfo.path )}`;
			window.open( url, '_blank' );

		}

	}, [ shaderComponentInfo ] );

	const labelElm = <div className={style.head}>
		{/* <div className={style.check}>
			<InputBoolean checked={enabled || false} onChange={setEnabled} readOnly={disableEdit} />
		</div> */}
		<div className={style.name}>
			{component.constructor.name}
		</div>
		{shaderComponentInfo && (
			<div className={style.shaderEditor}>
				<button onClick={onClickOpenShaderEditor} title="ShaderEditorで開く">
					<EditIcon />
				</button>
			</div>
		)}
		<div className={style.delete}>
			<button onClick={onClickDelete}><CrossIcon /></button>
		</div>
	</div>;

	return <div className={style.compoView} data-disable_component={disableEdit}>
		<div className={style.content}>
			<Block label={labelElm} accordion bg defaultClose={false}>
				<SerializeFieldView target={component} />
			</Block>
		</div>
	</div>;

};
