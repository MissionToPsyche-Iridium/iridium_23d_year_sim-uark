'use client';

import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from 'gsap';
import { createRocket } from '@/components/Launch/Rocket';
import { createSatellite } from '@/components/Launch/Satellite';
import { createMars } from '@/components/Launch/Mars';
import { createClouds } from '@/components/Launch/Clouds';
import { createStars } from '@/components/Launch/DeepSpace';
import '../styles/LaunchScene.css';

export default function LaunchScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);

    const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 10000);
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

    const padMaterial = new THREE.MeshStandardMaterial({ color: 0x555555, transparent: true, opacity: 1 });
    const pad = new THREE.Mesh(new THREE.BoxGeometry(20, 1, 20), padMaterial);
    pad.receiveShadow = true;
    scene.add(pad);

    const rocket = createRocket();
    scene.add(rocket);

    const flame = rocket.getObjectByName('Flame') as THREE.Mesh;
    const satellite = createSatellite();
    scene.add(satellite);

    const mars = createMars();
    scene.add(mars);

    const { cloud1, cloud2 } = createClouds();
    scene.add(cloud1);
    scene.add(cloud2);

    const { stars, starMaterial } = createStars();
    scene.add(stars);

    const titleDiv = document.createElement('div');
    titleDiv.innerText = 'Kennedy Space Center\nOctober 13, 2023 — 10:19 AM EDT';
    titleDiv.className = 'titleDiv';
    mount.appendChild(titleDiv);

    const clock = new THREE.Clock();
    let transitionStarted = false;
    let orbitRadiusObj = { radius: 30 };
    let asteroid: THREE.Group | null = null;

    // ✨ Helper function to show mission text
    const showMissionText = (text: string, duration = 3) => {
      const missionTextDiv = document.createElement('div');
      missionTextDiv.innerText = text;
      missionTextDiv.className = 'missionText';
      mount.appendChild(missionTextDiv);

      gsap.to(missionTextDiv, { opacity: 1, duration: 1 });
      gsap.delayedCall(duration, () => {
        gsap.to(missionTextDiv, { opacity: 0, duration: 1, onComplete: () => {
          mount.removeChild(missionTextDiv);
        }});
      });
    };

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      rocket.rotation.y += 0.01;
      flame.scale.set(1 + Math.sin(elapsed * 20) * 0.2, 1 + Math.sin(elapsed * 20) * 0.2, 1);

      if (asteroid !== null) {
        asteroid.rotation.y += 0.001;
      }

      if (rocket.position.y >= 55 && !transitionStarted) {
        transitionStarted = true;

        gsap.to(scene.background, { r: 0, g: 0, b: 0, duration: 1 });
        gsap.to(starMaterial, { opacity: 1, duration: 2 });
        gsap.to(rocket.position, { y: "+=100", duration: 3 });
        gsap.to(rocket.scale, { x: 0.2, y: 0.2, z: 0.2, duration: 3 });
        gsap.to(cloud1.material, { opacity: 0, duration: 1.5 });
        gsap.to(cloud2.material, { opacity: 0, duration: 1.5 });
        gsap.to(padMaterial, { opacity: 0, duration: 1.5 });

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

            gsap.delayedCall(1, () => {
              showMissionText('Using Mars gravity to slingshot toward Psyche.', 4);
            });

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
                  onUpdate: () => camera.lookAt(satellite.position),
                }, 0);

                flybyTimeline.to(camera.position, {
                  x: "+=100",
                  y: "+=50",
                  z: "-=140",
                  duration: 5,
                  ease: "power2.inOut",
                }, 0);

                flybyTimeline.call(() => {
                  const deepSpaceOverlay = document.createElement('div');
                  deepSpaceOverlay.innerText = 'Journey Into Deep Space';
                  deepSpaceOverlay.className = 'deepSpaceOverlay';
                  mount.appendChild(deepSpaceOverlay);

                  gsap.to(deepSpaceOverlay, { opacity: 1, duration: 2 });
                  gsap.delayedCall(2.5, () => {
                    gsap.to(deepSpaceOverlay, { opacity: 0, duration: 2, onComplete: () => {
                      mount.removeChild(deepSpaceOverlay);

                      const deepSpaceTimeline = gsap.timeline();
                      deepSpaceTimeline.to(satellite.position, {
                        x: "+=500",
                        y: "+=300",
                        z: "-=1000",
                        duration: 10,
                        ease: "power1.inOut",
                        onUpdate: () => camera.lookAt(satellite.position),
                      }, 0);

                      deepSpaceTimeline.to(camera.position, {
                        x: "+=450",
                        y: "+=250",
                        z: "-=950",
                        duration: 10,
                        ease: "power1.inOut",
                      }, 0);

                      deepSpaceTimeline.to(satellite.rotation, {
                        y: "+=2*Math.PI",
                        duration: 10,
                        ease: "none",
                      }, 0);

                      // ✨ Show deep space cruise text
                      deepSpaceTimeline.call(() => {
                        showMissionText('Psyche ventures into uncharted deep space.', 5);
                      }, [], "+=2"); // <-- add a 2 second delay during cruise

                      // ✨ Then load asteroid after a while
                      deepSpaceTimeline.call(() => {
                        const loader = new GLTFLoader();
                        loader.load(
                          "https://3dmodels.blob.core.windows.net/3d-models/Asteroid.glb",
                          (gltf) => {
                            asteroid = new THREE.Group();
                            const model = gltf.scene;
                            const box = new THREE.Box3().setFromObject(model);
                            const center = new THREE.Vector3();
                            box.getCenter(center);
                            model.position.sub(center);
                            const size = new THREE.Vector3();
                            box.getSize(size);
                            const maxDim = Math.max(size.x, size.y, size.z);
                            const scale = 20 / maxDim;
                            model.scale.setScalar(scale);
                            asteroid.add(model);
                            asteroid.position.set(
                              satellite.position.x + 300,
                              satellite.position.y,
                              satellite.position.z - 300
                            );
                            scene.add(asteroid);

                            gsap.to(camera.position, {
                              x: asteroid.position.x - 30,
                              y: asteroid.position.y + 20,
                              z: asteroid.position.z + 60,
                              duration: 5,
                              ease: "power2.inOut",
                              onUpdate: () => {
                                if (asteroid) camera.lookAt(asteroid.position);
                              }
                            });

                            gsap.to(satellite.position, {
                              x: asteroid.position.x - 20,
                              y: asteroid.position.y + 10,
                              z: asteroid.position.z + 30,
                              duration: 5,
                              ease: "power2.inOut",
                            });

                            showMissionText('Target acquired: 16 Psyche — a metal world.', 6);
                          },
                          undefined,
                          (error) => console.error('Failed to load Psyche model:', error)
                        );
                      }, [], "+=5"); // <-- add a delay after deep space text
                    }});
                  });
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

    const launchTimeline = gsap.timeline();
    launchTimeline.to(titleDiv, { opacity: 0, duration: 2, delay: 3 });

    launchTimeline.call(() => {
      showMissionText('Liftoff! Psyche begins its journey to a metal world.', 4);
    }, [], "launch");

    launchTimeline.to(rocket.position, { y: "+=200", duration: 3, ease: "power2.in" }, "launch");
    launchTimeline.to(camera.position, { y: "+=180", duration: 3, ease: "power2.in" }, "launch");

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
      <div id="overlay">
        <div id="overlayText">Comparison with Mars</div>
      </div>
    </div>
  );
}