#include <common>
#include <noise_value>

in float aTime;

out float o_left;
out float o_right;

uniform float uDuration;
uniform float uSampleRate;
uniform float uTimeOffset;

uniform float uBPM;

/*-------------------------------
	Utils
-------------------------------*/

float whiteNoise(float time)
{
    return fract(sin(dot(vec2( time ), vec2(12.9898,78.233))) * 43758.5453);
}

float saw(float time){

    return fract(-time)*2.-1.;

}

vec2 saw( vec2 time ) {

	return vec2(
		saw( time.x ),
		saw( time.y )
	);

}

float square( float time) {

	return sign( fract( time ) - 0.1 );

}

float tri(float time ){
    return abs(2.*fract(time*.5-.25)-1.)*2.-1.;
}

float ssin(float time ) {
	return sin( time * TPI );
}

vec2 ssin( vec2 time ) {

	return vec2(
		ssin( time.x ),
		ssin( time.y )
	);

}

float s2f( float scale ){

	return 440.0 * pow( 1.06, scale );
	
}

bool isin( float time, float start, float end ) {

	return start <= time && time < end;
	
}

// ビート情報を計算する関数
// 戻り値:
//   x: 現在のビート内での経過時間（0.0 〜 beat）
//   y: 現在のビート番号（整数、0から始まる）
//   z: 現在のビート内での進行度（0.0 〜 1.0）
//   w: 開始からの総ビート数（小数、連続的に増加）
vec4 beat( float time, float beat ) {

	float b = mod( time, beat );

	return vec4(
		b,                   // x: ビート内経過時間
		floor( time / beat ), // y: ビート番号
		b / beat,            // z: ビート内進行度（正規化）
		time / beat          // w: 総ビート数
	);

}

/*-------------------------------
	Base
-------------------------------*/

// コード進行: Am - F - C - G
const float baseLine[] = float[](
	10.0, 6.0, 3.0, 8.0, 10.0, 6.0, 3.0, 8.0
);


/*-------------------------------
	Snare
-------------------------------*/

float snare( float et, float ft, float etw ) {

	float o = 0.0;

	et = fract( et );

	float t = ft;
	
	o += ( fbm( t * 3200.0 ) - 0.5 ) * exp( -150.0 * et * etw );

	o *= 0.7;
	
	return o;

}


vec2 snare1( float mt, float ft ) { 

	vec2 o = vec2( 0.0 );

	vec4 bt = beat( mt, 8.0 );

	o += snare( bt.z - (1.0 - 0.125), fract( ft ), 1.0 );
	
	return o * 0.8;

}

vec2 snare2( float mt, float ft ) {

	vec2 o = vec2( 0.0 );

	vec4 bt = beat( mt, 2.0 );

	o += snare( bt.z - (0.5), fract( ft ), 0.25 );

	return o * 0.8;

}

/*-------------------------------
	Kick
-------------------------------*/

float lightKick( float et, float ft ) {

	float envTime = fract( et );

	float t = ft;
	t -= 0.05 * exp( -100.0 * envTime );

	float o = sin( t * s2f( 5.0 ) ) * exp( - 20.0 * envTime );
	o *= smoothstep( 0.0, 0.0005, envTime);
	o *= 0.3;

    return o;

}

vec2 kick1( float mt, float ft ) {

	vec2 o = vec2( 0.0 );

	vec4 b4 = beat( mt, 4.0 );
	vec4 b8 = beat( mt, 8.0 );

	for(int i = 0; i < 3; i++){
		
		float l = b4.z - float(i) / ( 16.0 / 3.0 );

		if( i != 2 || b8.z > 0.5 ) {

			o += lightKick( l, ft );

		}
		
	}

	return o;

}




float getFrec( float t, float m, vec4 b8 ) {

	return t - ( m * 16.0 + max( 0.0, b8.y - m * 2.0 ) * 8.0 ) * ( 60.0 / uBPM ) ;

}

/*-------------------------------
	Arpeggio - キラキラしたアルペジオ
-------------------------------*/

