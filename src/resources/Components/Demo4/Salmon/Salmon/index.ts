import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import salmonFrag from './shaders/salmon.fs';

import { globalUniforms } from '~/globals';
import { bindBlidgeUniform } from '~/shortcuts';


export class Salmon extends MXP.Component {

	// サーモンブロックのタイプ（kirimiまたはsaku）
	private blockType: 'kirimi' | 'saku' = 'saku';

	constructor( param: MXP.ComponentParams ) {

		super( param );

		// エディタフィールドの定義
		if ( import.meta.env.DEV ) {

			this.field( "blockType", () => this.blockType, ( v ) => {

				this.blockType = v;
				this.updateMaterialDefines();

			}, {
				format: {
					type: "select",
					list: [
						{ label: "Kirimi", value: "kirimi" },
						{ label: "Saku", value: "saku" }
					]
				}
			} );

		}

		// geometry

		const geo = new MXP.CubeGeometry( {
			width: 1.5,
			height: 0.8,
			depth: 1
		} );

		// material

		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'salmonFrag', salmonFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time, globalUniforms.tex ),
			defines: this.getDefines()
		} );


		const mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: geo, material: mat
		} );

		bindBlidgeUniform( mesh.material.uniforms, mesh.entity );

		// マテリアルの参照を保持
		this.material = mat;

		// HMR

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/salmon.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'salmonFrag', module.default );

					mat.requestUpdate();

				}

			} );

		}

	}

	// マテリアルの参照
	private material: MXP.Material;

	// blockTypeに応じたdefinesを取得
	private getDefines(): { [ key: string ]: string } {

		const defines: { [ key: string ]: string } = {};

		if ( this.blockType === 'kirimi' ) {

			defines.BLOCK_KIRIMI = '';

		} else if ( this.blockType === 'saku' ) {

			defines.BLOCK_SAKU = '';

		}

		return defines;

	}

	protected updateImpl( _event: MXP.ComponentUpdateEvent ): void {

	}

	// マテリアルのdefinesを更新
	private updateMaterialDefines(): void {

		if ( this.material ) {

			this.material.defines = this.getDefines();
			this.material.requestUpdate();

		}

	}

}
