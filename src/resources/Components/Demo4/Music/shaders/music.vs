#include <common>
#include <noise_value>

in float aTime;

out float o_left;
out float o_right;

uniform float uDuration;
uniform float uSampleRate;
uniform float uTimeOffset;

uniform float uBPM;

// MARK: Utils

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

// MARK: Base

/*-------------------------------
	Base
-------------------------------*/

// コード進行: Am - F - C - G
const float baseLine[] = float[](
	10.0, 6.0, 8.0, 3.0, 10.0, 6.0, 8.0, 3.0
);

// グローバルなコード進行速度（climaxで変更される）
float g_chordSpeed = 1.0;


// MARK: Snare

/*-------------------------------
	Snare
-------------------------------*/

float snare( float et, float ft, float etw ) {

	float o = 0.0;

	et = fract( et );

	float t = ft;

	// より激しいスネアサウンド：減衰を速く、音量を大きく
	o += ( fbm( t * 3200.0 ) - 0.5 ) * exp( -250.0 * et * etw );
	o += ( fbm( t * 4800.0 ) - 0.5 ) * exp( -300.0 * et * etw ) * 0.5; // 高域のノイズを追加

	o *= 1.0; // 音量を上げる

	return o;

}


vec2 snare2( float mt, float ft ) {

	vec2 o = vec2( 0.0 );

	vec4 bt = beat( mt, 2.0 );

	o += snare( bt.z - (0.5), fract( ft ), 0.25 );

	return o * 1.0; // より激しく

}

// ランダムなスネアパターン
vec2 snare3( float mt, float ft ) {

	vec2 o = vec2( 0.0 );

	vec4 b2 = beat( mt, 2.0 );
	vec4 b4 = beat( mt, 4.0 );

	// 16分音符でランダムに刻む
	for(int i = 0; i < 16; i++){

		float l = b2.z - float(i) / 16.0;

		// ランダムに鳴らす
		float rand = whiteNoise( b2.y * 200.0 + float(i) );
		float threshold = 0.5; // 50%の確率で鳴らす

		// 基本のバックビート（2拍目と4拍目）は必ず鳴らす
		bool isBackbeat = (i == 8); // 裏拍
		bool shouldPlay = isBackbeat || (rand > threshold);

		if( shouldPlay ) {
			float volume = isBackbeat ? 1.2 : (0.5 + rand * 0.5); // ランダムな音量
			o += snare( l, fract( ft ), isBackbeat ? 1.0 : 1.5 ) * volume;
		}

	}

	return o * 0.9;

}

// MARK: Hihat

/*-------------------------------
	Hihat
-------------------------------*/

float hihat( float et ) {

	et = fract( et );
	return noiseValue( vec3( et * 22000.0 ) ) * max( 0.0, 1.0 - min( 0.85, et * 4.25 ) - ( et - 0.25 ) * 0.3 );

}

vec2 hihat1( float mt ) {

	vec2 o = vec2( 0.0 );

	vec4 b16 = beat( mt * 16.0 , 4.0 );

	// 16分音符でランダムに鳴らす
	o += hihat( b16.z ) * ( step( 0.4, whiteNoise( b16.y ) ) * 0.5 + 0.5 );
	o += hihat( b16.z - 0.5 ) * step( 0.5, whiteNoise( b16.y * 10.0 + 0.1 ) );

	return o * 0.02;

}

// MARK: Kick

/*-------------------------------
	Kick
-------------------------------*/


float deepKick( float et, float ft ) {

	float envTime = fract( et );

	float t = ft;
	t -= 0.05 * exp( -100.0 * envTime );

	float o = sin( t * s2f( 5.0 ) ) * exp( - 20.0 * envTime );
	o *= smoothstep( 0.0, 0.0005, envTime);
	o *= 0.3;

    return o;

}

