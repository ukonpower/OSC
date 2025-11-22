
import { CollectedLights } from 'packages/maxpower/Component/Renderer';

import common from './shaderModules/common.module.glsl';
import hash from './shaderModules/hash.module.glsl';
import light from './shaderModules/light.module.glsl';
import matrix from './shaderModules/matrix.module.glsl';
import noiseCyclic from './shaderModules/noiseCyclic.module.glsl';
import noiseSimplex from './shaderModules/noiseSimplex.module.glsl';
import noiseValue from './shaderModules/noiseValue.module.glsl';
import pmrem from './shaderModules/pmrem.module.glsl';
import random from './shaderModules/random.module.glsl';
import raymarch_normal from './shaderModules/raymarch_normal.module.glsl';
import rotate from './shaderModules/rotate.module.glsl';
import sdf from './shaderModules/sdf.module.glsl';
import subsurface from './shaderModules/subsurface.module.glsl';
import frag_h from './shaderParts/frag_h.part.glsl';
import frag_in from './shaderParts/frag_in.part.glsl';
import frag_out from './shaderParts/frag_out.part.glsl';
import lighting_env from './shaderParts/lighting_env.part.glsl';
import lighting_forwardIn from './shaderParts/lighting_forwardIn.part.glsl';
import lighting_light from './shaderParts/lighting_light.part.glsl';
import raymarch_h from './shaderParts/raymarch_h.part.glsl';
import raymarch_out_obj from './shaderParts/raymarch_out_obj.part.glsl';
import raymarch_ray_object from './shaderParts/raymarch_ray_object.part.glsl';
import raymarch_ray_screen from './shaderParts/raymarch_ray_screen.part.glsl';
import uniformTime from './shaderParts/uniform_time.part.glsl';
import raymarch_loop from './shaderParts/raymarch_loop.part.glsl';
import vert_h from './shaderParts/vert_h.part.glsl';
import vert_in from './shaderParts/vert_in.part.glsl';
import vert_out from './shaderParts/vert_out.part.glsl';

type Defines = {[key:string]: number | string} | undefined;

export const shaderInsertDefines = ( shader: string, defines: Defines ) => {

	if ( ! defines ) return shader;

	const keys = Object.keys( defines );

	let res = "";

	for ( let i = 0; i < keys.length; i ++ ) {

		res += "#define " + keys[ i ] + ' ' + defines[ keys[ i ] ] + "\n";

	}

	res = res + shader;

	return res;

};

export const shaderInclude = ( shader: string ) => {

	const dict = new Map<string, string>( [
		[ "common", common ],
		[ "hash", hash ],
		[ "sdf", sdf ],
		[ "rotate", rotate ],
		[ "matrix", matrix ],
		[ "random", random ],
		[ "noise_simplex", noiseSimplex ],
		[ "noise_cyclic", noiseCyclic ],
		[ "noise_value", noiseValue ],
		[ "light", light ],
		[ "lighting_light", lighting_light ],
		[ "lighting_env", lighting_env ],
		[ "lighting_forwardIn", lighting_forwardIn ],
		[ "vert_h", vert_h ],
		[ "vert_in", vert_in ],
		[ "vert_out", vert_out ],
		[ "frag_h", frag_h ],
		[ "frag_in", frag_in ],
		[ "frag_out", frag_out ],
		[ "rm_h", raymarch_h ],
		[ "rm_normal", raymarch_normal ],
		[ "rm_ray_obj", raymarch_ray_object ],
		[ "rm_ray_screen", raymarch_ray_screen ],
		[ "rm_out_obj", raymarch_out_obj ],
		[ "rm_loop", raymarch_loop ],
		[ "uni_time", uniformTime ],
		[ "pmrem", pmrem ],
		[ "subsurface", subsurface ],
	] );

	shader = shader.replace( /#include\s?<([\S]*)>/g, ( _: string, body: string ) => {

		let str = "";

		// パラメータ付きincludeの解析: <name,param1,param2,...>
		const parts = body.split( ',' );
		const moduleName = parts[ 0 ];
		const params = parts.slice( 1 );

		let module = dict.get( moduleName ) || '';

		module = module.replace( /#define GLSLIFY .*\n/g, "" );

		// パラメータの置換: ARG1, ARG2, ARG3, ...
		for ( let i = 0; i < params.length; i++ ) {
			if ( params[ i ] ) {
				module = module.replace( new RegExp( 'ARG' + ( i + 1 ), 'g' ), params[ i ] );
			}
		}

		str += module;

		return str;

	} );

	return shader;

};

const shaderInsertLights = ( shader: string, lights?: CollectedLights ) => {

	shader = shader.replaceAll( 'NUM_LIGHT_DIR', lights ? lights.directional.length.toString() : "0" );
	shader = shader.replaceAll( 'NUM_SHADOWMAP_DIR', lights ? Math.min( 2, lights.directional.filter( ( light ) => light.component.castShadow ).length ).toString() : "0" );

	shader = shader.replaceAll( 'NUM_LIGHT_SPOT', lights ? lights.spot.length.toString() : "0" );
	shader = shader.replaceAll( 'NUM_SHADOWMAP_SPOT', lights ? Math.min( 2, lights.spot.filter( ( light ) => light.component.castShadow ).length ).toString() : "0" );

	return shader;

};

const shaderUnrollLoop = ( shader: string ) => {

	shader = shader.replace( /#pragma\sloop_start\s(\d+)*([\s\S]+?)#pragma\sloop_end/g, ( _: string, loop: string, body: string ) => {

		let str = "";

		for ( let i = 0; i < Number( loop ); i ++ ) {

			str += body.replaceAll( 'LOOP_INDEX', i.toString() );

		}

		return str;

	} );

	return shader;

};

export const shaderParse = ( shader: string, defines?: Defines, lights?: CollectedLights ) => {

	shader = shaderInsertDefines( shader, defines );
	shader = "#version 300 es\nprecision highp float;\n" + shader;

	shader = shaderInclude( shader );
	shader = shaderInsertLights( shader, lights );
	shader = shaderUnrollLoop( shader );
	shader = shader.replace( /#define GLSLIFY .*\n/g, "" );

	return shader;

};
