"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import * as THREE from "three";

type RotatingPlanetProps = {
  textureUrl?: string;
  position: [number, number, number];
  size?: number;
};

const RotatingPlanet = ({ textureUrl, position, size = 1 }: RotatingPlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = textureUrl ? useTexture(textureUrl) : undefined;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0025;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        color={texture ? "white" : "#999"}
        metalness={texture ? 0.2 : 0.7}
        roughness={texture ? 0.7 : 0.4}
      />
    </mesh>
  );
};

const CompareScene = () => {
  return (
    <div style={{ height: "600px", width: "100%" }}>
      <Canvas camera={{ position: [0, 0, 6] }}>
        {/* Lighting and Environment */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 4, 4]} intensity={1.2} />
        <Stars radius={100} depth={50} count={3000} factor={4} />
        <OrbitControls enableZoom={true} />

        {/* 🪐 Psyche (left side, untextured) */}
        <RotatingPlanet position={[-2, 0, 0]} size={1} />

        {/* 🌍 Earth (right side, textured) */}
        <RotatingPlanet position={[2, 0, 0]} size={1.1} textureUrl="/textures/earth.jpg" />
      </Canvas>
    </div>
  );
};

export default CompareScene;