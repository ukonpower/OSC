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
	private movementX: number;
	private movementY: number;

	// 生成したエンティティの配列
	private shapeEntities: MXP.Entity[];
	// 各エンティティの初期位置を保持
	private initialPositions: GLP.Vector[];
	// 各エンティティのtimeOffsetを保持
	private timeOffsets: number[];

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// デフォルト値の設定
		this.count = 10;
		this.rangeX = 10;
		this.rangeY = 5;
		this.rangeZ = 10;
		this.randomSeed = 0;
		this.shaderType = "random";
		this.movementX = 0;
		this.movementY = 0;

		this.shapeEntities = [];
		this.initialPositions = [];
		this.timeOffsets = [];

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

		const movementFolder = this.fieldDir( "Movement" );

		movementFolder.field( "movementX", () => this.movementX, ( v ) => {

			this.movementX = v;

		} );

		movementFolder.field( "movementY", () => this.movementY, ( v ) => {

			this.movementY = v;

		} );

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
		this.initialPositions = [];
		this.timeOffsets = [];

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

			// 初期位置を保存
			this.initialPositions.push( new GLP.Vector( x, y, z ) );

			// ランダムなtimeOffsetを生成（0~10秒の範囲）
			const timeOffset = random() * 10.0;
			this.timeOffsets.push( timeOffset );

			// ShaderMotionGraphicsコンポーネントを追加
			const smg = shapeEntity.addComponent( ShaderMotionGraphics );

			// シェーダータイプを設定
			const selectedShaderType = this.shaderType === "random" ? this.getRandomShaderType( random ) : this.shaderType;
			smg.setField( 'shaderName', selectedShaderType );

			// timeOffsetを設定
			smg.setField( 'timeOffset', timeOffset );

			// エンティティを親に追加
			this.entity.add( shapeEntity );
			this.shapeEntities.push( shapeEntity );

		}

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		// movementが0の場合はスキップ
		if ( this.movementX === 0 && this.movementY === 0 ) return;

		// 各エンティティの位置を更新
		for ( let i = 0; i < this.shapeEntities.length; i ++ ) {

			const entity = this.shapeEntities[ i ];
			const initialPos = this.initialPositions[ i ];

			// timeCodeに基づく移動量を計算
			const offsetX = this.movementX * event.timeCode;
			const offsetY = this.movementY * event.timeCode;

			// rangeを超えた場合はmodでループ（マイナス方向も対応）
			let wrappedX = initialPos.x + offsetX;
			let wrappedY = initialPos.y + offsetY;

			if ( this.rangeX > 0 ) {

				// -rangeX/2 ~ +rangeX/2 の範囲にループ
				wrappedX = ( ( wrappedX + this.rangeX / 2 ) % this.rangeX + this.rangeX ) % this.rangeX - this.rangeX / 2;

			}

			if ( this.rangeY > 0 ) {

				// -rangeY/2 ~ +rangeY/2 の範囲にループ
				wrappedY = ( ( wrappedY + this.rangeY / 2 ) % this.rangeY + this.rangeY ) % this.rangeY - this.rangeY / 2;

			}

			entity.position.set( wrappedX, wrappedY, initialPos.z );

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
