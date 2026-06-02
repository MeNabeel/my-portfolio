import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

import './Aurora.css';

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uShowPlanet;

out vec4 fragColor;

// Pseudo-random hash
float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

// 2D Value Noise
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

vec3 permute(vec3 x) {
    return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

// Fractal Brownian Motion (FBM) for vertical light beams
float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 4; ++i) {
        v += a * snoise(p);
        p = rot * p * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

// Map horizontal coordinates to aurora colors
vec3 getAuroraColor(float x) {
    vec3 purple = vec3(0.55, 0.1, 0.95);
    vec3 magenta = vec3(0.9, 0.05, 0.6);
    vec3 emerald = vec3(0.0, 0.9, 0.45);
    vec3 cyan = vec3(0.0, 0.6, 1.0);
    
    if (x < 0.25) {
        return mix(purple, magenta, x * 4.0);
    } else if (x < 0.5) {
        return mix(magenta, emerald, (x - 0.25) * 4.0);
    } else if (x < 0.75) {
        return mix(emerald, cyan, (x - 0.5) * 4.0);
    } else {
        return mix(cyan, purple, (x - 0.75) * 4.0);
    }
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    
    // 1. Dark Deep-Space Background Gradient (#02040a to #050814)
    vec3 spaceTop = vec3(0.0078, 0.0157, 0.0392); // #02040a
    vec3 spaceBottom = vec3(0.0196, 0.0314, 0.0784); // #050814
    vec3 spaceBg = mix(spaceBottom, spaceTop, uv.y);
    
    // Add soft nebula haze in background
    float nebulaNoise = snoise(uv * 1.5 + vec2(uTime * 0.02, 0.0)) * 0.5 + 0.5;
    vec3 nebulaColor = mix(vec3(0.1, 0.0, 0.2), vec3(0.0, 0.1, 0.15), uv.x);
    spaceBg += nebulaColor * nebulaNoise * 0.35;

    // 2. Multi-Layer Star Field with 3D Parallax & Twinkle
    vec3 stars = vec3(0.0);
    for (int layer = 1; layer <= 3; layer++) {
        float fl = float(layer);
        
        // Deep parallax offset based on uMouse
        vec2 starOffset = uMouse * (fl * 0.012);
        
        // Star field grid
        vec2 gridUv = (uv + starOffset) * (20.0 * fl * fl);
        vec2 id = floor(gridUv);
        vec2 f = fract(gridUv) - 0.5;
        
        float h = hash(id);
        float twinkle = sin(uTime * (2.5 + h * 4.0) + h * 6.28) * 0.5 + 0.5;
        
        // Threshold controls density
        if (h > 0.91 - (fl * 0.02)) {
            float size = 0.04 + 0.04 * hash(id + vec2(1.0));
            float dist = length(f);
            
            // Draw star point
            float brightness = smoothstep(size, 0.0, dist) + 0.25 * smoothstep(size * 4.0, 0.0, dist);
            vec3 starTint = mix(vec3(0.85, 0.92, 1.0), vec3(1.0, 0.85, 0.95), hash(id + vec2(2.0)));
            stars += starTint * brightness * twinkle * (0.35 + 0.65 * hash(id + vec2(3.0)));
        }
    }
    
    // 3. Subtle Floating Cosmic Dust
    vec3 dust = vec3(0.0);
    vec2 dustOffset = uMouse * 0.004 + vec2(sin(uTime * 0.04), cos(uTime * 0.04)) * 0.02;
    vec2 dustGridUv = (uv + dustOffset) * 6.0;
    vec2 dustId = floor(dustGridUv);
    vec2 dustF = fract(dustGridUv) - 0.5;
    float dustHash = hash(dustId);
    if (dustHash > 0.95) {
        float size = 0.12 * dustHash;
        float dist = length(dustF);
        float brightness = smoothstep(size * 2.0, 0.0, dist) * 0.18;
        vec3 dustTint = mix(vec3(0.0, 0.9, 0.6), vec3(0.5, 0.0, 0.9), hash(dustId + vec2(1.0)));
        dust += dustTint * brightness;
    }

    // 4. Vertical Aurora Borealis Beams (from top, fading down)
    vec3 aurora = vec3(0.0);
    
    // Stretched noise coordinates for vertical beams
    vec2 beamUv = vec2(uv.x * 6.0 - uMouse.x * 0.05, uv.y * 0.3 - uTime * 0.015);
    
    // Base FBM columns
    float beamNoise = fbm(beamUv);
    beamNoise = smoothstep(0.15, 0.75, beamNoise);
    
    // Distort x coordinate using mouse position for interactive waving
    float hoverDist = distance(uv, uMouse);
    float hoverDistortion = sin(hoverDist * 8.0 - uTime * 1.5) * 0.03 * smoothstep(0.45, 0.0, hoverDist);
    
    // High-altitude volumetric light columns
    float colNoise1 = snoise(vec2((uv.x + hoverDistortion) * 12.0 + uTime * 0.05, uTime * 0.02));
    float colNoise2 = snoise(vec2((uv.x + hoverDistortion) * 20.0 - uTime * 0.08, uTime * 0.03));
    float columnStrength = smoothstep(-0.2, 0.6, colNoise1 * 0.6 + colNoise2 * 0.4);
    
    // Combine noise layers
    float auroraIntensity = beamNoise * columnStrength * uAmplitude;
    
    // Fade out as they go down
    auroraIntensity *= smoothstep(0.18, 0.9, uv.y);
    
    // Add soft atmospheric glow at the top
    auroraIntensity += pow(uv.y, 4.0) * 0.25;

    // Apply aurora colors distributed horizontally
    vec3 auroraColor = getAuroraColor(uv.x + snoise(uv * 0.2) * 0.08);
    aurora = auroraColor * auroraIntensity * 0.95;

    // 5. Curved Planet Horizon (at the bottom)
    vec2 planetCenter = vec2(0.5, -0.82);
    float planetRadius = 0.93;
    float distToPlanet = distance(uv, planetCenter);
    
    // Thin, sharp glowing horizon line
    float horizonLine = smoothstep(0.005, 0.0, abs(distToPlanet - planetRadius));
    
    // Atmospheric glow above the horizon (only for uv.y > horizon)
    float glowAbove = 0.0;
    if (distToPlanet > planetRadius) {
        float distFromEdge = distToPlanet - planetRadius;
        glowAbove = smoothstep(0.12, 0.0, distFromEdge);
        glowAbove = pow(glowAbove, 2.0); // softer, wider glow
    }
    
    // Color of the horizon line and atmosphere glow based on x-coordinate
    vec3 horizonThemeColor = getAuroraColor(uv.x);
    
    // Rising sun flare in the middle of the horizon (x near 0.5)
    vec2 sunPos = vec2(0.5, 0.11);
    float distToSun = distance(uv, sunPos);
    
    // Sharp bright sun flare at the center
    float sunFlare = smoothstep(0.08, 0.0, distToSun);
    sunFlare = pow(sunFlare, 4.0) * 2.0;
    
    // Broader sun glow
    float sunGlow = smoothstep(0.35, 0.0, distToSun);
    sunGlow = pow(sunGlow, 2.2) * 0.7;
    
    // Sun light is bright green/white in the center
    vec3 sunLightColor = vec3(0.8, 1.0, 0.9) * (sunFlare + sunGlow);
    
    // Combine the horizon elements
    vec3 thinLineColor = mix(horizonThemeColor, vec3(1.0), 0.7) * horizonLine * 1.5;
    vec3 atmosphereColor = horizonThemeColor * glowAbove * 0.8;
    
    // Inside the planet is black, plus a tiny bit of glow bleeding in at the edge
    float glowInside = 0.0;
    if (distToPlanet <= planetRadius) {
        float distFromEdge = planetRadius - distToPlanet;
        glowInside = smoothstep(0.02, 0.0, distFromEdge);
        glowInside = pow(glowInside, 2.0) * 0.3;
    }
    vec3 planetBodyColor = horizonThemeColor * glowInside;
    
    // Solid planet body mask
    float planetMask = step(distToPlanet, planetRadius);

    // 6. Composite the entire scene
    vec3 spaceScene = spaceBg + stars + dust + aurora;
    vec3 finalColor;
    
    if (uShowPlanet > 0.5) {
        finalColor = mix(spaceScene, planetBodyColor, planetMask);
        finalColor += thinLineColor + atmosphereColor + sunLightColor;
    } else {
        // Fade the space background, stars, dust, and aurora to black at the top and bottom
        float edgeFade = smoothstep(0.0, 0.15, uv.y) * smoothstep(1.0, 0.85, uv.y);
        finalColor = spaceScene * edgeFade;
    }
    
    fragColor = vec4(finalColor, 1.0);
}
`;

export default function Aurora(props) {
  const { amplitude = 1.0, showPlanet = false } = props;
  const propsRef = useRef(props);
  propsRef.current = props;

  const ctnDom = useRef(null);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = 'transparent';

    let program;

    function resize() {
      if (!ctn) return;
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    }
    window.addEventListener('resize', resize);

    let mouse = [0.5, 0.5];
    const handleMouseMove = (e) => {
      const rect = ctn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mouse = [x, y];
    };
    window.addEventListener('mousemove', handleMouseMove);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uMouse: { value: [0.5, 0.5] },
        uShowPlanet: { value: showPlanet ? 1.0 : 0.0 }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    let animateId = 0;
    const update = t => {
      animateId = requestAnimationFrame(update);
      const { time = t * 0.01, speed = 1.0 } = propsRef.current;
      program.uniforms.uTime.value = time * speed * 0.1;
      program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? 1.0;
      program.uniforms.uShowPlanet.value = propsRef.current.showPlanet ? 1.0 : 0.0;
      program.uniforms.uMouse.value = mouse;
      renderer.render({ scene: mesh });
    };
    animateId = requestAnimationFrame(update);

    resize();

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amplitude, showPlanet]);

  return <div ref={ctnDom} className="aurora-container" />;
}
