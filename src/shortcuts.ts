import * as GLP from 'glpower';
import * as MXP from 'maxpower';

/**
 * BLidgerのuniformsをバインドする
 * @param entity BLidgerコンポーネントを持つEntity
 * @param target バインド先（Mesh、Material、またはUniforms）
 */
export function bindBlidgeUniform( entity: MXP.Entity, target: MXP.Mesh | MXP.Material | GLP.Uniforms ): void {

	const blidger = entity.getComponent( MXP.BLidger );

	if ( ! blidger ) return;

	let uniforms: GLP.Uniforms;

	if ( target instanceof MXP.Mesh ) {

		uniforms = target.material.uniforms;

	} else if ( target instanceof MXP.Material ) {

		uniforms = target.uniforms;

	} else {

		uniforms = target;

	}

	blidger.bindUniforms( uniforms );

}
