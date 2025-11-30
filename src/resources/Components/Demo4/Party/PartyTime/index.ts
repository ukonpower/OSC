import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class PartyTime extends MXP.Component {

	// 初期位置を保持
	private basePosition: GLP.Vector;

	// アニメーションパラメータ
	private isJumping: boolean;
	private speed: number;
	private height: number;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// アタッチ時のEntityの位置を保持
		this.basePosition = this.entity.position.clone();

		// デフォルト値
		this.isJumping = true;
		this.speed = 9.0;
		this.height = 3;

		// Meshコンポーネントを取得してuniformを追加
		const mesh = this.entity.getComponent( MXP.Mesh );

		if ( mesh && mesh.material && mesh.material.uniforms ) {

			mesh.material.uniforms.uParty = { value: 1.0, type: "1f" };

		}

		this.field( "isJumping", () => this.isJumping, ( v ) => this.isJumping = v );

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		// isJumpingがfalseの場合は跳ねない（ベース位置に固定）
		if ( ! this.isJumping ) {

			this.entity.position.y = this.basePosition.y;
			return;

		}

		// 跳ねるアニメーション（abs(sin)で常に上向きにバウンド）
		const bounce = Math.abs( Math.sin( event.timeElapsed * this.speed ) );

		// ベース位置からY方向にオフセット
		this.entity.position.y = this.basePosition.y + bounce * this.height;

	}

}
