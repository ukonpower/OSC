// マトリックス生成ユーティリティ関数

// スケールマトリックス（均等）
mat4 makeScale(float scale) {
	return mat4(
		scale, 0.0,   0.0,   0.0,
		0.0,   scale, 0.0,   0.0,
		0.0,   0.0,   scale, 0.0,
		0.0,   0.0,   0.0,   1.0
	);
}

// スケールマトリックス（xyz個別）
mat4 makeScale(vec3 scale) {
	return mat4(
		scale.x, 0.0,     0.0,     0.0,
		0.0,     scale.y, 0.0,     0.0,
		0.0,     0.0,     scale.z, 0.0,
		0.0,     0.0,     0.0,     1.0
	);
}

// 平行移動マトリックス
mat4 makeTranslation(vec3 translation) {
	return mat4(
		1.0, 0.0, 0.0, 0.0,
		0.0, 1.0, 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		translation.x, translation.y, translation.z, 1.0
	);
}

// X軸回転マトリックス
mat4 makeRotationX(float angle) {
	float c = cos(angle);
	float s = sin(angle);
	return mat4(
		1.0, 0.0, 0.0, 0.0,
		0.0, c,   -s,  0.0,
		0.0, s,   c,   0.0,
		0.0, 0.0, 0.0, 1.0
	);
}

// Y軸回転マトリックス
mat4 makeRotationY(float angle) {
	float c = cos(angle);
	float s = sin(angle);
	return mat4(
		c,   0.0, s,   0.0,
		0.0, 1.0, 0.0, 0.0,
		-s,  0.0, c,   0.0,
		0.0, 0.0, 0.0, 1.0
	);
}

// Z軸回転マトリックス
mat4 makeRotationZ(float angle) {
	float c = cos(angle);
	float s = sin(angle);
	return mat4(
		c,   -s,  0.0, 0.0,
		s,   c,   0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0.0, 0.0, 0.0, 1.0
	);
}

// XY平面回転マトリックス（Z軸回転と同等）
mat4 makeRotationXY(float angle) {
	return makeRotationZ(angle);
}

// YZ平面回転マトリックス（X軸回転と同等）
mat4 makeRotationYZ(float angle) {
	return makeRotationX(angle);
}

// XZ平面回転マトリックス（Y軸回転の逆）
mat4 makeRotationXZ(float angle) {
	return makeRotationY(-angle);
}

// オイラー角から回転マトリックス生成（ZYX順）
mat4 makeRotationFromEuler(vec3 euler) {
	return makeRotationZ(euler.z) * makeRotationY(euler.y) * makeRotationX(euler.x);
}

// 3x3回転マトリックスを4x4に拡張
mat4 mat3ToMat4(mat3 m) {
	return mat4(
		m[0][0], m[0][1], m[0][2], 0.0,
		m[1][0], m[1][1], m[1][2], 0.0,
		m[2][0], m[2][1], m[2][2], 0.0,
		0.0,     0.0,     0.0,     1.0
	);
}

// 法線変換用：4x4マトリックスから回転・スケール部分（3x3）を抽出
mat3 normalMatrix(mat4 m) {
	return mat3(
		m[0][0], m[0][1], m[0][2],
		m[1][0], m[1][1], m[1][2],
		m[2][0], m[2][1], m[2][2]
	);
}
