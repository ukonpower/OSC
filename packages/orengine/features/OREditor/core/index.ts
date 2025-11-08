import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Engine } from '../../OREngine/core';
import { FrameDebugger } from '../../OREngine/core/FrameDebugger';
import { Keyboard, PressedKeys } from '../../OREngine/core/Keyboard';

import { BASE_RESOLUTION } from '~/globals';

let ScenePointer: any = null;

if ( import.meta.env.DEV ) {

	ScenePointer = await import( './ScenePointer' ).then( m => m.ScenePointer );

}


export type EditorTimelineLoop = {
	enabled: boolean,
	start: number,
	end: number,
}

export class Editor extends MXP.Serializable {

	private _engine: Engine;
	private _keyBoard: Keyboard;
	private _selectedEntityId: string | null;
	private _frameLoop: EditorTimelineLoop;
	private _resolutionScale: number;
	private _viewType: "render" | "debug";
	private _frameDebugger: FrameDebugger;
	private _externalWindow: Window | null;
	private _externalCanvasBitmapContext: ImageBitmapRenderingContext | null;
	private _scenePointer: any;

	private _disposed: boolean;

	constructor( engine: Engine ) {

		super();

		this._engine = engine;
		this._viewType = "render";
		this._selectedEntityId = null;
		this._resolutionScale = 1.0;
		this._externalWindow = null;
		this._externalCanvasBitmapContext = null;
		this._disposed = false;

		// EditorRendererの場合、ワイヤーフレーム表示をデフォルトで有効化
		if ( import.meta.env.DEV && engine.renderer instanceof MXP.EditorRenderer ) {

			engine.renderer.showWireframe = true;

		}

		/*-------------------------------
			KeyEvents
		-------------------------------*/

		this._keyBoard = new Keyboard();

		this._keyBoard.on( "keydown", ( e: KeyboardEvent, pressedKeys: PressedKeys ) => {

			if ( ( pressedKeys[ "Meta" ] || pressedKeys[ "Control" ] ) && pressedKeys[ "s" ] ) {

				e.preventDefault();

				this.save();

			}

			if ( e.key == ' ' ) {

				if ( this._engine.frame.playing ) {

					this._engine.stop( );

				} else {

					this._engine.play();

				}

			}

		} );

		/*-------------------------------
			Frame Debugger
		-------------------------------*/

		this._frameDebugger = new FrameDebugger( engine );

		this.engine.renderer.on( 'drawPass', ( rt?: GLP.GLPowerFrameBuffer, label?: string ) => {

			if ( this._frameDebugger && this._frameDebugger.enable && rt ) {

				this._frameDebugger.push( rt, label );

			}

		} );

		/*-------------------------------
			Scene Pointer
		-------------------------------*/

		if ( import.meta.env.DEV && ScenePointer ) {

			this._scenePointer = new ScenePointer( engine, this );

		}

		/*-------------------------------
			BLidge Selection
		-------------------------------*/

		// BLidgeからの選択イベントをリッスン
		engine.on( "update/blidge/selection", ( entity: MXP.Entity ) => {

			this.selectEntity( entity );

		} );

		/*-------------------------------
			Loop
		-------------------------------*/

		this._frameLoop = {
			enabled: false,
			start: 0,
			end: 0,
		};

		/*-------------------------------
			Fields
		-------------------------------*/

		this.field( "enableRender", () => this._engine.enableRender, v => this._engine.enableRender = v );

		this.field( "resolutionScale", () => this._resolutionScale, v => {

			this._resolutionScale = Number( v );

			this._resize();

		} );

		this.field( "viewType", () => this._viewType, v => {

			this._viewType = v;

			if ( this._viewType === "debug" ) {

				this._frameDebugger.enable = true;

			} else {

				this._frameDebugger.enable = false;

			}

		} );

		const frameLoop = this.fieldDir( "frameLoop" );
		frameLoop.field( "enabled", () => this._frameLoop.enabled, v => this._frameLoop.enabled = v );
		frameLoop.field( "start", () => this._frameLoop.start, v => this._frameLoop.start = v );
		frameLoop.field( "end", () => this._frameLoop.end, v => this._frameLoop.end = v );

		// タイムラインの現在フレーム位置（エディタ固有の設定）
		this.field( "timelineCurrent", () => this.engine.frame.current, v => {

			this.engine.seek( v );

		} );

		this.field( "selectedEntityId", () => this._selectedEntityId, v => {

			this._selectedEntityId = v;

			// EditorRendererに選択情報を同期（開発環境のみ）
			if ( import.meta.env.DEV && this._engine.renderer instanceof MXP.EditorRenderer ) {

				this._engine.renderer.selectedEntityId = v;

			}

		} );

		// ワイヤーフレーム表示の切り替え（開発環境のみ）
		if ( import.meta.env.DEV ) {

			this.field( "showWireframe", () => {

				if ( engine.renderer instanceof MXP.EditorRenderer ) {

					return engine.renderer.showWireframe;

				}

				return false;

			}, v => {

				if ( engine.renderer instanceof MXP.EditorRenderer ) {

					engine.renderer.showWireframe = v;

				}

			} );

		}

		/*-------------------------------
			Animate
		-------------------------------*/

		this._animate();

	}