float lightKick( float et, float ft ) {

	float envTime = fract( et );

	float t = ft;
	t -= 0.06 * exp( -100.0 * envTime );

	float o = sin( t * s2f( 2.0 ) ) * exp( - 50.0 * envTime );
	o *= smoothstep( 0.0, 0.0005, envTime);
	o *= 0.3;

    return o;

}

// より激しく重いキック - deepとlightの両方の特性を持つ - だだだだ専用
float hardKick( float et, float ft ) {

	float envTime = fract( et );

	float t = ft;
	// 適度なピッチベンド
	t -= 0.08 * exp( -100.0 * envTime );

	// 低音と中音の両方を混ぜる
	float o = sin( t * s2f( 5.0 ) ) * exp( - 30.0 * envTime ); // 重低音
	o += sin( t * s2f( 8.0 ) ) * exp( - 45.0 * envTime ) * 0.5; // パンチ感のある中音
	o += sin( t * s2f( 12.0 ) ) * exp( - 60.0 * envTime ) * 0.25; // アタック音

	o *= smoothstep( 0.0, 0.008, envTime);
	o *= 0.25; // 音量控えめに

	return o;

}

vec2 kick1( float mt, float ft ) {

	vec2 o = vec2( 0.0 );

	vec4 b4 = beat( mt, 4.0 );
	vec4 b8 = beat( mt, 8.0 );

	for(int i = 0; i < 3; i++){

		float l = b4.z - float(i) / ( 16.0 / 3.0 );

		if( i != 2 || b8.z > 0.5 ) {

			o += deepKick( l, ft );

		}

	}

	return o * 1.15; // より激しく

}


vec2 kick2( float mt, float ft ) {

	vec2 o = vec2( 0.0 );

	vec4 b4 = beat( mt, 4.0 );
	vec4 b8 = beat( mt, 8.0 );

	for(int i = 0; i < 6; i++){

		float l = b4.z - float(i) / ( 16.0 / 3.0 );

		if( i != 2 || b8.z > 0.5 ) {

			o += lightKick( l, ft );

		}

	}

	return o * 1.15; // より激しく

}

// より激しいhardKickを使用したkick3 - ランダムなパターン
vec2 kick3( float mt, float ft ) {

	vec2 o = vec2( 0.0 );
	vec4 b2 = beat( mt, 2.0 );

	// ランダムなキックパターン - 16分音符ベース
	for(int i = 0; i < 16; i++){

		float l = b2.z - float(i) / 16.0;
		float rand = whiteNoise( b2.y * 100.0 + float(i) );
		float threshold = 0.35; // 35%の確率で鳴らす

		// 特定の位置では必ず鳴らす（基本ビート）
		bool isBasicBeat = (i % 4 == 0);
		bool shouldPlay = isBasicBeat || (rand > threshold);

		if( shouldPlay ) {
			float volume = isBasicBeat ? 1.0 : (0.6 + rand * 0.4); // ランダムな音量
			o += hardKick( l, ft ) * volume;
		}

	}

	return o * 0.85; // 音量調整

}

float getFrec( float t, float m, vec4 b8 ) {

	return t - ( m * 16.0 + max( 0.0, b8.y - m * 2.0 ) * 8.0 ) * ( 60.0 / uBPM ) ;

}

// MARK: Arpeggio

/*-------------------------------
	Arpeggio - キラキラしたアルペジオ
-------------------------------*/

