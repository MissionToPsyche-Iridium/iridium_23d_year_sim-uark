"use client";

import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three";

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

const EarthModel = ({ position, radius }: { position: [number, number, number]; radius: number }) => {
  const textureUrl = "../textures/earth.jpg";
  const fallbackUrl = "https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg";
  const [textureSrc, setTextureSrc] = useState(textureUrl);
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const img = new Image();
    img.src = textureUrl;
    img.onload = () => {};
    img.onerror = () => {
      console.warn("Local texture failed, switching to fallback URL:", fallbackUrl);
      setTextureSrc(fallbackUrl);
    };
  }, [textureUrl, fallbackUrl]);

  const texture = useLoader(TextureLoader, textureSrc);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={[1, 1, 1]}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial map={texture} metalness={0.2} roughness={0.7} />
    </mesh>
  );
};

const CompareScene = () => {
  const PSYCHE_RADIUS_KM = 112;
  const EARTH_RADIUS_KM = 6371;
  const psycheNormalizedDiameter = 1.5;
  const scaleMultiplier = EARTH_RADIUS_KM / PSYCHE_RADIUS_KM;

  const earthDiameterUnits = psycheNormalizedDiameter * scaleMultiplier;
  const earthRadiusUnits = earthDiameterUnits / 2;

  // Dynamic camera calculation
  const fov = 50;
  const aspect = window.innerWidth / window.innerHeight;
  const marginMultiplier = 1.2;

  const maxObjectRadius = earthRadiusUnits;
  const visibleHeight = maxObjectRadius * 2 * marginMultiplier;
  const visibleWidth = visibleHeight * aspect;
  const requiredView = Math.max(visibleHeight, visibleWidth);
  const fovInRadians = (fov * Math.PI) / 180;
  const cameraZ = requiredView / (2 * Math.tan(fovInRadians / 2));

  return (
    <div style={{ height: "700px", width: "100%", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, cameraZ], fov }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 4, 4]} intensity={1} />
        <Stars radius={100} depth={50} count={3000} factor={4} />
        <OrbitControls enableZoom={true} />

        {/* Centered Group */}
        <group>
          <PsycheModel position={[-earthRadiusUnits * 1.5, 0, 0]} />
          <Suspense fallback={null}>
            <EarthModel position={[earthRadiusUnits * 1.5, 0, 0]} radius={earthRadiusUnits} />
          </Suspense>
        </group>
      </Canvas>
    </div>
  );
};

export default CompareScene;