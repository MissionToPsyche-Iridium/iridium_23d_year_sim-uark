'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

export default function OrbitPhaseExplorer() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }} style={{ background: '#111' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Psyche sphere */}
        <mesh>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial color="gray" />
        </mesh>

        {/* Orbit ring */}
        <OrbitRing radius={5} color="purple" />

        <OrbitControls enableZoom enablePan={false} />
      </Canvas>
    </div>
  );
}

function OrbitRing({ radius, color }: { radius: number; color: string }) {
  const points = useMemo(() => {
    const curve = new THREE.EllipseCurve(
      0, 0,
      radius, radius,
      0, 2 * Math.PI,
      false,
      0
    );
    return curve.getPoints(100).map(p => new THREE.Vector3(p.x, 0, p.y));
  }, [radius]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={2}
      dashed={false}
    />
  );
}