import * as MXP from 'maxpower';

import { Sashimi } from '../../Maguro/Sashimi';
import { Shari } from '../Shari';

/**
 * Nigiri - ShariとSashimiを組み合わせた寿司の基本コンポーネント
 */
export class Nigiri extends MXP.Component {

	private shariEntity: MXP.Entity;
	private sashimiEntity: MXP.Entity;
	private sashimiComponent: Sashimi;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// Shariエンティティを作成（シャリ部分）
		this.shariEntity = new MXP.Entity();
		this.shariEntity.name = "Shari";
		this.shariEntity.addComponent( Shari );

		// シャリの位置調整（少し下に配置）
		this.shariEntity.position.set( 0, - 0.0, 0 );

		this.entity.add( this.shariEntity );

		// Sashimiエンティティを作成（刺身部分）
		this.sashimiEntity = new MXP.Entity();
		this.sashimiEntity.name = "Sashimi";

		this.sashimiComponent = this.sashimiEntity.addComponent( Sashimi );

		// 刺身の位置調整（シャリの上に配置）
		// Sashimiのheightは1.0なので、半分の0.0を上に配置
		this.sashimiEntity.position.set( 0, 0.0, 0 );

		this.entity.add( this.sashimiEntity );

	}

	public set sashimiType( type: 'maguro' | 'salmon' ) {

		this.sashimiComponent.setField( 'sashimiType', type );

	}


	protected disposeImpl( ): void {

		this.entity.remove( this.shariEntity );
		this.shariEntity.dispose();

		this.entity.remove( this.sashimiEntity );
		this.sashimiEntity.dispose();

	}

}
