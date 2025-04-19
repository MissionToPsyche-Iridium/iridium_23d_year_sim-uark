import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function MarbleSim() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      {/* Scene background color */}
      <color attach="background" args={['black']} />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Marble */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="skyblue" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Orbit Controls */}
      <OrbitControls />
    </Canvas>
  );
}
