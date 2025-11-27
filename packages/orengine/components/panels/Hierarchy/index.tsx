import { useState } from 'react';

import { SearchIcon } from '../../../components/primitives/Icons/SearchIcon';
import { useOREditor } from '../../../features/OREditor/Hooks/useOREditor';

import { HierarchyNode } from './HierarchyNode';
import style from './index.module.scss';


export const Hierarchy = () => {

	const { editor } = useOREditor();

	const rootEntity = editor.engine.root;

	// 検索フィルター
	const [ searchQuery, setSearchQuery ] = useState<string>( '' );

	return <div className={style.hierarchy}>
		<div className={style.search}>
			<div className={style.search_wrapper}>
				<SearchIcon />
				<input
					type="text"
					placeholder="Search entities..."
					value={searchQuery}
					onChange={( e ) => setSearchQuery( e.target.value )}
					className={style.search_input}
				/>
			</div>
		</div>
		<div className={style.hierarchy_content}>
			{rootEntity && <HierarchyNode entity={rootEntity} searchQuery={searchQuery} />}
		</div>
	</div>;

};
