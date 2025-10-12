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

vec4 beat( float time, float beat ) {

	float b = mod( time, beat );

	return vec4( 
		b, 
		floor( time / beat ),
		b / beat,
		time / beat
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
	Music
-------------------------------*/

vec2 music( float t ) {

	float mt = t * (uBPM / 60.0);
	mt = max( 0.0, mt - 4.0 );

	vec2 o = vec2( 0.0 );

	vec4 beat4 = beat( mt, 4.0 );
	vec4 beat8 = beat( mt, 8.0 );
	vec4 beat16 = beat( mt, 16.0 );

	// intro
	if( isin( beat16.y, 0.0, 2.0 ) ) {

		t = getFrec( t, 0.0, beat8 );
		o += arpeggio( mt, t, 0.0 );
		o += pad( mt, t, 0.0 ) * 0.3;
	}

	// intro up

	if( isin( beat16.y, 2.0, 4.0 ) ) {

		t = getFrec( t, 2.0, beat8 );
		o += arpeggio( mt, t, 0.0 );
		o += arpeggio( mt, t, 12.0 ) * 0.5;
		o += kick1( mt, t );
		o += pad( mt, t, 0.0 ) * 0.6;

	}

	// 転換

	if( isin( beat4.y, 16.0, 17.0 ) ) {

		t = getFrec( t, 0.0, beat8 );

		// メインアルペジオ
		o += arpeggio( mt, t, -12.0 ) * step( beat8.x, 4.0 - 0.75 );
		

	}
	
	// メイン
	
	mt -= 68.0;
	
	beat4 = beat( mt, 4.0 );
	beat8 = beat( mt, 8.0 );
	beat16 = beat( mt, 16.0 );

	if( isin( beat16.y, 0.0, 1.0 ) ) {

		// フェーズ１

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