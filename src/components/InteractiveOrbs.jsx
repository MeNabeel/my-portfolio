import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// WebGL availability checker helper
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

// Error Boundary for WebGL issues
class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.warn("WebGL failure detected, falling back to clean CSS backdrop:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Main Orb Component with hover interaction
function FloatingOrb({ position, colorType, size, speed, themeColors, hoveredUuid, meshRefs, index }) {
  const meshRef = useRef();
  const originalPosition = useRef([...position]);
  
  // Register mesh in parent array for raycasting
  useEffect(() => {
    meshRefs.current[index] = meshRef.current;
    return () => {
      meshRefs.current[index] = null;
    };
  });

  const hovered = meshRef.current && hoveredUuid === meshRef.current.uuid;
  const color = themeColors[colorType] || '#8a2be2';

  // Random rotation speed for each orb
  const rotationSpeed = useMemo(() => ({
    x: (Math.random() - 0.5) * 0.005,
    y: (Math.random() - 0.5) * 0.005,
    z: (Math.random() - 0.5) * 0.005
  }), []);
  
  // Floating animation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      
      // Floating motion
      meshRef.current.position.x = originalPosition.current[0] + Math.sin(t * speed) * 0.35;
      meshRef.current.position.y = originalPosition.current[1] + Math.cos(t * speed * 0.7) * 0.35;
      meshRef.current.position.z = originalPosition.current[2] + Math.sin(t * speed * 0.5) * 0.25;
      
      // Hover effect - scale up and glow when hovered
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.35, 1.35, 1.35), 0.1);
        meshRef.current.material.opacity = THREE.MathUtils.lerp(meshRef.current.material.opacity, 0.85, 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        meshRef.current.material.opacity = THREE.MathUtils.lerp(meshRef.current.material.opacity, 0.2, 0.1);
      }
      
      // Rotation
      meshRef.current.rotation.x += rotationSpeed.x;
      meshRef.current.rotation.y += rotationSpeed.y;
      meshRef.current.rotation.z += rotationSpeed.z;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshStandardMaterial
        color={color}
        emissive={hovered ? color : '#000000'}
        emissiveIntensity={hovered ? 0.9 : 0.25}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

// Glow Particles
function GlowParticles({ themeColors }) {
  const pointsRef = useRef();
  const particleCount = 250; // Optimized count for performance
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);
  
  const colors = useMemo(() => {
    const cols = new Float32Array(particleCount * 3);
    // Convert hex colors to normalized RGB values
    const primaryRGB = new THREE.Color(themeColors.primary || '#8a2be2');
    const secondaryRGB = new THREE.Color(themeColors.secondary || '#00f5ff');
    const accentRGB = new THREE.Color(themeColors.accent || '#d8b4fe');

    for (let i = 0; i < particleCount; i++) {
      const mixVal = Math.random();
      let selectedColor;
      if (mixVal < 0.33) {
        selectedColor = primaryRGB;
      } else if (mixVal < 0.66) {
        selectedColor = secondaryRGB;
      } else {
        selectedColor = accentRGB;
      }

      cols[i * 3] = selectedColor.r;
      cols[i * 3 + 1] = selectedColor.g;
      cols[i * 3 + 2] = selectedColor.b;
    }
    return cols;
  }, [themeColors]);
  
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.03;
      pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.05;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Custom Raycast Handler
function RaycastHandler({ meshRefs, onHoverChange }) {
  const { camera, raycaster } = useThree();
  const mouse = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(() => {
    if (mouse.current.x === -999) return;
    
    raycaster.setFromCamera(mouse.current, camera);
    const meshes = meshRefs.current.filter(Boolean);
    const intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      onHoverChange(intersects[0].object.uuid);
    } else {
      onHoverChange(null);
    }
  });

  return null;
}

