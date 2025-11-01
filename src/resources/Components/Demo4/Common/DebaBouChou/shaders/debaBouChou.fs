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

uniform float uTimeE;
uniform sampler2D uNoiseTex;

SDFResult D( vec3 p ) {

	vec3 knifeP = p;
	knifeP.y -= 0.6;

	vec2 d = vec2( 100.0, 1.0 ); // マテリアルID: 1=刃

	// 刃の部分
	vec3 pp = knifeP;
	pp.yz *= rotate( HPI );
	pp.xyz *= 0.7;
	pp.z += - 0.13;
	pp.z *= 0.1 + length(pp.z * 0.5);
	pp.x -= pow(pp.z, 3.0) * 0.3;
	
	vec3 pp1 = pp + vec3( -0.4, 0.0, 0.0 );
	vec3 pp2 = pp + vec3( 0.4, 0.0, 0.0 );

	float h = 0.01 * linearstep( 0.09, 0.02, length( max( vec2( 0.0 ), pp.xz ) * vec2( 1.0, 0.3 ) ) );
	
	float cylinder1 = sdCappedCylinder( pp1, 0.5, h );
	float cylinder2 = sdCappedCylinder( pp2, 0.5, h );

	d.x = opAnd( cylinder1, cylinder2 );
	d.x = opAnd( d.x, sdBox( pp + vec3( 0.0, 0.0, 0.49 ), vec3( 0.5 ) ) );

	d.x = opSmoothSub( sdBox( pp + vec3( -0.08, 0.0, -0.10 ), vec3( 0.1 ) ), d.x, 0.0 );

	// 柄（持ち手）の部分
	pp = knifeP;
	pp.x += 0.03;
	pp.y += 0.6;
	pp.x += 0.05;
	d = opAdd( d, vec2( sdCappedCylinder( pp, 0.08 - pp.y * 0.02, 0.30 ), 2.0 ) );

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

	for( int i = 0; i < 128; i++ ) {

		dist = D( rayPos );
		rayPos += dist.d * rayDir * 1.0;

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
	vec4 n1 = texture( uNoiseTex, noiseUV );
	vec4 n2 = texture( uNoiseTex, noiseUV * 4.0 );
	vec4 n3 = texture( uNoiseTex, noiseUV * 1.0 + n1.xy );

	// マテリアルIDに応じた色とラフネスを設定
	float matId = dist.mat;

	// デフォルト
	vec3 col = vec3( 1.0 );
	float rough = 0.5;
	float metal = 0.0;

	// 1: 刃
	if( matId == 1.0 ) {
		col = vec3( 0.9, 0.92, 0.95 ); // 銀色
		rough = 0.01;
		metal = 1.0;
	}
	// 2: 柄
	else if( matId == 2.0 ) {
		col = vec3( 1.0, 0.7, 0.45 ); // 暗い木目色
		rough = 1.0;
		metal = 0.0;
	}

	outNormal = normalize( outNormal + n3.xyz * 0.15 );
	outColor.xyz = col;
	outRoughness = rough;
	outMetalic = metal;

	#include <frag_out>


}
