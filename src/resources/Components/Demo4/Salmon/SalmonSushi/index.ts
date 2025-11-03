import * as MXP from 'maxpower';

import { SushiSakana } from '../../Common/SushiSakana';

/**
 * SalmonSushi - Emptyを作成してSushiSakanaを追加するコンポーネント
 */
export class SalmonSushi extends MXP.Component {

	private sushiEntity: MXP.Entity | null = null;
	private blidger: MXP.BLidger | null = null;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// BLidgerコンポーネントを取得
		this.blidger = this.entity.getComponent( MXP.BLidger ) || null;

		// SushiSakanaエンティティを作成
		this.sushiEntity = new MXP.Entity();
		this.sushiEntity.name = "SushiSakana";
		this.sushiEntity.euler.set( 0, Math.PI / 2, 0 );
		const sushiSakana = this.sushiEntity.addComponent( SushiSakana );
		sushiSakana.sashimiType = 'salmon';

		this.entity.add( this.sushiEntity );

	}

	protected updateImpl(): void {

		// BLidgerから"uState"アニメーションを取得して表示を制御
		if ( this.blidger && this.sushiEntity ) {

			const uState = this.blidger.animations.get( "uState" );

			if ( uState ) {

				// y値が1未満の時にsushiEntityを表示
				this.sushiEntity.visible = uState.value.y == 1.0;

			}

		}

	}

	protected disposeImpl( ): void {

		// 子エンティティのクリーンアップ
		if ( this.sushiEntity ) {

			this.entity.remove( this.sushiEntity );
			this.sushiEntity.dispose();
			this.sushiEntity = null;

		}

		this.blidger = null;

	}

}
