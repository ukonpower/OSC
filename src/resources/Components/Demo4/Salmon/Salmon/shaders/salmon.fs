#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <random>
#include <noise_cyclic>
#include <noise_value>
#include <rm_h>

uniform mat4 uModelViewMatrix;

uniform float uTimeE;
uniform sampler2D uNoiseTex;
uniform vec4 uState;

// サーモンの形状を定義
float salmon( vec3 p ) {

	vec3 salmonP = p;
	salmonP *= 0.8;
	salmonP.y -= 0.05;
	salmonP.xz *= rotate( sin( -p.x - 0.3 + uTimeE * 12.0 ) * 0.5 * smoothstep( -1.0, 1.0, p.x )  );

	// ボデー

	vec3 pp = salmonP;
	pp.z *= 1.3;
	pp.y += cos( pp.x * PI  ) * 0.05;
	float d = sdVesicaSegment( pp, vec3( -0.5, 0.0, 0.0 ), vec3( 0.5, 0.0, 0.0 ), 0.13 * cos(pp.x + 0.5) );

	// 口

	pp = salmonP;
	pp += vec3( 0.5, 0.000, 0.0 );
	pp.y += pow( pp.x * 1.0, 2.0 ) * 1.5;
	pp.x *= 0.10;
	d = opSmoothSub( sdTriPrism( pp, vec2(0.022, 0.2) ), d, 0.0 );

	// ヒレ下

	pp = salmonP;
	pp += vec3( -0.26, 0.13, 0.0 );
	pp.x *= 0.5;
	pp.x -= pow( pp.y, 2.0 ) * 5.0;
	pp.xy *= rotate( PI + 0.6 );
	pp.x -= pow(pp.y, 2.0 ) * 1.0;
	d = opSmoothAdd( sdTriPrism( pp, vec2(0.05, 0.001) ) - 0.002, d, 0.01 );

	// ヒレ上

	pp = salmonP;
	pp += vec3( -0.03, -0.07, 0.0 );
	pp.x *= 0.5;
	pp.x -= pow( pp.y, 2.0 ) * 6.0;
	pp.x -= pow(pp.y, 2.0 ) * 1.0;
	d = opSmoothAdd( sdTriPrism( pp, vec2(0.065, 0.001) ) - 0.002, d, 0.01 );

	// ヒレ横

	pp = salmonP;
	pp.z = abs( pp.z );
	pp += vec3( 0.14, 0.09, -0.08 );
	pp.y += pow(pp.x, 2.0 ) * 1.0;
	pp.x += 0.03;
	pp.xz *= rotate( 0.5 + sin( uTimeE * 3.0 - pp.x * 5.0) * 0.2 );
	pp.x -= 0.03;
	pp.xy *= rotate( - 1.7 );
	pp.y *= 0.3;
	d = opSmoothAdd( sdBox( pp, vec3(0.02 + pp.y * 0.5, 0.03 - pp.x * 0.3, 0.001) ), d, 0.01 );

	// ヒレ後ろ

	pp = salmonP;

	pp.y = abs( pp.y );
	pp.x -= pow(pp.y, 1.19 ) * 1.3;
	pp += vec3( -0.48, -0.00, 0.0 );
	pp.xy *= rotate( -0.0 );
	// pp.y *= 0.4;

	d = opSmoothAdd( sdTriPrism( pp, vec2(0.1, 0.001) ) - 0.002, d, 0.07 );


	return d;

}

// サーモンブロックの形状を定義
// BLOCK_KIRIMIまたはBLOCK_SAKUのdefineで形状を切り替え可能
vec4 salmonBlock( vec3 p ) {

	vec3 blockP = p;
	blockP *= 0.4;

	vec3 pp;
	vec3 bodyP;
	float d = 0.0;

	#ifdef BLOCK_KIRIMI
	
		blockP.x += texture( uNoiseTex, (blockP.xz + blockP.x)  * 0.4).x * 0.05;
		blockP.x -= 0.05;
		blockP.y += 0.05;

		pp = blockP;
		pp.y *= 1.0 + cos( pp.x * PI * 1.3 - 0.6 );
		pp.yz *= rotate( HPI );
		bodyP = pp;
		d = sdCappedCylinder( pp, 0.2, 0.02 );
		d = opSmoothSub( sdBox( blockP + vec3( 0.1, 0.5, 0.0 ), vec3( 0.5, 0.5, 0.5 ) ), d, 0.02 );

		pp = blockP;
		pp.y += 0.15;
		pp.x -= 0.02;
		pp.yz *= rotate( HPI );
		d = opSmoothSub( sdCappedCylinder( pp, 0.18, 0.5 ), d, 0.01 );
		
	#endif

	#ifdef BLOCK_SAKU

		blockP.yz *= rotate( 0.5 );
		blockP.z += sin( - uTimeE * 6.0 + blockP.x * 8.0 ) * 0.03;
		blockP.y += ( texture( uNoiseTex, (blockP.xz + blockP.x)  * 0.3).x - 0.3 ) * 0.03;
		blockP.z += ( texture( uNoiseTex, (blockP.xy + blockP.x)  * 0.1).y - 0.3 ) * 0.03;

		pp = blockP;
		bodyP = pp;


		pp.y += pp.z * 0.3;

		d = sdBox( pp, vec3( 0.15, 0.07, 0.03) );
	
	#endif

	return vec4( d, bodyP );

}

