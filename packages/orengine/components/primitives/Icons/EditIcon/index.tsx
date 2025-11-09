import style from './index.module.scss';

export const EditIcon = ( ) => {

	return <div className={style.edit}>
		<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M14.5 2.5L17.5 5.5L6.5 16.5H3.5V13.5L14.5 2.5Z" stroke="#D9D9D9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M12 5L15 8" stroke="#D9D9D9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	</div>;

};
