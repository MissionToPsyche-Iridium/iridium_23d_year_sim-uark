'use client';

import * as THREE from 'three';

export function createSatellite() {
  const satellite = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.7, roughness: 0.4 })
  );
  satellite.add(body);

  const dish = new THREE.Group();
  const dishBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 0.5, 32),
    new THREE.MeshStandardMaterial({ color: 0xcccccc })
  );
  dishBase.position.y = 1.25;

  const dishCone = new THREE.Mesh(
    new THREE.ConeGeometry(0.7, 0.4, 32),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );
  dishCone.position.y = 1.6;

  dish.add(dishBase, dishCone);
  satellite.add(dish);

  const panelMaterial = new THREE.MeshStandardMaterial({ color: 0x4444ff, metalness: 0.6, roughness: 0.3 });
  const panels = [
    [2.5, 0, 0],
    [-2.5, 0, 0],
    [0, 2.5, 0],
    [0, -2.5, 0],
  ];
  panels.forEach(([x, y, z], idx) => {
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(4, 1), panelMaterial);
    if (idx >= 2) panel.rotation.z = Math.PI / 2;
    panel.position.set(x, y, z);
    satellite.add(panel);
  });

  satellite.visible = false;

  return satellite;
}