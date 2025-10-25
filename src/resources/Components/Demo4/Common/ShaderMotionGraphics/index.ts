import * as MXP from 'maxpower';

import basicVert from './shaders/basic.vs';
import maguroBGScreenFrag from './shaders/maguroBGScreen.fs';
import shader0Frag from './shaders/shader0.fs';
import shader1Frag from './shaders/shader1.fs';
import shader2Frag from './shaders/shader2.fs';

import { globalUniforms } from '~/globals';

/**
 * ShaderMotionGraphics - 複数のシェーダーを切り替えて描画できるPlaneメッシュコンポーネント
 * フィールドでシェーダー名を選択可能
 */
export class ShaderMotionGraphics extends MXP.Component {

	private mesh: MXP.Mesh;
	private shaderName: string;
	private shaders: Map<string, { vert: string; frag: string }>;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// シェーダーリストを定義（名前をキーにしたMap）
		this.shaders = new Map( [
			[ "gradient", { vert: basicVert, frag: shader0Frag } ],
			[ "pulse", { vert: basicVert, frag: shader1Frag } ],
			[ "checker", { vert: basicVert, frag: shader2Frag } ],
			[ "maguroBGScreen", { vert: basicVert, frag: maguroBGScreenFrag } ],
		] );

		this.shaderName = "gradient";

		// Meshコンポーネントを追加
		this.mesh = this._entity.addComponent( MXP.Mesh );

		// PlaneGeometryを作成
		this.mesh.geometry = new MXP.PlaneGeometry( { width: 1.0, height: 1.0 } );

		// 初期マテリアルを作成
		this.updateMaterial();

		// エディタフィールド定義
		this.field( "shaderName", () => this.shaderName, ( v ) => {

			this.shaderName = v;
			this.updateMaterial();

		}, {
			format: {
				type: "select",
				list: [
					{ label: "Gradient", value: "gradient" },
					{ label: "Pulse", value: "pulse" },
					{ label: "Checker", value: "checker" },
					{ label: "Maguro BG Screen", value: "maguroBGScreen" },
				]
			}
		} );

		// ホットリロード対応（開発時のみ）
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/shader0.fs', ( module ) => {

				if ( module ) {

					const shader = this.shaders.get( "gradient" );
					if ( shader ) {

						shader.frag = MXP.hotUpdate( 'shader0Frag', module.default );
						if ( this.shaderName === "gradient" ) this.updateMaterial();

					}

				}

			} );

			import.meta.hot.accept( './shaders/shader1.fs', ( module ) => {

				if ( module ) {

					const shader = this.shaders.get( "pulse" );
					if ( shader ) {

						shader.frag = MXP.hotUpdate( 'shader1Frag', module.default );
						if ( this.shaderName === "pulse" ) this.updateMaterial();

					}

				}

			} );

			import.meta.hot.accept( './shaders/shader2.fs', ( module ) => {

				if ( module ) {

					const shader = this.shaders.get( "checker" );
					if ( shader ) {

						shader.frag = MXP.hotUpdate( 'shader2Frag', module.default );
						if ( this.shaderName === "checker" ) this.updateMaterial();

					}

				}

			} );

			import.meta.hot.accept( './shaders/maguroBGScreen.fs', ( module ) => {

				if ( module ) {

					const shader = this.shaders.get( "maguroBGScreen" );
					if ( shader ) {

						shader.frag = MXP.hotUpdate( 'maguroBGScreenFrag', module.default );
						if ( this.shaderName === "maguroBGScreen" ) this.updateMaterial();

					}

				}

			} );

		}

	}

	/**
	 * 選択されたシェーダーでマテリアルを更新
	 */
	private updateMaterial() {

		const shader = this.shaders.get( this.shaderName );
		if ( ! shader ) return;

		this.mesh.material = new MXP.Material( {
			phase: [ "forward" ],
			vert: MXP.hotGet( 'basicVert', shader.vert ),
			frag: MXP.hotGet( `${this.shaderName}Frag`, shader.frag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution )
		} );

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		// カスタムユニフォームの更新などをここに記述可能

	}

}
