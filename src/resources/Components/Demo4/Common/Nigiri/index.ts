import * as MXP from 'maxpower';

import { Sashimi } from '../../Maguro/Sashimi';
import { Shari } from '../Shari';

/**
 * Nigiri - ShariとSashimiを組み合わせた寿司の基本コンポーネント
 */
export class Nigiri extends MXP.Component {

	private sashimiTypeValue: 'maguro' | 'salmon' | 'tako' = 'maguro';
	private emissionValue: number = 0.0;

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

		// 刺身の位置調整（シャリの上に配置）
		this.sashimiEntity.position.set( 0, 0.0, 0 );

		this.entity.add( this.sashimiEntity );

		// Sashimiコンポーネントを追加
		this.sashimiComponent = this.sashimiEntity.addComponent( Sashimi );

		// field設定（setterでSashimiのタイプを更新）
		this.field( "sashimiType", () => this.sashimiTypeValue, ( v ) => {

			this.sashimiTypeValue = v;
			this.sashimiComponent.setField( 'sashimiType', v );

		}, import.meta.env.DEV ? {
			format: {
				type: "select",
				list: [
					{ label: "マグロ", value: "maguro" },
					{ label: "サーモン", value: "salmon" },
					{ label: "タコ", value: "tako" }
				]
			}
		} : undefined );

		// 初期タイプを設定
		this.sashimiComponent.setField( 'sashimiType', this.sashimiTypeValue );

	}

	public set sashimiType( type: 'maguro' | 'salmon' | 'tako' ) {

		this.setField( 'sashimiType', type );

	}

	public set emission( value: number ) {

		this.emissionValue = value;
		this.updateEmissionUniforms();

	}

	private updateEmissionUniforms(): void {

		// SashimiコンポーネントのuniformにuEmissionを設定
		if ( this.sashimiComponent ) {

			this.sashimiComponent.emission = this.emissionValue;

		}

	}


	protected disposeImpl( ): void {

		this.entity.remove( this.shariEntity );
		this.shariEntity.dispose();

		this.entity.remove( this.sashimiEntity );
		this.sashimiEntity.dispose();

	}

}
