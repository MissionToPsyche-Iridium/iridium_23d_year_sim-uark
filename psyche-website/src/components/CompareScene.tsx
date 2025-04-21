"use client";

import React, { useRef, useEffect, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three";

const CELESTIAL_BODIES = {
  "Earth": { radiusKm: 6371, textureUrl: "../textures/earth.jpg", fallbackUrl: "https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg" },
  "Mars": { radiusKm: 3390, textureUrl: "../textures/mars.jpg", fallbackUrl: "https://www.solarsystemscope.com/textures/download/2k_mars.jpg" },
  "Moon": { radiusKm: 1737, textureUrl: "../textures/moon.jpg", fallbackUrl: "https://www.solarsystemscope.com/textures/download/2k_moon.jpg" },
  "Ceres": { radiusKm: 473, textureUrl: "../textures/ceres.jpg", fallbackUrl: "https://www.solarsystemscope.com/textures/download/2k_ceres.jpg" },
};

const PSYCHE_DESCRIPTION = `Its surface area is 64,000 square miles (165,800 square kilometers). Psyche has an irregular, potato-like shape. If it were sliced in half horizontally at the equator – picture a squished oval – it would measure 173 miles (280 kilometers) across at its widest point and 144 miles (232 kilometers) long.`;

const BODY_DESCRIPTIONS: Record<string, string> = {
  Earth: "With an equatorial diameter of 7926 miles (12,760 kilometers), Earth is the biggest of the terrestrial planets and the fifth largest planet in our solar system.",
  Mars: "With a radius of 2,106 miles (3,390 kilometers), Mars is about half the size of Earth. If Earth were the size of a nickel, Mars would be about as big as a raspberry. From an average distance of 142 million miles (228 million kilometers), Mars is 1.5 astronomical units away from the Sun. One astronomical unit (abbreviated as AU), is the distance from the Sun to Earth. From this distance, it takes sunlight 13 minutes to travel from the Sun to Mars.",
  Moon: "With a diameter of 2,159 miles (3,475 kilometers), the Moon is just 1/4 the size of Earth. Distance from Earth: The Moon's average distance from Earth is 238,000 miles (383,500 km). Orbit around Earth: It takes the Moon 27.3 Earth days to revolve around our planet one time.",
  Ceres: "With a radius of 296 miles (476 kilometers), Ceres is 1/13 the radius of Earth. If Earth were the size of a nickel, Ceres would be about as big as a poppy seed. From an average distance of 257 million miles (413 million kilometers), Ceres is 2.8 astronomical units away from the Sun.",
};


const PSYCHE_RADIUS_KM = 112;

const PsycheModel = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useLoader(GLTFLoader, "https://3dmodels.blob.core.windows.net/3d-models/Asteroid.glb");

  useEffect(() => {
    if (groupRef.current) {
      const model = gltf.scene;

      const box = new THREE.Box3().setFromObject(model);
      const center = new THREE.Vector3();
      box.getCenter(center);
      model.position.sub(center);

      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 1.5 / maxDim;
      model.scale.setScalar(scale);

      const boundingBox = new THREE.Box3().setFromObject(model);
      const boundingCenter = new THREE.Vector3();
      boundingBox.getCenter(boundingCenter);
      model.position.y -= boundingCenter.y;

      groupRef.current.add(model);
    }
  }, [gltf]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.0025;
    }
  });

  return <group ref={groupRef} position={position} />;
};

const CelestialBody = ({ position, radius, textureUrl, fallbackUrl }: {
  position: [number, number, number];
  radius: number;
  textureUrl: string;
  fallbackUrl: string;
}) => {
  const [textureSrc, setTextureSrc] = useState(textureUrl);

  useEffect(() => {
    setTextureSrc(textureUrl);
  }, [textureUrl]);

  const texture = useLoader(TextureLoader, textureSrc);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef} position={position} scale={[1, 1, 1]} key={textureSrc}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial map={texture} metalness={0.2} roughness={0.7} />
    </mesh>
  );
};

const CompareScene = () => {
  const [selectedBody, setSelectedBody] = useState<keyof typeof CELESTIAL_BODIES>("Earth");

  const selectedData = CELESTIAL_BODIES[selectedBody];
  const psycheNormalizedDiameter = 1.5;
  const scaleMultiplier = selectedData.radiusKm / PSYCHE_RADIUS_KM;
  const bodyDiameterUnits = psycheNormalizedDiameter * scaleMultiplier;
  const bodyRadiusUnits = bodyDiameterUnits / 2;

  // Dynamic camera calculation inside useMemo
  const { cameraZ, fov } = useMemo(() => {
    const fov = 50;
    const aspect = window.innerWidth / window.innerHeight;
    const marginMultiplier = 1.2;

    const maxObjectRadius = bodyRadiusUnits;
    const visibleHeight = maxObjectRadius * 2 * marginMultiplier;
    const visibleWidth = visibleHeight * aspect;
    const requiredView = Math.max(visibleHeight, visibleWidth);
    const fovInRadians = (fov * Math.PI) / 180;
    const cameraZ = requiredView / (2 * Math.tan(fovInRadians / 2));

    return { cameraZ, fov };
  }, [bodyRadiusUnits]);

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      {/* Dropdown */}
      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}>
        <select value={selectedBody} onChange={(e) => setSelectedBody(e.target.value as keyof typeof CELESTIAL_BODIES)}>
          {Object.keys(CELESTIAL_BODIES).map((body) => (
            <option key={body} value={body}>{body}</option>
          ))}
        </select>
      </div>
      
      {/* 3D Scene */}
      <Canvas camera={{ position: [0, 0, cameraZ], fov }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 4, 4]} intensity={1} />
        <Stars radius={100} depth={50} count={3000} factor={4} />
        <OrbitControls enableZoom={true} />

        <group>
          <PsycheModel position={[-bodyRadiusUnits * 1.5, 0, 0]} />
          <Suspense fallback={null}>
            <CelestialBody
              position={[bodyRadiusUnits * 1.5, 0, 0]}
              radius={bodyRadiusUnits}
              textureUrl={selectedData.textureUrl}
              fallbackUrl={selectedData.fallbackUrl}
            />
          </Suspense>
        </group>
      </Canvas>
      
      {/*textbox caption*/}
      <div style={{
        top: 60,
        left: 20,
        right: 20,
        zIndex: 10,
        backgroundColor: "rgba(22, 8, 39, 0.85)",
        color: "white",
        padding: "15px 20px",
        borderRadius: "10px",
        fontFamily: "'Orbitron', sans-serif",
        fontSize: "1.1rem",
        maxWidth: "100%",
      }}>
        <p style={{ marginBottom: "10px" }}>
          <strong>Psyche:</strong> {PSYCHE_DESCRIPTION}
        </p>
        <p>
          <strong>{selectedBody}:</strong> {BODY_DESCRIPTIONS[selectedBody]}
        </p>
      </div>
    </div>
  );
};

export default CompareScene;
