import * as MXP from 'maxpower';

import { SushiSakana } from '../../Common/SushiSakana';

/**
 * SalmonSushi - Emptyを作成してSushiSakanaを追加するコンポーネント
 */
export class SalmonSushi extends MXP.Component {

	private sushiEntity: MXP.Entity | null = null;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// SushiSakanaエンティティを作成
		this.sushiEntity = new MXP.Entity();
		this.sushiEntity.name = "SushiSakana";
		this.sushiEntity.euler.set( 0, Math.PI / 2, 0 );
		const sushiSakana = this.sushiEntity.addComponent( SushiSakana );
		sushiSakana.sashimiType = 'salmon';

		this.entity.add( this.sushiEntity );

	}

	protected disposeImpl( ): void {

		// 子エンティティのクリーンアップ
		if ( this.sushiEntity ) {

			this.entity.remove( this.sushiEntity );
			this.sushiEntity.dispose();
			this.sushiEntity = null;

		}

	}

}
