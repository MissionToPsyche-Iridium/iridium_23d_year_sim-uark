"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useDragRotation } from "./mouseInput";
import { useTouchRotation } from "./touchInput";
import "../styles/InteractiveSection.css";

type DeviceType = "iphone" | "ipad" | "desktop" | "other";

const detectDeviceType = (): DeviceType => {
  if (typeof navigator === "undefined" || !navigator.userAgent) return "other";
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone/.test(ua)) return "iphone";
  if (/ipad/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) return "ipad";
  return "desktop";
};

export default function InteractiveSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const initialScaleRef = useRef<THREE.Vector3 | null>(null);
  const initialRotationRef = useRef<THREE.Euler | null>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  useDragRotation({ canvasRef, modelRef });
  useTouchRotation({ canvasRef, modelRef });

  const [zoomLevel, setZoomLevel] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);
  const maxZoomLevel = 10;
  const minZoomLevel = -10;

  const [deviceType, setDeviceType] = useState<DeviceType>("other");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");

  // Heading conversion
  const getCompassHeading = (radians: number) => {
    let degrees = -THREE.MathUtils.radToDeg(radians);
    degrees = (degrees + 360) % 360;
    return Math.round(degrees);
  };

  const getDirectionLabel = (deg: number) => {
    if (deg >= 337.5 || deg < 22.5) return "N";
    if (deg < 67.5) return "NE";
    if (deg < 112.5) return "E";
    if (deg < 157.5) return "SE";
    if (deg < 202.5) return "S";
    if (deg < 247.5) return "SW";
    if (deg < 292.5) return "W";
    return "NW";
  };

  const heading = getCompassHeading(currentRotation);
  const direction = getDirectionLabel(heading);

  // Inactivity Timer
  const startInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);
  };

  const cancelTooltip = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowTooltip(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleUserInteraction = () => {
      cancelTooltip();
      startInactivityTimer();
    };

    canvas.addEventListener("mousedown", handleUserInteraction);
    canvas.addEventListener("touchstart", handleUserInteraction);
    canvas.addEventListener("pointerdown", handleUserInteraction);

    startInactivityTimer();

    return () => {
      canvas.removeEventListener("mousedown", handleUserInteraction);
      canvas.removeEventListener("touchstart", handleUserInteraction);
      canvas.removeEventListener("pointerdown", handleUserInteraction);
      clearTimeout(inactivityTimerRef.current!);
    };
  }, []);

  useEffect(() => {
    setDeviceType(detectDeviceType());
    const handleResize = () => {
      setOrientation(window.innerWidth < window.innerHeight ? "portrait" : "landscape");
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleZoomIn = () => {
    if (modelRef.current && zoomLevel < maxZoomLevel) {
      modelRef.current.scale.multiplyScalar(1.1);
      setZoomLevel(zoomLevel + 1);
    }
  };

  const handleZoomOut = () => {
    if (modelRef.current && zoomLevel > minZoomLevel) {
      modelRef.current.scale.multiplyScalar(0.9);
      setZoomLevel(zoomLevel - 1);
    }
  };

  const handleReset = () => {
    if (modelRef.current && initialScaleRef.current && initialRotationRef.current) {
      modelRef.current.scale.copy(initialScaleRef.current);
      modelRef.current.rotation.copy(initialRotationRef.current);
      setZoomLevel(0);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 5;

    const loader = new GLTFLoader();
    const modelUrl = "https://3dmodels.blob.core.windows.net/3d-models/Asteroid.glb";

    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        const rotationGroup = new THREE.Group();
        rotationGroup.add(model);

        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center);

        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scaleFactor = 2 / maxDim;
        rotationGroup.scale.set(scaleFactor, scaleFactor, scaleFactor);

        initialScaleRef.current = rotationGroup.scale.clone();
        initialRotationRef.current = rotationGroup.rotation.clone();

        const offsetGroup = new THREE.Group();
        offsetGroup.add(rotationGroup);
        const scaledSizeY = size.y * scaleFactor;
        const extraYOffset = scaledSizeY * 1.5;
        offsetGroup.position.y += extraYOffset;

        scene.add(offsetGroup);
        modelRef.current = rotationGroup;

        const fovRadians = camera.fov * (Math.PI / 180);
        const cameraZ = Math.abs(maxDim / 2 / Math.tan(fovRadians / 2)) * 1.5;
        camera.position.z = cameraZ;
        camera.lookAt(new THREE.Vector3(0, extraYOffset, 0));
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the .glb model", error);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);

      if (modelRef.current) {
        setCurrentRotation(modelRef.current.rotation.y);
      }
    };
    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <section className={`interactive-section ${deviceType} ${orientation}`}>
      {showTooltip && (
        <div className="asteroid-tooltip">🌀 Drag to explore 🌀</div>
      )}

      <canvas ref={canvasRef}></canvas>

      <div className="zoom-controls">
        <button onClick={handleZoomIn} disabled={zoomLevel >= maxZoomLevel}>
          Zoom In
        </button>
        <button onClick={handleZoomOut} disabled={zoomLevel <= minZoomLevel}>
          Zoom Out
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>


      <div className="compass-container">
  <img
    src="/compass-needle.png"
    alt="Compass"
    className="compass-needle"
    style={{ transform: `rotate(${-currentRotation}rad)` }}
  />
  <div className="compass-heading">
    {heading}° {direction}
  </div>
</div>
    </section>
  );
}