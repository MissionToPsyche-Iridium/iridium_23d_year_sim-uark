'use client';

import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, Line, Text } from '@react-three/drei';
import { TextureLoader, Texture, Euler } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useState, useEffect } from 'react';
import * as THREE from 'three';

interface Orbit {
  name: string;
  color: string;
  radiusX: number;
  radiusZ: number;
  rotation: [number, number, number];
}

interface Planet {
  name: string;
  textureUrl: string;
  radius: number;
  distance: number;
}

interface SceneProps {
  showOrbits: boolean;
  setShowOrbits: (value: boolean) => void;
  focusPsyche: boolean;
  setFocusPsyche: (value: boolean) => void;
  selectedOrbit: string | null;
  setSelectedOrbit: (value: string | null) => void;
}

interface PlanetTextureProps {
  textureUrl: string;
}

interface InfoPanelProps {
  orbitName: string;
}

const ORBITS: Orbit[] = [
  { name: 'Initial', color: 'purple', radiusX: 5, radiusZ: 4, rotation: [0.1, 0.3, 0] },
  { name: 'Second', color:'red', radiusX: 4, radiusZ: 2, rotation: [0.4, 0, 0]  },
  { name: 'Third', color: 'green', radiusX: 3, radiusZ: 3, rotation: [0, 0, 0] },
  { name: 'Final', color: 'blue', radiusX: 2, radiusZ: 2.5, rotation: [0.2, 0, 0] },
];

{/*const ORBITS: Orbit[] = [
  { name: 'A', color: 'blue', radiusX: 2, radiusZ: 2.5, rotation: [0.2, 0, 0] },
  { name: 'B', color: 'green', radiusX: 3, radiusZ: 3, rotation: [0, 0, 0] },
  { name: 'C', color: 'red', radiusX: 4, radiusZ: 2, rotation: [0.4, 0, 0] },
  { name: 'D', color: 'purple', radiusX: 5, radiusZ: 4, rotation: [0.1, 0.3, 0] },
];*/}

const PLANETS: Planet[] = [
  { name: 'Mercury', textureUrl: '/iridium_23d_year_sim-uark/textures/mercury.jpg', radius: 0.3, distance: 5 },
  { name: 'Venus', textureUrl: '/iridium_23d_year_sim-uark/textures/venus-atmosphere.jpg', radius: 0.4, distance: 8 },
  { name: 'Earth', textureUrl: '/iridium_23d_year_sim-uark/textures/earth.jpg', radius: 0.5, distance: 11 },
  { name: 'Mars', textureUrl: '/iridium_23d_year_sim-uark/textures/mars.jpg', radius: 0.45, distance: 14 },
];

export default function PsycheOrbit() {
  const [selectedOrbit, setSelectedOrbit] = useState<string | null>(null);
  const [showOrbits, setShowOrbits] = useState<boolean>(false);
  const [focusPsyche, setFocusPsyche] = useState<boolean>(false);
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);

  const handleOrbitButtonClick = (orbitName: string) => {
    setSelectedOrbit(selectedOrbit === orbitName ? null : orbitName);
  };

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      {showOrbits && (
        <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '10px', pointerEvents: 'none' }}>
          {ORBITS.map((orbit: Orbit) => (
            <button
              key={orbit.name}
              style={{ pointerEvents: 'auto', padding: '8px 12px', borderRadius: '8px', border: 'none', background: selectedOrbit === orbit.name ? orbit.color : '#333', color: 'white', cursor: 'pointer' }}
              onClick={() => handleOrbitButtonClick(orbit.name)}
            >
              {orbit.name} Orbit 
            </button>
          ))}
        </div>
      )}

      {/* description of intial planetary orbit view */}
      {!focusPsyche && (
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 15,
            backgroundColor: 'rgba(22, 8, 39, 0.85)',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '10px',
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1rem',
            maxWidth: '90%',
            textAlign: 'center',
          }}
        >
          <strong>Solar System Overview:</strong> Psyche orbits the Sun between Mars and Jupiter at a distance ranging from 235 million to 309 million miles (378 million to 497 million kilometers) from the Sun. Explore how Psyche's trajectory compares to the orbits of the inner planets.
          <br />
          <span style={{ display: 'inline-block', marginLeft: '1.5rem' }}>
            Click on the asteroid to dive into the mission phases!
          </span>
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

      {/*dropdown text desc.*/}
      {focusPsyche && (
        <div
          onClick={() => setIsInfoExpanded(!isInfoExpanded)}
          style={{
            position: 'absolute',
            top: 100,
            left: 20,
            right: 20,
            zIndex: 15,
            backgroundColor: 'rgba(22, 8, 39, 0.85)',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '10px',
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1rem',
            cursor: 'pointer',
            maxHeight: isInfoExpanded ? '400px' : '40px',
            overflow: 'hidden',
            transition: 'max-height 0.4s ease-in-out',
          }}
        >
          <p style={{ margin: 0, fontWeight: 'bold', textAlign:'center' }}>
            {isInfoExpanded ? 'Click to collapse ↑' : 'Click to expand ↓'}
          </p>
          {isInfoExpanded && (
            <>
              <p style={{ marginTop: '10px' }}>
                <strong>Orbit Overview:</strong> This model shows how NASA's Psyche spacecraft will explore the asteroid Psyche.
              </p>
              <p>
              The spacecraft will begin with Orbit A when it arrives at the asteroid in 2029. 
              The initial orbit is designed to be at a high altitude – about 435 miles (700 kilometers) above the asteroid's surface. 
              Over the following 20 months, the spacecraft will use its electric propulsion system to dip into lower and lower orbits 
              as it conducts its science investigation. Eventually, the spacecraft will establish a final orbit 
              (Orbit D) about 53 miles (85 kilometers) above the surface.
              </p>
            </>
          )}
        </div>
      )}


      {selectedOrbit && <InfoPanel orbitName={selectedOrbit} />}
    </div>
  );
}

