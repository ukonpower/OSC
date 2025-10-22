import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { OREngineProjectData, OREngineProjectFrame, ProjectSerializer } from './ProjectSerializer';
import { Resources } from './Resources';
import { ShaderErrorManager } from './ShaderErrorManager';

import { BLidgeClient } from '~/resources/Components/Utilities/BLidgeClient';

// Re-export types for easier importing
export type { OREngineProjectData, OREngineProjectFrame } from './ProjectSerializer';
export { ProjectSerializer } from './ProjectSerializer';
export { Resources } from './Resources';
export type { ShaderError } from './ShaderErrorManager';
export { ShaderErrorManager, hashString } from './ShaderErrorManager';

export interface SceneTime {
	current: number;
	engine: number;
	delta: number;
	code: number;
}

export interface FramePlay {
	current: number
	playing: boolean,
}

export class Engine extends MXP.Entity {

	public static resources: Resources;
	public static instances: Map<WebGL2RenderingContext, Engine>;
	public static shaderErrorManager: ShaderErrorManager;
	public enableRender: boolean;

	// DEV環境でのみ使用するプロパティ
	private _audioBuffer: AudioBuffer | null;

	private _renderer: MXP.Renderer;
	private _gl: WebGL2RenderingContext;
	private _canvas: HTMLCanvasElement | OffscreenCanvas;
	private _projectCache: OREngineProjectData | null;
	private _root: MXP.Entity;
	private _uniforms: GLP.Uniforms;
	private _time: SceneTime;
	private _frame: FramePlay;
	private _frameSetting: OREngineProjectFrame;
	private _disposed: boolean;

	constructor( gl: WebGL2RenderingContext ) {

		super();

		Engine.instances.set( gl, this );

		this._gl = gl;
		this.name = "OREngine";
		this._disposed = false;

		this._uniforms = {
			uTime: {
				value: 0,
				type: "1f"
			},
			uTimeE: {
				value: 0,
				type: '1f'
			},
			uEnvMapIntensity: {
				value: 1,
				type: '1f'
			}
		};

		/*-------------------------------
			Canvas
		-------------------------------*/

		this._canvas = gl.canvas;

		/*-------------------------------
			Renderer
		-------------------------------*/

		this._renderer = new MXP.Renderer( gl );

		/*-------------------------------
			Project
		-------------------------------*/

		this._projectCache = null;

		// time

		this._time = {
			current: new Date().getTime(),
			engine: 0,
			delta: 0,
			code: 0,
		};

		// frame

		this._frameSetting = {
			duration: 600,
			fps: 30,
		};

		this._frame = {
			current: 0,
			playing: false
		};

		this.seek( 0 );
		this.enableRender = true;

		// audio (DEV only)

		this._audioBuffer = null;

		// shader error handler (DEV only)

		if ( import.meta.env.DEV ) {

			// エラー発生時のハンドラー
			( window as any ).__glpowerShaderErrorHandler = ( error: any ) => {

				Engine.shaderErrorManager.addError( error );

			};

			// コンパイル成功時のハンドラー（そのシェーダーキーのエラーをクリア）
			( window as any ).__glpowerShaderClearHandler = ( shaderKey: string ) => {

				Engine.shaderErrorManager.clearErrorsByShaderKey( shaderKey );

			};

		}

		// root

		this._root = new MXP.Entity();
		this._root.initiator = "god";
		this._root.name = "root";
		this.add( this._root );

		this.field( "name", () => this.name, ( v ) => this.name = v );

		this.field( "scene", () => {

			const data = ProjectSerializer.serializeEntity( this._root );

			return data as unknown as MXP.SerializeFieldPrimitive;

		}, ( v ) => {

			ProjectSerializer.deserializeEntity( v as any, this._root );

		} );

		this.field( "overrides", () => {

			const data = ProjectSerializer.serializeEntityOverride( this._root );

			return data as unknown as MXP.SerializeFieldPrimitive;

		}, ( v ) => {

			ProjectSerializer.deserializeOverride( v as any, this._root, this._root );

		} );

		const tl = this.fieldDir( "timeline" );
		tl.field( "duration", () => this._frameSetting.duration, ( v ) => this._frameSetting.duration = v );
		tl.field( "fps", () => this._frameSetting.fps, ( v ) => this._frameSetting.fps = v );

		/*-------------------------------
			Register
		-------------------------------*/

	}

	public static getInstance( gl: WebGL2RenderingContext ) {

		const instance = this.instances.get( gl );

		if ( ! instance ) {

			throw new Error( "ERROR: NO ENGINE INSTANCE!!!" );

		}

		return instance;

	}

	/*-------------------------------
		Getters
	-------------------------------*/

	public get gl() {

		return this._gl;

	}

	public get canvas() {

		return this._canvas;

	}

	public get renderer() {

		return this._renderer;

	}

	public get root() {

		return this._root;

	}

	public get frame() {

		return this._frame;

	}

	public get time() {

		return this._time;

	}

	public get frameSetting() {

		return this._frameSetting;

	}

	public get uniforms() {

		return this._uniforms;

	}

	public get disposed() {

		return this._disposed;

	}

	public get projectCache() {

		return this._projectCache;

	}

	public get audioBuffer() {

		return this._audioBuffer;

	}

	/*-------------------------------
		Init Engine
	-------------------------------*/

