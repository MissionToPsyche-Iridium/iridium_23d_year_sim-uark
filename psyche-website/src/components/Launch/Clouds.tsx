'use client';

import * as THREE from 'three';

export function createClouds() {
  const cloudMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });

  const cloud1 = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), cloudMaterial);
  cloud1.rotation.x = -Math.PI / 2;
  cloud1.position.y = 50;

  const cloud2 = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), cloudMaterial.clone());
  cloud2.rotation.x = -Math.PI / 2;
  cloud2.position.y = 60;

  return { cloud1, cloud2 };
}