vec2 arpeggio( float mt, float ft, float pitch ) {

	vec2 o = vec2( 0.0 );

	vec4 b32 = beat( mt, 32.0 );

	// アルペジオパターン: 上昇→下降
	int notes[] = int[]( 0, 4, 7, 12, 7, 4 );
	int noteIndex = int( mod( floor( mt * 4.0 ), 6.0 ) );

	float scale = baseLine[ int( b32.x / 4.0 ) % 8 ];
	float note = scale + float( notes[noteIndex] ) + pitch;

	float envTime = fract( mt * 4.0 );
	float env = exp( -envTime * 8.0 );
	env *= smoothstep( 0.0, 0.005, envTime );

	// ディチューンで厚みを出す
	for( int i = 0; i < 2; i++ ) {
		float detune = float(i) * 0.003;
		o += ssin( ft * s2f( note ) * ( 1.0 + detune ) + vec2( float(i) * 0.3, 0.0 ) ) * env;
	}

	return o * 0.08;

}

// アルペジオバリエーション1: 速い16分音符パターン
vec2 arpeggio_fast( float mt, float ft, float pitch ) {

	vec2 o = vec2( 0.0 );

	vec4 b32 = beat( mt, 32.0 );

	// 速いパターン: 16分音符
	int notes[] = int[]( 0, 4, 7, 12 );
	int noteIndex = int( mod( floor( mt * 8.0 ), 4.0 ) );

	float scale = baseLine[ int( b32.x / 4.0 ) % 8 ];
	float note = scale + float( notes[noteIndex] ) + pitch;

	float envTime = fract( mt * 8.0 );
	float env = exp( -envTime * 12.0 );
	env *= smoothstep( 0.0, 0.003, envTime );

	// シンプルな波形
	o += ssin( ft * s2f( note ) ) * env;

	// ステレオ効果
	float pan = float(noteIndex) / 4.0;
	o.x *= 1.0 + pan * 0.3;
	o.y *= 1.0 - pan * 0.3;

	return o * 0.06;

}

// アルペジオバリエーション2: トリルパターン
vec2 arpeggio_trill( float mt, float ft, float pitch ) {

	vec2 o = vec2( 0.0 );

	vec4 b32 = beat( mt, 32.0 );

	// トリル: 2音を交互に
	int notes[] = int[]( 0, 4 );
	int noteIndex = int( mod( floor( mt * 8.0 ), 2.0 ) );

	float scale = baseLine[ int( b32.x / 4.0 ) % 8 ];
	float note = scale + float( notes[noteIndex] ) + pitch;

	float envTime = fract( mt * 8.0 );
	float env = exp( -envTime * 10.0 );
	env *= smoothstep( 0.0, 0.004, envTime );

	// 複数のオシレーターで豊かな音色
	for( int i = 0; i < 3; i++ ) {
		float detune = (float(i) - 1.0) * 0.005;
		o += ssin( ft * s2f( note ) * (1.0 + detune) + float(i) * 0.2 ) * env;
	}

	return o * 0.04;

}

// アルペジオバリエーション3: 転換用の下降パターン
vec2 arpeggio_transition( float mt, float ft, float pitch ) {

	vec2 o = vec2( 0.0 );

	vec4 b32 = beat( mt, 32.0 );

	// 印象的な下降パターン: 高音から一気に下降
	int notes[] = int[]( 19, 15, 12, 7, 4, 0, -5, -12 );
	int noteIndex = int( mod( floor( mt * 4.0 ), 8.0 ) );

	float scale = baseLine[ int( b32.x / 4.0 ) % 8 ];
	float note = scale + float( notes[noteIndex] ) + pitch;

	float envTime = fract( mt * 4.0 );
	float env = exp( -envTime * 6.0 );
	env *= smoothstep( 0.0, 0.002, envTime );

	// 明るくキラキラした音色
	for( int i = 0; i < 2; i++ ) {
		float detune = float(i) * 0.002;
		o += ssin( ft * s2f( note ) * ( 1.0 + detune ) ) * env;
	}

	// ステレオで広がりを持たせる
	float pan = float(noteIndex) / 8.0;
	o.x *= 1.0 + pan * 0.5;
	o.y *= 1.5 - pan * 0.5;

	return o * 0.15;

}

