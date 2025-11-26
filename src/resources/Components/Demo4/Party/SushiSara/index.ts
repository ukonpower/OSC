import * as MXP from 'maxpower';

import { Nigiri } from '../../Common/Nigiri';
import { GreetingCard } from '../GreetingCard';
import { Sara } from '../Sara';

/**
 * SushiSara - SaraとNigiriを組み合わせた回転寿司の皿コンポーネント
 */
export class SushiSara extends MXP.Component {

	private saraEntity: MXP.Entity;
	private nigiriEntity: MXP.Entity;
	private nigiriComponent: Nigiri;
	private greetingEntity: MXP.Entity;
	private greetingComponent: GreetingCard;

	private sashimiTypeValue: 'maguro' | 'salmon' | 'tako' = 'maguro';

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// Saraエンティティを作成（皿部分）- インスタンス数1
		this.saraEntity = new MXP.Entity();
		this.saraEntity.name = "Sara";
		this.saraEntity.addComponent( Sara, { instanceCount: 1 } );
		this.entity.add( this.saraEntity );

		// Nigiriエンティティを作成（寿司部分）
		this.nigiriEntity = new MXP.Entity();
		this.nigiriEntity.name = "Nigiri";
		// 皿の上に配置
		this.nigiriEntity.position.set( 0, 0.15, 0 );
		this.entity.add( this.nigiriEntity );

		// Nigiriコンポーネントを追加
		this.nigiriComponent = this.nigiriEntity.addComponent( Nigiri );

		// GreetingCardエンティティを作成
		this.greetingEntity = new MXP.Entity();
		this.greetingEntity.name = "GreetingCard";
		this.greetingEntity.position.set( - 0.3, 0.3, 0 );
		this.greetingEntity.euler.y = - Math.PI / 4;
		this.entity.add( this.greetingEntity );

		// GreetingCardコンポーネントを追加
		this.greetingComponent = this.greetingEntity.addComponent( GreetingCard );

		// field設定
		this.field( "sashimiType", () => this.sashimiTypeValue, ( v ) => {

			this.sashimiTypeValue = v;
			this.nigiriComponent.sashimiType = v;

		}, {
			format: {
				type: "select",
				list: [
					{ label: "マグロ", value: "maguro" },
					{ label: "サーモン", value: "salmon" },
					{ label: "タコ", value: "tako" }
				]
			}
		} );

	}

	public set sashimiType( type: 'maguro' | 'salmon' | 'tako' ) {

		this.setField( 'sashimiType', type );

	}

	public set greetingName( name: string ) {

		this.greetingComponent.name = name;

	}

	protected disposeImpl(): void {

		this.entity.remove( this.greetingEntity );
		this.greetingEntity.dispose();

		this.entity.remove( this.saraEntity );
		this.saraEntity.dispose();

		this.entity.remove( this.nigiriEntity );
		this.nigiriEntity.dispose();

	}

}
