import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import maguroBlockFrag from './shaders/maguroBlock.fs';

import { globalUniforms } from '~/globals';

/**
 * MaguroBlock - ブロック状のマグロコンポーネント
 */
export class MaguroBlock extends MXP.Component {

	private material: MXP.Material;

	// ブロックのサイズ
	private blockWidth: number;
	private blockHeight: number;
	private blockDepth: number;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// デフォルトのブロックサイズ
		this.blockWidth = 1.0;
		this.blockHeight = 1.0;
		this.blockDepth = 1.0;

		// エディタフィールドの定義（開発環境のみ）
		if ( import.meta.env.DEV ) {

			const folder = this.fieldDir( "Block Size" );
			folder.field( "width", () => this.blockWidth, ( v ) => this.updateGeometry( v, this.blockHeight, this.blockDepth ) );
			folder.field( "height", () => this.blockHeight, ( v ) => this.updateGeometry( this.blockWidth, v, this.blockDepth ) );
			folder.field( "depth", () => this.blockDepth, ( v ) => this.updateGeometry( this.blockWidth, this.blockHeight, v ) );

		}

		// ジオメトリを作成
		const geo = new MXP.CubeGeometry( {
			width: this.blockWidth,
			height: this.blockHeight,
			depth: this.blockDepth
		} );

		// マテリアルを作成
		this.material = new MXP.Material( {
			phase: [ "deferred", "shadowMap" ], // deferred + shadowMapで描画
			frag: MXP.hotGet( 'maguroBlockFrag', maguroBlockFrag ),
			uniforms: MXP.UniformsUtils.merge(
				globalUniforms.resolution,
				globalUniforms.time,
				globalUniforms.tex
			)
		} );

		// Meshコンポーネントを追加
		const mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: geo,
			material: this.material
		} );

		// ホットリロード対応（開発時のみ）
		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/maguroBlock.fs', ( module ) => {

				if ( module ) {

					this.material.frag = MXP.hotUpdate( 'maguroBlockFrag', module.default );
					this.material.requestUpdate();

				}

			} );

		}

	}

	// ジオメトリを更新する（サイズ変更時）
	private updateGeometry( width: number, height: number, depth: number ): void {

		this.blockWidth = width;
		this.blockHeight = height;
		this.blockDepth = depth;

		// 新しいジオメトリを作成
		const newGeo = new MXP.CubeGeometry( {
			width: this.blockWidth,
			height: this.blockHeight,
			depth: this.blockDepth
		} );

		// Meshコンポーネントのジオメトリを更新
		const mesh = this.entity.getComponent( MXP.Mesh );

		if ( mesh ) {

			// 古いジオメトリを破棄
			if ( mesh.geometry ) {

				mesh.geometry.dispose();

			}

			mesh.geometry = newGeo;

		}

	}

}
