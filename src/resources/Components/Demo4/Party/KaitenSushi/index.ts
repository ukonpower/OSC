import * as MXP from 'maxpower';

import { SushiSara } from '../SushiSara';

import { globalUniforms } from '~/globals';

/**
 * KaitenSushi - SushiSaraを横に流すコンポーネント
 * 右から左へ一方向に流れ、端まで行ったら右に戻る
 */
export class KaitenSushi extends MXP.Component {

	private sushiEntities: MXP.Entity[] = [];
	private sushiComponents: SushiSara[] = [];

	// 移動パラメータ
	private speed: number = 0.1;
	private rangeX: number = 40.0;
	private sushiCount: number = 9;

	private sashimiTypes: ( 'maguro' | 'salmon' | 'tako' )[] = [ 'maguro', 'salmon', 'tako' ];

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// 初期寿司を生成
		this.createSushi();

		// field設定
		if ( import.meta.env.DEV ) {

			// this.field( "speed", () => this.speed, ( v ) => this.speed = v );
			// this.field( "rangeX", () => this.rangeX, ( v ) => this.rangeX = v );
			// this.field( "sushiCount", () => this.sushiCount, ( v ) => {

			// 	this.sushiCount = Math.max( 1, Math.floor( v ) );
			// 	this.createSushi();

			// } );

		}

	}

	private createSushi(): void {

		// 既存の寿司を削除
		for ( let i = 0; i < this.sushiEntities.length; i ++ ) {

			this.entity.remove( this.sushiEntities[ i ] );
			this.sushiEntities[ i ].dispose();

		}

		this.sushiEntities = [];
		this.sushiComponents = [];

		// 新しい寿司を生成
		for ( let i = 0; i < this.sushiCount; i ++ ) {

			const sushiEntity = new MXP.Entity();
			sushiEntity.name = "SushiSara_" + i;
			this.entity.add( sushiEntity );

			const sushiComponent = sushiEntity.addComponent( SushiSara );
			// 寿司の種類をサイクル
			sushiComponent.sashimiType = this.sashimiTypes[ i % this.sashimiTypes.length ];

			this.sushiEntities.push( sushiEntity );
			this.sushiComponents.push( sushiComponent );

		}

	}

	protected updateImpl( _event: MXP.ComponentUpdateEvent ): void {

		const time = globalUniforms.time.uTimeE.value;

		for ( let i = 0; i < this.sushiEntities.length; i ++ ) {

			// 各寿司のオフセット（均等配置）
			const offset = i / this.sushiCount;
			// 右から左への一方向移動（0→1を右端→左端にマッピング）
			const t = ( time * this.speed + offset ) % 1;
			// rangeX/2 から -rangeX/2 へ（右から左）
			const x = this.rangeX / 2 - t * this.rangeX;
			const z = - Math.pow( x, 2.0 ) * 0.003;

			this.sushiEntities[ i ].position.x = x;
			this.sushiEntities[ i ].position.z = z;

		}

	}

	protected disposeImpl(): void {

		for ( let i = 0; i < this.sushiEntities.length; i ++ ) {

			this.entity.remove( this.sushiEntities[ i ] );
			this.sushiEntities[ i ].dispose();

		}

		this.sushiEntities = [];
		this.sushiComponents = [];

	}

}