/*-------------------------------
	Pad - 温かいパッドサウンド
-------------------------------*/

vec2 pad( float mt, float ft, float pitch ) {

	vec2 o = vec2( 0.0 );

	vec4 b32 = beat( mt, 32.0 );

	// arpeggio_fastと同じタイミングでコード進行を取得
	int chordIndex = int( b32.x / 4.0 ) % 8;
	float scale = baseLine[ chordIndex ];

	float envTime = fract( b32.z / 4.0 );
	float env = smoothstep( 0.0, 0.01, envTime ) * smoothstep( 1.0, 0.7, envTime );

	// コード進行に合わせたボイシング
	int chord[3];
	if( chordIndex == 0 || chordIndex == 4 ) {
		// マイナーコード
		chord[0] = 0; chord[1] = 3; chord[2] = 7;
		chord[0] = 0; chord[1] = 4; chord[2] = 7;

	} else {
		// メジャーコード
		chord[0] = 0; chord[1] = 4; chord[2] = 7;
	}

	for( int i = 0; i < 3; i++ ) {
		float note = scale + float( chord[i] ) + pitch - 12.0;

		// 複数のオシレーターでリッチなサウンド
		for( int j = 0; j < 3; j++ ) {
			float detune = ( float(j) - 1.0 ) * 0.004;
			float phase = float(j) * 0.2;
			o += ssin( ft * s2f( note ) * ( 1.0 + detune ) + phase ) * env;
		}
	}

	// ステレオ広がり
	float pan = ssin( mt * 0.1 ) * 0.5;
	o.x *= 1.0 + pan;
	o.y *= 1.0 - pan;

	return o * 0.03;

}

/*-------------------------------
	Distortion - ガーガー音
-------------------------------*/

// ガーガーっという攻撃的なディストーションサウンド
vec2 gaga( float mt, float ft, float pitch ) {

	vec2 o = vec2( 0.0 );

	vec4 b32 = beat( mt, 32.0 );

	// ベースとなる音階
	float scale = baseLine[ int( b32.x / 4.0 ) % 8 ];
	float note = scale + pitch - 12.0 * 3.0; 

	float envTime = fract( mt * 0.25 );
	float env = exp( -envTime * 3.0 );
	env *= smoothstep( 0.0, 0.01, envTime );

	// 複数のsaw波を重ねてハードな音色を作る
	for( int i = 0; i < 8; i++ ) {
		float detune = float(i) * 0.01; // デチューンで厚みを出す
		float harmonic = float(i + 1); // 倍音を追加

		// saw波形でガツガツした音
		float wave = tri( ft * s2f( note ) );

		// ハードクリッピング（ディストーション効果）
		// wave = clamp( wave * 3.0, -1.0, 1.0 );

		// ビットクラッシュ効果でさらにガーガー感を追加
		// wave = floor( wave * 8.0 ) / 8.0;

		o += wave * env / harmonic;
	}

	// ステレオで左右に振る
	float pan = sin( mt * 8.0 );
	o.x *= 1.0 + pan * 0.3;
	o.y *= 1.0 - pan * 0.3;

	return o * 0.05;

}

/*-------------------------------
	dada
-------------------------------*/

