// 3D hero scene rendered with React Three Fiber. Code-split via React.lazy
// in HeroVisual so this bundle does not block first paint.
import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { HeroFallback } from './HeroFallback';

function CameraParallax() {
  const { camera, mouse } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.7, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.45, 0.04);
    camera.lookAt(target.current);
  });
  return null;
}

function OrbitalRings() {
  const g1 = useRef<THREE.Group>(null);
  const g2 = useRef<THREE.Group>(null);
  const g3 = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (g1.current) g1.current.rotation.x += dt * 0.16;
    if (g2.current) g2.current.rotation.y += dt * 0.2;
    if (g3.current) g3.current.rotation.z += dt * 0.1;
  });
  return (
    <>
      <group ref={g1}>
        <mesh>
          <torusGeometry args={[2.55, 0.02, 8, 128]} />
          <meshBasicMaterial color="#2a9d8f" transparent opacity={0.5} />
        </mesh>
      </group>
      <group ref={g2}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.9, 0.02, 8, 128]} />
          <meshBasicMaterial color="#c9a84c" transparent opacity={0.45} />
        </mesh>
      </group>
      <group ref={g3}>
        <mesh rotation={[Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[3.3, 0.015, 8, 128]} />
          <meshBasicMaterial color="#1a6b6b" transparent opacity={0.35} />
        </mesh>
      </group>
    </>
  );
}

function CoreOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += dt * 0.12;
      meshRef.current.rotation.x += dt * 0.05;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= dt * 0.18;
      wireRef.current.rotation.z += dt * 0.06;
    }
    if (innerRef.current) {
      const t = performance.now() * 0.001;
      const s = 1 + Math.sin(t * 1.5) * 0.06;
      innerRef.current.scale.setScalar(s);
    }
  });
  return (
    <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.45, 4]} />
        <MeshDistortMaterial
          color="#1a6b6b"
          distort={0.4}
          speed={1.8}
          roughness={0.15}
          metalness={0.85}
          emissive="#0d3b3b"
          emissiveIntensity={0.55}
        />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.72, 1]} />
        <meshBasicMaterial color="#2a9d8f" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.7, 2]} />
        <meshStandardMaterial
          color="#c9a84c"
          emissive="#c9a84c"
          emissiveIntensity={1.4}
          roughness={0.18}
          metalness={0.95}
        />
      </mesh>
    </Float>
  );
}

function Satellites() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.06;
  });
  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.4}>
        <mesh position={[3, 1.2, 0.4]}>
          <torusGeometry args={[0.36, 0.13, 16, 48]} />
          <meshStandardMaterial
            color="#c9a84c"
            emissive="#c9a84c"
            emissiveIntensity={0.55}
            metalness={0.85}
            roughness={0.2}
          />
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={1.6} floatIntensity={1}>
        <mesh position={[-2.7, -0.6, 0.8]}>
          <octahedronGeometry args={[0.46, 0]} />
          <meshStandardMaterial
            color="#2a9d8f"
            emissive="#1a6b6b"
            emissiveIntensity={0.45}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      </Float>
      <Float speed={2.4} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh position={[1.9, -2.2, -0.5]}>
          <dodecahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial
            color="#e8cc7a"
            emissive="#c9a84c"
            emissiveIntensity={0.4}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
      </Float>
      <Float speed={1.3} rotationIntensity={1.3} floatIntensity={1}>
        <mesh position={[-2.2, 1.9, -0.4]}>
          <tetrahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial
            color="#1a6b6b"
            emissive="#2a9d8f"
            emissiveIntensity={0.55}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[0.4, 2.7, -0.6]}>
          <torusKnotGeometry args={[0.24, 0.075, 96, 16]} />
          <meshStandardMaterial
            color="#c9a84c"
            emissive="#c9a84c"
            emissiveIntensity={0.65}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      </Float>
      <Float speed={2.1} rotationIntensity={0.6} floatIntensity={1.1}>
        <mesh position={[2.5, -1.5, 1]}>
          <icosahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial
            color="#2a9d8f"
            emissive="#1a6b6b"
            emissiveIntensity={0.5}
            metalness={0.6}
            roughness={0.35}
          />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={0.9}>
        <mesh position={[-2.6, 0.7, 1.2]}>
          <coneGeometry args={[0.28, 0.55, 6]} />
          <meshStandardMaterial
            color="#e8cc7a"
            emissive="#c9a84c"
            emissiveIntensity={0.45}
            metalness={0.5}
            roughness={0.4}
          />
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
          camera={{ position: [0, 0, 6.5], fov: 50 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.55} />
          <pointLight position={[5, 5, 5]} color="#1a6b6b" intensity={2.6} />
          <pointLight position={[-5, -3, 3]} color="#c9a84c" intensity={1.7} />
          <pointLight position={[0, 0, -5]} color="#2a9d8f" intensity={1.1} />
          <pointLight position={[0, 0, 5]} color="#e8cc7a" intensity={0.9} />

          <Stars
            radius={60}
            depth={50}
            count={450}
            factor={3.5}
            saturation={0}
            fade
            speed={0.6}
          />

          <OrbitalRings />
          <CoreOrb />
          <Satellites />

          <Sparkles
            count={160}
            scale={[7, 7, 5]}
            size={1.7}
            speed={0.4}
            opacity={0.8}
            color="#c9a84c"
          />
          <Sparkles
            count={90}
            scale={[6, 6, 4]}
            size={1.2}
            speed={0.55}
            opacity={0.6}
            color="#2a9d8f"
          />

          <CameraParallax />
        </Canvas>
      </Suspense>
    </div>
  );
}
