'use client';

import * as THREE from 'three';

export function createMars() {
  const marsTexture = new THREE.TextureLoader().load('../textures/mars.jpg');

  const mars = new THREE.Mesh(
    new THREE.SphereGeometry(5, 64, 64),
    new THREE.MeshStandardMaterial({ map: marsTexture })
  );

  mars.visible = false;
  return mars;
}
