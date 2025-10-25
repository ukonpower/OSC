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
	 * Meshとレイの交差判定（バウンディングボックスベース）
	 */
	private _intersectMesh( entity: Entity, mesh: Mesh ): RaycastHit | null {

		// エンティティのワールド行列の逆行列を計算
		this._invMatrix.copy( entity.matrixWorld ).inverse();

		// レイをローカル空間に変換
		const localOrigin = this._ray.origin.clone().applyMatrix4( this._invMatrix );
		const localDirection = this._ray.direction.clone();
		// 方向ベクトルは平行移動を無視するため、wを0にしてから変換
		localDirection.w = 0;
		localDirection.applyMatrix4( this._invMatrix );

		// 簡易的なバウンディングボックス（-1〜1の立方体）
		// 実際のジオメトリのサイズに応じて調整が必要
		const min = new GLP.Vector( - 1, - 1, - 1 );
		const max = new GLP.Vector( 1, 1, 1 );

		const t = this._intersectAABB( localOrigin, localDirection, min, max );

		if ( t === null ) return null;

		// 交差点をワールド座標に戻す
		const localPoint = localOrigin.clone().add( localDirection.clone().multiply( t ) );
		const worldPoint = localPoint.applyMatrix4( entity.matrixWorld );

		// カメラからの距離を計算
		const distance = worldPoint.clone().sub( this._ray.origin ).length();

		return {
			entity,
			distance,
			point: worldPoint
		};

	}

	/**
	 * AABB（軸平行境界ボックス）とレイの交差判定
	 * スラブ法（Slab method）を使用
	 */
	private _intersectAABB( origin: GLP.Vector, direction: GLP.Vector, min: GLP.Vector, max: GLP.Vector ): number | null {

		let tmin = - Infinity;
		let tmax = Infinity;

		// X軸
		if ( Math.abs( direction.x ) > 0.0001 ) {

			const tx1 = ( min.x - origin.x ) / direction.x;
			const tx2 = ( max.x - origin.x ) / direction.x;
			tmin = Math.max( tmin, Math.min( tx1, tx2 ) );
			tmax = Math.min( tmax, Math.max( tx1, tx2 ) );

		} else if ( origin.x < min.x || origin.x > max.x ) {

			return null;

		}

		// Y軸
		if ( Math.abs( direction.y ) > 0.0001 ) {

			const ty1 = ( min.y - origin.y ) / direction.y;
			const ty2 = ( max.y - origin.y ) / direction.y;
			tmin = Math.max( tmin, Math.min( ty1, ty2 ) );
			tmax = Math.min( tmax, Math.max( ty1, ty2 ) );

		} else if ( origin.y < min.y || origin.y > max.y ) {

			return null;

		}

		// Z軸
		if ( Math.abs( direction.z ) > 0.0001 ) {

			const tz1 = ( min.z - origin.z ) / direction.z;
			const tz2 = ( max.z - origin.z ) / direction.z;
			tmin = Math.max( tmin, Math.min( tz1, tz2 ) );
			tmax = Math.min( tmax, Math.max( tz1, tz2 ) );

		} else if ( origin.z < min.z || origin.z > max.z ) {

			return null;

		}

		// 交差判定
		if ( tmax < tmin || tmax < 0 ) return null;

		// レイの前方にある最初の交差点を返す
		return tmin > 0 ? tmin : tmax;

	}

}