SDFResult D( vec3 p ) {

	float slm = salmon( p );
	slm = opSmoothSub( sdBox( p + vec3( 1.8 - uState.x * 2.1, 0.0, 0.0 ), vec3( 1.0, 0.5, 0.5 ) ), slm, 0.0 );

	vec4 blk = salmonBlock( p );
	blk.x = opSmoothSub( sdBox( p + vec3( -2.0 + 1.8 - uState.x * 2.1, 0.0, 0.0 ), vec3( 1.0, 0.5, 0.5 ) ), blk.x, 0.0 );

	float d = opAdd( slm, blk.x );

	float matID = slm < blk.x ? 0.0 : 1.0;


	return SDFResult(
		d,
		p,
		matID,
		vec4(blk.y, blk.yzw)
	);

}

#include <subsurface>
#include <rm_normal>

void main( void ) {

	// uState.yが1の時は何も表示しない
	if( uState.y >= 1.0 ) discard;

	#include <frag_in>
	#include <rm_ray_obj>

	SDFResult dist;

	bool hit = false;

	#include <rm_loop,32,0.001,0.7>

	if( !hit ) discard;

	outNormal = N( rayPos, 0.01 );

	#include <rm_out_obj>

	// ノイズテクスチャを取得
	vec3 rp = dist.matparam.yxz;
	rp.yz *= rotate( 0.5 );
	vec2 noiseUV = rp.yz * 0.5 + 0.5;
	vec4 n1 = texture(uNoiseTex, noiseUV);
	vec4 n2 = texture(uNoiseTex, noiseUV * 4.0 );
	vec4 n3 = texture(uNoiseTex, noiseUV * 1.0 + n1.xy);
	vec4 n4 = texture(uNoiseTex, rayPos.xz * 1.0 - 0.5 );

	float dnv = dot( rayDir, -outNormal.xyz );

	// マテリアルIDに応じた処理
	if( dist.mat < 0.5 ) {
		// サーモン本体 (mat=0.0)
		outRoughness = smoothstep( 0.2, 1.0, n1.r );
		outNormal = normalize( outNormal + n2.xyz * 0.3 );

		vec3 c = vec3( 1.0 );
		float kuro = smoothstep( 0.01 , 0.08, rayPos.y - cos( rayPos.x * PI + 0.15 ) * 0.06 - n2.x * 0.05 + 0.04 );
		c.xyz = mix(c, vec3( 0.5 ), kuro );
		outColor.xyz = c;
		outMetalic = 0.2;
	} else {

		// サーモンブロック (mat=1.0)
		float sss = subsurface( rayPos, normalize( (vec4( 0.0, 1.0, 0.0, 0.0 ) * uModelViewMatrix).xyz ), 0.15);

		outRoughness = 0.5;
		outNormal = normalize( outNormal + n2.xyz * 0.5 );

		float kawal = length( dist.matparam.yzw );
		float kawa = smoothstep( 0.19, 0.2, kawal );

		outColor.xyz = vec3( 1.0, 0.4, 0.2 );
		outEmission.xyz += vec3( 1.0, 0.4, 0.1 ) * sss * 1.7 * ( 1.0 - kawa );
		outMetalic = 0.1;
		outRoughness = 0.2;

		
		vec3 bodyP = dist.matparam.yzw;
		
		float line = fract( length( bodyP * vec3( 2.0, 1.0, 1.0 ) + vec3( 0.05 + sin( bodyP.y ), 0.0, 0.0 ) ) * 30.0 );
		line = smoothstep( 0.5, 1.0, line );
		outColor.xyz += line * 0.1;
		outColor.xyz = mix( outColor.xyz, vec3( 0.9  ) * smoothstep( -0.4, 0.8, rayPos.x ), kawa );

	}


	#include <frag_out>


}
