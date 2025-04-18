'use client';

import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
import { gsap } from 'gsap';

export default function LaunchScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);

    const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 5, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    const sunLight = new THREE.DirectionalLight(0xfff7e8, 5);
    sunLight.position.set(20, 40, 10);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const padGeometry = new THREE.BoxGeometry(20, 1, 20);
    const padMaterial = new THREE.MeshStandardMaterial({ color: 0x555555, transparent: true, opacity: 1 });
    const pad = new THREE.Mesh(padGeometry, padMaterial);
    pad.receiveShadow = true;
    scene.add(pad);

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
    rocket.add(rocketBody, noseCone);
    rocket.position.set(0, 4.5, 0);
    scene.add(rocket);

    const flame = new THREE.Mesh(
      new THREE.ConeGeometry(1.5, 3, 32),
      new THREE.MeshBasicMaterial({ color: 0xff6600, transparent: true, opacity: 0.8 })
    );
    flame.rotation.x = Math.PI;
    flame.position.y = -5;
    rocket.add(flame);

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
    scene.add(satellite);

    const marsTexture = new THREE.TextureLoader().load('../textures/mars.jpg');
    const mars = new THREE.Mesh(
      new THREE.SphereGeometry(5, 64, 64),
      new THREE.MeshStandardMaterial({ map: marsTexture })
    );
    mars.visible = false;
    scene.add(mars);

    const cloudMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
    const cloud1 = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), cloudMaterial);
    cloud1.rotation.x = -Math.PI / 2;
    cloud1.position.y = 50;
    scene.add(cloud1);

    const cloud2 = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), cloudMaterial);
    cloud2.rotation.x = -Math.PI / 2;
    cloud2.position.y = 60;
    scene.add(cloud2);

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
    scene.add(stars);

    const titleDiv = document.createElement('div');
    titleDiv.innerText = 'Kennedy Space Center\nOctober 13, 2023 — 10:19 AM EDT';
    titleDiv.style.position = 'absolute';
    titleDiv.style.top = '20%';
    titleDiv.style.width = '100%';
    titleDiv.style.textAlign = 'center';
    titleDiv.style.color = '#eeeeee';
    titleDiv.style.fontSize = '3em';
    titleDiv.style.opacity = '1';
    titleDiv.style.lineHeight = '1.2';
    titleDiv.style.whiteSpace = 'pre-line';
    titleDiv.style.textShadow = '2px 2px 8px rgba(0,0,0,0.8)';
    mount.appendChild(titleDiv);

    const timeline = gsap.timeline();
    timeline.to(titleDiv, { opacity: 0, duration: 2, delay: 3 });
    timeline.to(rocket.position, { y: "+=200", duration: 3, ease: "power2.in" }, "launch");
    timeline.to(camera.position, { y: "+=180", duration: 3, ease: "power2.in" }, "launch");

    const clock = new THREE.Clock();
    let transitionStarted = false;
    let orbitRadiusObj = { radius: 30 };

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      rocket.rotation.y += 0.01;
      flame.scale.set(1 + Math.sin(elapsed * 20) * 0.2, 1 + Math.sin(elapsed * 20) * 0.2, 1);

      if (rocket.position.y >= 55 && !transitionStarted) {
        transitionStarted = true;

        gsap.to(scene.background, { r: 0, g: 0, b: 0, duration: 1 });
        gsap.to(starMaterial, { opacity: 1, duration: 2 });

        gsap.to(rocket.position, { y: "+=100", duration: 3 });
        gsap.to(rocket.scale, { x: 0.2, y: 0.2, z: 0.2, duration: 3 });

        gsap.to(cloud1.material, { opacity: 0, duration: 1.5 });
        gsap.to(cloud2.material, { opacity: 0, duration: 1.5 });
        gsap.to(pad.material, { opacity: 0, duration: 1.5 });

        gsap.delayedCall(1.5, () => {
          cloud1.visible = false;
          cloud2.visible = false;
          pad.visible = false;

          satellite.traverse(child => {
            if (child instanceof THREE.Mesh) {
              child.material.transparent = true;
              child.material.opacity = 0;
              gsap.to(child.material, { opacity: 1, duration: 2 });
            }
          });

          rocket.traverse(child => {
            if (child instanceof THREE.Mesh) {
              child.material.transparent = true;
              gsap.to(child.material, { opacity: 0, duration: 2, onComplete: () => {
                rocket.visible = false;
              }});
            }
          });

          gsap.to(satellite.scale, { x: 1, y: 1, z: 1, duration: 3 });
          gsap.to(camera.position, { y: camera.position.y - 20, duration: 3 });
          gsap.to(satellite.position, { y: "+=10", duration: 5 });
          gsap.to(orbitRadiusObj, { radius: 5, duration: 5 });

          satellite.position.set(0, camera.position.y - 5, 20);

          mars.position.set(0, camera.position.y - 5, 0);
          const overlay = document.getElementById('overlay');
          const overlayText = document.getElementById('overlayText');

          gsap.to(overlay, { opacity: 1, duration: 1, onComplete: () => {
            gsap.to(overlayText, { opacity: 1, duration: 1 });
            gsap.delayedCall(2, () => {
              gsap.to(overlay, { opacity: 0, duration: 1, onComplete: () => {
                satellite.visible = true;
                mars.visible = true;

                const flybyTimeline = gsap.timeline();
                flybyTimeline.to(satellite.position, {
                  x: "+=120",
                  y: "+=70",
                  z: "-=150",
                  duration: 5,
                  ease: "power2.in",
                  onUpdate: () => {
                    camera.lookAt(satellite.position);
                  },
                }, 0);

                flybyTimeline.to(camera.position, {
                  x: "+=100",
                  y: "+=50",
                  z: "-=140",
                  duration: 5,
                  ease: "power2.inOut",
                }, 0);

                flybyTimeline.to(camera.rotation, {
                  z: "-=0.1", // small tilt for cinematic effect
                  duration: 5,
                  ease: "power2.inOut",
                }, 0);

                flybyTimeline.call(() => {
                  console.log("Satellite cinematic escape complete!");
                });
              }});
            });
          }});
        });
      }

      if (!satellite.visible) {
        camera.lookAt(rocket.position);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      mount.removeChild(renderer.domElement);
      mount.removeChild(titleDiv);
      window.removeEventListener('resize', handleResize);
    };
  }, [router]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
  
      <div id="overlay" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Comic Sans MS", cursive, sans-serif',
        fontSize: '3rem',
        color: 'white',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: 20,
      }}>
        <div id="overlayText" style={{ opacity: 0 }}>
          Comparison with Mars
        </div>
      </div>
    </div>
  );
}