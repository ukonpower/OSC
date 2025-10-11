import * as MXP from 'maxpower';
import { useCallback } from 'react';

import { useSerializableField } from '../../../../hooks/useSerializableProps';
import { useTimeline } from '../../../../hooks/useTimeline';
import { Button } from '../../../Button';
import { PauseIcon } from '../../../Icons/PauseIcon';
import { PlayIcon } from '../../../Icons/PlayIcon';
import { Label } from '../../../Label';
import { Panel } from '../../../Panel';
import { Value } from '../../../Value';

import style from './index.module.scss';


export const TimelineSetting = () => {

	const { framePlay, glEditor } = useTimeline();

	const onChange = useCallback( ( value: MXP.SerializeFieldValue, setter: ( ( value: any ) => void ) | undefined ) => {

		if ( setter ) {

			setter( value );

		}

	}, [] );

	// loop
	const [ loop, setLoop ] = useSerializableField<boolean>( glEditor, "frameLoop/enabled" );
	const [ duration, setDuration ] = useSerializableField<number>( glEditor?.engine, "timeline/duration" );
	const [ fps, setFps ] = useSerializableField<number>( glEditor?.engine, "timeline/fps" );

	// 再生制御: 再生中なら一時停止、停止中なら再生開始
	const handlePlayStop = useCallback( () => {

		if ( glEditor?.engine ) {

			if ( framePlay.playing ) {

				// 再生中の場合は一時停止（再生位置は維持）
				glEditor.engine.stop();

			} else {

				// 停止中の場合は再生開始
				glEditor.engine.play();

			}

		}

	}, [ glEditor, framePlay.playing ] );

	return <div className={style.timelineSetting}>
		<Panel>
			<div className={style.playControls}>
				<Button onClick={handlePlayStop}>
					{framePlay.playing ? <PauseIcon /> : <PlayIcon />}
				</Button>
			</div>
			<Label title='current'>
				 <Value value={Math.floor( framePlay?.current || 0 )} readOnly />
				 </Label>
			<Label title='duration'>
				 <Value value={duration} onChange={( v ) => onChange( v, setDuration )}/>
			</Label>
			<Label title='fps'>
				 <Value value={fps} onChange={( v ) => onChange( v, setFps )} />
			</Label>
			<Label title='loop'>
				 <Value value={loop || false} onChange={( v ) => onChange( v, setLoop )}/>
			</Label>
		</Panel>
	</div>;

};
