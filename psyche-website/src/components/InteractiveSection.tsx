"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "../styles/InteractiveSection.css";
import { useDragRotation } from "./mouseInput";
import { useTouchRotation } from "./touchInput";

/**
 * InteractiveSection Component
 *
 * This component initializes a Three.js scene, loads a 3D model, and provides
 * an interactive canvas where users can drag to rotate the model. It also includes
 * a decorative SVG wave divider for visual separation.
 *
 * Features:
 * - Sets up a Three.js scene with ambient and directional lighting.
 * - Loads a .glb 3D model using GLTFLoader and adjusts its position, scale, and rotation.
 * - Automatically centers and scales the model to fit within the scene.
 * - Uses custom hooks (`useDragRotation` and `useTouchRotation`) to enable drag/touch-to-rotate functionality.
 * - Dynamically adjusts the camera to frame the model based on its dimensions.
 *
 * @returns {JSX.Element} A section containing the interactive Three.js canvas and a wave divider.
 */
export default function InteractiveSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);

  // Attach both mouse and touch rotation event listeners
  useDragRotation({ canvasRef, modelRef });
  useTouchRotation({ canvasRef, modelRef });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Set up Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Add ambient and directional lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Position the camera
    camera.position.z = 5;

    // Load the .glb model with GLTFLoader
    const loader = new GLTFLoader();
    const modelUrl =
      "https://3dmodels.blob.core.windows.net/3d-models/Asteroid.glb";

    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;

        // Create a rotation group for the model
        const rotationGroup = new THREE.Group();
        rotationGroup.add(model);

        // Center the model inside the group
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center);

        // Scale the model based on its maximum dimension
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scaleFactor = 2 / maxDim;
        rotationGroup.scale.set(scaleFactor, scaleFactor, scaleFactor);

        // Create an offset group for additional vertical positioning
        const offsetGroup = new THREE.Group();
        offsetGroup.add(rotationGroup);
        const scaledSizeY = size.y * scaleFactor;
        const extraYOffset = scaledSizeY * 1.5;
        offsetGroup.position.y += extraYOffset;

        scene.add(offsetGroup);
        modelRef.current = rotationGroup;

        // Adjust the camera to frame the model
        const fovRadians = camera.fov * (Math.PI / 180);
        const cameraZ = Math.abs(maxDim / 2 / Math.tan(fovRadians / 2)) * 1.5;
        camera.position.z = cameraZ;
        camera.lookAt(new THREE.Vector3(0, extraYOffset, 0));

        console.log("Model loaded, centered, and offset:", gltf);
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the .glb model", error);
      }
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup renderer on component unmount
    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <section className="interactive-section">
      <canvas ref={canvasRef}></canvas>
      {/* SVG wave divider for visual separation */}
      <svg
        className="wave-divider"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#310945"
          d="M0,224L48,186.7C96,149,192,75,288,80C384,85,480,171,576,202.7C672,235,768,213,864,186.7C960,160,1056,128,1152,117.3C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </section>
  );
}