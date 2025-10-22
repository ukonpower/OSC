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

	vec3 maguroP = p;
	maguroP.xz *= rotate( sin( -p.x - 0.3 + uTimeE * 1.0 ) * 0.5 * smoothstep( -1.0, 1.0, p.x )  );

	// ボデー

	vec3 pp = maguroP;
	pp.z *= 1.2;
	vec2 d = vec2( sdVesicaSegment( pp, vec3( -0.5, 0.0, 0.0 ), vec3( 0.5, 0.0, 0.0 ), 0.2 * cos(pp.x + 0.5) ), 0.0 );

	// 口

	pp = maguroP;
	pp += vec3( 0.5, -0.05, 0.0 );
	d.x = opSmoothSub( sdTriPrism( pp, vec2(0.14, 0.2) ), d.x, 0.0 );

	// ヒレ下

	pp = maguroP;
	pp += vec3( -0.1, 0.09, 0.0 );
	pp.x += pp.y * 0.3;
	pp.xy *= rotate( PI);
	d.x = opSmoothAdd( sdTriPrism( pp, vec2(0.14, 0.01) ) - 0.002, d.x, 0.04 );
	
	// ヒレ上
	
	pp = maguroP;
	pp += vec3( -0.1, -0.2, 0.0 );
	pp.x *= 1.2;
	pp.x -= pow(pp.y, 2.0 ) * 2.0;
	d.x = opSmoothAdd( sdTriPrism( pp, vec2(0.10, 0.001) ) - 0.002, d.x, 0.04 );

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
	d.x = opSmoothAdd( sdTriPrism( pp, vec2(0.05, 0.001) ) - 0.002, d.x, 0.01 );

	// ヒレ後ろ

	pp = maguroP;
	pp.y = abs( pp.y );
	pp.x -= pow(pp.y, 2.0 ) * 1.3;
	pp += vec3( -0.5, -0.05, 0.0 );
	pp.y *= 0.24;

	d.x = opSmoothAdd( sdTriPrism( pp, vec2(0.03, 0.01) ) - 0.002, d.x, 0.04 );

	// ギザギザ

	pp = maguroP;
	pp.y = abs( pp.y );
	float w = cos( pp.x * PI );
	pp.y -= w * 0.17;
	pp.x = mod( pp.x, 0.05 ) - 0.025;
	float s = smoothstep( 0.15, 0.1, abs( maguroP.x - 0.3 ) );
	d.x = opSmoothAdd( sdTriPrism( pp, vec2(0.015 * s, 0.005 * s) ), d.x, 0.01 );

	return SDFResult(
		d.x,
		p,
		d.y
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

	outRoughness = smoothstep( 0.2, 1.0, n1.r );
	outNormal = normalize( outNormal + n3.xyz * 0.3 );

	
	vec3 c = vec3( 1.0 );
	float kuro = smoothstep( 0.01 , 0.08, rayPos.y - cos( rayPos.x * PI + 0.15 ) * 0.06 - n2.x * 0.05 + 0.04 );
	c.xyz = mix(c, vec3( 0.0 ), kuro );
	outEmission += random( gl_FragCoord.xy * 0.01 ) * kuro * 0.2;
	outColor.xyz = c;

	outMetalic = 0.2;


	#include <frag_out>


}
