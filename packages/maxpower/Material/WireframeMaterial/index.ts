import { Material } from '..';

import wireframeFrag from './wireframe.fs';
import wireframeVert from './wireframe.vs';

/**
 * WireframeMaterial
 * 開発環境専用: ワイヤーフレーム描画用のシンプルなマテリアル
 * 真っ黒（black）で描画
 */
export class WireframeMaterial extends Material {

	constructor() {

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
			uniforms: {},
			defines: {}
		} );

		this.useLight = false; // ライティング不要

	}

}
