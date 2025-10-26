import * as GLP from 'glpower';

import { Camera } from '../../Component/Camera';
import { Mesh } from '../../Component/Mesh';
import { Entity } from '../../Entity';

// レイキャストのヒット情報
export interface RaycastHit {
	entity: Entity;
	distance: number;
	point: GLP.Vector;
}

// レイ構造
interface Ray {
	origin: GLP.Vector;
	direction: GLP.Vector;
}

/**
 * レイキャスター
 * カメラとマウス座標からレイを生成し、シーン内のMeshとの交差判定を行う
 */
export class Raycaster {

	private _ray: Ray;
	private _invMatrix: GLP.Matrix;

	constructor() {

		this._ray = {
			origin: new GLP.Vector(),
			direction: new GLP.Vector()
		};

		this._invMatrix = new GLP.Matrix();

	}

	/**
	 * マウス座標（正規化デバイス座標: -1〜1）とカメラから交差判定を実行
	 * @param ndcX 正規化デバイス座標X (-1〜1)
	 * @param ndcY 正規化デバイス座標Y (-1〜1)
	 * @param camera カメラコンポーネント
	 * @param rootEntity ルートエンティティ（シーン）
	 * @returns ヒット情報（ヒットしなかった場合はnull）
	 */
	public raycast( ndcX: number, ndcY: number, camera: Camera, rootEntity: Entity ): RaycastHit | null {

		// レイの生成
		this._generateRay( ndcX, ndcY, camera );

		// 全エンティティを走査して交差判定
		const hits: RaycastHit[] = [];
		this._traverseEntities( rootEntity, hits );

		// 最も近いヒットを返す
		if ( hits.length === 0 ) return null;

		hits.sort( ( a, b ) => a.distance - b.distance );

		return hits[ 0 ];

	}

	/**
	 * カメラとマウス座標からレイを生成
	 */
	private _generateRay( ndcX: number, ndcY: number, camera: Camera ): void {

		// カメラのビュー行列とプロジェクション行列の逆行列を計算
		const viewMatrix = camera.viewMatrix;
		const projectionMatrix = camera.projectionMatrix;

		// 逆プロジェクション行列
		const invProjection = new GLP.Matrix().copy( projectionMatrix ).inverse();

		// NDC座標をビュー空間に変換
		const nearPoint = new GLP.Vector( ndcX, ndcY, - 1, 1 );
		const farPoint = new GLP.Vector( ndcX, ndcY, 1, 1 );

		nearPoint.applyMatrix4( invProjection );
		farPoint.applyMatrix4( invProjection );

		// 同次座標を正規化
		nearPoint.divide( nearPoint.w );
		farPoint.divide( farPoint.w );

		// ビュー空間からワールド空間に変換
		const invView = new GLP.Matrix().copy( viewMatrix ).inverse();

		nearPoint.applyMatrix4( invView );
		farPoint.applyMatrix4( invView );

		// レイの原点と方向を設定
		this._ray.origin.copy( nearPoint );
		this._ray.direction.copy( farPoint ).sub( nearPoint ).normalize();

	}

	/**
	 * エンティティツリーを再帰的に走査して交差判定
	 */
	private _traverseEntities( entity: Entity, hits: RaycastHit[] ): void {

		// Meshコンポーネントを持つ場合のみ判定
		const mesh = entity.getComponent( Mesh );

		if ( mesh && mesh.geometry ) {

			const hit = this._intersectMesh( entity, mesh );

			if ( hit ) {

				hits.push( hit );

			}

		}

		// 子エンティティを再帰的に処理
		const children = entity.children;

		for ( let i = 0; i < children.length; i ++ ) {

			this._traverseEntities( children[ i ], hits );

		}

	}

