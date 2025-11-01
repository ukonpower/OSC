import { useState } from 'react';

import { ShaderComponent } from '../../componentList';

import style from './index.module.scss';

interface ComponentGroup {
	name: string;
	children: ( ComponentGroup | ShaderComponent )[];
}

interface ComponentListProps {
	components: ShaderComponent[];
	selectedComponent?: ShaderComponent;
	onSelect: ( comp: ShaderComponent ) => void;
}

// 型ガード関数
const isShaderComponent = ( item: ComponentGroup | ShaderComponent ): item is ShaderComponent => {

	return "path" in item && "shaders" in item;

};

// コンポーネントを階層構造に変換
const buildHierarchy = ( comps: ShaderComponent[] ): ComponentGroup[] => {

	const root: Record<string, any> = {};

	comps.forEach( comp => {

		const parts = comp.path.split( '/' );
		let current = root;

		parts.forEach( ( part, index ) => {

			if ( ! current[ part ] ) {

				current[ part ] = index === parts.length - 1 ? comp : {};

			}

			if ( index < parts.length - 1 ) {

				current = current[ part ];

			}

		} );

	} );

	// Record を階層構造に変換
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
				children: convertToGroups( value )
			} as ComponentGroup;

		} );

	};

	return convertToGroups( root ) as ComponentGroup[];

};

// ツリーアイテムコンポーネント
interface TreeItemProps {
	item: ComponentGroup | ShaderComponent;
	selectedComponent?: ShaderComponent;
	onSelect: ( comp: ShaderComponent ) => void;
	depth?: number;
}

const TreeItem = ( { item, selectedComponent, onSelect, depth = 0 }: TreeItemProps ) => {

	const [ isOpen, setIsOpen ] = useState( depth === 0 ); // 最上位は初期表示

	if ( isShaderComponent( item ) ) {

		// コンポーネントアイテム
		const isSelected = selectedComponent && selectedComponent.path === item.path;

		return (
			<div
				className={`${style.item} ${isSelected ? style.selected : ''}`}
				style={{ paddingLeft: `${depth * 12 + 8}px` }}
				onClick={() => onSelect( item )}
			>
				{item.name}
			</div>
		);

	}

	// ディレクトリ
	return (
		<div className={style.directory}>
			<div
				className={style.directoryHeader}
				style={{ paddingLeft: `${depth * 12 + 8}px` }}
				onClick={() => setIsOpen( ! isOpen )}
			>
				<span className={style.arrow}>{isOpen ? '▼' : '▶'}</span>
				{item.name}
			</div>
			{isOpen && (
				<div className={style.directoryChildren}>
					{item.children.map( ( child, index ) => (
						<TreeItem
							key={index}
							item={child}
							selectedComponent={selectedComponent}
							onSelect={onSelect}
							depth={depth + 1}
						/>
					) )}
				</div>
			)}
		</div>
	);

};

export const ComponentList = ( { components, selectedComponent, onSelect }: ComponentListProps ) => {

	const hierarchy = buildHierarchy( components );

	return (
		<div className={style.componentList}>
			<div className={style.header}>Components</div>
			<div className={style.tree}>
				{hierarchy.map( ( item, index ) => (
					<TreeItem
						key={index}
						item={item}
						selectedComponent={selectedComponent}
						onSelect={onSelect}
					/>
				) )}
			</div>
		</div>
	);

};
