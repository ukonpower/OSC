import { Block } from '../../../components/composites/Block';
import { Button } from '../../../components/primitives/Button';
import { ArrowIcon } from '../../../components/primitives/Icons/ArrowIcon';
import { InputText } from '../../../components/primitives/Input/InputText';
import { Label } from '../../../components/primitives/Label';
import { useSerializableField } from '../../../hooks/useSerializableProps';
import { useOREditor } from '../../OREditor/Hooks/useOREditor';

import style from './index.module.scss';

export const ProjectControl = () => {

	const { editor } = useOREditor();
	const [ projectName, setProjectName ] = useSerializableField<string>( editor.engine, "name" );

	if ( ! editor ) return null;

	return <div className={style.project}>
		<div className={style.project_inner}>
			<Block label="Project" accordion >
				<Label title='Project Name'>
					<InputText value={projectName || ""} onChange={( value ) => {

						setProjectName( value );

					} } />
				</Label>
				<Button onClick={()=>{

					if ( editor ) {

						editor.save();

					}

				}}>Save</Button>
				<div className={style.export}>
					<Button onClick={()=>{

						if ( editor ) {

							editor.save();

							window.open( `/player`, '_blank' );

						}

					}} >Play <ArrowIcon /></Button>
				</div>
			</Block>
		</div>
	</div>;

};
