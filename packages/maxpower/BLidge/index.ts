import * as GLP from 'glpower';

import { GLTF, GLTFLoader } from '../Loaders/GLTFLoader';

export type BLidgeNodeType = 'empty' | 'cube' | 'sphere' | 'cylinder' | 'mesh' | 'camera' | 'plane' | 'light' | 'gltf';

// scene

export type BLidgeScene = {
	version?: number;
	fcurves: BLidgeCurveParam[];
    animations: number[][];
	root: BLidgeNodeParam;
	frame: BLidgeFrame;
}

// node

export type BLidgeNodeParam = {
	name: string,
	class: string,
	type?: BLidgeNodeType,
	uuid?: string,
	param?: BLidgeCameraParam | BLidgeMeshParamRaw | BLidgeLightParamCommon
	children?: BLidgeNodeParam[],
	animation?: BLidgeAnimationAccessor,
	position?: number[],
	rotation?: number[],
	scale?: number[],
	uniforms?: BLidgeAnimationAccessor,
	visible?: boolean,
}

export type BLidgeNode = {
	name: string,
	class: string,
	type: BLidgeNodeType,
	uuid?: string,
	param?: BLidgeCameraParam | BLidgeMeshParam | BLidgeLightParamCommon
	children: BLidgeNode[],
	animations: BLidgeAnimationAccessor,
	position: number[],
	rotation: number[],
	scale: number[],
	uniforms: BLidgeAnimationAccessor
	visible: boolean,
}

// camera

export type BLidgeCameraParam = {
	fov: number,
	near: number,
	far: number
}

// mesh

export type BLidgeMeshParamRaw = {
	position: string,
	uv: string,
	normal: string,
	index: string,
}

export type BLidgeMeshParam = {
	position: Float32Array,
	uv: Float32Array,
	normal: Float32Array,
	index: Uint16Array,
}

// light

type BLidgeLightParamCommon = {
	type: 'POINT' | 'SUN' | 'SPOT' | 'AREA'
	color: GLP.IVector3,
	intensity: number,
}

export type BLidgeDirectionalLightParam = {
	type: 'SUN'
} & BLidgeLightParamCommon

export type BLidgeSpotLightParam = {
	type: 'SPOT',
	angle: number,
	blend: number,
} & BLidgeLightParamCommon

export type BLidgeLightParam = BLidgeDirectionalLightParam | BLidgeSpotLightParam;

// animation

export type BLidgeAnimationAccessor = { [key: string]: number }

export type BLidgeCurveAxis = 'x' | 'y' | 'z' | 'w'

export type BLidgeCurveParam = {
    k: [number, [number, number, number, number, number, number]][];
	axis: BLidgeCurveAxis
}

// message

export type BLidgeMessage = BLidgeSyncSceneMessage | BLidgeSyncTimelineMessage | BLidgeSyncSelectionMessage | BLidgeEventMessage

export type BLidgeSyncSceneMessage = {
	type: "sync/scene",
    data: BLidgeScene;
}

export type BLidgeSyncTimelineMessage = {
	type: "sync/timeline";
	data: BLidgeFrame;
}

export type BLidgeSyncSelectionMessage = {
	type: "sync/selection";
	data: BLidgeSelection;
}

export type BLidgeEventMessage = {
	type: "event";
	data: {
		type: string
	};
}

// frame

export type BLidgeFrame = {
	start: number;
	end: number;
	current: number;
	fps: number;
	playing: boolean;
	/** タイムラインをドラッグ中かどうか */
	scrubbing?: boolean;
}

// selection

export type BLidgeSelectionObject = {
	uuid: string;
	name: string;
	type?: string;
}

export type BLidgeSelection = {
	active: BLidgeSelectionObject | null;
	selected: BLidgeSelectionObject[];
}

type BLidgeConnection = {
	url: string,
	ws: WebSocket,
	gltfPath?: string,
}

export class BLidge extends GLP.EventEmitter {