vec2 arpeggio( float mt, float ft, float pitch ) {

	vec2 o = vec2( 0.0 );

	vec4 b32 = beat( mt, 32.0 );

	// アルペジオパターン: 上昇→下降
	int notes[] = int[]( 0, 4, 7, 12, 7, 4 );
	int noteIndex = int( mod( floor( mt * 4.0 ), 6.0 ) );

	float scale = baseLine[ int( mod( b32.x / 4.0 * g_chordSpeed, 8.0 ) ) ];
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

	float scale = baseLine[ int( mod( b32.x / 4.0 * g_chordSpeed, 8.0 ) ) ];
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

// MARK: Pad

/*-------------------------------
	Pad - 温かいパッドサウンド
-------------------------------*/

vec2 pad( float mt, float ft, float pitch ) {

	vec2 o = vec2( 0.0 );

	vec4 b32 = beat( mt, 32.0 );

	// g_chordSpeedを反映したコード進行を取得
	int chordIndex = int( mod( b32.x / 4.0 * g_chordSpeed, 8.0 ) );
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

// MARK: Stab

/*-------------------------------
	Stab - 激しいシンセスタブ（Climax用）
-------------------------------*/

vec2 stab( float mt, float ft, float pitch ) {

	vec2 o = vec2( 0.0 );

	vec4 b32 = beat( mt, 32.0 );
	vec4 b8 = beat( mt, 8.0 );

	// 16分音符で細かく刻む「てけてけとことこ」パターン
	float envTime = fract( mt * 4.0 ); // 16分音符

	// 非常に速いアタック、素早いリリース
	float env = exp( -envTime * 30.0 );
	env *= smoothstep( 0.0, 0.001, envTime );

	// ピッチベンド: 上がって下がる効果
	float pitchBend = 0.0;
	if( envTime < 0.08 ) {
		// 最初で急上昇
		pitchBend = 7.0 * ( envTime / 0.08 );
	} else {
		// その後すぐに元に戻る
		pitchBend = 7.0 * exp( -( envTime - 0.08 ) * 20.0 );
	}

	// 16分音符ごとにコード進行パターンを細かく変える
	int noteIndex = int( mod( floor( mt * 4.0 ), 8.0 ) );

	// 「てけてけとことこ」メロディパターン: 上下に動く
	int pattern[8] = int[]( 0, 4, 7, 4, 0, -3, 0, 4 );

	// ベースとなるコード進行
	int chordIndex = int( b32.x / 4.0 ) % 8;
	float scale = baseLine[ chordIndex ];

	// パターンからオフセットを取得
	float note = scale + float( pattern[noteIndex] ) + pitch + pitchBend;

	// コード進行に合わせたボイシング（簡略化）
	int chord[3];
	if( chordIndex == 0 || chordIndex == 4 ) {
		// マイナーコード
		chord[0] = 0; chord[1] = 3; chord[2] = 7;
	} else {
		// メジャーコード
		chord[0] = 0; chord[1] = 4; chord[2] = 7;
	}

	// コードトーンを重ねる
	for( int i = 0; i < 3; i++ ) {
		float chordNote = note + float( chord[i] );

		// 複数のオシレーターで厚み
		for( int j = 0; j < 2; j++ ) {
			float detune = float(j) * 0.004;
			float phase = float(j) * 0.1;

			// サイン波とノコギリ波を混ぜる
			float sine = ssin( ft * s2f( chordNote ) * ( 1.0 + detune ) + phase );
			float sawWave = saw( ft * s2f( chordNote ) * ( 1.0 + detune ) );

			// ハードクリッピングで歪みを追加
			float wave = mix( sine, sawWave, 0.4 );
			wave = clamp( wave * 1.5, -0.7, 0.7 );

			o += vec2( wave ) * env / float(i + 1);
		}
	}

	// PWM（パルス幅変調）的な効果を追加
	float pwmMod = sin( ft * 3.0 ) * 0.5 + 0.5;
	o *= 0.8 + pwmMod * 0.2;

	// ステレオで左右に細かく振る
	float pan = float(noteIndex) / 4.0 - 1.0;
	o.x *= 1.0 + pan * 0.6;
	o.y *= 1.0 - pan * 0.6;

	return o * 0.08;

}

// MARK: Bass

/*-------------------------------
	Bass - ベースライン
-------------------------------*/

// 低音で厚みのあるベースサウンド
vec2 bass( float mt, float ft, float pitch ) {

	vec2 o = vec2( 0.0 );

	vec4 b32 = beat( mt, 32.0 );

	// コード進行に合わせたベース音階
	float scale = baseLine[ int( mod( b32.x / 4.0 * g_chordSpeed, 8.0 ) ) ];
	float note = scale + pitch - 12.0 * 3.0; // 3オクターブ下

	float envTime = fract( mt * 0.25 );
	float env = exp( -envTime * 3.0 );
	env *= smoothstep( 0.0, 0.01, envTime );

	// 複数のオシレーターで厚みのあるベースサウンド
	for( int i = 0; i < 4; i++ ) {
		float detune = float(i) * 0.01; // デチューンで厚みを出す
		float harmonic = float(i + 1); // 倍音を追加
		float wave = ssin( ft * s2f( note ) );
		o += wave * env / harmonic;
	}

	// ステレオで左右にゆっくり振る
	float pan = sin( mt * 8.0 );
	o.x *= 1.0 + pan * 0.3;
	o.y *= 1.0 - pan * 0.3;

	return o * 0.05;

}

// Climax用: 「だっだっだっ」リズミカルベース
vec2 rhythmicBass( float mt, float ft, float pitch ) {

	vec2 o = vec2( 0.0 );

	vec4 b32 = beat( mt, 32.0 );

	// コード進行に合わせたベース音階
	float scale = baseLine[ int( mod( b32.x / 4.0 * g_chordSpeed, 8.0 ) ) ];

	// 16分音符で「だっだっだっ」と刻む
	float envTime = fract( mt * 4.0 );

	// 鋭いアタック、速い減衰で「だっ」感を出す
	float env = exp( -envTime * 2.0 );
	env *= smoothstep( 0.0, 0.003, envTime );

	// 16分音符ごとのパターン: 4つで1セット
	int noteIndex = int( mod( floor( mt * 4.0 ), 4.0 ) );
	int pattern[4] = int[]( 0, 0, 0, 7 ); // ルート3回 + 5度上1回

	float note = scale + float( pattern[noteIndex] ) + pitch - 12.0 * 3.0;

	// 太くてパンチのあるベース音
	for( int i = 0; i < 4; i++ ) {
		float harmonic = float(i + 1);
		// サイン波とノコギリ波をブレンドして太く
		float sine = ssin( ft * s2f( note - 12.0 ) * harmonic
		 );
		float sawWave = tri( ft * s2f( note ) * harmonic );
		float wave = mix( sine, sawWave, 0.5 );

		o += vec2( wave ) * env / (harmonic * 0.8);
	}

	// ステレオで左右に細かく振る
	float pan = float(noteIndex) / 4.0 - 0.5;
	o.x *= 1.0 + pan * 0.3;
	o.y *= 1.0 - pan * 0.3;

	return o * 0.2;

}

// MARK: Dada

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

// MARK: Lead Synth

/*-------------------------------
	Lead Synth - 印象的なメロディライン
-------------------------------*/

// リードシンセのメロディパターン: クライマックスのメロディライン
vec2 leadSynth( float mt, float ft, float pitch ) {

	vec2 o = vec2( 0.0 );

	vec4 b32 = beat( mt, 32.0 );
	vec4 b4 = beat( mt, 4.0 );

	// メロディパターン: 32分音符ベースの「てけてけ」メロディ
	vec4 b2 = beat( mt, 2.0 );

	// 32分音符のパターン: 連続的に音階を上下させる
	// 8音のパターンを繰り返す「てけてけ」フレーズ
	int pattern[8] = int[]( 0, 4, 7, 4, 0, -5, 0, 4 );

	// コード進行に合わせてベース音を取得
	float scale = baseLine[ int( mod( b32.x / 4.0 * g_chordSpeed, 8.0 ) ) ];

	// 32分音符のインデックス（1小節で8音）
	int noteIndex = int(mod(b2.w * 8.0, 8.0));

	// パターンからオフセットを取得してメロディを構成
	float note = scale + float( pattern[noteIndex] ) + pitch + 12.0;

	// エンベロープ: 32分音符ごとの素早いアタック/リリース
	float envTime = fract( b2.w * 8.0 );
	float env = exp( -envTime * 16.0 ); // 非常に速い減衰で「てけてけ」感
	env *= smoothstep( 0.0, 0.002, envTime ); // 極めて速いアタック

	// リッチな音色: 複数のオシレーターとディチューン
	for( int i = 0; i < 3; i++ ) {
		float detune = (float(i) - 1.0) * 0.003;
		float harmonic = 1.0 + float(i) * 0.5;

		// サイン波とノコギリ波のブレンド
		float phase = float(i) * 0.1;
		float sine = ssin( ft * s2f( note ) * (1.0 + detune) + phase );
		float sawWave = saw( ft * s2f( note ) * (1.0 + detune) );

		o += vec2( mix( sine, sawWave * 0.5, 0.3 ) * env / harmonic );
	}

	// ビブラート効果（揺らぎ）
	float vibrato = sin( ft * 5.0 ) * 0.002;
	o *= 1.0 + vibrato;

	// ステレオエフェクト: ノートごとに左右に配置
	float pan = float(noteIndex) / 4.0;
	o.x *= 1.0 + pan * 0.4;
	o.y *= 1.0 - pan * 0.4;

	return o * 0.12;

}

// MARK: Main Composition

/*-------------------------------
	Main Composition
-------------------------------*/

vec2 music( float t ) {

	float mt = t * (uBPM / 60.0);
	mt = max( 0.0, mt - 4.0 );

	vec2 o = vec2( 0.0 );

	vec4 beat4 = beat( mt, 4.0 );
	vec4 beat8 = beat( mt, 8.0 );
	vec4 beat16 = beat( mt, 16.0 );

	// Section A: Intro - シンプルなアルペジオとパッド (1小節)
	if( isin( beat16.y, 0.0, 1.0 ) ) {

		t = getFrec( t, 0.0, beat8 );
		o += arpeggio( mt, t, 0.0 );
		o += pad( mt, t, 0.0 ) * 0.3;
	}

	// Section B: Intro Buildup - キックとハイハット導入 (1小節)

	if( isin( beat16.y, 1.0, 2.0 ) ) {

		t = getFrec( t, 1.0, beat8 );
		o += arpeggio( mt, t, 0.0 );
		o += arpeggio( mt, t, 12.0 ) * 0.5;
		o += kick1( mt, t );
		o += pad( mt, t, 0.0 ) * 0.6;

	}

	// Section C: Transition - 転換セクション、スネアロールとミュート効果 (1小節)

	if( isin( beat4.y, 8.0, 9.0 ) ) {

		t = getFrec( t - 16.0, 0.0, beat8 );

		vec2 tenkan = vec2(0.0);

		tenkan += arpeggio( mt, t, -12.0 );

		float mute = step( beat8.x, 2.0 - 0.0 );
		tenkan *= mute;

		o += snare2( mt, t ) * 0.8 * (1.0 - mute );

		o += tenkan;

	}

	// Section D: Main Drop 1 - フルアレンジメント登場、徐々にレイヤー追加 (4小節)

	mt -= 36.0;

	beat4 = beat( mt, 4.0 );
	beat8 = beat( mt, 8.0 );
	beat16 = beat( mt, 16.0 );

	if( isin( beat16.y, 0.0, 4.0 ) ) {

		t = getFrec( t, 0.0, beat8 );

		vec2 sum = vec2(0.0);
		sum += kick2( mt, t ) * 1.2;
		sum += snare2( mt, t ) * 0.8;
		sum += pad( mt, t, 0.0 ) * 0.6;
		sum += dada( mt, beat4.w );
		sum += bass( mt, t, 0.0 ); // ベースライン
		sum += arpeggio( mt, t, 0.0 );


		if( beat16.y >= 1.0 ) {
			sum += arpeggio( mt, t, 12.0 ) * 0.5;
		}

		if( beat16.y >= 2.0 ) {
			sum += pad( mt, t, 0.0 ) * 0.4;
		}

		o += sum * smoothstep( 4.0, 3.98, beat16.w );

	}

	// Section E: Bridge - ブレイクダウンとビルドアップ (3小節)

	mt -= 65.0;
	beat4 = beat( mt, 4.0 );
	beat8 = beat( mt, 8.0 );
	beat16 = beat( mt, 16.0 );

	// Section E-1: Breakdown - パッドのみ、静寂の瞬間 (1小節)
	if( isin( beat16.y, 0.0, 1.0 ) ) {

		t = getFrec( t, 6.0, beat8 );
		o += pad( mt, t, 0.0 ) * 0.6;

	}

	// Section E-2: Buildup - 速いアルペジオで緊張感を高める (2小節)
	if( isin( beat16.y, 1.0, 3.0 ) ) {

		vec2 sum = vec2(0.0);

		t = getFrec( t, 6.0, beat8 );
		sum += arpeggio( mt, t, -12.0 ) * 0.8;
		sum += arpeggio_fast( mt, t, 0.0 ) * 1.2;
		sum += arpeggio( mt, t, 12.0 ) * 0.6;
		sum += snare2( mt, t ) * 0.5;
		sum += hihat1( mt ) * 0.8;
		sum += pad( mt, t, 0.0 ) * 0.6;

		o += sum * smoothstep( 2.75, 2.740, beat16.w);

	}

	// Section F: Main Drop 2 - 最高潮、速いアルペジオとガーガー音 (6小節)

	mt -= 48.0;
	beat4 = beat( mt, 4.0 );
	beat8 = beat( mt, 8.0 );
	beat16 = beat( mt, 16.0 );

	// Section F-1: Climax - フルパワー、全要素が揃う (4小節)
	if( isin( beat16.y, 0.0, 3.0 ) ) {

		// Climaxではコード進行を倍速に
		g_chordSpeed = 1.0;

		t = getFrec( t, 0.0, beat8 );

		float pitch = 0.0;

		vec2 sum = vec2(0.0);
		sum += kick3( mt, t ) * 1.0; // だだだだっちゃだだだだのkick3
		sum += snare3( mt, t ); // 「っちゃ」部分のsnare3
		sum += hihat1( mt ); // ハイハットも強調
		sum += dada( mt, beat4.w );
		sum += bass( mt, t, pitch ); // climaxでリズミカルに
		sum += arpeggio_fast( mt, t, pitch ) * 1.2;
		sum += arpeggio( mt, t, pitch + 12.0 ) * 0.6;
		sum += arpeggio_fast( mt, t, pitch ) * 1.2;
		sum += rhythmicBass( mt, t, pitch ); // climaxでリズミカルに


		// シンセスタブで激しさを追加（8分音符で鋭く刺さる）
		sum += stab( mt, t, pitch + 0.0 ) * 0.5;

		// クライマックスのメロディライン追加（コード進行倍速）
		sum += leadSynth( mt, t, pitch );

		o += sum;

	}

	// Section F-2: Outro - 静かに終わる (2小節)
	if( isin( beat16.y, 3.0, 5.0 ) ) {

		// 通常速度に戻す
		g_chordSpeed = 1.0;

		t = getFrec( t, 0.0, beat8 );

		vec2 sum = vec2(0.0);
		sum += bass( mt, t, 0.0 );
		o += arpeggio_fast( mt, t, 0.0 ) * 1.2;
		sum += pad( mt, t, 0.0 ) * 0.4;

		// アウトロにも控えめなメロディライン
		sum += leadSynth( mt, t, 0.0 ) * 0.4;

		o += sum;

	}
	
	return o;

}

void main( void ) {

	float time = (aTime / uSampleRate ) + uTimeOffset;

	vec2 o = music( time );
	

	o_left = o.x;
	o_right = o.y;

}