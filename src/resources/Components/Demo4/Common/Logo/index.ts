import * as GLP from 'glpower';
import * as MXP from 'maxpower';

const length = 1000;
const pathParam: {[key: string]: {l: number, i: string}} = {
	_ic_body: { l: 137 * Math.PI * 2, i: "x" },
	_ic_yoji: { l: 226, i: "z" },
	_ic_mayo: { l: 340, i: "y" },
	_ic_eye: { l: 0, i: "w" }
};

export class Logo extends MXP.Component {

	private svgWrap: HTMLDivElement;
	private elms: Map<string, SVGElement>;
	private blidger: MXP.BLidger | null;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.blidger = null;

		// SVG要素の作成
		this.svgWrap = document.createElement( "div" );
		this.svgWrap.innerHTML = `
<svg width="100%" viewBox="0 0 512 512" fill="none" stroke="white" stroke-linecap="round">
	<circle id="ic_body" cx="256" cy="234" r="137" stroke="white" stroke-width="20"/>
	<path id="ic_yoji" stroke-width="18" d="M413 43L289 233" />
	<path id="ic_mayo" stroke-width="18" d="M71 246.5C84.4902 223.826 118.233 171 151.284 171C192.598 171 158.029 254 186.696 254C215.363 254 229.5 182.5 274 178.5"/>
		<g id="ic_eye" fill="white">
			<circle cx="216.5" cy="144" r="9"/>
			<circle cx="249.5" cy="144" r="9"/>
		</g>
</svg>
`;

		// スタイル設定
		this.svgWrap.style.position = "absolute";
		this.svgWrap.style.width = "20%";
		this.svgWrap.style.top = "50%";
		this.svgWrap.style.left = "50%";
		this.svgWrap.style.transform = "translate(-50%,-50%)";
		this.svgWrap.style.pointerEvents = "none";
		this.svgWrap.style.strokeDasharray = length + "";

		// 各SVG要素をMapに登録
		this.elms = new Map();

		const elmsId = [ "ic_body", "ic_yoji", "ic_mayo", "ic_eye", "ic_name" ];

		elmsId.forEach( ( id ) => {

			const elm = this.svgWrap.querySelector( "#" + id ) as SVGElement;

			if ( elm ) {

				this.elms.set( id, elm );

			}

		} );

	}

	protected setEntityImpl( entity: MXP.Entity ): void {

		// BLidgerコンポーネントを取得
		this.blidger = entity.getComponent( MXP.BLidger ) || null;

		// SVG要素をDOMに追加
		document.body.appendChild( this.svgWrap );

	}

	protected unsetEntityImpl( prevEntity: MXP.Entity ): void {

		// SVG要素をDOMから削除
		if ( this.svgWrap && this.svgWrap.parentElement ) {

			this.svgWrap.parentElement.removeChild( this.svgWrap );

		}

		this.blidger = null;

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		if ( ! this.blidger ) return;

		// アニメーション "_logoState" を取得
		const anim = this.blidger.animations.get( "_logoState" );

		if ( anim ) {

			this.elms.forEach( ( elm, id ) => {

				const param = pathParam[ "_" + id ];

				if ( ! param ) return;

				const len = param.l;
				const v = ( anim.value as any )[ param.i ];

				// 透明度をアニメーション値に応じて設定
				elm.style.opacity = ( GLP.MathUtils.smoothstep( 0.0, 0.05, v ) * 100 ) + "%";

				// パスの描画進度を設定
				if ( len ) {

					elm.style.strokeDasharray = len + "";
					elm.style.strokeDashoffset = ( 1.0 - v ) * len + "";

				}

			} );

		}

		// アニメーション "_logoState2" を取得（名前の透明度）
		const anim2 = this.blidger.animations.get( "_logoState2" );

		if ( anim2 ) {

			const name = this.elms.get( "ic_name" );

			if ( name ) {

				name.style.opacity = anim2.value.x + "";

			}

		}

	}

}