	// gl

	private gl: WebGL2RenderingContext;

	// connection

	public connection?: BLidgeConnection;

	// frame

	public frame: BLidgeFrame;

	// animation

	public nodes: BLidgeNode[];
	public curveGroups: GLP.FCurveGroup[];
	public root: BLidgeNode | null;

	// gltf

	public gltf?: GLTF;

	// scene

	public currentData: BLidgeScene | null;

	constructor( gl: WebGL2RenderingContext, url?: string ) {

		super();

		this.gl = gl;

		this.root = null;
		this.nodes = [];
		this.curveGroups = [];

		this.currentData = null;

		this.frame = {
			start: 0,
			end: 100,
			current: 0,
			fps: 30,
			playing: false,
		};

		if ( url ) {

			this.connect( url );

		}

	}

	/*-------------------------------
		Connect
	-------------------------------*/

	public connect( url: string, gltfPath?: string ) {

		if ( process.env.NODE_ENV === 'development' ) {

			const ws = new WebSocket( url );
			ws.onopen = this.onOpen.bind( this );
			ws.onmessage = this.onMessage.bind( this );
			ws.onclose = this.onClose.bind( this );
			ws.onerror = ( e ) => {

				console.error( e );

				this.emit( 'error' );

			};

			this.connection = {
				url,
				ws,
				gltfPath
			};

		}

	}

	public disconnect() {

		if ( process.env.NODE_ENV === 'development' ) {

			if ( this.connection ) {

				this.connection.ws.close();
				this.connection.ws.onmessage = null;
				this.connection.ws.onclose = null;
				this.connection.ws.onopen = null;
				this.connection = undefined;

			}

		}

	}

	/*-------------------------------
		Load
	-------------------------------*/

	private binaryStringToArrayBuffer( binaryString: string ) {

		const bytes = new Uint8Array( binaryString.length );

		for ( let i = 0; i < binaryString.length; i ++ ) {

			const code = binaryString.charCodeAt( i );
			bytes[ i ] = code;

		}

		return bytes.buffer;

	}

