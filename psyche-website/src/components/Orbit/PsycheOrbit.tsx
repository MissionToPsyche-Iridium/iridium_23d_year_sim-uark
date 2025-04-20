'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Text } from '@react-three/drei';
import { useMemo, useState } from 'react';
import * as THREE from 'three';

const ORBITS = [
  { name: 'A', color: 'blue', radius: 2 },
  { name: 'B', color: 'green', radius: 3 },
  { name: 'C', color: 'red', radius: 4 },
  { name: 'D', color: 'purple', radius: 5 },
];

const PLANETS = [
  { name: 'Mercury', color: 'gray', radius: 0.3, distance: 5 },
  { name: 'Venus', color: 'lightgray', radius: 0.4, distance: 8 },
  { name: 'Earth', color: 'blue', radius: 0.5, distance: 11 },
  { name: 'Mars', color: 'red', radius: 0.45, distance: 14 },
  { name: 'Psyche', color: 'lightblue', radius: 0.6, distance: 18 },
];

export default function OrbitPhaseExplorer() {
  const [selectedOrbit, setSelectedOrbit] = useState<string | null>(null);
  const [showOrbits, setShowOrbits] = useState(false);

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <Canvas camera={{ position: [0, 8, 30], fov: 50 }} style={{ background: '#111' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Sun */}
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial color="yellow" />
        </mesh>

        {/* Planet Orbit Rings */}
        {PLANETS.filter(planet => planet.name !== 'Psyche').map((planet) => (
          <Line
            key={planet.name + '-orbit'}
            points={new THREE.EllipseCurve(0, 0, planet.distance, planet.distance, 0, 2 * Math.PI, false, 0).getPoints(100).map((p) => new THREE.Vector3(p.x, 0, p.y))}
            color="white"
            lineWidth={0.5}
            dashed={false}
          />
        ))}

        {/* Planets */}
        {PLANETS.map((planet) => (
          <group key={planet.name} position={[planet.distance, 0, 0]}>
            <mesh
              onClick={() => {
                if (planet.name === 'Psyche') {
                  setShowOrbits(true);
                }
              }}
            >
              <sphereGeometry args={[planet.radius, 32, 32]} />
              <meshStandardMaterial color={planet.color} />
            </mesh>
            <Text
              position={[0, planet.radius + 0.5, 0]}
              fontSize={0.3}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {planet.name === 'Psyche' && !showOrbits ? 'Click to Explore!' : planet.name}
            </Text>
          </group>
        ))}

        {/* Psyche Orbit Rings */}
        {showOrbits && ORBITS.map((orbit) => (
          <ClickableOrbitRing
            key={orbit.name}
            radius={orbit.radius}
            color={orbit.color}
            name={orbit.name}
            onSelect={setSelectedOrbit}
          />
        ))}

        {/* Satellite */}
        <Satellite selectedOrbit={selectedOrbit} />

        <OrbitControls enableZoom enablePan={false} />
      </Canvas>

      {/* Info Panel */}
      {selectedOrbit && <InfoPanel orbitName={selectedOrbit} />}
    </div>
  );
}

function ClickableOrbitRing({ radius, color, name, onSelect }: { radius: number; color: string; name: string; onSelect: (orbit: string) => void }) {
  const points = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
    return curve.getPoints(100).map((p) => new THREE.Vector3(p.x, 0, p.y));
  }, [radius]);

  return (
    <group>
      <Line points={points} color={color} lineWidth={2} dashed={false} />
      <mesh
        onClick={() => onSelect(name)}
        position={[0, 0, 0]}
      >
        {/* Invisible clickable mesh */}
        <ringGeometry args={[radius - 0.05, radius + 0.05, 64]} />
        <meshBasicMaterial color="white" transparent opacity={0} />
      </mesh>
    </group>
  );
}

function Satellite({ selectedOrbit }: { selectedOrbit: string | null }) {
  const radius = ORBITS.find((o) => o.name === selectedOrbit)?.radius || 0;

  useFrame(({ clock }) => {
    if (radius > 0) {
      const t = clock.getElapsedTime() * 0.5;
      const x = Math.cos(t) * radius;
      const z = Math.sin(t) * radius;
    }
  });

  if (!radius) return null;

  const t = 0;
  const x = Math.cos(t) * radius;
  const z = Math.sin(t) * radius;

  return (
    <mesh position={[x, 0, z]}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

function InfoPanel({ orbitName }: { orbitName: string }) {
  const info = {
    A: 'Orbit A: 709 km alt, 32.6 hr period, 56 days = 41 orbits.',
    B: 'Orbit B: 303 km alt, 11.6 hr period, 92-100 days.',
    C: 'Orbit C: 190 km alt, 7.2 hr period, 100 days = 333 orbits.',
    D: 'Orbit D: 75 km alt, 3.6 hr period, 100 days = 666 orbits.',
  };

  return (
    <div style={{ position: 'absolute', top: 20, left: 20, padding: '10px 20px', backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', borderRadius: '10px' }}>
      <h2>Selected Orbit {orbitName}</h2>
      <p>{info[orbitName as keyof typeof info]}</p>
    </div>
  );
}