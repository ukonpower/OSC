import * as MXP from 'maxpower';

import { GunkanShari } from './GunkanShari';
import { Ikura } from './Ikura';

/**
 * IkuraGunKan - イクラ軍艦巻き
 * 2つのサブコンポーネントで構成される:
 * - GunkanShari: シャリと海苔を統合（シンプルなMesh）
 * - Ikura: 上部のイクラの粒（InstancedMesh）
 */
export class IkuraGunKan extends MXP.Component {

	private shariEntity: MXP.Entity;
	private ikuraEntity: MXP.Entity;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// 1. シャリと海苔
		this.shariEntity = new MXP.Entity();
		this.shariEntity.addComponent( GunkanShari );
		this._entity.add( this.shariEntity );

		// 2. イクラ
		this.ikuraEntity = new MXP.Entity();
		this.ikuraEntity.addComponent( Ikura );
		this._entity.add( this.ikuraEntity );

	}

	dispose(): void {

		this.shariEntity.dispose();
		this.ikuraEntity.dispose();

		super.dispose();

	}

}
