import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import greetingFrag from './shaders/greeting.fs';
import greetingVert from './shaders/greeting.vs';

import { gl, globalUniforms } from '~/globals';

/**
 * GreetingCard - Canvas2Dでテキストを描画してテクスチャとして表示するコンポーネント
 */
export class GreetingCard extends MXP.Component {

	private texture: GLP.GLPowerTexture | null = null;
	private material: MXP.Material | null = null;
	private nameValue: string = '';

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// Geometry作成（縦書き用に縦長）
		const width = 0.3;
		const height = 0.9;
		const geometry = new MXP.PlaneGeometry( { width, height } );

		// Material作成
		this.material = new MXP.Material( {
			vert: MXP.hotGet( 'greetingVert', greetingVert ),
			frag: MXP.hotGet( 'greetingFrag', greetingFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.time, {
				uTex: {
					value: null,
					type: '1i'
				}
			} )
		} );

		// Mesh作成
		this.entity.addComponent( MXP.Mesh, { geometry, material: this.material } );

		// HMR
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/greeting.vs', ( module ) => {

				if ( module && this.material ) {

					this.material.vert = MXP.hotUpdate( 'greetingVert', module.default );
					this.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/greeting.fs', ( module ) => {

				if ( module && this.material ) {

					this.material.frag = MXP.hotUpdate( 'greetingFrag', module.default );
					this.material.requestUpdate();

				}

			} );

		}

	}

	public set name( value: string ) {

		if ( this.nameValue === value ) return;

		this.nameValue = value;

		// 既存のテクスチャを破棄
		if ( this.texture ) {

			this.texture.dispose();
			this.texture = null;

		}

		if ( value ) {

			// Canvas作成（縦書き用に縦長）
			const canvas = document.createElement( 'canvas' );
			canvas.width = 128;
			canvas.height = 384;

			const ctx = canvas.getContext( '2d' );
			if ( ! ctx ) return;

			// 背景（白）
			ctx.fillStyle = '#FFF';
			ctx.fillRect( 0, 0, canvas.width, canvas.height );

			// 縦書きテキスト描画
			ctx.fillStyle = '#000';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';

			// 文字列を1文字ずつ縦に描画
			const text = value.toUpperCase();

			// 利用可能な縦幅（上下余白考慮）
			const availableHeight = canvas.height - 40; // 上下余白考慮

			// 基本設定
			let fontSize = 42;
			let charHeight = 44;

			// 必要な高さを計算
			const requiredHeight = text.length * charHeight;

			// 入りきらない場合は縦に詰める
			if ( requiredHeight > availableHeight ) {

				charHeight = availableHeight / text.length;
				fontSize = Math.min( 42, charHeight - 2 );

			}

			ctx.font = `bold ${fontSize}px Noto Sans JP`;

			const startY = ( canvas.height - ( text.length - 1 ) * charHeight ) / 2;

			for ( let i = 0; i < text.length; i ++ ) {

				const char = text[ i ];
				const y = startY + i * charHeight;
				ctx.fillText( char, canvas.width / 2, y );

			}

			// テクスチャ作成
			this.texture = new GLP.GLPowerTexture( gl ).attach( canvas );

			// マテリアルのユニフォームを更新
			if ( this.material ) {

				this.material.uniforms.uTex.value = this.texture;

			}

		}

	}

	protected disposeImpl(): void {

		if ( this.texture ) {

			this.texture.dispose();
			this.texture = null;

		}

	}

}
