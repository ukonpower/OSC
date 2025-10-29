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

// マグロの形状を定義
float maguro( vec3 p ) {

	vec3 maguroP = p;
	maguroP *= 0.8;
	maguroP.xz *= rotate( sin( -p.x - 0.3 + uTimeE * 1.0 ) * 0.5 * smoothstep( -1.0, 1.0, p.x )  );

	// ボデー

	vec3 pp = maguroP;
	pp.z *= 1.2;
	float d = sdVesicaSegment( pp, vec3( -0.5, 0.0, 0.0 ), vec3( 0.5, 0.0, 0.0 ), 0.2 * cos(pp.x + 0.5) );

	// 口

	pp = maguroP;
	pp += vec3( 0.5, -0.05, 0.0 );
	d = opSmoothSub( sdTriPrism( pp, vec2(0.14, 0.2) ), d, 0.0 );

	// ヒレ下

	pp = maguroP;
	pp += vec3( -0.1, 0.09, 0.0 );
	pp.x += pp.y * 0.3;
	pp.xy *= rotate( PI);
	d = opSmoothAdd( sdTriPrism( pp, vec2(0.14, 0.01) ) - 0.002, d, 0.04 );

	// ヒレ上

	pp = maguroP;
	pp += vec3( -0.1, -0.2, 0.0 );
	pp.x *= 1.2;
	pp.x -= pow(pp.y, 2.0 ) * 2.0;
	d = opSmoothAdd( sdTriPrism( pp, vec2(0.10, 0.001) ) - 0.002, d, 0.04 );

	// ヒレ横

	pp = maguroP;
	pp.z = abs( pp.z );
	pp += vec3( -0.0, 0.01, -0.14 );
	pp.y += pow(pp.x, 2.0 ) * 1.0;
	pp.x += 0.03;
	pp.xz *= rotate( 0.5 + sin( uTimeE * 3.0 - pp.x * 5.0) * 0.2 );
	pp.x -= 0.03;
	pp.xy *= rotate( - 1.7 );
	pp.y *= 0.5;
	d = opSmoothAdd( sdTriPrism( pp, vec2(0.05, 0.001) ) - 0.002, d, 0.01 );

	// ヒレ後ろ

	pp = maguroP;
	pp.y = abs( pp.y );
	pp.x -= pow(pp.y, 2.0 ) * 1.3;
	pp += vec3( -0.5, -0.05, 0.0 );
	pp.y *= 0.24;

	d = opSmoothAdd( sdTriPrism( pp, vec2(0.03, 0.01) ) - 0.002, d, 0.04 );

	// ギザギザ

	pp = maguroP;
	pp.y = abs( pp.y );
	float w = cos( pp.x * PI );
	pp.y -= w * 0.17;
	pp.x = mod( pp.x, 0.05 ) - 0.025;
	float s = smoothstep( 0.15, 0.1, abs( maguroP.x - 0.3 ) );
	d = opSmoothAdd( sdTriPrism( pp, vec2(0.015 * s, 0.005 * s) ), d, 0.01 );

	return d;

}

// マグロブロックの形状を定義
float maguroBlock( vec3 p ) {

	vec3 blockP = p;
	blockP.y -= 0.05;
	blockP.x *= 1.2;
	blockP.z *= 1.5;
	blockP.x += texture( uNoiseTex, (blockP.xz + blockP.x)  * 0.4).x * 0.05;

	blockP.z += fract( length( (blockP.xy + vec2( -0.02, 0.0 )) * vec2( 1.0, 1.2 ) * (1.0 + length( blockP.xy ) * 1.5 ) ) * 40.0 ) * 0.002;

	vec3 pp = blockP;
	pp.yz *= rotate( HPI );
	pp.z += 0.89;
	float d = sdCappedCylinder( pp, 1.0, 0.2 );

	pp = blockP;
	pp.y += 0.14;
	pp.xy *= rotate( 0.5 );
	d = opAnd( d, sdBox( pp, vec3( 0.1 ) ) - 0.05 );
	d -= 0.01;

	pp = blockP;
	pp.z = abs(pp.z);
	pp.z -= 0.23;

	d = opSub( d, sdBox( pp, vec3( 1.0, 1.0, 0.1 ) ));

	return d;

}

