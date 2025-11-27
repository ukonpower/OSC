import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Music } from '../../Music';
import { Sara } from '../Sara';

export class SaraAudio extends MXP.Component {

	private musicComponent: Music | null;
	private frequencyData: Uint8Array | null;
	private saraEntities: MXP.Entity[];
	private numSaras: number;
	private maxInstancesPerSara: number;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.musicComponent = null;
		this.frequencyData = null;
		this.saraEntities = [];

		// 5つのSaraを横に配置
		this.numSaras = 5;
		// 各Saraの最大インスタンス数
		this.maxInstancesPerSara = 20;

		this.setupSaras();

	}

	private setupSaras() {

		const spacing = 2.5;
		const startX = - ( this.numSaras - 1 ) * spacing / 2;

		for ( let i = 0; i < this.numSaras; i ++ ) {

			const saraEntity = new MXP.Entity();
			saraEntity.name = `Sara_${i}`;
			saraEntity.position.set( startX + i * spacing, 0, 0 );

			// Saraコンポーネントを追加（初期インスタンス数1）
			saraEntity.addComponent( Sara, { instanceCount: 1 } );

			this.entity.add( saraEntity );
			this.saraEntities.push( saraEntity );

		}

	}

	private setupMusicReference() {

		// シーン内を再帰的に探索してMusicコンポーネントを見つける
		const root = this.entity.getRootEntity();

		const findMusicComponent = ( entity: MXP.Entity ): Music | null => {

			const musicComp = entity.getComponent( Music );

			if ( musicComp ) return musicComp;

			for ( let i = 0; i < entity.children.length; i ++ ) {

				const found = findMusicComponent( entity.children[ i ] );

				if ( found ) return found;

			}

			return null;

		};

		const musicComp = findMusicComponent( root );

		if ( musicComp ) {

			this.musicComponent = musicComp;

			// MusicコンポーネントのfrequencyDataを参照
			this.frequencyData = ( this.musicComponent as any ).frequencyData as Uint8Array;

		}

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		// 初回のみMusicコンポーネントへの参照をセットアップ
		if ( ! this.musicComponent && event.playing ) {

			this.setupMusicReference();

		}

		// MusicコンポーネントのfrequencyDataを使って各Saraのインスタンス数を更新
		if ( this.frequencyData && event.playing ) {

			// 周波数帯域を5つに分割
			const binSize = Math.floor( this.frequencyData.length / this.numSaras );

			for ( let i = 0; i < this.numSaras; i ++ ) {

				// 各帯域の平均値を計算
				let sum = 0;
				const startIdx = i * binSize;
				const endIdx = Math.min( startIdx + binSize, this.frequencyData.length );

				for ( let j = startIdx; j < endIdx; j ++ ) {

					sum += this.frequencyData[ j ];

				}

				const average = sum / binSize;

				// 0-255の値を1-maxInstancesPerSaraにマッピング
				const instanceCount = Math.max( 1, Math.floor( ( average / 255 ) * this.maxInstancesPerSara ) );

				// Saraコンポーネントのインスタンス数を更新
				const saraEntity = this.saraEntities[ i ];

				if ( saraEntity ) {

					const saraComponent = saraEntity.getComponent( Sara );

					if ( saraComponent ) {

						this.updateSaraInstanceCount( saraComponent, instanceCount );

					}

				}

			}

		}

	}

	private updateSaraInstanceCount( saraComponent: any, newCount: number ) {

		const mesh = saraComponent.entity.getComponent( MXP.Mesh );
		const geo = mesh && mesh.geometry;

		if ( geo ) {

			const idAttr = geo.getAttribute( "id" );
			const currentCount = idAttr && idAttr.array.length / 4 || 0;

			if ( currentCount !== newCount ) {

				const random = GLP.MathUtils.randomSeed( 2 );
				const idArray = [];
				const id2Array = [];

				for ( let i = 0; i < newCount; i ++ ) {

					idArray.push( i / newCount, random(), random(), random() );
					id2Array.push( random(), random(), random(), random() );

				}

				geo.setAttribute( 'id', new Float32Array( idArray ), 4, { instanceDivisor: 1 } );
				geo.setAttribute( 'id2', new Float32Array( id2Array ), 4, { instanceDivisor: 1 } );

			}

		}

	}

	public dispose(): void {

		super.dispose();

		// Sara Entityをクリーンアップ
		this.saraEntities.forEach( entity => entity.dispose() );
		this.saraEntities = [];

	}

}
