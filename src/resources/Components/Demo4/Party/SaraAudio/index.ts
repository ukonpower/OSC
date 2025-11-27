import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Sara } from '../Sara';
import { Music } from '../../Music';

export class SaraAudio extends MXP.Component {

	private musicComponent: Music | null;
	private audioContext: AudioContext | null;
	private analyser: AnalyserNode | null;
	private dataArray: Uint8Array | null;
	private saraEntities: MXP.Entity[];
	private numSaras: number;
	private maxInstancesPerSara: number;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.musicComponent = null;
		this.audioContext = null;
		this.analyser = null;
		this.dataArray = null;
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

	private setupAnalyser() {

		// Musicコンポーネントを探す
		const root = this.entity.getRootEntity();
		const musicEntity = root.findEntityByName( "Music" );

		if ( musicEntity ) {

			const musicComp = musicEntity.getComponent( Music );

			if ( musicComp ) {

				this.musicComponent = musicComp;

				// MusicコンポーネントからaudioContextを取得
				const ctx = ( this.musicComponent as any ).audioContext as AudioContext;

				if ( ctx ) {

					this.audioContext = ctx;

					// AnalyserNodeを作成
					this.analyser = this.audioContext.createAnalyser();
					this.analyser.fftSize = 256;
					const bufferLength = this.analyser.frequencyBinCount;
					this.dataArray = new Uint8Array( bufferLength );

					// 音源とAnalyserを接続
					const gainNode = ( this.musicComponent as any ).gainNode as GainNode;

					if ( gainNode ) {

						gainNode.connect( this.analyser );

					}

				}

			}

		}

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		// 初回のみAnalyserをセットアップ
		if ( ! this.analyser && event.playing ) {

			this.setupAnalyser();

		}

		// スペクトラムデータを取得して各Saraのインスタンス数を更新
		if ( this.analyser && this.dataArray ) {

			this.analyser.getByteFrequencyData( this.dataArray );

			// 周波数帯域を5つに分割
			const binSize = Math.floor( this.dataArray.length / this.numSaras );

			for ( let i = 0; i < this.numSaras; i ++ ) {

				// 各帯域の平均値を計算
				let sum = 0;
				const startIdx = i * binSize;
				const endIdx = Math.min( startIdx + binSize, this.dataArray.length );

				for ( let j = startIdx; j < endIdx; j ++ ) {

					sum += this.dataArray[ j ];

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

		// Analyserの接続を解除
		if ( this.analyser && this.musicComponent ) {

			const gainNode = ( this.musicComponent as any ).gainNode as GainNode;

			if ( gainNode ) {

				this.analyser.disconnect();

			}

		}

		// Sara Entityをクリーンアップ
		this.saraEntities.forEach( entity => entity.dispose() );
		this.saraEntities = [];

	}

}
