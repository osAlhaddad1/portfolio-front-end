document.addEventListener('DOMContentLoaded', () => {
    // Initialize scene
    const scene = new THREE.Scene();

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1;
    let scroll = 0.0;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('backgroundCanvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    window.addEventListener("scroll", (event) => {

        scroll = (this.scrollY / 7971);
        console.log(scroll)
});

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
        uniform float u_scroll;
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
        
        float when_gt(float x, float y) {
            return max(sign(x - y), 0.0);
        }
        
        
        

        // Improved color palette
        
        const vec3 color1 = vec3(0.0, 0.0, 0.0); // Deep Blue
        const vec3 color2 = vec3(0.03, 0.03, 0.05); // Dark Red
        const vec3 color3 = vec3(0.5, 0.5, 0.5); // Bright Red
        const vec3 color4 = vec3(0.6, 0.6, 0.6); // Blue

        void main() {
            float scroll = u_scroll;
            

            ////////////////////////// first //////////////////////////
            
            // Define colors for each segment
            vec3 color11 = vec3(0.0, 0.0, 0.02);   // First color
            vec3 color12 = vec3(0.83, 0.73, 0.45); // Second color
            vec3 color13 = vec3(0.9, 0.9, 0.9);   // Third color
            vec3 color14 = vec3(1.0, 0.396078431372549, 0.0);   // forth color
            
            // spliting the page into ranges
            vec3 range11 = vec3(color11) * when_gt(0.1, scroll);
            vec3 range12 = mix(color11, color12, smoothstep(0.1, 0.23, scroll)) * when_gt(scroll, 0.1) * when_gt(0.28, scroll); 
            vec3 range13 = mix(color12, color13, smoothstep(0.29, 0.47, scroll)) * when_gt(scroll, 0.28) * when_gt(0.53, scroll);
            vec3 range14 = mix(color13, color14, smoothstep(0.53, 0.66, scroll)) * when_gt(scroll, 0.52) * when_gt(0.74, scroll);
            vec3 range15 = mix(color14, color11, smoothstep(0.73, 0.85, scroll)) * when_gt(scroll, 0.73);
            
            
            // the color is the combination of all ranges
            vec3 color1 = vec3(range11) + vec3(range12) + vec3(range13) + vec3(range14) + vec3(range15);
            
            
        
        
        
            ////////////////////////// second //////////////////////////
        
            // Define colors for each segment
            vec3 color21 = vec3(0.03, 0.03, 0.05);   // First color
            vec3 color22 = vec3(0.19607843, 0.17647058823529413, 0.1607843137254902); // Second color
            vec3 color23 = vec3(0.6, 0.6, 0.6);   // Third color
            vec3 color24 = vec3(0.11764705882352941, 0.24313725490196078, 0.3843137254901961);   // forth color
            
            // spliting the page into ranges
            vec3 range21 = vec3(color21) * when_gt(0.1, scroll);
            vec3 range22 = mix(color21, color22, smoothstep(0.1, 0.23, scroll)) * when_gt(scroll, 0.1) * when_gt(0.28, scroll); 
            vec3 range23 = mix(color22, color23, smoothstep(0.29, 0.47, scroll)) * when_gt(scroll, 0.28) * when_gt(0.53, scroll);
            vec3 range24 = mix(color23, color24, smoothstep(0.53, 0.66, scroll)) * when_gt(scroll, 0.52) * when_gt(0.74, scroll);
            vec3 range25 = mix(color24, color21, smoothstep(0.73, 0.85, scroll)) * when_gt(scroll, 0.73);
            
            
            // the color is the combination of all ranges
            vec3 color2 = vec3(range21) + vec3(range22) + vec3(range23) + vec3(range24) + vec3(range25);
            
            
            
            
            
            
            ////////////////////////// third //////////////////////////
            
            // Define colors for each segment
            vec3 color31 = vec3(0.5, 0.5, 0.5);   // First color
            vec3 color32 = vec3(0.4470588235294118, 0.2196078431372549, 0.23921568627450981); // Second color
            vec3 color33 = vec3(0.6, 0.6, 0.6);   // Third color
            vec3 color34 = vec3(0.043137254901960784, 0.09803921568627451, 0.17254901960784313);   // forth color
            
            // spliting the page into ranges
            vec3 range31 = vec3(color31) * when_gt(0.1, scroll);
            vec3 range32 = mix(color31, color32, smoothstep(0.1, 0.23, scroll)) * when_gt(scroll, 0.1) * when_gt(0.28, scroll); 
            vec3 range33 = mix(color32, color33, smoothstep(0.29, 0.47, scroll)) * when_gt(scroll, 0.28) * when_gt(0.53, scroll);
            vec3 range34 = mix(color33, color34, smoothstep(0.53, 0.66, scroll)) * when_gt(scroll, 0.52) * when_gt(0.74, scroll);
            vec3 range35 = mix(color34, color31, smoothstep(0.73, 0.85, scroll)) * when_gt(scroll, 0.73);
            
            
            // the color is the combination of all ranges
            vec3 color3 = vec3(range31) + vec3(range32) + vec3(range33) + vec3(range34) + vec3(range35);
            
            
            
            
            
            
            
            ////////////////////////// forth //////////////////////////
            
            // Define colors for each segment
            vec3 color41 = vec3(0.6, 0.6, 0.6);   // First color
            vec3 color42 = vec3(0.6745098039215687, 0.611764705882353, 0.5529411764705883); // Second color
            vec3 color43 = vec3(0.6, 0.6, 0.6);   // Third color
            vec3 color44 = vec3(0.0, 0.0, 0.0);   // forth color
            
            // spliting the page into ranges
            vec3 range41 = vec3(color41) * when_gt(0.1, scroll);
            vec3 range42 = mix(color41, color42, smoothstep(0.1, 0.23, scroll)) * when_gt(scroll, 0.1) * when_gt(0.28, scroll); 
            vec3 range43 = mix(color42, color43, smoothstep(0.29, 0.47, scroll)) * when_gt(scroll, 0.28) * when_gt(0.53, scroll);
            vec3 range44 = mix(color43, color44, smoothstep(0.53, 0.66, scroll)) * when_gt(scroll, 0.52) * when_gt(0.74, scroll);
            vec3 range45 = mix(color44, color41, smoothstep(0.73, 0.85, scroll)) * when_gt(scroll, 0.73);
            
            
            // the color is the combination of all ranges
            vec3 color4 = vec3(range41) + vec3(range42) + vec3(range43) + vec3(range44) + vec3(range45);
            
            
            
            
            
            
            
            
            
            
            

        
        
        
        
        
        
            vec2 seed = v_uv * 2.0 * (u_mouse + 0.4);
            float n = cnoise21(seed) + length(u_mouse) * 0.5;

            // Improved transition effects
            float ml = pow(length(u_mouse), 2.5) * 0.2;
            float n1 = smoothstep(0.0, 0.2, n);
            vec3 color = mix(color1, color2, n1);

            float n2 = smoothstep(0.2 + ml, 0.4 + ml, n);
            color = mix(color, color3, n2);

            float n3 = smoothstep(0.4 + ml, 0.6 + ml, n);
            color = mix(color, color4, n3);

            float n4 = smoothstep(0.6 + ml, 1.0 + ml, n);
            color = mix(color, color1, n4);

            // Adding dynamic noise for more texture
            vec2 uvrandom = v_uv;
            uvrandom.y *= random(vec2(uvrandom.y, 0.4));
            color.rgb += random(uvrandom) * 0.05;

            // Adding subtle wave effect based on time
            float wave = sin(u_time * 0.1 + length(v_uv) * 10.0) * 0.02;
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
            u_mouse: { value: new THREE.Vector2() },
            u_scroll: { value: scroll}
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
        material.uniforms.u_scroll.value = scroll;


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