	/*-------------------------------
		Getters
	-------------------------------*/

	public get engine() {

		return this._engine;

	}

	public get audioBuffer() {

		return this._engine.audioBuffer;

	}

	public get disposed() {

		return this._disposed;

	}

	/*-------------------------------
		Animate
	-------------------------------*/

	private _animate() {

		if ( this._disposed ) return;

		// update

		this._engine.update();

		// window

		if ( this._externalCanvasBitmapContext ) {

			const context = this._externalCanvasBitmapContext;

			createImageBitmap( this.engine.canvas ).then( bitmap => {

				context.transferFromImageBitmap( bitmap );

			} );

		}

		// timeline

		if ( this._engine.frame.playing ) {

			// clamp 0

			if ( this._engine.frame.current < 0 || this._engine.frame.current > this._engine.frameSetting.duration ) {

				this._engine.seek( 0 );

			}

			// loop

			if ( this._frameLoop.enabled ) {

				if ( this._engine.frame.current < this._frameLoop.start || this._engine.frame.current > this._frameLoop.end ) {

					this._engine.seek( this._frameLoop.start );

				}

			}

		}

		// debugger

		if ( this._frameDebugger && this._frameDebugger.enable ) {

			this._frameDebugger.draw();

		}

		window.requestAnimationFrame( this._animate.bind( this ) );

	}

	/*-------------------------------
		Controls
	-------------------------------*/

	public selectEntity( entity: MXP.Entity | null ) {

		this.setField( "selectedEntityId", entity ? entity.uuid : null );

	}

	public createEntity( parentEntity: MXP.Entity, name: string ) {

		const newEntity = new MXP.Entity();
		newEntity.name = name;
		newEntity.initiator = "user";
		parentEntity.add( newEntity );

		return newEntity;

	}

	public deleteEntity( entity: MXP.Entity ) {

		entity.disposeRecursive();

		const parent = entity.parent;

		if ( parent ) {

			parent.remove( entity );

		}

	}

	/*-------------------------------
		Export
	-------------------------------*/

	public save() {

		this.emit( "save", [ this.exportEngine(), this.exportEditor() ] );

	}

	public exportEditor() {

		return this.serialize( { mode: "export" } );

	}

	public exportEngine() {

		return this._engine.serialize( { mode: "export" } );

	}

	/*-------------------------------
		External Window
	-------------------------------*/

	public openInExternalWindow() {

		this._externalWindow = window.open( "", "_blank" );

		if ( ! this._externalWindow ) return;

		const mirrorCanvas = this._externalWindow.document.createElement( "canvas" );
		mirrorCanvas.style.width = "100%";
		mirrorCanvas.style.height = "100%";
		mirrorCanvas.style.objectFit = "contain";
		mirrorCanvas.style.cursor = "none";

		this._externalWindow.document.body.style.margin = "0";
		this._externalWindow.document.body.style.background = "#000";
		this._externalWindow.document.body.appendChild( mirrorCanvas );
		this._externalCanvasBitmapContext = mirrorCanvas.getContext( "bitmaprenderer" );

		this._externalWindow.addEventListener( "unload", () => {

			this.closeExternalWindow();

		} );

		this._resize();

	}

	public closeExternalWindow() {

		if ( this._externalWindow ) {

			this._externalWindow.close();
			this._externalWindow = null;
			this._externalCanvasBitmapContext = null;

		}

	}

	/*-------------------------------
		Resize
	-------------------------------*/

	private _resize() {

		const resolution = BASE_RESOLUTION.clone().multiply( this._resolutionScale );

		this.engine.setSize( resolution );

		this._frameDebugger.resize( resolution );

		if ( this._externalCanvasBitmapContext ) {

			this._externalCanvasBitmapContext.canvas.width = resolution.x;
			this._externalCanvasBitmapContext.canvas.height = resolution.y;

		}

	}

	/*-------------------------------
		Dispose
	-------------------------------*/

	public dispose() {

		this._disposed = true;
		this._keyBoard.dispose();
		this._frameDebugger.dispose();

		if ( import.meta.env.DEV && this._scenePointer && this._scenePointer.dispose ) {

			this._scenePointer.dispose();

		}

	}

}