SDFResult D( vec3 p ) {

	float mgr = maguro( p );
	mgr = opSmoothSub( sdBox( p + vec3( 1.8 - uState.x * 2.1, 0.0, 0.0 ), vec3( 1.0, 0.5, 0.5 ) ), mgr, 0.0 );

	float blk = maguroBlock( p * mix( 1.0 , 0.4, uState.y ) );
	blk = opSmoothSub( sdBox( p + vec3( -1.8 + uState.z * 2.1, 0.0, 0.0 ), vec3( 1.0, 0.5, 0.5 ) ), blk, 0.0 );


	float d = opSmoothAdd( mgr, blk, 0.10 );

	float matID = mgr < blk ? 0.0 : 1.0;

	return SDFResult(
		d,
		p,
		matID
	);

}

#include <subsurface>
#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>

	SDFResult dist;

	bool hit = false;

	for( int i = 0; i < 128; i++ ) {

		dist = D( rayPos );
		rayPos += dist.d * rayDir * 0.7;

		if( dist.d < 0.001 ) {

			hit = true;
			break;

		}

	}

	if( !hit ) discard;

	outNormal = N( rayPos, 0.01 );

	#include <rm_out_obj>

	// ノイズテクスチャを取得
	vec2 noiseUV = rayPos.xy * 0.5 + 0.5;
	vec4 n1 = texture(uNoiseTex, noiseUV);
	vec4 n2 = texture(uNoiseTex, noiseUV * 4.0 );
	vec4 n3 = texture(uNoiseTex, noiseUV * 1.0 + n1.xy);

	float dnv = dot( rayDir, -outNormal.xyz );

	// マテリアルIDに応じた処理
	if( dist.mat < 0.5 ) {
		// マグロ本体 (mat=0.0)
		outRoughness = smoothstep( 0.2, 1.0, n1.r );
		outNormal = normalize( outNormal + n3.xyz * 0.3 );

		vec3 c = vec3( 1.0 );
		float kuro = smoothstep( 0.01 , 0.08, rayPos.y - cos( rayPos.x * PI + 0.15 ) * 0.06 - n2.x * 0.05 + 0.04 );
		c.xyz = mix(c, vec3( 0.0 ), kuro );
		outColor.xyz = c;
		outFlatness = kuro;
		outMetalic = 0.2;
	} else {

		// マグロブロック (mat=1.0)
		float sss = subsurface( rayPos, normalize( (vec4( 0.0, 1.0, 0.0, 0.0 ) * uModelViewMatrix).xyz ), 0.3);

		outRoughness = 0.5;
		outNormal = normalize( outNormal + n3.xyz * 0.1 );

		float kuro = smoothstep( 0.35, 0.1, length( rayPos.xy + vec2( -0.08, -0.11 ) ) );
		float kawal = length( rayPos.xy + vec2( 0.05, -1.25 ) );
		float kawa = smoothstep( 1.398, 1.415, kawal );
		float kawaSoto = smoothstep( 1.42, 1.435, kawal );

		outColor.xyz = mix( vec3( 1.0, 0.1, 0.1 ), vec3( 0.6, 0.0, 0.0 ), kuro );
		outEmission.xyz += vec3( 0.9, 0.1, 0.2 ) * sss * 1.7 * ( 1.0 - kawa);
		outFlatness = -1.0;
		outMetalic = 0.0;
		outRoughness = 0.2;


		outColor.xyz = mix( outColor.xyz, vec3( 1.0, 0.7, 0.7 ), kawa );
		outColor.xyz = mix( outColor.xyz, vec3( 0.0 ), kawaSoto );
	}


	#include <frag_out>


}
