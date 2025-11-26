import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { gl } from '~/globals';

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
<svg width="503" height="154" viewBox="0 0 503 154" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M497.5 148C497.5 146.096 497.5 144.709 497.5 143" stroke="white" stroke-width="10" stroke-linecap="round"/>
<circle cx="497.5" cy="129" r="5" fill="white"/>
<path d="M339.5 131C340.762 132.856 341.5 135.099 341.5 137.514C341.5 143.894 336.345 149.078 330 149.078C323.655 149.078 318.5 143.894 318.5 137.514C318.5 135.099 319.238 132.856 320.5 131" stroke="white" stroke-width="8" stroke-linecap="round"/>
<path d="M478.838 114C469.49 133.508 449.552 147 426.5 147C394.5 147 368.5 121 368.5 89C368.5 57 394.5 31 426.5 31C449.552 31 469.49 44.4921 478.838 64" stroke="white" stroke-width="12" stroke-linecap="round"/>
<path d="M304.176 64C294.828 44.4921 274.89 31 251.838 31C228.786 31 208.848 44.4921 199.5 64C168.501 138.5 334.501 42.5 304.176 114C294.828 133.508 274.89 147 251.838 147C228.786 147 208.848 133.508 199.5 114" stroke="white" stroke-width="12" stroke-linecap="round"/>
<path d="M85.2686 30.7422C117.158 30.7422 143.08 56.7857 143.08 89C143.08 121.214 117.158 147.258 85.2686 147.258C53.3796 147.258 27.4571 121.214 27.457 89C27.457 56.7857 53.3795 30.7422 85.2686 30.7422Z" stroke="white" stroke-width="12"/>
<path d="M153.5 6L99.4767 88.7777" stroke="white" stroke-width="12" stroke-linecap="round"/>
<path d="M4.5 94.6995C10.3715 84.9472 25.058 62.2266 39.4432 62.2266C57.4247 62.2266 42.3789 97.9253 54.8559 97.9253C67.3329 97.9253 73.486 67.1728 92.8543 65.4523" stroke="white" stroke-width="9" stroke-linecap="round"/>
<circle cx="68.311" cy="50.1802" r="4.01611" fill="white"/>
<circle cx="81.6997" cy="50.1802" r="4.01611" fill="white"/>
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

		// BLidgerコンポーネントを取得
		this.blidger = this.entity && this.entity.getComponent( MXP.BLidger ) || null;

		// SVG要素をcanvasの親要素に追加
		if ( gl.canvas instanceof HTMLCanvasElement ) {

			const canvasParent = gl.canvas.parentElement;

			if ( canvasParent ) {

				canvasParent.appendChild( this.svgWrap );

			}

		}

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		if ( ! this.blidger ) return;

		// アニメーション "_logoState" を取得
		const anim = this.blidger.animations.get( "state" );
		const hide = this.blidger.animations.get( "hide" );

		if ( hide ) {

			this.svgWrap.style.display = hide.value.x > 0.5 ? "none" : "block";

		}

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

	}

	public dispose() {

		super.dispose();

		// SVG要素をDOMから削除
		if ( this.svgWrap && this.svgWrap.parentElement ) {

			this.svgWrap.parentElement.removeChild( this.svgWrap );

		}

		this.blidger = null;

	}

}