function Scene({ showOrbits, setShowOrbits, focusPsyche, setFocusPsyche, selectedOrbit, setSelectedOrbit }: SceneProps) {
  const { camera } = useThree();
  const [psycheModel, setPsycheModel] = useState<THREE.Group | null>(null);
  const psycheGltf = useLoader(GLTFLoader, 'https://3dmodels.blob.core.windows.net/3d-models/Asteroid.glb');
  const sunTexture = useLoader(TextureLoader, '/iridium_23d_year_sim-uark/textures/sun.jpg') as Texture;

  useEffect(() => {
    if (psycheGltf) {
      const model = psycheGltf.scene.clone();
  
      // 1. Create a new box and find the center
      const box = new THREE.Box3().setFromObject(model);
      const center = new THREE.Vector3();
      box.getCenter(center);
  
      // 2. Shift the entire model so the center is at (0,0,0)
      model.position.sub(center);
  
      // 3. Now recenter all children geometries manually
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.geometry.computeBoundingBox();
          const geometryCenter = new THREE.Vector3();
          mesh.geometry.boundingBox?.getCenter(geometryCenter);
          mesh.geometry.center();
        }
      });
  
      // 4. Scale model cleanly
      const size = new THREE.Vector3();
      box.getSize(size);
      const scaleFactor = 1.5 / Math.max(size.x, size.y, size.z);
      model.scale.setScalar(scaleFactor);
  
      setPsycheModel(model);
    }
  }, [psycheGltf]);
  

  useFrame(() => {
    if (psycheModel) {
      psycheModel.rotation.y += 0.0025;
    }

    if (focusPsyche) {
      camera.position.lerp(new THREE.Vector3(0, 5, 10), 0.05);
    } else {
      camera.position.lerp(new THREE.Vector3(0, 8, 30), 0.05);
    }
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {!focusPsyche && (
        <>
          <mesh>
            <sphereGeometry args={[1.5, 64, 64]} />
            <meshStandardMaterial map={sunTexture} />
          </mesh>

          {PLANETS.map((planet: Planet) => (
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

          {PLANETS.map((planet: Planet) => (
            <group key={planet.name} position={[planet.distance, 0, 0]}>
              <mesh>
                <sphereGeometry args={[planet.radius, 32, 32]} />
                <PlanetTexture textureUrl={planet.textureUrl} />
              </mesh>
              <Text
                position={[0, planet.radius + 0.5, 0]}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                {planet.name}
              </Text>
            </group>
          ))}

          <group position={[18, 0, 0]}>
            <mesh
              scale={[0.5, 0.5, 0.5]}
              position={[0.5, 0, 0]}
              onClick={() => {
                setShowOrbits(true);
                setFocusPsyche(true);
              }}
            >
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial color="white" />
            </mesh>
            <Text
              position={[0, 1, 0]}
              fontSize={0.3}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              Click to Explore!
            </Text>
          </group>
        </>
      )}

      {showOrbits && psycheModel && (
        <>
          <primitive
            object={psycheModel}
            position={[0, 0, 0]}
            onClick={() => {
              setShowOrbits(false);
              setFocusPsyche(false);
              setSelectedOrbit(null);
            }}
          />

          {ORBITS.map((orbit: Orbit) => (
            <group key={orbit.name} rotation={new Euler(orbit.rotation[0], orbit.rotation[1], orbit.rotation[2])}>
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
              <mesh onClick={() => setSelectedOrbit(orbit.name)} position={[0, 0, 0]}>
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

function PlanetTexture({ textureUrl }: PlanetTextureProps) {
  const texture = useLoader(TextureLoader, textureUrl) as Texture;
  return <meshStandardMaterial map={texture} />;
}

function InfoPanel({ orbitName }: InfoPanelProps) {
  const info: Record<string, string> = {
    Initial: 'Orbit A: 709 km alt, 32.6 hr period, 56 days = 41 orbits.',
    Second: 'Orbit B: 303 km alt, 11.6 hr period, 92-100 days.',
    Third: 'Orbit C: 190 km alt, 7.2 hr period, 100 days = 333 orbits.',
    Final: 'Orbit D: 75 km alt, 3.6 hr period, 100 days = 666 orbits.',
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: 20,          
      left: '50%', 
      transform: 'translateX(-50%)',
      padding: '15px 25px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      borderRadius: '10px',
      fontFamily: "'Orbitron', sans-serif",
      fontSize: '1rem',
      zIndex: 15,
    }}>
      <h2>Selected: {orbitName} Orbit </h2>
      <p>{info[orbitName]}</p>
    </div>
  );
}
