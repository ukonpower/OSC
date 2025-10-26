import * as MXP from 'maxpower';

/**
 * MeshのマテリアルにBLidgerのuniformsをバインドする
 * @param mesh 対象のMesh
 */
export function bindBlidgeUniform( mesh: MXP.Mesh ): void {

	const blidger = mesh.entity.getComponent( MXP.BLidger );

	if ( mesh.material && blidger ) {

		blidger.bindUniforms( mesh.material.uniforms );

	}

}
