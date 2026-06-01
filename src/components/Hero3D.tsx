// 3D hero scene rendered with React Three Fiber. Code-split via React.lazy
// in HeroVisual so this bundle does not block first paint.
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import type { Group, Mesh } from 'three';
import { HeroFallback } from './HeroFallback';

function CoreOrb() {
  const meshRef = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x += delta * 0.05;
    }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.35, 2]} />
        <MeshDistortMaterial
          color="#1a6b6b"
          distort={0.32}
          speed={1.6}
          roughness={0.25}
          metalness={0.65}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshBasicMaterial color="#2a9d8f" wireframe transparent opacity={0.18} />
      </mesh>
    </Float>
  );
}

function Satellites() {
  const groupRef = useRef<Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.4}>
        <mesh position={[2.6, 0.8, 0.2]}>
          <torusGeometry args={[0.34, 0.12, 16, 48]} />
          <meshStandardMaterial color="#c9a84c" metalness={0.7} roughness={0.25} />
        </mesh>
      </Float>

      <Float speed={1.6} rotationIntensity={1.6} floatIntensity={1}>
        <mesh position={[-2.3, -0.4, 0.6]}>
          <octahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial color="#2a9d8f" metalness={0.4} roughness={0.4} />
        </mesh>
      </Float>

      <Float speed={2.4} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh position={[1.6, -1.9, -0.4]}>
          <dodecahedronGeometry args={[0.38, 0]} />
          <meshStandardMaterial color="#e8cc7a" metalness={0.55} roughness={0.3} />
        </mesh>
      </Float>

      <Float speed={1.3} rotationIntensity={1.3} floatIntensity={1}>
        <mesh position={[-1.9, 1.6, -0.3]}>
          <tetrahedronGeometry args={[0.36, 0]} />
          <meshStandardMaterial color="#1a6b6b" metalness={0.5} roughness={0.35} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[0.2, 2.4, -0.5]}>
          <torusKnotGeometry args={[0.22, 0.07, 80, 12]} />
          <meshStandardMaterial color="#c9a84c" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="hero-canvas-wrap">
      <Suspense fallback={<HeroFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 50 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.55} />
          <pointLight position={[5, 5, 5]} color="#1a6b6b" intensity={2.2} />
          <pointLight position={[-5, -3, 3]} color="#c9a84c" intensity={1.4} />
          <pointLight position={[0, 0, -5]} color="#2a9d8f" intensity={0.8} />

          <CoreOrb />
          <Satellites />

          <Sparkles
            count={70}
            scale={[6, 6, 4]}
            size={1.4}
            speed={0.35}
            opacity={0.7}
            color="#c9a84c"
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
