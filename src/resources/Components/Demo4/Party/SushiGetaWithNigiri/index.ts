import * as MXP from 'maxpower';

import { Nigiri } from '../../Common/Nigiri';
import { SushiGeta } from '../SushiGeta';

/**
 * SushiGetaWithNigiri - 寿司下駄に握り寿司を載せたコンポーネント
 */
export class SushiGetaWithNigiri extends MXP.Component {

	private sashimiTypeValue: 'maguro' | 'salmon' | 'tako' = 'maguro';

	private getaEntity: MXP.Entity;
	private nigiriEntity: MXP.Entity;
	private nigiriComponent: Nigiri;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// SushiGetaエンティティを作成（下駄部分）
		this.getaEntity = new MXP.Entity();
		this.getaEntity.name = "SushiGeta";
		this.getaEntity.addComponent( SushiGeta );
		this.entity.add( this.getaEntity );

		// Nigiriエンティティを作成（握り寿司部分）
		this.nigiriEntity = new MXP.Entity();
		this.nigiriEntity.name = "Nigiri";

		// 握り寿司の位置調整（下駄の上に配置）
		this.nigiriEntity.position.set( 0, 0.2, 0 );

		this.entity.add( this.nigiriEntity );

		// Nigiriコンポーネントを追加
		this.nigiriComponent = this.nigiriEntity.addComponent( Nigiri );

		// field設定（setterでNigiriのsashimiTypeを更新）
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

		// 初期タイプを設定
		this.nigiriComponent.sashimiType = this.sashimiTypeValue;

	}

	public set sashimiType( type: 'maguro' | 'salmon' | 'tako' ) {

		this.setField( 'sashimiType', type );

	}

	protected disposeImpl(): void {

		this.entity.remove( this.getaEntity );
		this.getaEntity.dispose();

		this.entity.remove( this.nigiriEntity );
		this.nigiriEntity.dispose();

	}

}
