document.addEventListener('DOMContentLoaded', () => {
    // Initialize scene
    const scene = new THREE.Scene();

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('backgroundCanvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Vertex shader
    const vertexShader = `
        varying vec2 v_uv;

        void main() {
            v_uv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    // Fragment shader
    const fragmentShader = `
    uniform float u_time;
    uniform vec2 u_mouse;
    varying vec2 v_uv;

    // Improved noise function for smoother results
    vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }
    vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
    float cnoise21(vec2 P){
        vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
        vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
        Pi = mod(Pi, 289.0);
        vec4 ix = Pi.xzxz;
        vec4 iy = Pi.yyww;
        vec4 fx = Pf.xzxz;
        vec4 fy = Pf.yyww;
        vec4 i = permute(permute(ix) + iy);
        vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0;
        vec4 gy = abs(gx) - 0.5;
        vec4 tx = floor(gx + 0.5);
        gx = gx - tx;
        vec2 g00 = vec2(gx.x,gy.x);
        vec2 g10 = vec2(gx.y,gy.y);
        vec2 g01 = vec2(gx.z,gy.z);
        vec2 g11 = vec2(gx.w,gy.w);
        vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
        g00 *= norm.x;
        g01 *= norm.y;
        g10 *= norm.z;
        g11 *= norm.w;
        float n00 = dot(g00, vec2(fx.x, fy.x));
        float n10 = dot(g10, vec2(fx.y, fy.y));
        float n01 = dot(g01, vec2(fx.z, fy.z));
        float n11 = dot(g11, vec2(fx.w, fy.w));
        vec2 fade_xy = fade(Pf.xy);
        vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
        float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
        return 2.3 * n_xy;
    }

    float random(vec2 p) {
        vec2 k1 = vec2(
            23.14069263277926,
            2.665144142690225
        );
        return fract(cos(dot(p, k1)) * 12345.6789);
    }

    // Improved color palette
    const vec3 color1 = vec3(0.059,0.035,0.682); // Deep Blue
    const vec3 color2 = vec3(0.047,0.027,0.545); // Dark Red
    const vec3 color3 = vec3(0.024,0.016,0.282); // Bright Red
    const vec3 color4 = vec3(0.047,0.043,0.196); // Blue

    void main() {
        vec2 seed = v_uv * 2.0 * (u_mouse + 0.4);
        float n = cnoise21(seed) + length(u_mouse) * 0.5;

        // Improved transition effects
        float ml = pow(length(u_mouse), 2.5) * 0.2;
        float n1 = smoothstep(0.0, 0.15, n);  // تعديل هنا لتقليل التشويش
        vec3 color = mix(color1, color2, n1);

        float n2 = smoothstep(0.15 + ml, 0.35 + ml, n);  // تعديل هنا أيضًا
        color = mix(color, color3, n2);

        float n3 = smoothstep(0.35 + ml, 0.55 + ml, n);  // تقليل الفارق بين القيم
        color = mix(color, color4, n3);

        float n4 = smoothstep(0.55 + ml, 0.85 + ml, n);  // تقليل الغباشة في المزج النهائي
        color = mix(color, color1, n4);

        // Reducing dynamic noise for more clarity
        vec2 uvrandom = v_uv;
        uvrandom.y *= random(vec2(uvrandom.y, 0.4));
        color.rgb += random(uvrandom) * 0.05;  // تقليل الضوضاء العشوائية

        // Subtle wave effect based on time, with reduced intensity
        float wave = sin(u_time * 0.1 + length(v_uv) * 10.0) * 0.01;  // تقليل تأثير الموجة
        color.rgb += wave;

        gl_FragColor = vec4(color, 1.0);
    }
`;


    // Create a plane geometry that covers the entire screen
    const geometry = new THREE.PlaneGeometry(3.5, 3.5);

    // Create shader material
    const material = new THREE.ShaderMaterial({
        uniforms: {
            u_time: { value: 0 },
            u_mouse: { value: new THREE.Vector2() }
        },
        vertexShader,
        fragmentShader
    });

    // Create a mesh with the geometry and material
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Handle mouse movement
    const target = new THREE.Vector2();
    document.addEventListener('mousemove', (event) => {
        target.set(
            (event.clientX / window.innerWidth) * 2 - 1,
            1 - (event.clientY / window.innerHeight) * 2
        );
    });

    // Animation loop
    function animate(time) {
        material.uniforms.u_time.value = time * 0.001;
        material.uniforms.u_mouse.value.lerp(target, 0.1);

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
});
