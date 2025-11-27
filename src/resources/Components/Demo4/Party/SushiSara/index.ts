import * as MXP from 'maxpower';

import { Nigiri } from '../../Common/Nigiri';
import { IkuraGunKan } from '../../Ikura/IkuraGunKan';
import { GreetingCard } from '../GreetingCard';
import { Sara } from '../Sara';

/**
 * SushiSara - SaraとNigiriを組み合わせた回転寿司の皿コンポーネント
 */
export class SushiSara extends MXP.Component {

	private saraEntity: MXP.Entity;
	private sushiEntity: MXP.Entity; // NigiriまたはIkuraGunKan
	private nigiriComponent: Nigiri | null = null;
	private ikuraGunkanComponent: IkuraGunKan | null = null;
	private greetingEntity: MXP.Entity;
	private greetingComponent: GreetingCard;

	private sashimiTypeValue: 'maguro' | 'salmon' | 'ikura' | 'tako' = 'maguro';

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// Saraエンティティを作成（皿部分）- インスタンス数は常に10枚
		this.saraEntity = new MXP.Entity();
		this.saraEntity.name = "Sara";
		const saraComponent = this.saraEntity.addComponent( Sara );
		this.entity.add( this.saraEntity );

		// 回転寿司では皿1枚のみ表示
		if ( saraComponent && saraComponent.uniforms ) {

			saraComponent.uniforms.uVisibleCount.value = 1;

		}

		// 寿司エンティティを作成（NigiriまたはIkuraGunKan）
		this.sushiEntity = new MXP.Entity();
		this.sushiEntity.name = "Sushi";
		// 皿の上に配置
		this.sushiEntity.position.set( 0, 0.15, 0 );
		this.entity.add( this.sushiEntity );

		// 初期タイプに応じてコンポーネントを追加
		this.updateSushiComponent( this.sashimiTypeValue );

		// GreetingCardエンティティを作成
		this.greetingEntity = new MXP.Entity();
		this.greetingEntity.name = "GreetingCard";
		this.greetingEntity.position.set( - 0.5, 0.3, 0 );
		this.greetingEntity.euler.y = - Math.PI / 4;
		this.entity.add( this.greetingEntity );

		// GreetingCardコンポーネントを追加
		this.greetingComponent = this.greetingEntity.addComponent( GreetingCard );

		// field設定
		this.field( "sashimiType", () => this.sashimiTypeValue, ( v ) => {

			this.sashimiTypeValue = v;
			this.updateSushiComponent( v );

		}, {
			format: {
				type: "select",
				list: [
					{ label: "マグロ", value: "maguro" },
					{ label: "サーモン", value: "salmon" },
					{ label: "いくら", value: "ikura" },
					{ label: "タコ", value: "tako" }
				]
			}
		} );

	}

	public set sashimiType( type: 'maguro' | 'salmon' | 'ikura' | 'tako' ) {

		this.setField( 'sashimiType', type );

	}

	public set greetingName( name: string ) {

		this.greetingComponent.name = name;

	}

	// 寿司コンポーネントを更新（ikuraの場合はIkuraGunKan、それ以外はNigiri）
	private updateSushiComponent( type: 'maguro' | 'salmon' | 'ikura' | 'tako' ): void {

		const needsIkuraGunkan = type === 'ikura';

		// 既に適切なコンポーネントがある場合
		if ( needsIkuraGunkan && this.ikuraGunkanComponent ) {

			return;

		}

		if ( ! needsIkuraGunkan && this.nigiriComponent ) {

			this.nigiriComponent.sashimiType = type;
			return;

		}

		// コンポーネントを切り替える必要がある場合
		// 既存のコンポーネントを削除
		if ( this.nigiriComponent ) {

			this.sushiEntity.removeComponent( Nigiri );
			this.nigiriComponent = null;

		}

		if ( this.ikuraGunkanComponent ) {

			this.sushiEntity.removeComponent( IkuraGunKan );
			this.ikuraGunkanComponent = null;

		}

		// 新しいコンポーネントを追加
		if ( needsIkuraGunkan ) {

			this.ikuraGunkanComponent = this.sushiEntity.addComponent( IkuraGunKan );
			// ikuraの場合は0.8倍に縮小
			this.sushiEntity.scale.setScalar( 0.8 );

		} else {

			this.nigiriComponent = this.sushiEntity.addComponent( Nigiri );
			this.nigiriComponent.sashimiType = type;
			// 通常サイズに戻す
			this.sushiEntity.scale.setScalar( 1 );

		}

	}

	protected disposeImpl(): void {

		this.entity.remove( this.greetingEntity );
		this.greetingEntity.dispose();

		this.entity.remove( this.saraEntity );
		this.saraEntity.dispose();

		this.entity.remove( this.sushiEntity );
		this.sushiEntity.dispose();

	}

}
