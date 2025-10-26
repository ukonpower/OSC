import * as GLP from 'glpower';

import { Component, ComponentParams } from '..';
import { Entity } from '../../Entity';
import { PostProcess } from '../../PostProcess';

export class PostProcessPipeline extends Component {

	private _resolution: GLP.Vector;
	private _postProcesses: PostProcess[];
	private _postProcessesDict: Map<typeof PostProcess, PostProcess>;

	constructor( param: ComponentParams ) {

		super( param );

		this._postProcesses = [];
		this._postProcessesDict = new Map();
		this._resolution = new GLP.Vector();

		this.field( "postprocess",
			() => {

				return this._postProcesses.map( ( postProcess, index ) => postProcess.enabled );

			},
			( v ) => {

				v.forEach( ( enabled, i ) => {

					const postProcess = this._postProcesses[ i ];

					if ( postProcess ) {

						postProcess.enabled = enabled;

					}

				} );

			}, {
				format: {
					type: "array",
					labels: ( value, i ) => {

						return this._postProcesses[ i ].name;

					}
				}
			}
		);

	}

	public get postProcesses() {

		return this._postProcesses;

	}

	public add<T extends PostProcess>( postProcessOrClass: T | ( new ( pipeline: PostProcessPipeline ) => T ) ): T {

		// クラスが渡された場合はインスタンス化、インスタンスが渡された場合はそのまま使用
		const newPostProcess = typeof postProcessOrClass === 'function'
			? new postProcessOrClass( this )
			: postProcessOrClass;

		this.postProcesses.push( newPostProcess );

		newPostProcess.resize( this._resolution );

		return newPostProcess;

	}

	public remove( postProcess: PostProcess ) {

		const index = this._postProcesses.indexOf( postProcess );

		if ( index > - 1 ) {

			this._postProcesses.splice( index, 1 );

		}

	}

	public resize( resolution: GLP.Vector ) {

		this._resolution.copy( resolution );

		this.postProcesses.forEach( postProcess => {

			postProcess.resize( resolution );

		} );

	}

}