	public init() {

		this._root.remove( this._renderer );
		this._root.disposeRecursive();
		this._root.add( this._renderer );

		this._root.position.set( 0, 0, 0 );
		this._root.euler.set( 0, 0, 0 );
		this._root.scale.set( 1, 1, 1 );
		this.add( this._root );

		this.name = "New Project";

	}

	/*-------------------------------
		Load Project
	-------------------------------*/

	public async load( project: OREngineProjectData ) {

		this.init();

		this.deserialize( project as any );

		this._projectCache = project || null;

		this.emit( "update/graph" );
		this.emit( "loaded" );

	}

	/*-------------------------------
		Apply Project Overrides
	-------------------------------*/

	/**
	 * プロジェクトデータのoverridesをターゲットエンティティに適用
	 * BLidgeで作成されたシーンにプロジェクト固有のコンポーネントを追加する際に使用
	 * @param targetRoot overridesを適用するターゲットエンティティ（通常はBLidgeで作成されたルート）
	 */
	public applyProjectOverrides( targetRoot: MXP.Entity ): void {

		if ( this._projectCache ) {

			ProjectSerializer.deserializeOverride(
				this._projectCache.overrides,
				this._root,
				targetRoot
			);

		}

	}

	/*-------------------------------
		Component Registration (DEV only)
	-------------------------------*/

	/**
	 * Musicコンポーネントを登録（DEV環境でのみ使用）
	 */
	public registerMusic( music: any ) {

		// MusicコンポーネントのイベントをリッスンしてaudioBufferを管理
		music.on( "update/music", ( buffer: AudioBuffer ) => {

			this._audioBuffer = buffer;

			// audioBufferが更新されたことを通知
			this.emit( "update/audioBuffer", [ buffer ] );

		} );

		// 登録されたことを通知（Editorなどが追加のリスナーを設定可能）
		this.emit( "register/music", [ music ] );

	}

	/**
	 * BLidgeClientコンポーネントを登録（DEV環境でのみ使用）
	 */
	public registerBLidgeClient( blidgeClient: BLidgeClient ) {

		// BLidgeClientのイベントをリッスンしてEngineを制御
		blidgeClient.on( "update/blidge/frame", ( e: any ) => {

			this.seek( e.current );

			if ( e.playing && ! this.frame.playing ) {

				this.play();

			} else if ( ! e.playing && this.frame.playing ) {

				this.stop();

			}

		} );

		// 登録されたことを通知
		this.emit( "register/blidgeClient", [ blidgeClient ] );

	}

	/*-------------------------------
		Update
	-------------------------------*/

	public update( param?: Partial<MXP.EntityUpdateEvent> ) {

		const newTime = new Date().getTime();
		this._time.delta = ( newTime - this._time.current ) / 1000;
		this._time.current = newTime;
		this._time.engine += this._time.delta;
		this._time.code += this._time.delta * ( this._frame.playing ? 1 : 0 );
		this._frame.current = this._time.code * this._frameSetting.fps;

		const event = this.createEntityUpdateEvent( { forceDraw: param?.forceDraw } );

		this._uniforms.uTime.value = this._time.code;
		this._uniforms.uTimeE.value = this._time.engine;

		this._root.update( event );

		if ( this.enableRender ) {

			this._renderer.render( this._root, event );

		}

		if ( this._frame.playing ) {

			this.emit( "update/frame/play", [ this._frame ] );

		}

		return this._time.delta;

	}

	/*-------------------------------
		CreateEntityUpdateEvent
	-------------------------------*/

	public createEntityUpdateEvent( overrideParams?: Partial<MXP.EntityUpdateEvent> ): MXP.EntityUpdateEvent {

		const defaultEvent: MXP.EntityUpdateEvent = {
			playing: this._frame.playing,
			timeElapsed: this._time.engine,
			timeDelta: this._time.delta,
			timeCode: this._time.code,
			timeCodeFrame: this._frame.current,
			resolution: this.renderer.resolution,
			renderer: this.renderer,
			forceDraw: false,
		};

		if ( overrideParams ) {

			return { ...defaultEvent, ...overrideParams };

		}

		return defaultEvent;

	}

	/*-------------------------------
		SetSize
	-------------------------------*/

	public setSize( resolution: GLP.Vector ) {

		this._renderer.resize( resolution );
		this._canvas.width = resolution.x;
		this._canvas.height = resolution.y;

	}

	/*-------------------------------
		Playback
	-------------------------------*/

	public play() {

		this._frame.playing = true;

		this._time.current = new Date().getTime();

		this.emit( "update/frame/play", [ this._frame ] );

	}

	public stop() {

		this._frame.playing = false;

		this.emit( "update/frame/play", [ this._frame ] );

	}

	public seek( frame: number ) {

		this._time.code = frame / this._frameSetting.fps;
		this._frame.current = frame;

		this.emit( "update/frame/play", [ this._frame ] );

	}

	/*-------------------------------
		CompileShaders
	-------------------------------*/

	public compileShaders( onProgress?: ( label: string, loaded: number, total: number ) => void ) {

		const event = this.createEntityUpdateEvent( { forceDraw: true } );

		return this.renderer.compileShaders( this._root, event, onProgress );

	}

	/*-------------------------------
		Dispose
	-------------------------------*/

	public dispose() {

		super.dispose();

		this._disposed = true;
		this._root.remove( this._renderer );
		this._root.disposeRecursive();

	}

}

// 初期化演算子を使うとterserに消されるのでこっちで初期化
Engine.resources = new Resources();
Engine.instances = new Map();
Engine.shaderErrorManager = new ShaderErrorManager();
