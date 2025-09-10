vertex_shader = '''

    void main()
    {
        vec4 mvPosition = modelViewMatrix * vec4(position.xyz, 1.0f);
        gl_Position = projectionMatrix * mvPosition;
        vColor = vec3( uv, 1.0 );
    }
'''

fragment_shader = '''
    void main()
    {
        fragColor = vec4(pow(vColor, vec3(2.0)) * uColor, 0.2);
    }
'''