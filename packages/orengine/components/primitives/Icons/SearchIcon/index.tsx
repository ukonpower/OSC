import style from './index.module.scss';

export const SearchIcon = () => {

	return <div className={style.search_icon}>
		<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2"/>
			<path d="M15 15L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
		</svg>
	</div>;

};
