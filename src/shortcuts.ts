import * as GLP from 'glpower';
import * as MXP from 'maxpower';

/**
 * BLidgerのuniformsをバインドする
 * @param meshOrUniforms 対象のMeshまたはuniforms
 * @param entityOrMaterial Entityまたはmaterial（uniformsを指定した場合に使用）
 */
export function bindBlidgeUniform( meshOrUniforms: MXP.Mesh | GLP.Uniforms, entityOrMaterial?: MXP.Entity | MXP.Material ): void {

	if ( meshOrUniforms instanceof MXP.Mesh ) {

		// Meshが渡された場合
		const mesh = meshOrUniforms;
		const blidger = mesh.entity.getComponent( MXP.BLidger );

		if ( mesh.material && blidger ) {

			blidger.bindUniforms( mesh.material.uniforms );

		}

	} else {

		// uniformsが渡された場合
		const uniforms = meshOrUniforms;

		if ( entityOrMaterial ) {

			let entity: MXP.Entity | undefined;

			if ( entityOrMaterial instanceof MXP.Material ) {

				// Materialが渡された場合、entityは不明なのでスキップ
				return;

			} else {

				// Entityが渡された場合
				entity = entityOrMaterial;

			}

			const blidger = entity.getComponent( MXP.BLidger );

			if ( blidger ) {

				blidger.bindUniforms( uniforms );

			}

		}

	}

}
