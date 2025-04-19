"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import React from "react";
import "../styles/PlanetSpinCompare.css";

const SpinningSphere = ({
  color,
  size,
  rotationSpeed = 0.01,
}: {
  color: string;
  size: number;
  rotationSpeed?: number;
}) => {
  return (
    <mesh rotation={[0, 0, 0]}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const PlanetSpinCompare = () => {
  return (
    <div className="widget planet-spin-compare">
      <h2 className="title">🪐 Psyche vs Earth: Rotation Comparison</h2>
      <div className="spin-view">
        {/* Left: Psyche */}
        <div className="planet-container">
          <Canvas>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} />
            <Stars />
            <SpinningSphere color="#999999" size={1} rotationSpeed={0.015} />
            <OrbitControls enableZoom={false} />
          </Canvas>
          <div className="label">Psyche</div>
          <div className="stats">
            <p>Rotation Period: ~4.2 hours</p>
            <p>Diameter: ~226 km</p>
          </div>
        </div>

        {/* Right: Earth */}
        <div className="planet-container">
          <Canvas>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} />
            <Stars />
            <SpinningSphere color="#0b5fff" size={1.2} rotationSpeed={0.005} />
            <OrbitControls enableZoom={false} />
          </Canvas>
          <div className="label">Earth</div>
          <div className="stats">
            <p>Rotation Period: 24 hours</p>
            <p>Diameter: ~12,742 km</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetSpinCompare;