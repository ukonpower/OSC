import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Music } from '../../Music';
import { Sara } from '../Sara';

export class SaraAudio extends MXP.Component {

	private musicComponent: Music | null;
	private frequencyData: Uint8Array | null;
	private saraEntity: MXP.Entity | null;
	private samplePosition: number;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.musicComponent = null;
		this.frequencyData = null;
		this.saraEntity = null;
		this.samplePosition = 0.5;

		this.setupSara();

		// fieldでサンプル位置を設定
		this.field( "samplePosition", () => this.samplePosition, ( v ) => {

			this.samplePosition = v;

		} );

	}

	private setupSara() {

		// Saraエンティティを1つだけ作成
		this.saraEntity = new MXP.Entity();
		this.saraEntity.name = "Sara";
		this.saraEntity.addComponent( Sara );
		this.entity.add( this.saraEntity );

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

		// MusicコンポーネントのfrequencyDataを使ってSaraのインスタンス数を更新
		if ( this.frequencyData && event.playing && this.saraEntity ) {

			// サンプル位置から周波数帯域を計算（0.0-1.0を周波数帯域のインデックスにマッピング）
			const sampleIndex = Math.floor( this.samplePosition * ( this.frequencyData.length - 1 ) );

			// サンプル位置周辺の平均値を計算（前後5個ずつ、合計11個）
			const windowSize = 5;
			let sum = 0;
			let count = 0;

			for ( let offset = - windowSize; offset <= windowSize; offset ++ ) {

				const idx = sampleIndex + offset;

				if ( idx >= 0 && idx < this.frequencyData.length ) {

					sum += this.frequencyData[ idx ];
					count ++;

				}

			}

			const average = sum / count;

			// 0-255の値を0-15にマッピング（表示する皿の枚数）
			const visibleCount = Math.floor( ( ( average * 2.0 ) / 255 ) * 15 );

			// SaraコンポーネントのuniformでVisibleCountを更新
			const saraComponent = this.saraEntity.getComponent( Sara );

			if ( saraComponent && saraComponent.uniforms ) {

				saraComponent.uniforms.uVisibleCount.value = visibleCount;

			}

		}

	}

	public dispose(): void {

		super.dispose();

		// Sara Entityをクリーンアップ
		if ( this.saraEntity ) {

			this.saraEntity.dispose();
			this.saraEntity = null;

		}

	}

}
