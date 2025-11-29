import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Onigiri } from '../../Salmon/Onigiri';

/**
 * BreakDanceOnigiri - ブレイクダンスするおにぎりコンポーネント
 * 既存のOnigiriコンポーネントを使用し、回転・跳ねる・スピンなどのアニメーションを組み合わせてダンス
 */
export class BreakDanceOnigiri extends MXP.Component {

	private onigiri: Onigiri;
	private basePosition: GLP.Vector;
	private baseRotation: GLP.Vector;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// 初期位置・回転を保持
		this.basePosition = this.entity.position.clone();
		this.baseRotation = this.entity.euler.clone();

		// Onigiriコンポーネントを追加
		this.onigiri = this.entity.addComponent( Onigiri );

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		const t = event.timeCode;

		// ヘッドスピン風の回転（Y軸）
		this.entity.euler.y = this.baseRotation.y + Math.sin( t * 1.0 ) * 50.0;

		// ウィンドミル風の傾き（X軸とZ軸を組み合わせ）
		this.entity.euler.x = this.baseRotation.x + Math.sin( t * 5.0 ) * 1;
		this.entity.euler.z = this.baseRotation.z + Math.cos( t * 6.5 ) * 1;

		// 跳ねるモーション
		this.entity.position.y = this.basePosition.y + Math.abs( Math.sin( t * 1.0 ) ) * 0.1;

		// 円軌道で移動（床を這うように）
		this.entity.position.x = this.basePosition.x + Math.cos( t * 1.0 );
		this.entity.position.z = this.basePosition.z + Math.sin( t * 0.5 );

	}

	protected disposeImpl(): void {

		// Onigiriコンポーネントを削除
		this._entity.removeComponent( Onigiri );

	}

}
