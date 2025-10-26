import { Material } from '..';

import wireframeFrag from './wireframe.fs';
import wireframeVert from './wireframe.vs';

/**
 * WireframeMaterial
 * 開発環境専用: ワイヤーフレーム描画用のシンプルなマテリアル
 * デフォルトは真っ黒（black）で描画
 */
export class WireframeMaterial extends Material {

	constructor( color?: [number, number, number] ) {

		// デフォルトは黒色、指定されたら指定色
		const wireColor = color || [ 0.0, 0.0, 0.0 ];

		super( {
			name: 'WireframeMaterial',
			phase: [ 'ui' ], // forwardパスでのみ描画
			vert: wireframeVert,
			frag: wireframeFrag,
			drawType: 'LINES',
			blending: 'NORMAL',
			depthTest: true,
			depthWrite: false, // 深度書き込みは無効化
			cullFace: false, // カリング無効化でワイヤーフレームをすべて表示
			uniforms: {
				uWireColor: {
					type: '3f',
					value: wireColor
				}
			},
			defines: {}
		} );

		this.useLight = false; // ライティング不要

	}

}
