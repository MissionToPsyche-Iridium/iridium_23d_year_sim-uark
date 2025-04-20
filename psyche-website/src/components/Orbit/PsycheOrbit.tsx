'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Line, Text } from '@react-three/drei';
import { useMemo, useState, useRef } from 'react';
import * as THREE from 'three';

const ORBITS = [
  { name: 'A', color: 'blue', radiusX: 2, radiusZ: 2.5, rotation: [0.2, 0, 0] as [number, number, number] },
  { name: 'B', color: 'green', radiusX: 3, radiusZ: 3, rotation: [0, 0, 0] as [number, number, number] },
  { name: 'C', color: 'red', radiusX: 4, radiusZ: 2, rotation: [0.4, 0, 0] as [number, number, number] },
  { name: 'D', color: 'purple', radiusX: 5, radiusZ: 4, rotation: [0.1, 0.3, 0] as [number, number, number] },
];

const PLANETS = [
  { name: 'Mercury', color: 'gray', radius: 0.3, distance: 5 },
  { name: 'Venus', color: 'lightgray', radius: 0.4, distance: 8 },
  { name: 'Earth', color: 'blue', radius: 0.5, distance: 11 },
  { name: 'Mars', color: 'red', radius: 0.45, distance: 14 },
  { name: 'Psyche', color: 'lightblue', radius: 0.6, distance: 18 },
];

export default function PsycheOrbit() {
  const [selectedOrbit, setSelectedOrbit] = useState<string | null>(null);
  const [showOrbits, setShowOrbits] = useState(false);
  const [focusPsyche, setFocusPsyche] = useState(false);

  const handleOrbitButtonClick = (orbitName: string) => {
    if (selectedOrbit === orbitName) {
      setSelectedOrbit(null);
    } else {
      setSelectedOrbit(orbitName);
    }
  };

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      {showOrbits && (
        <div style={{
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          gap: '10px',
          pointerEvents: 'none',
        }}>
          {ORBITS.map((orbit) => (
            <button
              key={orbit.name}
              style={{
                pointerEvents: 'auto',
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                background: selectedOrbit === orbit.name ? orbit.color : '#333',
                color: 'white',
                cursor: 'pointer',
              }}
              onClick={() => handleOrbitButtonClick(orbit.name)}
            >
              Orbit {orbit.name}
            </button>
          ))}
        </div>
      )}
      <Canvas camera={{ position: [0, 8, 30], fov: 50 }} style={{ background: '#111' }}>
        <Scene
          showOrbits={showOrbits}
          setShowOrbits={setShowOrbits}
          setFocusPsyche={setFocusPsyche}
          focusPsyche={focusPsyche}
          selectedOrbit={selectedOrbit}
          setSelectedOrbit={setSelectedOrbit}
        />
        <OrbitControls enableZoom enablePan={false} />
      </Canvas>

      {selectedOrbit && <InfoPanel orbitName={selectedOrbit} />}
    </div>
  );
}

function Scene({ showOrbits, setShowOrbits, setFocusPsyche, focusPsyche, selectedOrbit, setSelectedOrbit }: any) {
  const { camera } = useThree();
  const asteroidRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (focusPsyche) {
      camera.position.lerp(new THREE.Vector3(0, 5, 10), 0.05);
      camera.lookAt(0, 0, 0);
      if (asteroidRef.current) {
        asteroidRef.current.scale.setScalar(1 + 0.03 * Math.sin(Date.now() * 0.005));
      }
    } else {
      camera.position.lerp(new THREE.Vector3(0, 8, 30), 0.05);
      camera.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {!focusPsyche && (
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial color="yellow" />
        </mesh>
      )}

      {!focusPsyche && PLANETS.filter((planet) => planet.name !== 'Psyche').map((planet) => (
        <Line
          key={planet.name + '-orbit'}
          points={new THREE.EllipseCurve(0, 0, planet.distance, planet.distance, 0, 2 * Math.PI, false, 0)
            .getPoints(100)
            .map((p) => new THREE.Vector3(p.x, 0, p.y))}
          color="white"
          lineWidth={0.5}
          dashed={false}
        />
      ))}

      {!focusPsyche && PLANETS.map((planet) => (
        <group key={planet.name} position={[planet.distance, 0, 0]}>
          <mesh
            onClick={() => {
              if (planet.name === 'Psyche') {
                setShowOrbits(true);
                setFocusPsyche(true);
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

      {focusPsyche && (
        <>
          <mesh
            ref={asteroidRef}
            position={[0, 0, 0]}
            onClick={() => {
              setShowOrbits(false);
              setFocusPsyche(false);
              setSelectedOrbit(null);
            }}
          >
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="lightblue" />
          </mesh>

          {showOrbits && ORBITS.map((orbit) => (
            <group key={orbit.name} rotation={orbit.rotation}>
              <Line
                points={new THREE.EllipseCurve(0, 0, orbit.radiusX, orbit.radiusZ, 0, 2 * Math.PI, false, 0)
                  .getPoints(100)
                  .map((p) => new THREE.Vector3(p.x, 0, p.y))}
                color={orbit.color}
                lineWidth={2}
                dashed={false}
                opacity={selectedOrbit && selectedOrbit !== orbit.name ? 0.2 : 1}
                transparent
              />
              <mesh
                onClick={() => setSelectedOrbit(orbit.name)}
                position={[0, 0, 0]}
              >
                <ringGeometry args={[orbit.radiusX - 0.2, orbit.radiusX + 0.2, 64]} />
                <meshBasicMaterial color="white" transparent opacity={0} />
              </mesh>
            </group>
          ))}
        </>
      )}
    </>
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
    <div
      style={{
        position: 'absolute',
        top: 80,
        left: 20,
        padding: '10px 20px',
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: 'white',
        borderRadius: '10px',
      }}
    >
      <h2>Selected Orbit {orbitName}</h2>
      <p>{info[orbitName as keyof typeof info]}</p>
    </div>
  );
}