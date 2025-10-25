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
 * レイヤー数を指定すると、z方向に複数のメッシュを重ねて描画
 */
export class ShaderMotionGraphics extends MXP.Component {

	private mesh: MXP.Mesh;
	private shaderName: string;
	private layers: number; // レイヤー数（1以上、1の場合は通常のメッシュ）
	private layerSpacing: number; // 各レイヤー間のz方向の間隔
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
		this.layers = 1; // デフォルトは1レイヤー
		this.layerSpacing = 0.01; // デフォルトの間隔

		// Meshコンポーネントを追加
		this.mesh = this._entity.addComponent( MXP.Mesh );

		// ジオメトリを作成
		this.updateGeometry();

		// 初期マテリアルを作成
		this.updateMaterial();

		// エディタフィールド定義 - シェーダー名
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

		// エディタフィールド定義 - レイヤー数
		this.field( "layers", () => this.layers, ( v ) => {

			this.layers = Math.max( 1, Math.floor( v ) ); // 1以上の整数に制限
			this.updateGeometry();
			this.updateMaterial();

		} );

		// エディタフィールド定義 - レイヤー間隔
		this.field( "layerSpacing", () => this.layerSpacing, ( v ) => {

			this.layerSpacing = v;
			this.updateMaterial(); // ユニフォームを更新

		} );

		// ホットリロード対応（開発時のみ）
		if ( import.meta.hot ) {

			// シェーダーホットリロードハンドラーを生成する関数
			const createHotReloadHandler = ( shaderName: string, hotKey: string ) => ( module: any ) => {

				if ( module ) {

					const shader = this.shaders.get( shaderName );
					if ( shader ) {

						shader.frag = MXP.hotUpdate( hotKey, module.default );
						if ( this.shaderName === shaderName ) this.updateMaterial();

					}

				}

			};

			// 各シェーダーファイルのホットリロードを登録
			import.meta.hot.accept( './shaders/shader0.fs', createHotReloadHandler( 'gradient', 'shader0Frag' ) );
			import.meta.hot.accept( './shaders/shader1.fs', createHotReloadHandler( 'pulse', 'shader1Frag' ) );
			import.meta.hot.accept( './shaders/shader2.fs', createHotReloadHandler( 'checker', 'shader2Frag' ) );
			import.meta.hot.accept( './shaders/maguroBGScreen.fs', createHotReloadHandler( 'maguroBGScreen', 'maguroBGScreenFrag' ) );

		}

	}

	/**
	 * レイヤー数に応じてジオメトリを更新
	 */
	private updateGeometry() {

		// PlaneGeometryを作成
		const geo = new MXP.PlaneGeometry( { width: 1.0, height: 1.0 } );

		// レイヤー数が1より大きい場合、インスタンス属性を追加
		if ( this.layers > 1 ) {

			const layerIndexArray = [];

			for ( let i = 0; i < this.layers; i ++ ) {

				// レイヤーインデックス（0.0〜1.0の正規化された値）
				layerIndexArray.push( i / ( this.layers - 1 ) );

			}

			// instanceDivisor: 1 でインスタンスごとに異なる値を設定
			geo.setAttribute( 'layerIndex', new Float32Array( layerIndexArray ), 1, { instanceDivisor: 1 } );

		}

		this.mesh.geometry = geo;

	}

	/**
	 * 選択されたシェーダーでマテリアルを更新
	 */
	private updateMaterial() {

		const shader = this.shaders.get( this.shaderName );
		if ( ! shader ) return;

		this.mesh.material = new MXP.Material( {
			phase: [ "deferred" ],
			vert: MXP.hotGet( 'basicVert', shader.vert ),
			frag: MXP.hotGet( `${this.shaderName}Frag`, shader.frag ),
			uniforms: MXP.UniformsUtils.merge(
				globalUniforms.time,
				globalUniforms.resolution,
				{
					uLayers: { value: this.layers, type: '1i' },
					uLayerSpacing: { value: this.layerSpacing, type: '1f' }
				}
			)
		} );

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		// カスタムユニフォームの更新などをここに記述可能

	}

}
