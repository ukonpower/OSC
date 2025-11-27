#include <common>
#include <packing>
#include <frag_h>
#include <sdf>
#include <noise_cyclic>

#include <rm_h>

uniform float uTime;
uniform vec4 uState;

// 海洋の波を生成するノイズ関数
float oceanNoise( vec3 p ) {

	// 複数のオクターブでノイズを重ね合わせて波を表現
	float n = 0.0;
	float amp = 1.0;
	float freq = 1.0;

	for( int i = 0; i < 4; i++ ) {
		vec3 noise = noiseCyc( p * freq * 0.5 + vec3( uTime * 0.2, 0.0, uTime * 0.3  ) );
		n += amp * noise.x;
		amp *= 0.5;
		freq *= 2.0;
	}

	return n;
}

// SDF（Signed Distance Function）
SDFResult D( vec3 p ) {

	// Y座標を波の高さとして変調
	float wave = 0.0;
	float wh = 0.1;


	vec2 fishPos = p.xz -vec2( 0.0, -9.0 );
	float lfp = length( fishPos );
	float fishWave = sin( lfp * 7.0 - uTime * 15.0 ) * smoothstep( 5.0, 0.0, lfp );

	if( p.y < wh ) {

		wave = oceanNoise( p * 0.5 + vec3( 0.0, fishWave * 0.2, 0.0 ) ) * wh;

	}

	p.y -= sin( clamp( lfp * 3.0 - uState.x * PI * 5.0 + PI * 3.0, 
	0.0,
	PI * 3.0
	) ) * 0.7 * smoothstep( 4.0, 0.0, lfp );

	// 水平面との距離（sdPlane関数を使用）
	// 法線は上向き(0,1,0)、オフセットはwaveで変調
	float d = sdPlane( p, vec3(0.0, 1.0, 0.0), wave );

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

	// カメラ位置からワールド空間でレイを初期化
	#include <rm_ray_screen>


	// レイマーチング
	#include <rm_loop,128,0.05,1.0>

	if( !hit ) discard;

	// 法線を計算
	outNormal = N( rayPos, 0.01 );

	// オブジェクト空間からワールド空間への変換、位置・法線・深度を出力
	#include <rm_out_obj>

	// 海洋の色（深い青緑）
	vec3 oceanColor = vec3( 0.0, 0.3, 0.5 );

	// 深度に応じて色を変化（ワールド座標のY値で判定）
	float depth = abs( rayPos.y );
	oceanColor = mix( oceanColor, vec3( 0.0, 0.1, 0.2 ), clamp( depth / 1.0, 0.0, 1.0 ) );

	outColor = vec4( oceanColor, 1.0 );
	outEmission = vec3( 0.0 );
	outRoughness = 0.1; // 水面なので低いラフネス
	outGradient = 1.0;

	#include <frag_out>

}
