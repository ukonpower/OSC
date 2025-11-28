import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { ShaderMotionGraphics } from '../ShaderMotionGraphics';

/**
 * ShaderMotionGraphicsをランダムに配置するコンポーネント
 * マグロやサーモンのシーンの賑やかし用
 */
export class RandomSMG extends MXP.Component {

	// 配置パラメータ
	private count: number;
	private rangeX: number;
	private rangeY: number;
	private rangeZ: number;
	private randomSeed: number;
	private shaderType: string;

	// 生成したエンティティの配列
	private shapeEntities: MXP.Entity[];

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// デフォルト値の設定
		this.count = 10;
		this.rangeX = 10;
		this.rangeY = 5;
		this.rangeZ = 10;
		this.randomSeed = 0;
		this.shaderType = "random";

		this.shapeEntities = [];

		// エディタフィールド定義
		this.field( "count", () => this.count, ( v ) => {

			this.count = Math.max( 1, Math.floor( v ) );
			this.regenerateShapes();

		} );

		const rangeFolder = this.fieldDir( "Position Range" );

		rangeFolder.field( "rangeX", () => this.rangeX, ( v ) => {

			this.rangeX = v;
			this.regenerateShapes();

		} );

		rangeFolder.field( "rangeY", () => this.rangeY, ( v ) => {

			this.rangeY = v;
			this.regenerateShapes();

		} );

		rangeFolder.field( "rangeZ", () => this.rangeZ, ( v ) => {

			this.rangeZ = v;
			this.regenerateShapes();

		} );

		this.field( "randomSeed", () => this.randomSeed, ( v ) => {

			this.randomSeed = v;
			this.regenerateShapes();

		} );

		this.field( "shaderType", () => this.shaderType, ( v ) => {

			this.shaderType = v;
			this.regenerateShapes();

		}, import.meta.env.DEV ? {
			format: {
				type: "select",
				list: [
					{ label: "Random", value: "random" },
					{ label: "Circle", value: "circle" },
					{ label: "Cross", value: "cross" },
					{ label: "Border", value: "border" },
					{ label: "Dot Grid", value: "dotGrid" },
				]
			}
		} : undefined );

		// 初期生成
		this.regenerateShapes();

	}

	/**
	 * シェーダータイプをランダムに選択
	 */
	private getRandomShaderType( random: () => number ): string {

		const types = [ "circle", "cross", "border", "dotGrid" ];
		const index = Math.floor( random() * types.length );

		return types[ index ];

	}

	/**
	 * 全てのシェイプを削除して再生成
	 */
	private regenerateShapes() {

		// 既存のエンティティを削除
		for ( let i = 0; i < this.shapeEntities.length; i ++ ) {

			this.entity.remove( this.shapeEntities[ i ] );
			this.shapeEntities[ i ].dispose();

		}

		this.shapeEntities = [];

		// 乱数ジェネレータの初期化
		const random = GLP.MathUtils.randomSeed( this.randomSeed );

		// 新しいシェイプを生成
		for ( let i = 0; i < this.count; i ++ ) {

			const shapeEntity = new MXP.Entity();
			shapeEntity.name = `ShaderMotionGraphics_${i}`;

			// ランダムな位置
			const x = ( random() - 0.5 ) * this.rangeX;
			const y = ( random() - 0.5 ) * this.rangeY;
			const z = ( random() - 0.5 ) * this.rangeZ;
			shapeEntity.position.set( x, y, z );

			// ShaderMotionGraphicsコンポーネントを追加
			const smg = shapeEntity.addComponent( ShaderMotionGraphics );

			// シェーダータイプを設定
			const selectedShaderType = this.shaderType === "random" ? this.getRandomShaderType( random ) : this.shaderType;
			smg.setField( 'shaderName', selectedShaderType );

			// エンティティを親に追加
			this.entity.add( shapeEntity );
			this.shapeEntities.push( shapeEntity );

		}

	}

	protected disposeImpl(): void {

		// 全てのエンティティを削除
		for ( let i = 0; i < this.shapeEntities.length; i ++ ) {

			this.entity.remove( this.shapeEntities[ i ] );
			this.shapeEntities[ i ].dispose();

		}

		this.shapeEntities = [];

	}

}
