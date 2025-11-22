import * as MXP from 'maxpower';

import { SushiSara } from '../SushiSara';

import { globalUniforms } from '~/globals';

/**
 * KaitenSushi - SushiSaraを横に流すコンポーネント
 */
export class KaitenSushi extends MXP.Component {

	private sushiSaraEntity: MXP.Entity;
	private sushiSaraComponent: SushiSara;

	// 移動パラメータ
	private speed: number = 0.5;
	private rangeX: number = 5.0;
	private offsetX: number = 0;

	private sashimiTypeValue: 'maguro' | 'salmon' | 'tako' = 'maguro';

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// SushiSaraエンティティを作成
		this.sushiSaraEntity = new MXP.Entity();
		this.sushiSaraEntity.name = "SushiSara";
		this.entity.add( this.sushiSaraEntity );

		// SushiSaraコンポーネントを追加
		this.sushiSaraComponent = this.sushiSaraEntity.addComponent( SushiSara );

		// field設定
		if ( import.meta.env.DEV ) {

			this.field( "speed", () => this.speed, ( v ) => this.speed = v );
			this.field( "rangeX", () => this.rangeX, ( v ) => this.rangeX = v );
			this.field( "offsetX", () => this.offsetX, ( v ) => this.offsetX = v );

			this.field( "sashimiType", () => this.sashimiTypeValue, ( v ) => {

				this.sashimiTypeValue = v;
				this.sushiSaraComponent.sashimiType = v;

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

	}

	protected updateImpl( _event: MXP.ComponentUpdateEvent ): void {

		// 横に流れる動き（ループ）
		const time = globalUniforms.time.uTimeE.value;
		const t = ( time * this.speed + this.offsetX ) % ( this.rangeX * 2 );
		const x = t < this.rangeX ? t - this.rangeX / 2 : this.rangeX * 1.5 - t;

		this.sushiSaraEntity.position.x = x;

	}

	protected disposeImpl(): void {

		this.entity.remove( this.sushiSaraEntity );
		this.sushiSaraEntity.dispose();

	}

}
