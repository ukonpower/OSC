import * as MXP from 'maxpower';

import gunkanShariFrag from './shaders/gunkanShari.fs';

import { globalUniforms } from '~/globals';
import { bindBlidgeUniform } from '~/shortcuts';

/**
 * GunkanShari - 軍艦のシャリと海苔
 * シンプルなMesh構成でシャリと海苔の両方を描画
 */
export class GunkanShari extends MXP.Component {

	private mesh: MXP.Mesh;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const geo = new MXP.CubeGeometry( {
			width: 1,
			depth: 1.3,
			height: 1,
			segmentsDepth: 4,
			segmentsHeight: 4,
			segmentsWidth: 4,
		} );

		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'gunkanShariFrag', gunkanShariFrag ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time, globalUniforms.tex )
		} );

		this.mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: geo,
			material: mat
		} );

		bindBlidgeUniform( this.mesh.entity, this.mesh );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/gunkanShari.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'gunkanShariFrag', module.default );
					mat.requestUpdate();

				}

			} );

		}

	}

	protected disposeImpl(): void {

		this._entity.removeComponent( MXP.Mesh );

	}

}
