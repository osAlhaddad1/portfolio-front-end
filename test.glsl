            // Define colors for each segment
            vec3 color11 = vec3(0.0, 0.0, 0.2);   // First color
            vec3 color12 = vec3(0.83, 0.73, 0.45); // Second color
            vec3 color13 = vec3(0.2, 0.2, 0.2);   // Third color
            vec3 color14 = vec3(0.8, 0.8, 0.8);   // forth color
            
            
            
            
            if (scroll < range11) {
                color1 = color11;
            }
            
            
            else if (scroll < range12) {
                // Transition from color2 to color3
                float t = smoothstep(range11, range12, scroll);
                color1 = mix(color11, color12, t);
            }
            
            
            else if (scroll < range22) {
                // Transition from color2 to color3
                float t = ;
                color1 = mix(color12, color13, smoothstep(range12, range22, scroll));
            }
            
            
            else if (scroll < range32) {
                // Transition from color2 to color3
                float t = smoothstep(range22, range32, scroll);
                color1 = mix(color13, color14, t);
            }
                    
                    
            else if (scroll < range42) {
                // Transition from color2 to color3
                float t = smoothstep(range32, range42, scroll);
                color1 = mix(color14, color11, t);
            }
            
            else {
                // Beyond range2, keep color3
                color1 = color11;
            }
            