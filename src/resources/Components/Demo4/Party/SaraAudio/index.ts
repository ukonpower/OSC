import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Music } from '../../Music';
import { Sara } from '../Sara';

export class SaraAudio extends MXP.Component {

	private musicComponent: Music | null;
	private frequencyData: Uint8Array | null;
	private saraEntities: MXP.Entity[];
	private numSaras: number;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.musicComponent = null;
		this.frequencyData = null;
		this.saraEntities = [];

		// 5つのSaraを横に配置
		this.numSaras = 5;

		this.setupSaras();

	}

	private setupSaras() {

		const spacing = 1.0;
		const startX = - ( this.numSaras - 1 ) * spacing / 2;

		for ( let i = 0; i < this.numSaras; i ++ ) {

			const saraEntity = new MXP.Entity();
			saraEntity.name = `Sara_${i}`;
			saraEntity.position.set( startX + i * spacing, 0, 0 );

			// Saraコンポーネントを追加（インスタンス数は常に10枚）
			saraEntity.addComponent( Sara );

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

				// 0-255の値を0-10にマッピング（表示する皿の枚数）
				const visibleCount = Math.floor( ( ( average * 2.0 ) / 255 ) * 10 );

				// SaraコンポーネントのuniformでVisibleCountを更新
				const saraEntity = this.saraEntities[ i ];

				if ( saraEntity ) {

					const saraComponent = saraEntity.getComponent( Sara );

					if ( saraComponent && saraComponent.uniforms ) {

						saraComponent.uniforms.uVisibleCount.value = visibleCount;

					}

				}

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
