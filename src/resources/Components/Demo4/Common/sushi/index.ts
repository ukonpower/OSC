import * as MXP from 'maxpower';

import { SushiSakana } from '../SushiSakana';

/**
 * SushiMaguro - マグロの寿司コンポーネント（SushiSakanaを使用）
 */
export class SushiMaguro extends MXP.Component {

	private sushiEntity: MXP.Entity | null = null;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// SushiSakanaエンティティを作成
		this.sushiEntity = new MXP.Entity();
		this.sushiEntity.name = "SushiSakana";
		this.sushiEntity.addComponent( SushiSakana );

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
