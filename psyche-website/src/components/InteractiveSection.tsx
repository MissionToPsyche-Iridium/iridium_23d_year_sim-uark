/**
 * This file contains the InteractiveSection component which renders a 3D model
 * using Three.js. The component sets up a Three.js scene, camera, and renderer,
 * loads a GLTF model, and allows the user to interact with the model by dragging to
 * rotate it.
 * 
 * NOTE: Need to adjust the model's scale and position as needed to fit the model in
 * the camera's view. Currently the Asteroid.glb model shows up and is interactable,
 * however, it is not centered or scaled properly.
 * 
 * To access the Asteroid.glb model set modelUrl to the following URL:
 * "https://3dmodels.blob.core.windows.net/3d-models/Asteroid.glb"
 * 
 * Need to adjust the Psyche.glb model file size to show up on the screen.
 */

"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "../styles/InteractiveSection.css";

export default function InteractiveSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Add ambient and directional lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Position the camera at a default location
    camera.position.z = 5;

    // Load the .glb model
    const loader = new GLTFLoader();
    const modelUrl = "https://3dmodels.blob.core.windows.net/3d-models/Asteroid.glb";
    
    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;
        scene.add(model);

        // Compute bounding box to center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        // Center the model
        model.position.x += (model.position.x - center.x);
        model.position.y += (model.position.y - center.y);
        model.position.z += (model.position.z - center.z);

        // Optionally, adjust the model's scale if it's too big/small
        const maxDim = Math.max(size.x, size.y, size.z);
        const scaleFactor = 2 / maxDim;
        model.scale.set(scaleFactor, scaleFactor, scaleFactor);

        // Adjust the camera to frame the model
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        cameraZ *= 1.5;
        camera.position.z = cameraZ;

        camera.lookAt(new THREE.Vector3(0, 0, 0));

        console.log("Model loaded", gltf);
      },
      undefined,
      (error) => {
        console.error("An error happened while loading the .glb model", error);
      }
    );

    // Mouse event handlers for drag-to-rotate
    const canvasEl = canvasRef.current;

    const onMouseDown = (event: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const onMouseMove = (event: MouseEvent) => {
      if (isDragging.current && modelRef.current) {
        const deltaMove = {
          x: event.clientX - previousMousePosition.current.x,
          y: event.clientY - previousMousePosition.current.y,
        };

        const rotationSpeed = 0.005;
        modelRef.current.rotation.y += deltaMove.x * rotationSpeed;
        modelRef.current.rotation.x += deltaMove.y * rotationSpeed;

        previousMousePosition.current = { x: event.clientX, y: event.clientY };
      }
    };

    const onMouseUpOrLeave = () => {
      isDragging.current = false;
    };

    canvasEl.addEventListener("mousedown", onMouseDown);
    canvasEl.addEventListener("mousemove", onMouseMove);
    canvasEl.addEventListener("mouseup", onMouseUpOrLeave);
    canvasEl.addEventListener("mouseleave", onMouseUpOrLeave);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup event listeners and renderer on unmount
    return () => {
      canvasEl.removeEventListener("mousedown", onMouseDown);
      canvasEl.removeEventListener("mousemove", onMouseMove);
      canvasEl.removeEventListener("mouseup", onMouseUpOrLeave);
      canvasEl.removeEventListener("mouseleave", onMouseUpOrLeave);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="interactive-section">
      <canvas ref={canvasRef}></canvas>
    </section>
  );
}