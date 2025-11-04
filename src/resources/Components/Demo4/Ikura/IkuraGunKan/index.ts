import * as MXP from 'maxpower';

import { GunkanShari } from './GunkanShari';
import { Ikura } from './Ikura';
import { Nori } from './Nori';

/**
 * IkuraGunKan - イクラ軍艦巻き
 * 3つのサブコンポーネントで構成される:
 * - GunkanShari: 底部の白いご飯（RaymarchInstanced）
 * - Nori: 外側の海苔のシェル（RaymarchCube）
 * - Ikura: 上部のイクラの粒（InstancedMesh）
 */
export class IkuraGunKan extends MXP.Component {

	private shariEntity: MXP.Entity;
	private noriEntity: MXP.Entity;
	private ikuraEntity: MXP.Entity;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// 子エンティティを作成して3つのコンポーネントを追加

		// 1. シャリ（底部のご飯）
		this.shariEntity = new MXP.Entity();
		this.shariEntity.addComponent( GunkanShari );
		this._entity.add( this.shariEntity );

		// 2. 海苔（外側のシェル）
		this.noriEntity = new MXP.Entity();
		this.noriEntity.addComponent( Nori );
		this._entity.add( this.noriEntity );

		// 3. イクラ（上部の粒）
		this.ikuraEntity = new MXP.Entity();
		this.ikuraEntity.addComponent( Ikura );
		this._entity.add( this.ikuraEntity );

	}

	dispose(): void {

		// 作成した子エンティティを破棄
		this.shariEntity.dispose();
		this.noriEntity.dispose();
		this.ikuraEntity.dispose();

		super.dispose();

	}

}
