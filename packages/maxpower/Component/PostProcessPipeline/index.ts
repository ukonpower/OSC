import * as GLP from 'glpower';

import { Component, ComponentParams } from '..';
import { Entity } from '../../Entity';
import { PostProcess, PostProcessParams } from '../../PostProcess';

export type PostProcessConstructorArgType<T extends typeof PostProcess> =
  ConstructorParameters<T>[0] extends PostProcessParams<infer A>
    ? A
    : never;

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

	public add<T extends typeof PostProcess>(
		postProcessClass: T,
		...args: PostProcessConstructorArgType<T> extends undefined ? [] | [PostProcessConstructorArgType<T>]
		  : [PostProcessConstructorArgType<T>]
	): InstanceType<T> {

		// クラスコンストラクタからインスタンス化
		const [ postProcessArgs ] = args;

		const newPostProcess = new postProcessClass( { pipeline: this, args: postProcessArgs || {} } );

		this.postProcesses.push( newPostProcess );

		newPostProcess.resize( this._resolution );

		return newPostProcess as InstanceType<T>;

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
