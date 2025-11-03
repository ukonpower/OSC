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

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// 子エンティティを作成して3つのコンポーネントを追加

		// 1. シャリ（底部のご飯）
		const shariEntity = new MXP.Entity();
		shariEntity.addComponent( GunkanShari );
		this._entity.add( shariEntity );

		// 2. 海苔（外側のシェル）
		const noriEntity = new MXP.Entity();
		noriEntity.addComponent( Nori );
		this._entity.add( noriEntity );

		// 3. イクラ（上部の粒）
		const ikuraEntity = new MXP.Entity();
		ikuraEntity.addComponent( Ikura );
		this._entity.add( ikuraEntity );

	}

}
