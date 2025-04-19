'use client';

import * as THREE from 'three';

export function createStars() {
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5, transparent: true, opacity: 0 });

  const starVertices = [];
  for (let i = 0; i < 10000; i++) {
    const x = THREE.MathUtils.randFloatSpread(4000);
    const y = THREE.MathUtils.randFloatSpread(4000);
    const z = THREE.MathUtils.randFloatSpread(4000);
    starVertices.push(x, y, z);
  }
  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

  const stars = new THREE.Points(starGeometry, starMaterial);

  return { stars, starMaterial };
}
