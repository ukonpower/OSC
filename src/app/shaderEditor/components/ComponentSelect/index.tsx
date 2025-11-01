import { MouseEvent, ReactNode, useCallback, useState } from 'react';

import { Button } from 'orengine/components/primitives/Button';
import { useMouseMenu } from 'orengine/hooks/useMouseMenu';
import { useMouseMenuItem } from 'orengine/hooks/useMouseMenuItem';

import { ShaderComponent } from '../../componentList';

import style from './index.module.scss';

// 階層構造の型定義
export interface ComponentGroup {
	name: string;
	child?: ( ComponentGroup | ShaderComponent )[];
}

interface ComponentDirectoryProps {
	group: ComponentGroup | ShaderComponent;
	onClickSelect: ( comp: ShaderComponent ) => void;
}

// 型ガード関数
const isShaderComponent = ( group: ComponentGroup | ShaderComponent ): group is ShaderComponent => {

	return "path" in group && "shaders" in group;

};

// ディレクトリツリーのアイテム
const ComponentDirectory = ( { group, onClickSelect }: ComponentDirectoryProps ) => {

	const menuContext = useMouseMenuItem();
	const [ isHovered, setIsHovered ] = useState( false );

	let childItem = null;
	let onClick = undefined;
	let type = "dir";

	if ( "child" in group ) {

		// ディレクトリの場合
		childItem = <>
			{group.child && group.child.map( ( item, index ) => {

				return <ComponentDirectory key={index} group={item} onClickSelect={onClickSelect} />;

			} )}
		</>;

	} else {

		// コンポーネントアイテムの場合
		if ( isShaderComponent( group ) ) {

			onClick = () => onClickSelect( group );
			type = "item";

		}

	}

	return (
		<div
			className={style.directory}
			onPointerEnter={() => setIsHovered( true )}
			onPointerLeave={() => setIsHovered( false )}
			onClick={onClick}
			data-type={type}
			data-direction={menuContext?.direction}
		>
			{group.name}
			{isHovered && childItem && (
				<div className={style.subDirectory}>
					{childItem}
				</div>
			)}
		</div>
	);

};

interface ComponentSelectProps {
	components: ShaderComponent[];
	selectedComponent?: ShaderComponent;
	onSelect: ( comp: ShaderComponent ) => void;
}

export const ComponentSelect = ( { components, selectedComponent, onSelect }: ComponentSelectProps ) => {

	const { pushContent, closeAll } = useMouseMenu();

	// コンポーネントを階層構造に変換
	const buildHierarchy = useCallback( ( comps: ShaderComponent[] ): ComponentGroup[] => {

		const root: Record<string, any> = {};

		comps.forEach( comp => {

			const parts = comp.path.split( '/' );
			let current = root;

			parts.forEach( ( part, index ) => {

				if ( ! current[ part ] ) {

					current[ part ] = index === parts.length - 1 ? comp : {};

				}

				current = current[ part ];

			} );

		} );

		// Record を ComponentGroup 配列に変換
		const convertToGroups = ( obj: Record<string, any> ): ( ComponentGroup | ShaderComponent )[] => {

			return Object.keys( obj ).map( key => {

				const value = obj[ key ];

				// ShaderComponent の場合
				if ( value && "path" in value && "name" in value && "shaders" in value ) {

					return value as ShaderComponent;

				}

				// ディレクトリの場合
				return {
					name: key,
					child: convertToGroups( value )
				} as ComponentGroup;

			} );

		};

		return convertToGroups( root ) as ComponentGroup[];

	}, [] );

	const handleClick = useCallback( ( e: MouseEvent ) => {

		if ( ! pushContent || ! closeAll ) return;

		const hierarchy = buildHierarchy( components );

		const handleSelectComponent = ( comp: ShaderComponent ) => {

			onSelect( comp );
			closeAll();

		};

		pushContent(
			<div className={style.picker}>
				{hierarchy.map( ( group, index ) => (
					<ComponentDirectory
						key={index}
						group={group}
						onClickSelect={handleSelectComponent}
					/>
				) )}
			</div>
		);

	}, [ pushContent, closeAll, components, onSelect, buildHierarchy ] );

	return (
		<div className={style.componentSelect}>
			<Button onClick={handleClick}>
				{selectedComponent ? selectedComponent.name : 'Select Component'}
			</Button>
		</div>
	);

};
