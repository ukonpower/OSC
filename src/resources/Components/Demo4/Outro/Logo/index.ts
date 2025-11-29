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

// state2用のパラメータ
const pathParam2: {[key: string]: {l: number, i: string}} = {
	_sub_path: { l: 400, i: "x" },
	_sub_circle1: { l: 0, i: "y" },
	_sub_circle2: { l: 0, i: "y" },
	_sub_circle3: { l: 0, i: "y" },
	_sub_circle4: { l: 0, i: "y" }
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
<svg width="100%" viewBox="0 0 345 154" fill="none">
<g>
<path id="ic_body" d="M85.3 30.7C117.2 30.7 143.1 56.8 143.1 89S117.2 147.3 85.3 147.3 27.5 121.2 27.5 89 53.4 30.7 85.3 30.7Z" stroke="#fff" stroke-width="12"/>
<path id="ic_yoji" d="M153.5 6L99.5 88.8" stroke="#fff" stroke-width="12" stroke-linecap="round"/>
<path id="ic_mayo" d="M4.5 94.7C10.4 85 25.1 62.2 39.4 62.2 57.4 62.2 42.4 98 54.9 98S73.5 67.2 92.9 65.5" stroke="#fff" stroke-width="9" stroke-linecap="round"/>
<g id="ic_eye">
<circle cx="68.3" cy="50.2" fill="#fff" r="4"/>
<circle cx="81.7" cy="50.2" fill="#fff" r="4"/>
</g>
</g>
<g id="sub">
<g id="sub_path">
<path d="M339.5 127.5C333.7 139.6 321.2 148 306.8 148 286.8 148 270.5 131.9 270.5 112S286.8 76 306.8 76C321.2 76 333.7 84.4 339.5 96.5" stroke="#fff" stroke-width="11" stroke-linecap="round"/>
<path d="M239.5 127C233.7 139.4 221.3 148 207 148S180.3 139.4 174.5 127" stroke="#fff" stroke-width="11" stroke-linecap="round"/>
<path d="M174.5 96L239.5 127" stroke="#fff" stroke-width="11" stroke-linecap="round"/>
<path d="M239.5 96C233.7 84.2 221.3 76 207 76S180.3 84.2 174.5 96" stroke="#fff" stroke-width="11" stroke-linecap="round"/>
</g>
<circle id="sub_circle1" cx="211.5" cy="98" fill="#fff" r="4"/>
<circle id="sub_circle2" cx="223.9" cy="98" fill="#fff" r="4"/>
<circle id="sub_circle3" cx="298.5" cy="103" fill="#fff" r="4"/>
<circle id="sub_circle4" cx="286.5" cy="103" fill="#fff" r="4"/>
<g>
</svg>
`;

		// スタイル設定
		this.svgWrap.style.position = "absolute";
		this.svgWrap.style.width = "20%";
		this.svgWrap.style.top = "50%";
		this.svgWrap.style.left = "50%";
		this.svgWrap.style.transform = "translate(-57%,-50%)";
		// this.svgWrap.style.pointerEvents = "none";
		this.svgWrap.style.strokeDasharray = length + "";

		// 各SVG要素をMapに登録
		this.elms = new Map();

		const elmsId = [ "ic_body", "ic_yoji", "ic_mayo", "ic_eye", "sub_path", "sub_circle1", "sub_circle2", "sub_circle3", "sub_circle4" ];

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

	protected updateImpl(): void {

		if ( ! this.blidger ) return;

		const hide = this.blidger.animations.get( "hide" );

		if ( hide ) {

			this.svgWrap.style.display = hide.value.x > 0.5 ? "none" : "block";

		}

		// アニメーション適用の共通処理
		const applyAnim = ( anim: GLP.FCurveGroup, params: {[key: string]: {l: number, i: string}} ) => {

			this.elms.forEach( ( elm, id ) => {

				const param = params[ "_" + id ];

				if ( ! param ) return;

				const v = ( anim.value as any )[ param.i ];

				elm.style.opacity = ( GLP.MathUtils.smoothstep( 0.0, 0.05, v ) * 100 ) + "%";

				if ( param.l ) {

					elm.style.strokeDasharray = param.l + "";
					elm.style.strokeDashoffset = ( 1.0 - v ) * param.l + "";

				}

			} );

		};

		const state = this.blidger.animations.get( "state" );
		const state2 = this.blidger.animations.get( "state2" );

		if ( state ) applyAnim( state, pathParam );
		if ( state2 ) applyAnim( state2, pathParam2 );

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
