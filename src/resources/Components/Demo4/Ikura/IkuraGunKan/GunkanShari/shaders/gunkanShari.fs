#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <rm_h>
#include <sdf>
#include <noise_cyclic>
#include <rotate>

uniform sampler2D uNoiseTex;
uniform float uTime;
uniform vec4 uState;

float daenScale = 0.7;

// シャリ部分
SDFResult shari( vec3 p ) {

	vec3 shariP = p;
	shariP.z *= daenScale;

	vec4 noise = texture( uNoiseTex, shariP.xz * 0.5 + 0.5 );
	shariP.y -= noise.y * 0.05 - 0.1;

	float d = sdCappedCylinder(shariP, 0.25, 0.08);


	return SDFResult( d, p, 0.0, vec4( 0.95, 0.93, 0.88, 1.0 ) );

}

// 海苔部分
SDFResult nori( vec3 p ) {

	vec3 noriPos = p - vec3(0.0, 0.0, 0.0);
	noriPos.z *= daenScale;

	// 海苔の表面テクスチャ（ノイズで凹凸）
	vec3 noise = noiseCyc(p * 30.0);
	float heightMap = noise.x * 0.003;

	// 海苔のシェル形状 - 外側の円柱
	float noriOuter = sdCappedCylinder(noriPos, heightMap + 0.26, 0.15);
	float noriInner = sdCappedCylinder(noriPos, heightMap + 0.255, 0.16);
	float d = max(noriOuter, -noriInner);


	return SDFResult( d, p, 1.0, vec4( 0.05, 0.08, 0.05, 1.0 ) );

}

// スライスきゅうり部分
SDFResult kyuuri( vec3 p ) {

	float comp = uState.x;

	vec3 kyuuriP = p;
	// kyuuriP.x += uState.x * 0.1;
	kyuuriP += vec3(0.0, -0.14, 0.2);
	kyuuriP.y += -uState.x * 0.4;
	kyuuriP.xz *= rotate( comp * 0.5 );
	kyuuriP.yz *= rotate( 0.3 + comp * 1.0 );
	kyuuriP.xy *= rotate( 0.3 + comp * 1.0 );

	kyuuriP.y -= sin( kyuuriP.z * 4.0 + HPI ) * 0.05 - 0.04;
	kyuuriP.z *= 0.8;


	// きゅうりの表面の凹凸
	vec3 noise = noiseCyc(kyuuriP * 40.0);
	float heightMap = noise.x * 0.002;

	// スライスされた円柱（薄い円盤）
	float d = sdCappedCylinder(kyuuriP, heightMap + 0.2, 0.015);

	vec3 color = vec3( 0.4, 0.7, 0.3 );
	color = mix( color, vec3( 0.05, 0.08, 0.05 ), smoothstep( 0.00, 0.3, length( kyuuriP.xz ) ) );
	color = mix( color, vec3( 0.05, 0.08, 0.05 ), smoothstep( 0.19, 0.205, length( kyuuriP.xz ) ) );

	return SDFResult( d, kyuuriP, 2.0, vec4( color, 1.0 ) );

}

SDFResult D( vec3 p ) {

	SDFResult distShari = shari( p );
	SDFResult result = distShari;

	SDFResult distNori = nori( p );
	if( distNori.d < result.d ) result = distNori;

	SDFResult distKyuuri = kyuuri( p );
	if( distKyuuri.d < result.d ) result = distKyuuri;

	return result;

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>


	#include <rm_loop,64,0.001,1.0>

	if( !hit ) discard;

	outNormal = N( rayPos, 0.01 );

	#include <rm_out_obj>

	// SDFResultから渡された色を使用
	outColor.xyz = dist.matparam.xyz;
	outEmission = vec3( 0.0 );
	outRoughness = 0.8;
	outMetalic = 0.0;

	if( dist.mat == 0.0 ) {

		// シャリ（白いご飯）
		outRoughness = 0.8;

	} else if( dist.mat == 1.0 ) {

		// 海苔（黒緑色）
		float variation = noiseCyc(rayPos * 20.0).x * 0.05;
		outColor.xyz += variation;
		outRoughness = 0.9;

	} else if( dist.mat == 2.0 ) {

		// きゅうり（緑色）
		float variation = noiseCyc(dist.pos * 25.0).x * 0.08;
		outColor.xyz += variation;
		outRoughness = 0.7;

	}

	// 距離に応じたフェードアウト
	outColor.xyz *= smoothstep( 2.0, 0.5, length( rayPos ) );

	#include <frag_out>

}
