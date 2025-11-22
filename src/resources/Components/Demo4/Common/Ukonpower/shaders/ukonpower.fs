#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

#include <rm_h>

SDFResult D( vec3 p ) {

	vec3 pp = p;

	// たこ焼き風の球体を描画
	float baseRadius = 0.40 + noiseValue( pp * 5.0 ) * 0.01;
	float bodyRadius = baseRadius + fbm( pp * 20.0 ) * 0.01;

	vec2 d = vec2( sdSphere( pp, bodyRadius ), 0.0 );

	// eye
	// 黒い丸
	float eyeSize = 0.01;
	float eyeDepth = 0.02;
	vec3 eyeOffset = vec3( 0.05, 0.2, -0.33 );

	// 左目
	vec3 leftEyePos = pp - eyeOffset * vec3( 1.0, 1.0, 1.0 );
	float leftEye = sdSphere( leftEyePos, eyeSize ) - eyeDepth;

	// 右目
	vec3 rightEyePos = pp - eyeOffset * vec3( -1.0, 1.0, 1.0 );
	float rightEye = sdSphere( rightEyePos, eyeSize ) - eyeDepth;

	// 目を本体に結合（matを2.0に設定）
	vec2 eyes = vec2( min( leftEye, rightEye ), 2.0 );
	d = d.x < eyes.x ? d : eyes;

	return SDFResult(
		d.x,
		p,
		d.y,
		vec4(0.0)
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>

	SDFResult dist;

	bool hit = false;

	#include <rm_loop,32,0.001,1.0>

	if( !hit ) discard;

	outNormal = N( rayPos, 0.01 );

	#include <rm_out_obj>

	outRoughness = 1.0;
	outMetalic = 0.0;

	if( dist.mat == 0.0 ) {

		// たこ焼き本体
		outColor.xyz = mix( vec3( 0.8, 0.6, 0.4 ), vec3( 0.3, 0.15, 0.05 ), smoothstep( 0.3, 0.7, fbm( dist.pos * 3.0 ) ) );
		outRoughness = 0.3;

	} else if( dist.mat == 1.0 ) {

		// ソース
		outColor.xyz = vec3( 0.15, 0.03, 0.00 );
		outRoughness = 0.1;

	} else if( dist.mat == 2.0 ) {

		// 目（黒い丸）
		outColor.xyz = vec3( 0.02 );
		outRoughness = 0.2;

	}

	// リムライト効果
	float limLight = ( 1.0 - dot( outNormal.xyz, -rayDir ) ) * 0.8;
	outEmission += limLight * 0.3;

	#include <frag_out>


}
