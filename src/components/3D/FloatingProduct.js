import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

const FloatingProduct = () => {
  const groupRef = useRef();
  const bottleRef = useRef();
  const capRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate the entire group
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.05;
    }

    // Animate bottle distortion
    if (bottleRef.current) {
      bottleRef.current.material.distort = Math.sin(time * 2) * 0.1 + 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Bottle */}
      <mesh ref={bottleRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 3, 32]} />
        <MeshDistortMaterial
          color="#ff69b4"
          transparent
          opacity={0.8}
          speed={2}
          distort={0.1}
          radius={1}
        />
      </mesh>

      {/* Bottle Cap */}
      <mesh ref={capRef} position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.4, 32]} />
        <meshStandardMaterial
          color="#gold"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Bottle Neck */}
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 0.4, 32]} />
        <meshStandardMaterial
          color="#ff69b4"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Liquid inside bottle */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 2.5, 32]} />
        <meshStandardMaterial
          color="#ff1493"
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Glitter particles around the bottle */}
      {[...Array(15)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial
            color="#fff"
            emissive="#fff"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Decorative rings */}
      {[0, 0.5, 1, 1.5].map((y, i) => (
        <mesh key={i} position={[0, y - 1, 0]}>
          <torusGeometry args={[0.85, 0.05, 16, 32]} />
          <meshStandardMaterial
            color="#gold"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Brand label */}
      <mesh position={[0, 0, 0.85]}>
        <planeGeometry args={[1.4, 2]} />
        <meshStandardMaterial
          color="#fff"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Logo text on label */}
      <mesh position={[0, 0.3, 0.86]}>
        <planeGeometry args={[0.8, 0.3]} />
        <meshStandardMaterial
          color="#ff69b4"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Bottom base */}
      <mesh position={[0, -1.6, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.2, 32]} />
        <meshStandardMaterial
          color="#gold"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Ambient glow */}
      <pointLight
        position={[0, 0, 2]}
        intensity={0.5}
        color="#ff69b4"
        distance={5}
      />
    </group>
  );
};

export default FloatingProduct; 