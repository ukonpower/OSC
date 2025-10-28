import * as GLP from 'glpower';

import { Serializable } from '../Serializable';

type Attribute = {
	array: GLP.TArrayBuffer;
	size: number;
	buffer?: GLP.GLPowerBuffer
	opt?: GLP.AttributeOptions,
}

type DefaultAttributeName = 'position' | 'uv' | 'normal' | 'index';

export class Geometry extends Serializable {

	public vertCount: number;
	public attributes: Map<string, Attribute >;
	public vaoCache: Map<GLP.GLPowerVAO, boolean>;

	constructor() {

		super();

		this.vertCount = 0;
		this.attributes = new Map();
		this.vaoCache = new Map();

	}

	public setAttribute( name: DefaultAttributeName | ( string & {} ), array: GLP.TArrayBuffer, size: number, opt?: GLP.AttributeOptions ) {

		const currentAttr = this.attributes.get( name );

		if ( currentAttr && currentAttr.buffer ) {

			currentAttr.buffer.dispose();

		}

		this.attributes.set( name, {
			array,
			size,
			opt,
		} );

		this.updateVertCount();

		return this;

	}

	public getAttribute( name: DefaultAttributeName | ( string & {} ) ) {

		return this.attributes.get( name );

	}

	private updateVertCount() {

		this.vertCount = this.attributes.size > 0 ? Infinity : 0;

		this.attributes.forEach( ( attribute, name ) => {

			if ( name == 'index' || attribute.opt && attribute.opt.instanceDivisor ) return;

			this.vertCount = Math.min( attribute.array.length / attribute.size, this.vertCount );

		} );

	}

	public applyMatrix( matrix: GLP.Matrix ) {

		const vec = new GLP.Vector();

		// 配列に行列を適用するヘルパー
		const apply = ( array: GLP.TArrayBuffer, mat: GLP.Matrix, asPosition: boolean ) => {

			for ( let i = 0; i < array.length; i += 3 ) {

				vec.set( array[ i ], array[ i + 1 ], array[ i + 2 ] );

				if ( asPosition ) {

					vec.applyMatrix4AsPosition( mat );

				} else {

					vec.applyMatrix4AsDirection( mat ).normalize();

				}

				array[ i ] = vec.x;
				array[ i + 1 ] = vec.y;
				array[ i + 2 ] = vec.z;

			}

		};

		// position属性に行列を適用
		const posAttr = this.attributes.get( 'position' );
		if ( posAttr ) apply( posAttr.array, matrix, true );

		// normal属性に逆転置行列を適用
		const normalAttr = this.attributes.get( 'normal' );
		if ( normalAttr ) apply( normalAttr.array, matrix.clone().inverse().transpose(), false );

		// バッファの更新をリクエスト
		this.requestUpdate();

		return this;

	}

	public createBuffers( gl: WebGL2RenderingContext ) {

		this.attributes.forEach( ( attr, key ) => {

			if ( ! attr.buffer ) {

				attr.buffer = new GLP.GLPowerBuffer( gl ).setData( attr.array, key == 'index' ? "ibo" : 'vbo', attr.opt && attr.opt.usage );

			}

		} );

	}

	public requestUpdate() {

		this.vaoCache.clear();

	}

	public dispose() {

		this.attributes.forEach( ( attr ) => {

			attr.buffer?.dispose();

		} );

	}

}
