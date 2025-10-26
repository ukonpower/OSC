import type { Component } from '../Component';
import { BLidger } from '../Component/BLidger';
import { Mesh } from '../Component/Mesh';

/**
 * コンポーネントからMeshとBLidgerを取得し、BLidgerのuniformsをMeshのマテリアルにバインドする
 * @param component 対象のコンポーネント
 */
export function useBlidgeUniform( component: Component ): void {

	const mesh = component.entity.getComponent( Mesh );
	const blidger = component.entity.getComponent( BLidger );

	if ( mesh && mesh.material && blidger ) {

		blidger.bindUniforms( mesh.material.uniforms );

	}

}
