import * as GLP from 'glpower';

import { Serializable } from '../Serializable';

import { PostProcessPass } from './PostProcessPass';

import type { PostProcessPipeline } from '../Component/PostProcessPipeline';


export type PostProcessParams<TArgs = void> = TArgs extends void
  ? { pipeline: PostProcessPipeline; args?: TArgs }
  : { pipeline: PostProcessPipeline; args: TArgs };

export type PostProcessBaseParams = {
	name?: string,
	passes?: PostProcessPass[]
}

export class PostProcess extends Serializable {

	public name: string;
	public enabled: boolean;
	protected _passes: PostProcessPass[];

	constructor( params: PostProcessBaseParams | PostProcessParams<any> ) {

		super();

		// PostProcessBaseParams形式の場合とPostProcessParams形式の場合の両方に対応
		const baseParams = 'pipeline' in params ? undefined : params;
		const p = baseParams || {};
		this.name = p.name || "";
		this.enabled = true;
		this._passes = p.passes || [];

	}

	public get passes() {

		return this._passes;

	}

	public get hasOutput() {

		return this._passes.length > 0 && this._passes.some( pass=>pass.enabled );

	}

	public get output() {

		for ( let i = this._passes.length - 1; i >= 0; i -- ) {

			const pass = this._passes[ i ];

			if ( ! pass.passThrough && pass.enabled ) {

				return pass.renderTarget;

			}

		}

		return null;

	}

	public resize( resolution: GLP.Vector ): void {

		if ( ! this._passes ) return;

		for ( let i = 0; i < this._passes.length; i ++ ) {

			this._passes[ i ].resize( resolution );

		}

	}

	public dispose() {

		this.emit( "dispose" );

	}

}
