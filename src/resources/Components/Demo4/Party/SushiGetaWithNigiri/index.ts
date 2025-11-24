import * as MXP from 'maxpower';

import { Nigiri } from '../../Common/Nigiri';
import { IkuraGunKan } from '../../Ikura/IkuraGunKan';
import { SushiGeta } from '../SushiGeta';

/**
 * SushiGetaWithNigiri - 寿司下駄に握り寿司を載せたコンポーネント
 */
export class SushiGetaWithNigiri extends MXP.Component {

	private getaEntity: MXP.Entity;
	private sushiEntities: MXP.Entity[] = [];

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// SushiGetaエンティティを作成（下駄部分）
		this.getaEntity = new MXP.Entity();
		this.getaEntity.name = "SushiGeta";
		this.getaEntity.addComponent( SushiGeta );
		this.entity.add( this.getaEntity );

		// マグロ・サーモン・いくら・タコを1貫ずつ並べる
		// Entity名の最後がRなら並びを逆にする
		const isReverse = this.entity.name.endsWith( 'R' );
		const sushiTypes: Array<'maguro' | 'salmon' | 'ikura' | 'tako'> = isReverse
			? [ 'maguro', 'salmon', 'ikura', 'tako' ]
			: [ 'tako', 'ikura', 'salmon', 'maguro' ];
		const spacing = 0.25;
		const startX = - ( sushiTypes.length - 1 ) * spacing / 2;

		for ( let i = 0; i < sushiTypes.length; i ++ ) {

			const sushiEntity = new MXP.Entity();
			sushiEntity.name = "Sushi_" + i;
			sushiEntity.position.set( startX + i * spacing, 0.1, 0 );
			sushiEntity.euler.set( 0, - 0.5, 0 );
			sushiEntity.scale.setScalar( 0.6 );
			this.entity.add( sushiEntity );

			if ( sushiTypes[ i ] === 'ikura' ) {

				sushiEntity.addComponent( IkuraGunKan );
				sushiEntity.scale.setScalar( 0.45 );


			} else {

				const nigiriComponent = sushiEntity.addComponent( Nigiri );
				nigiriComponent.sashimiType = sushiTypes[ i ] as 'maguro' | 'salmon' | 'tako';

			}

			this.sushiEntities.push( sushiEntity );

		}

	}

	protected disposeImpl(): void {

		this.entity.remove( this.getaEntity );
		this.getaEntity.dispose();

		for ( let i = 0; i < this.sushiEntities.length; i ++ ) {

			this.entity.remove( this.sushiEntities[ i ] );
			this.sushiEntities[ i ].dispose();

		}

	}

}