	/**
	 * Meshとレイの交差判定（三角形レベル）
	 */
	private _intersectMesh( entity: Entity, mesh: Mesh ): RaycastHit | null {

		const geometry = mesh.geometry;
		if ( ! geometry ) return null;

		// 頂点座標を取得
		const positionAttr = geometry.getAttribute( 'position' );
		if ( ! positionAttr ) return null;

		const positions = positionAttr.array;
		const positionSize = positionAttr.size;

		// インデックスを取得
		const indexAttr = geometry.getAttribute( 'index' );

		// エンティティのワールド行列の逆行列を計算
		this._invMatrix.copy( entity.matrixWorld ).inverse();

		// レイをローカル空間に変換
		const localOrigin = this._ray.origin.clone().applyMatrix4( this._invMatrix );
		const localDirection = this._ray.direction.clone();
		localDirection.w = 0;
		localDirection.applyMatrix4( this._invMatrix );
		localDirection.normalize();

		let closestHit: { t: number, point: GLP.Vector } | null = null;

		// 三角形ごとに交差判定
		if ( indexAttr ) {

			// インデックスありの場合
			const indices = indexAttr.array;
			const triangleCount = indices.length / 3;

			for ( let i = 0; i < triangleCount; i ++ ) {

				const i0 = indices[ i * 3 + 0 ];
				const i1 = indices[ i * 3 + 1 ];
				const i2 = indices[ i * 3 + 2 ];

				const v0 = new GLP.Vector(
					positions[ i0 * positionSize + 0 ],
					positions[ i0 * positionSize + 1 ],
					positions[ i0 * positionSize + 2 ]
				);

				const v1 = new GLP.Vector(
					positions[ i1 * positionSize + 0 ],
					positions[ i1 * positionSize + 1 ],
					positions[ i1 * positionSize + 2 ]
				);

				const v2 = new GLP.Vector(
					positions[ i2 * positionSize + 0 ],
					positions[ i2 * positionSize + 1 ],
					positions[ i2 * positionSize + 2 ]
				);

				const hit = this._intersectTriangle( localOrigin, localDirection, v0, v1, v2 );

				if ( hit && ( ! closestHit || hit.t < closestHit.t ) ) {

					closestHit = hit;

				}

			}

		} else {

			// インデックスなしの場合
			const triangleCount = positions.length / positionSize / 3;

			for ( let i = 0; i < triangleCount; i ++ ) {

				const v0 = new GLP.Vector(
					positions[ ( i * 3 + 0 ) * positionSize + 0 ],
					positions[ ( i * 3 + 0 ) * positionSize + 1 ],
					positions[ ( i * 3 + 0 ) * positionSize + 2 ]
				);

				const v1 = new GLP.Vector(
					positions[ ( i * 3 + 1 ) * positionSize + 0 ],
					positions[ ( i * 3 + 1 ) * positionSize + 1 ],
					positions[ ( i * 3 + 1 ) * positionSize + 2 ]
				);

				const v2 = new GLP.Vector(
					positions[ ( i * 3 + 2 ) * positionSize + 0 ],
					positions[ ( i * 3 + 2 ) * positionSize + 1 ],
					positions[ ( i * 3 + 2 ) * positionSize + 2 ]
				);

				const hit = this._intersectTriangle( localOrigin, localDirection, v0, v1, v2 );

				if ( hit && ( ! closestHit || hit.t < closestHit.t ) ) {

					closestHit = hit;

				}

			}

		}

		if ( ! closestHit ) return null;

		// 交差点をワールド座標に戻す
		const worldPoint = closestHit.point.applyMatrix4( entity.matrixWorld );

		// カメラからの距離を計算
		const distance = worldPoint.clone().sub( this._ray.origin ).length();

		return {
			entity,
			distance,
			point: worldPoint
		};

	}

	/**
	 * 三角形とレイの交差判定（Möller–Trumboreアルゴリズム）
	 */
	private _intersectTriangle(
		origin: GLP.Vector,
		direction: GLP.Vector,
		v0: GLP.Vector,
		v1: GLP.Vector,
		v2: GLP.Vector
	): { t: number, point: GLP.Vector } | null {

		const EPSILON = 0.0000001;

		// エッジベクトル
		const edge1 = v1.clone().sub( v0 );
		const edge2 = v2.clone().sub( v0 );

		// 決定因子の計算
		const h = direction.clone().cross( edge2 );
		const a = edge1.dot( h );

		// レイが三角形の平面と平行な場合
		if ( a > - EPSILON && a < EPSILON ) {

			return null;

		}

		const f = 1.0 / a;
		const s = origin.clone().sub( v0 );
		const u = f * s.dot( h );

		// u座標のチェック
		if ( u < 0.0 || u > 1.0 ) {

			return null;

		}

		const q = s.clone().cross( edge1 );
		const v = f * direction.dot( q );

		// v座標のチェック
		if ( v < 0.0 || u + v > 1.0 ) {

			return null;

		}

		// 交差点までの距離
		const t = f * edge2.dot( q );

		if ( t > EPSILON ) {

			// 交差点の計算
			const point = origin.clone().add( direction.clone().multiply( t ) );
			return { t, point };

		}

		return null;

	}

}
