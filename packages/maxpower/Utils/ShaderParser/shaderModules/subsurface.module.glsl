float subsurface(vec3 ro, vec3 rd, float ra) {
    float res = 0.;
    const int N = 8;
    for (int i=0; i<N; i++) {
        float h = ra * float(i)/float(N);
        res += clamp(D(ro + rd*h).d / h,0.,1.);
    }
    res /= float(N);
    return res*res*(3.-2.*res);
}