vec2 dada( float time, float loop ) {

	int index = int( loop );
	float envTime = fract( loop );
	float w = mod( envTime * 8.0, 2.0 );

	vec2 o = vec2( 0.0 );

	for( int i = 0; i < 6; i++ ) {

		float fi = float( i ) / 6.0;
		float frec = s2f( 4.0 + float(i) * 12.0 ) * pow( 0.5, 4.0 );

		float v = saw( time * frec + ssin( w * 20.0 ) + TPI * fi ) * abs( pow( sin( w * TPI ), 3.0 ) );

		o.x += v * ( sin( fi * TPI ) * 0.5 + 0.5 );
		o.y += v * ( cos( fi * TPI ) * 0.5 + 0.5 );

		frec = s2f( 4.0 + float(i) * 12.0 ) * pow( 0.5, 10.0 );
		v = tri( time * frec + ssin( w * 21.0 ) + TPI * fi ) * abs( pow( sin( w * TPI ), 1.0 ) ) * 0.8;

		o.x += v * ( sin( PI / 2.0 + fi * TPI ) * 0.5 + 0.5 );
		o.y += v * ( cos( PI / 2.0 + fi * TPI ) * 0.5 + 0.5 );

	}

	o *= isin( w, 1.0, 2.0 ) && isin( loop, 1.75, 2.0 ) ? 1.0 : 0.0;

	o *= 0.05;

	return o;

}

/*-------------------------------
	Music
-------------------------------*/

vec2 music( float t ) {

	float mt = t * (uBPM / 60.0);
	mt = max( 0.0, mt - 4.0 );

	vec2 o = vec2( 0.0 );

	vec4 beat4 = beat( mt, 4.0 );
	vec4 beat8 = beat( mt, 8.0 );
	vec4 beat16 = beat( mt, 16.0 );

	// intro - 1小節に短縮
	if( isin( beat16.y, 0.0, 1.0 ) ) {

		t = getFrec( t, 0.0, beat8 );
		o += arpeggio( mt, t, 0.0 );
		o += pad( mt, t, 0.0 ) * 0.3;
	}

	// intro up - 1小節に短縮

	if( isin( beat16.y, 1.0, 2.0 ) ) {

		t = getFrec( t, 1.0, beat8 );
		o += arpeggio( mt, t, 0.0 );
		o += arpeggio( mt, t, 12.0 ) * 0.5;
		o += kick1( mt, t );
		o += pad( mt, t, 0.0 ) * 0.6;

	}

	// 転換 - 1小節（8小節目）

	if( isin( beat4.y, 8.0, 9.0 ) ) {

		t = getFrec( t - 16.0, 0.0, beat8 );

		vec2 tenkan = vec2(0.0);

		tenkan += arpeggio( mt, t, -12.0 );

		float mute = step( beat8.x, 2.0 - 0.0 );
		tenkan *= mute;

		o += snare2( mt, t ) * 0.8 * (1.0 - mute );

		o += tenkan;

	}

	// メイン - オフセット調整（転換セクション短縮に対応）

	mt -= 36.0;
	
	beat4 = beat( mt, 4.0 );
	beat8 = beat( mt, 8.0 );
	beat16 = beat( mt, 16.0 );

	if( isin( beat16.y, 0.0, 4.0 ) ) {

		t = getFrec( t, 0.0, beat8 );
		o += kick1( mt, t ) * 1.2;
		o += snare2( mt, t ) * 0.8;
		o += pad( mt, t, 0.0 ) * 0.6;
		o += dada( mt, beat4.w );
		o += gaga( mt, t, 0.0 ); // ガーガー音を追加
		o += arpeggio( mt, t, 0.0 );


		if( beat16.y >= 1.0 ) {
			o += arpeggio( mt, t, 12.0 ) * 0.5;
		}

		if( beat16.y >= 2.0 ) {
			o += pad( mt, t, 0.0 ) * 0.4;
		}

	}

	if( isin( beat16.y, 4.0, 6.0 ) ) {

		t = getFrec( t, 6.0, beat8 );
		o += arpeggio( mt, t, -12.0 ) * 0.8;
		o += arpeggio_fast( mt, t, 0.0 ) * 1.2;
		o += arpeggio( mt, t, 12.0 ) * 0.6;
		o += snare2( mt, t ) * 0.5;

	}


	
	return o;

}

void main( void ) {

	float time = (aTime / uSampleRate ) + uTimeOffset;

	vec2 o = music( time );

	o_left = o.x;
	o_right = o.y;

}