	public async loadScene( data: BLidgeScene, gltfPath?: string ) {

		const newData: BLidgeScene = JSON.parse( JSON.stringify( data ) );

		console.log( data );


		// gltf

		if ( gltfPath ) {

			if ( import.meta.env.DEV ) {

				const loader = new GLTFLoader( this.gl );

				await loader.load( gltfPath ).then( gltf => {

					this.gltf = gltf;

					this.emit( "gltfLoaded", [ gltf ] );

				} );

			}

		}

		await new Promise( ( r ) => {

			setTimeout( () => {

				r( null );

			}, 100 );

		} );

		// frame

		this.frame.start = newData.frame.start;
		this.frame.end = newData.frame.end;
		// currentはOREngine側で管理されるため、ここでは設定しない
		// this.frame.current = currentData.frame.current;
		this.frame.fps = newData.frame.fps;

		this.curveGroups = [];
		this.nodes = [];

		// actions

		const fcurveGroupNames = Object.keys( newData.animations );
		const isV2 = newData.version === 2;

		if ( isV2 ) {

			newData.fcurves.forEach( fcurveData => {

				for ( let j = 1; j < fcurveData.k.length; j ++ ) {

					fcurveData.k[ j ][ 1 ][ 0 ] += fcurveData.k[ j - 1 ][ 1 ][ 0 ];

				}

			} );


		}

		for ( let i = 0; i < fcurveGroupNames.length; i ++ ) {

			const fcurveGroupName = fcurveGroupNames[ i ];
			const fcurveGroup = new GLP.FCurveGroup( fcurveGroupName );

			newData.animations[ i ].forEach( fcurveIndex => {

				const fcurveData = newData.fcurves[ fcurveIndex ];

				const curve = new GLP.FCurve();

				curve.set( fcurveData.k.map( keyframe => {

					const frames = keyframe[ 1 ];

					return new GLP.FCurveKeyFrame(
						{ x: frames[ 0 ], y: frames[ 1 ] },
						frames[ 2 ] !== undefined && { x: frames[ 2 ], y: frames[ 3 ] } || undefined,
						frames[ 4 ] !== undefined && { x: frames[ 4 ], y: frames[ 5 ] } || undefined,
						[ "LINEAR", "CONSTANT", "BEZIER" ][ keyframe[ 0 ] ] as GLP.FCurveInterpolation );

				} ) );

				fcurveGroup.setFCurve( curve, fcurveData.axis );

			} );

			this.curveGroups.push( fcurveGroup );

		}

		// node

		this.nodes = [];

		const _ = ( nodeParam: BLidgeNodeParam ): BLidgeNode => {

			const node: BLidgeNode = {
				name: nodeParam.name,
				class: nodeParam.class,
				uuid: nodeParam.uuid,
				children: [],
				animations: nodeParam.animation || {},
				position: nodeParam.position || [ 0, 0, 0 ],
				rotation: nodeParam.rotation || [ 0, 0, 0 ],
				scale: nodeParam.scale || [ 1, 1, 1 ],
				uniforms: nodeParam.uniforms || {},
				type: nodeParam.type || 'empty',
				visible: nodeParam.visible !== undefined ? nodeParam.visible : true,
			};

			const param = nodeParam.param;

			if ( param && "position" in param ) {

				node.param = {
					position: new Float32Array( this.binaryStringToArrayBuffer( atob( param.position ) ) ),
					normal: new Float32Array( this.binaryStringToArrayBuffer( atob( param.normal ) ) ),
					uv: new Float32Array( this.binaryStringToArrayBuffer( atob( param.uv ) ) ),
					index: new Uint16Array( this.binaryStringToArrayBuffer( atob( param.index ) ) ),
				};

			} else {

				node.param = param;

			}

			if ( nodeParam.children ) {

				nodeParam.children.forEach( item => {

					node.children.push( _( item ) );

				} );

			}

			this.nodes.push( node );

			return node;

		};

		this.root = _( newData.root );

		this.currentData = newData;

		// dispatch event

		this.emit( 'sync/scene', [ this ] );

	}

	private onSyncTimeline( data: BLidgeFrame ) {

		this.frame = data;

		this.emit( 'sync/timeline', [ this.frame ] );

	}

	/*-------------------------------
		WS Events
	-------------------------------*/

	private onOpen() {
	}

	private onMessage( e: MessageEvent ) {

		if ( process.env.NODE_ENV === 'development' ) {

			const msg = JSON.parse( e.data ) as BLidgeMessage;

			if ( msg.type == 'sync/scene' ) {

				this.loadScene( msg.data, this.connection && this.connection.gltfPath );

			} else if ( msg.type == "sync/timeline" ) {

				this.onSyncTimeline( msg.data );

			} else if ( msg.type == "sync/selection" ) {

				this.emit( "sync/selection", [ msg.data ] );

			} else if ( msg.type == "event" ) {

				this.emit( "event/" + msg.data.type );

			}

		}

	}

	private onClose() {

		this.disconnect();

	}

	/*-------------------------------
		API
	-------------------------------*/

	public getCurveGroup( index: number ) {

		return this.curveGroups[ index ];

	}

	public setFrame( frame: number ) {

		this.onSyncTimeline( {
			...this.frame,
			playing: true,
			current: frame,
		} );

	}

	/*-------------------------------
		Props
	-------------------------------*/

	public get gltfPrm(): Promise<GLTF> {

		if ( this.gltf ) {

			return Promise.resolve( this.gltf );

		}

		return new Promise( ( resolve ) => {

			this.on( "gltfLoaded", ( gltf: GLTF ) => {

				resolve( gltf );

			} );

		} );

	}

	/*-------------------------------
		Dispose
	-------------------------------*/

	public dispose() {

		this.disconnect();

	}

}
