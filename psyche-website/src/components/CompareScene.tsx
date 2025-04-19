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
    </div>
  );
};


export default CompareScene;