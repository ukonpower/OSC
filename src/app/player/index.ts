import * as GLP from 'glpower';
import { Engine } from 'orengine';

import SceneData from '../../../data/project.json';

import { BASE_RESOLUTION, gl } from '~/globals';
import { initResouces } from '~/resources';
import { BLidgeClient } from '~/resources/Components/Utilities/BLidgeClient';


/*-------------------------------
	Resources
-------------------------------*/

initResouces();

/*-------------------------------
	HTML
-------------------------------*/

// HTML/CSS最小化（64KB制約のため）
const s = "position:absolute;width:100%;height:100%;";
const f = "display:flex;justify-content:center;align-items:center";
document.body.innerHTML = `<style>*{color:#fff;font-size:13px;text-align:center}body{margin:0;font-family:sans-serif}button{display:block;width:200px;margin:0 auto 10px;padding:10px;border:1px solid #fff;background:0;cursor:pointer}#r{${s + f};overflow:hidden;background:#000}#cw,#l,#m,#e{pointer-events:none}#cw{${s + f};opacity:0}canvas{${s}object-fit:contain}#l{position:absolute;width:100%}#b{width:100%;height:1px;background:#fff;margin-bottom:10px}#t{font-size:11px;margin-top:5px}#m,#e{opacity:0}#e{${s + f}}</style><div id=r><div id=cw></div><div id=m><button id=fl>1. Full Screen</button><button id=pl>2. Play!</button></div><div id=l><div id=b></div><div id=t></div></div><div id=e>Press Esc to exit.</div></div>`;
document.title = "OSC";

/*-------------------------------
	DOM
-------------------------------*/

const rootElm = document.getElementById( 'r' )!;
const screenWrapElm = document.getElementById( 'cw' )!;
const menuElm = document.getElementById( 'm' )!;
const loadingElm = document.getElementById( 'l' )!;
const loadingBarElm = document.getElementById( 'b' )!;
const loadingTextElm = document.getElementById( 't' )!;
const exitElm = document.getElementById( 'e' )!;

/*-------------------------------
	Engine
-------------------------------*/

const engine = new Engine( gl );
engine.setSize( BASE_RESOLUTION );

// canvas
if ( engine.canvas instanceof HTMLCanvasElement ) screenWrapElm.appendChild( engine.canvas );

/*-------------------------------
	Full Screen
-------------------------------*/

( document.getElementById( 'fl' ) as HTMLButtonElement ).onclick = () => {

	if ( document.documentElement.requestFullscreen ) document.documentElement.requestFullscreen();

};

/*-------------------------------
	Play
-------------------------------*/

const playButton = document.getElementById( 'pl' ) as HTMLButtonElement;
playButton.disabled = true;

playButton.onclick = () => {

	const ms = menuElm.style;
	ms.opacity = "0";
	ms.pointerEvents = "none";
	screenWrapElm.style.opacity = '1';
	rootElm.style.cursor = 'none';
	engine.play();

	// ウィンドウクリックでシーク
	window.onclick = ( e ) => {

		const ratio = e.clientX / window.innerWidth;
		const targetFrame = Math.floor( ratio * engine.frameSetting.duration );
		engine.seek( targetFrame );

	};

	// アニメーション関数
	const animate = () => {

		engine.update();

		if ( engine.frame.current > engine.frameSetting.duration ) {

			exitElm.style.opacity = '1';
			return;

		}

		requestAnimationFrame( animate );

	};

	animate();

};


/*-------------------------------
	Load
-------------------------------*/

engine.load( SceneData );

const blidgeClient = engine.root.getComponent( BLidgeClient );

if ( blidgeClient ) {

	blidgeClient.on( "loaded", () => {

		setTimeout( () => {

			engine.compileShaders( ( label, loaded, total ) => {

				loadingBarElm.style.transform = `scaleX(${loaded / total})`;
				loadingTextElm.textContent = label;

			} ).then( () => {

				const ls = loadingElm.style;
				const ms = menuElm.style;
				ls.opacity = "0";
				ms.opacity = "1";
				ms.pointerEvents = "auto";
				playButton.disabled = false;

			} );

		}, 100 );


	} );

}


