"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "../styles/InteractiveSection.css";

export default function InteractiveSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cubeRef.current = cube;
    scene.add(cube);

    // Position the camera
    camera.position.z = 5;

    // Mouse event handlers to implement drag-to-rotate
    const canvasEl = canvasRef.current;

    const onMouseDown = (event: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const onMouseMove = (event: MouseEvent) => {
      if (isDragging.current && cubeRef.current) {
        const deltaMove = {
          x: event.clientX - previousMousePosition.current.x,
          y: event.clientY - previousMousePosition.current.y,
        };

        // Adjust rotation speed as needed
        const rotationSpeed = 0.005;
        cubeRef.current.rotation.y += deltaMove.x * rotationSpeed;
        cubeRef.current.rotation.x += deltaMove.y * rotationSpeed;

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