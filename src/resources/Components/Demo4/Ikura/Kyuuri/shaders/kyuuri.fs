#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

#include <rm_h>

uniform float uTime;

SDFResult D( vec3 p ) {

	vec3 pp = p;

	// きゅうりの基本形状 - カプセル
	float h = 0.8;
	float hh = h / 2.0;
	pp.y += hh;

	float r = 0.09;
	r *=  mix( 1.0, 0.7, linearstep( -hh, hh, ( p.y ) ));
	// r *=  mix( 1.0, 1.0, smoothstep( hh * 0.98, hh * 1.00, abs( p.y ) ));

	float wave = (sin( atan2( p.x, p.z ) * PI * 3.0 ) * 0.5 + 0.5);
	r *= mix( 1.0, 0.9, wave * smoothstep( hh, 0.0, abs( p.y ) ) );
	
	pp.x += cos( p.y * 2.0 ) * 0.04;
	
	float cylinder = sdVerticalCapsule(pp, h, r); // 高さ1.0、半径0.15のカプセル

	// 表面のイボイボ（ノイズで凹凸を追加）
	float bumps = noiseCyc(pp * 15.0 + uTime * 0.1).x * 0.005;

	// きゅうりの形状にイボイボを追加
	float d = cylinder - bumps;

	return SDFResult(
		d,
		p,
		0.0,
		vec4(0.0)
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>



	#include <rm_loop,128,0.001,1.0>

	if( !hit ) discard;

	outNormal = N( rayPos, 0.01 );

	#include <rm_out_obj>

	// きゅうりの緑色 - ベースカラーとイボイボで色の濃淡
	vec3 baseColor = vec3( 0.01, 0.3, 0.01 );
	vec3 noiseCyc = noiseCyc(rayPos * 10.0);
	float noiseVal = noiseValue(rayPos * 5.0);
	
	vec3 c = baseColor * mix( 1.0, 0., noiseVal );
	c = c * mix( 1.0, 0.5, noiseCyc.y );

	outRoughness = 0.4 + noiseCyc.y;
	outNormal = normalize( outNormal + noiseCyc.xyz * 0.4 );
	outMetalic = 0.1;

	outColor.xyz = c;
	outColor.xyz *= smoothstep( 1.5, 0.4, length( rayPos ) );

	#include <frag_out>

}
