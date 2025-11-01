import * as MXP from 'maxpower';

import { Shari } from '../../Common/Shari';

/**
 * Onigiri - Shariのみを使用したおにぎりコンポーネント
 */
export class Onigiri extends MXP.Component {

	private shariEntity: MXP.Entity | null = null;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// Shariエンティティを作成（おにぎりのご飯部分）
		this.shariEntity = new MXP.Entity();
		this.shariEntity.name = "Shari";
		this.shariEntity.addComponent( Shari );

		this.entity.add( this.shariEntity );

	}

	protected disposeImpl( ): void {

		// 子エンティティのクリーンアップ
		if ( this.shariEntity ) {

			this.entity.remove( this.shariEntity );
			this.shariEntity.dispose();
			this.shariEntity = null;

		}

	}

}
