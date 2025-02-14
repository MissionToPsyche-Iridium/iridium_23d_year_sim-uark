"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from 'three';
import "../styles/InteractiveSection.css";

export default function InteractiveSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Set up the scene
    const scene = new THREE.Scene();

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create a geometry and material for the cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    // Add the cube to the scene
    scene.add(cube);

    // Position the camera
    camera.position.z = 5;

    // Animate the scene
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the cube on each frame
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Render the scene from the perspective of the camera
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <section className="interactive-section">
      <div className="content-box">
        Interactive Content Goes Here
      </div>
      <canvas ref={canvasRef}></canvas> {/* Add Three.js Canvas */}
    </section>
  );
}