// Aurora Curtain Component for organic waving light curtains
function AuroraCurtain({ color, countX = 80, countY = 15, yOffset = 0, zOffset = -2, speed = 0.4, amplitude = 0.6, frequency = 0.2, spacingX = 0.25, spacingY = 0.15 }) {
  const pointsRef = useRef();
  const totalPoints = countX * countY;

  const positions = useMemo(() => {
    const pos = new Float32Array(totalPoints * 3);
    for (let x = 0; x < countX; x++) {
      const posX = (x - countX / 2) * spacingX;
      for (let y = 0; y < countY; y++) {
        const idx = x * countY + y;
        const posY = yOffset + (y - countY / 2) * spacingY;
        
        pos[idx * 3] = posX;
        pos[idx * 3 + 1] = posY;
        pos[idx * 3 + 2] = zOffset + (Math.random() - 0.5) * 0.1;
      }
    }
    return pos;
  }, [countX, countY, spacingX, spacingY, yOffset, zOffset, totalPoints]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const t = clock.getElapsedTime() * speed;
      const posAttr = pointsRef.current.geometry.attributes.position;
      
      for (let x = 0; x < countX; x++) {
        const idxOffset = x * countY;
        const xPos = posAttr.getX(idxOffset);
        // Combine sine wave components for dynamic oscillation
        const wave = Math.sin(xPos * frequency + t) * amplitude + Math.cos(xPos * 0.12 + t * 0.6) * (amplitude * 0.5);
        
        for (let y = 0; y < countY; y++) {
          const idx = idxOffset + y;
          posAttr.setY(idx, yOffset + (y - countY / 2) * spacingY + wave * 0.8);
          posAttr.setZ(idx, zOffset + wave * 0.6);
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={totalPoints} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color={color}
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Aurora Waves wrapper combining three wave layers
function AuroraWaves({ themeColors }) {
  const primaryColor = themeColors.primary || '#10b981';
  const secondaryColor = themeColors.secondary || '#34d399';
  const accentColor = themeColors.accent || '#059669';

  return (
    <group>
      <AuroraCurtain
        color={primaryColor}
        countX={100}
        countY={18}
        yOffset={0.5}
        zOffset={-2.5}
        speed={0.35}
        amplitude={0.7}
        frequency={0.18}
        spacingX={0.28}
        spacingY={0.16}
      />
      <AuroraCurtain
        color={secondaryColor}
        countX={90}
        countY={15}
        yOffset={-0.3}
        zOffset={-1.5}
        speed={0.48}
        amplitude={0.9}
        frequency={0.24}
        spacingX={0.26}
        spacingY={0.15}
      />
      <AuroraCurtain
        color={accentColor}
        countX={85}
        countY={12}
        yOffset={0.1}
        zOffset={-0.5}
        speed={0.25}
        amplitude={0.5}
        frequency={0.15}
        spacingX={0.3}
        spacingY={0.18}
      />
    </group>
  );
}

// Inner Canvas Wrapper
function OrbsCanvas({ themeColors, themeName, isMobile }) {
  const meshRefs = useRef([]);
  const [hoveredUuid, setHoveredUuid] = useState(null);

  // Position scaling for responsiveness
  const scale = isMobile ? 0.65 : 1.0;

  const orbsConfig = useMemo(() => [
    { position: [-2.2 * scale, 1.2 * scale, 0], colorType: "primary", size: 0.38 * scale, speed: 0.5 },
    { position: [2.0 * scale, -0.6 * scale, 1.0], colorType: "secondary", size: 0.33 * scale, speed: 0.65 },
    { position: [0, 1.6 * scale, -1.0], colorType: "accent", size: 0.42 * scale, speed: 0.4 },
    { position: [-1.6 * scale, -1.2 * scale, 1.5], colorType: "primary", size: 0.28 * scale, speed: 0.6 },
    { position: [1.7 * scale, 0.6 * scale, -1.5], colorType: "secondary", size: 0.36 * scale, speed: 0.55 },
    { position: [0.2 * scale, -1.4 * scale, 0.8], colorType: "accent", size: 0.3 * scale, speed: 0.45 },
    { position: [-0.6 * scale, 1.9 * scale, 1.2], colorType: "primary", size: 0.4 * scale, speed: 0.6 },
    { position: [1.3 * scale, -1.6 * scale, -0.5], colorType: "secondary", size: 0.34 * scale, speed: 0.48 }
  ], [scale]);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 60 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-10, -10, -10]} intensity={0.6} />
      <directionalLight position={[0, 5, 5]} intensity={0.9} />
      
      {themeName === 'aurora' ? (
        <AuroraWaves themeColors={themeColors} />
      ) : (
        <>
          <GlowParticles themeColors={themeColors} />
          {orbsConfig.map((orb, index) => (
            <FloatingOrb
              key={index}
              index={index}
              meshRefs={meshRefs}
              hoveredUuid={hoveredUuid}
              themeColors={themeColors}
              {...orb}
            />
          ))}
          <RaycastHandler meshRefs={meshRefs} onHoverChange={setHoveredUuid} />
        </>
      )}
    </Canvas>
  );
}

// Fallback visual backdrops if WebGL fails or errors out
function FallbackBackdrop() {
  return (
    <div className="absolute inset-0 opacity-15 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[15%] left-[20%] w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: 'var(--primary-color)', animation: 'space-drift-1 30s ease-in-out infinite' }}></div>
      <div className="absolute bottom-[20%] right-[15%] w-80 h-80 rounded-full blur-3xl" style={{ backgroundColor: 'var(--secondary-color)', animation: 'space-drift-2 35s ease-in-out infinite' }}></div>
      <div className="absolute top-[60%] left-[45%] w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: 'var(--accent-color)', animation: 'space-drift-3 40s ease-in-out infinite' }}></div>
    </div>
  );
}

export default function InteractiveOrbs() {
  const [themeColors, setThemeColors] = useState({
    primary: '#8a2be2',
    secondary: '#00f5ff',
    accent: '#d8b4fe'
  });
  const [themeName, setThemeName] = useState("cosmic");
  const [isMobile, setIsMobile] = useState(false);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  const [isReady, setIsReady] = useState(false);

  // Check WebGL and responsiveness on mount
  useEffect(() => {
    setIsWebGLSupported(isWebGLAvailable());
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Set ready status after components mount
    const readyTimer = setTimeout(() => setIsReady(true), 200);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(readyTimer);
    };
  }, []);

  // Update theme colors dynamically on changes to document.body
  useEffect(() => {
    const updateColors = () => {
      const styles = getComputedStyle(document.body);
      const primary = styles.getPropertyValue('--primary-color').trim() || '#8a2be2';
      const secondary = styles.getPropertyValue('--secondary-color').trim() || '#00f5ff';
      const accent = styles.getPropertyValue('--accent-color').trim() || '#d8b4fe';
      setThemeColors({ primary, secondary, accent });

      // Determine active theme name class
      const themeClass = Array.from(document.body.classList).find(c => c.startsWith('theme-')) || 'theme-cosmic';
      setThemeName(themeClass.replace('theme-', ''));
    };

    updateColors();

    const observer = new MutationObserver(updateColors);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  if (!isWebGLSupported) {
    return <FallbackBackdrop />;
  }

  return (
    <div 
      className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 z-0 ${isReady ? 'opacity-100' : 'opacity-0'}`}
      style={{ mixBlendMode: 'screen' }}
    >
      <WebGLErrorBoundary fallback={<FallbackBackdrop />}>
        <OrbsCanvas themeColors={themeColors} themeName={themeName} isMobile={isMobile} />
      </WebGLErrorBoundary>
    </div>
  );
}
