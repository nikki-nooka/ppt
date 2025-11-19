
import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, useTexture, Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// --- Shaders for Realistic Atmosphere ---

const vertexShader = `
varying vec3 vNormal;
void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec3 vNormal;
void main() {
  // Fresnel effect: Calculates intensity based on view angle
  // 0.6 - dot(...) creates the rim. Power of 5.0 makes it thin and soft.
  float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 5.0);
  
  // Soft Blue/Cyan Glow
  gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity * 1.2;
}
`;

// --- Components ---

const RealisticEarth = () => {
  const earthRef = useRef<THREE.Group>(null!);
  const cloudsRef = useRef<THREE.Mesh>(null!);
  
  // High-quality textures from reliable sources
  const [nightMap, normalMap, cloudsMap] = useTexture([
    'https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-night.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
  ]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (cloudsRef.current) {
       // Clouds move slightly faster than the earth rotation (simulated by OrbitControls autoRotate or manual)
       cloudsRef.current.rotation.y = t * 0.02; 
    }
  });

  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide, // Render on the inside of the slightly larger sphere
      transparent: true,
      depthWrite: false, // Prevents occlusion issues
    });
  }, []);

  return (
    <group ref={earthRef}>
      
      {/* Base Earth Sphere (Night Mode) */}
      <Sphere args={[1.3, 64, 64]}>
        <meshStandardMaterial
          map={nightMap}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.6, 0.6)}
          roughness={0.6}
          metalness={0.2}
          emissiveMap={nightMap}
          emissive={new THREE.Color('#ffaa66')} // Warm golden city lights
          emissiveIntensity={1.2} // Make them pop
          color={new THREE.Color('#000510')} // Deep blue-black base
        />
      </Sphere>

      {/* Cloud Layer */}
      <mesh ref={cloudsRef} scale={[1.315, 1.315, 1.315]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          alphaMap={cloudsMap}
          depthWrite={false}
        />
      </mesh>
      
      {/* Atmosphere Glow (Refined Scale to remove hard outline) */}
      <mesh scale={[1.2, 1.2, 1.2]}>
         <sphereGeometry args={[1.1, 64, 64]} />
         <primitive object={atmosphereMaterial} attach="material" />
      </mesh>
    </group>
  );
};

interface GlobeProps {
    darkMode?: boolean;
}

const Globe3D: React.FC<GlobeProps> = ({ darkMode = false }) => {
  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none bg-black">
      <Canvas camera={{ position: [0, 0, 8], fov: 35 }} dpr={[1, 2]}>
        {/* Deep Space Background */}
        <color attach="background" args={['#020205']} />
        
        {/* --- Cinematic Lighting --- */}
        <ambientLight intensity={0.05} /> 
        
        {/* Main Sun Light (Rim Light) */}
        <directionalLight position={[6, 2, 4]} intensity={2.5} color="#cceeff" />
        
        {/* Fill Light (Blue Ambient from space) */}
        <pointLight position={[-5, -2, -5]} intensity={0.5} color="#224488" />
        
        {/* City Light Glow Helper */}
        <pointLight position={[2, 0, 2]} intensity={0.5} color="#ffaa00" distance={5} />

        {/* Background Stars */}
        <Stars radius={300} depth={60} count={10000} factor={4} saturation={0} fade speed={0.2} />
        
        {/* Positioning: Shifted Right to leave ample space for text */}
        <group position={[3.2, 0, 0]}>
            <Suspense fallback={null}>
                <RealisticEarth />
            </Suspense>
        </group>

        {/* Controls for slight interaction and auto-rotation */}
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.8} 
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default Globe3D;
