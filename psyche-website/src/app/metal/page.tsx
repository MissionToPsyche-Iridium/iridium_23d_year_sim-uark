"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import * as THREE from "three";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- SETUP SCENE ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Space background

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 3); // Start slightly above ground

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    document.body.appendChild(VRButton.createButton(renderer));

    // --- CONTROLS ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0); // Look slightly above the floor
    controls.update();

    // --- LIGHTS ---
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
    hemiLight.position.set(0, 1, 0);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(5, 10, 7.5);
    scene.add(sunLight);

    // --- LOAD MODELS ---
    const loader = new GLTFLoader();

    // Astronaut model
    loader.load('https://modelviewer.dev/shared-assets/models/Astronaut.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.5, 0.5, 0.5);
      model.position.y = 0.5; // Raise it a little
      scene.add(model);
    }, undefined, (error) => {
      console.error('Error loading astronaut model', error);
    });

    // Asteroid model
    loader.load('https://3dmodels.blob.core.windows.net/3d-models/Asteroid.glb', (gltf) => {
      const asteroid = gltf.scene;
      asteroid.scale.set(50, 50, 50); // Make asteroid much bigger
      asteroid.rotation.x = -Math.PI / 2; // Lay it flat
      asteroid.position.y = -1; // Move it a little down
      scene.add(asteroid);
    }, undefined, (error) => {
      console.error('Error loading asteroid model', error);
    });

    // --- ANIMATE LOOP ---
    const animate = () => {
      renderer.setAnimationLoop(() => {
        controls.update();
        renderer.render(scene, camera);
      });
    };
    animate();

    // --- HANDLE RESIZE ---
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // --- CLEANUP ---
    return () => {
      renderer.dispose();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // --- PAGE LAYOUT ---
  return (
    <main style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      {/* Overlay content */}
      <div style={{ position: "absolute", top: "20px", left: "20px", zIndex: 10 }}>
        <Link href="/" scroll={true} style={{ color: "white", textDecoration: "underline", fontSize: "1.2rem" }}>
          ← Back to Home
        </Link>
  
        <h1 style={{ color: "white", fontSize: "2rem", marginTop: "10px" }}>
          🪐 Surface Exploration: Psyche Mission
        </h1>
      </div>
  
      {/* Three.js container */}
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </main>
  );
}