
import * as MXP from 'maxpower';
import { ComponentGroup, Engine } from 'orengine';

// ResourceManagerプラグインが環境に応じて適切なファイルを生成（自動生成・編集禁止）
import { COMPONENTLIST as COMPONENTLIST_PROD } from '~/resources/_comps';
import { COMPONENTLIST as COMPONENTLIST_DEV } from '~/resources/_comps.dev';

type ComponentLIst = {
	[key: string]: ( ComponentLIst | ( typeof MXP.Component ) )
};

export const initResouces = () => {

	/*-------------------------------
		Components
	-------------------------------*/

	Engine.resources.clear();

	const _ = ( list: ComponentLIst, group: ComponentGroup ) => {

		const keys = Object.keys( list );

		for ( let i = 0; i < keys.length; i ++ ) {

			const name = keys[ i ];
			const value = list[ name ];

			if ( typeof value == "function" ) {

				group.addComponent( name, value );

			} else {

				const newGroup = group.createGroup( name );

				_( value, newGroup );

			}

		}

	};

	const light = Engine.resources.addComponentGroup( "Light" );
	light.addComponent( "Light", MXP.Light );

	// 開発環境では_DevOnlyとSamplesを含む、プロダクションでは除外
	const COMPONENTLIST = import.meta.env.DEV ? COMPONENTLIST_DEV : COMPONENTLIST_PROD;

	const rootKeys = Object.keys( COMPONENTLIST );

	for ( let i = 0; i < rootKeys.length; i ++ ) {

		const name = rootKeys[ i ];
		const value = COMPONENTLIST[ name ];

		const group = Engine.resources.addComponentGroup( name );

		_( value, group );

	}

};
