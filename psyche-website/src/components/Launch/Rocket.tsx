'use client';

import * as THREE from 'three';

export function createRocket() {
  const rocket = new THREE.Group();

  const rocketBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.8, 0.8, 8, 32),
    new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.8, roughness: 0.3 })
  );

  const noseCone = new THREE.Mesh(
    new THREE.ConeGeometry(0.8, 2, 32),
    new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.8, roughness: 0.3 })
  );
  noseCone.position.y = 5;

  const flame = new THREE.Mesh(
    new THREE.ConeGeometry(1.5, 3, 32),
    new THREE.MeshBasicMaterial({ color: 0xff6600, transparent: true, opacity: 0.8 })
  );
  flame.rotation.x = Math.PI;
  flame.position.y = -5;
  flame.name = "Flame";

  rocket.add(rocketBody, noseCone, flame);
  rocket.position.set(0, 4.5, 0);

  return rocket;
}