'use client'; // Important for Three.js in Next.js 13+

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

export default function LaunchScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mount = mountRef.current!;
    
    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 10); // Start far away

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // Ambient Light
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // Mock Launch Pad
    const padGeometry = new THREE.BoxGeometry(10, 0.5, 10);
    const padMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
    const pad = new THREE.Mesh(padGeometry, padMaterial);
    scene.add(pad);

    // Mock Satellite (Group of Parts)
    const satellite = new THREE.Group();

    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 2, 32),
      new THREE.MeshStandardMaterial({ color: 0xaaaaaa })
    );
    body.rotation.x = Math.PI / 2;
    satellite.add(body);

    const panelMaterial = new THREE.MeshStandardMaterial({ color: 0x0066ff });
    const leftPanel = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 3),
      panelMaterial
    );
    leftPanel.position.set(-1, 0, 0);
    satellite.add(leftPanel);

    const rightPanel = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 3),
      panelMaterial
    );
    rightPanel.position.set(1, 0, 0);
    satellite.add(rightPanel);

    satellite.position.set(0, 2, 0);
    scene.add(satellite);

    // Title Overlay (we can also add real 3D text later)
    const titleDiv = document.createElement('div');
    titleDiv.innerText = 'Cape Canaveral\nOctober 13, 2023 — 10:19 AM EDT';
    titleDiv.style.position = 'absolute';
    titleDiv.style.top = '20%';
    titleDiv.style.width = '100%';
    titleDiv.style.textAlign = 'center';
    titleDiv.style.color = 'white';
    titleDiv.style.fontSize = '2em';
    titleDiv.style.opacity = '1';
    mount.appendChild(titleDiv);

    // Animation Timeline
    const timeline = gsap.timeline();

    // Fade out title after 5 seconds
    timeline.to(titleDiv, { opacity: 0, duration: 2, delay: 3 });

    // Move camera closer to satellite
    timeline.to(camera.position, { z: 4, duration: 3, ease: 'power2.inOut' });

    // Attach camera to side of satellite
    timeline.to(camera.position, { x: -2, y: 2, duration: 2 });
    timeline.to(camera.rotation, { y: Math.PI / 2, duration: 2 }, "-=2");

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      mount.removeChild(renderer.domElement);
      mount.removeChild(titleDiv);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh', position: 'relative' }} />;
}