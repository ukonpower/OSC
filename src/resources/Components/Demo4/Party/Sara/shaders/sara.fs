#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

#include <rm_h>

// インスタンスIDを受け取る
in vec4 vId;
in vec4 vId2;
in mat4 vTransformMatrix;
in float vDiscard;

// 皿のSDF関数（参考URLのGYOZA形状を皿形状に変換）
SDFResult D( vec3 p ) {

	vec3 pp = p;

	// スケール調整（皿の大きさ）
	pp *= 0.8;

	// 皿の中心の穴の半径
	float holeRadius = 0.3;

	// トーラス状の基本形状を作成（皿の底面）
	vec2 q = vec2( length(pp.xz) - holeRadius, pp.y );

	vec2 d = vec2( 10000.0, 0.0 );

	// 皿の底面（回転させて厚みを持たせる）
	vec2 q1 = q;
	q1.xy *= rotate( -1.4 );
	q1.y += 0.21;
	d = opAdd( d, vec2( sdBox( vec3( q1, 0.0 ), vec3( 0.01, 0.28, 1.0 )), 0.0 ) );

	// 皿の縁（上部のリム）
	vec2 q2 = q;
	q2.x += 0.4;
	q2.y += 0.05;
	d = opAdd( d, vec2( sdBox( vec3( q2, 0.0 ), vec3( 0.3, 0.04, 0.1 )), 0.0 ) );

	return SDFResult(
		d.x,
		p,
		d.y,
		vec4(0.0)
	);

}

#include <rm_normal>

void main( void ) {

	// vDiscardが1.0なら非表示
	if (vDiscard > 0.5) discard;

	#include <frag_in>
	#include <rm_ray_obj>

	// vTransformMatrixの逆行列を計算してレイの座標をインスタンス空間に変換
	mat4 invMatrix = inverse(vTransformMatrix);
	vec3 localRayPos = (invMatrix * vec4(rayPos, 1.0)).xyz;
	vec3 localRayDir = normalize((invMatrix * vec4(rayDir, 0.0)).xyz);

	SDFResult dist;
	bool hit = false;

	// レイマーチングループ
	for( int i = 0; i < 128; i++ ) {

		dist = D( localRayPos );
		localRayPos += dist.d * localRayDir * 1.0;

		if( dist.d < 0.001 ) {

			hit = true;
			break;

		}

	}

	if( !hit ) discard;

	// 法線計算（ローカル空間）
	vec3 localNormal = N( localRayPos, 0.01 );

	// 法線をワールド空間に変換
	outNormal = normalize((transpose(invMatrix) * vec4(localNormal, 0.0)).xyz);

	// ワールド空間の位置を計算
	rayPos = (vTransformMatrix * vec4(localRayPos, 1.0)).xyz;

	#include <rm_out_obj>

	float saraGrade = vId.x;
	vec3 saraColor = mix( vec3( 0.1, 0.15, 0.3 ), vec3( 0.6, 0.2, 0.0 ), smoothstep( 0.0, 0.3, saraGrade ) );
	saraColor = mix( saraColor, vec3( 1.0, 0.6, 0.0 ), smoothstep( 0.3, 1.0, saraGrade ) );

	// 皿の色（白基調）
	outColor.xyz = mix( 
		saraColor,
		vec3( 0.8, 0.7, 0.6 ),
		smoothstep( 0.35, 0.3, length( localRayPos ) )
	);

	// ラフネス（陶器の質感）
	outRoughness = 0.3;

	outEmission.xyz = saraColor * 10.0 * pow( saraGrade, 3.0 );

	// メタリック値（非金属）
	outMetalic = 0.0;

	#include <frag_out>

}
