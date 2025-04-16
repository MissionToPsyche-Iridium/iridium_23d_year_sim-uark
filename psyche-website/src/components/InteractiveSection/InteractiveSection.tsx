"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useDragRotation } from "./mouseInput";
import { useTouchRotation } from "./touchInput";
import "../../styles/InteractiveSection.css";

type DeviceType = "iphone" | "ipad" | "desktop" | "other";
type InteractiveSectionProps = { isPopupOpen?: boolean };

// ----------------------
// Helper Functions
// ----------------------

const detectDeviceType = (): DeviceType => {
  if (typeof navigator === "undefined" || !navigator.userAgent) return "other";
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone/.test(ua)) return "iphone";
  if (/ipad/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1))
    return "ipad";
  return "desktop";
};

const getCompassHeading = (radians: number) => {
  let degrees = -THREE.MathUtils.radToDeg(radians);
  return Math.round((degrees + 360) % 360);
};

const getDirectionLabel = (deg: number) => {
  const labels = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.floor(((deg + 22.5) % 360) / 45);
  return labels[index];
};

// ----------------------
// Main Component
// ----------------------

export default function InteractiveSection({ isPopupOpen = false }: InteractiveSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const initialScaleRef = useRef<THREE.Vector3 | null>(null);
  const initialRotationRef = useRef<THREE.Euler | null>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [zoomLevel, setZoomLevel] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [deviceType, setDeviceType] = useState<DeviceType>("other");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");

  const maxZoomLevel = 10;
  const minZoomLevel = -10;

  // ----------------------
  // Interaction Hooks
  // ----------------------

  useDragRotation({ canvasRef, modelRef });
  useTouchRotation({ canvasRef, modelRef });

  // ----------------------
  // Tooltip Timer
  // ----------------------

  const startInactivityTimer = () => {
    clearTimeout(inactivityTimerRef.current!);
    inactivityTimerRef.current = setTimeout(() => setShowTooltip(true), 5000);
  };

  const cancelTooltip = () => {
    clearTimeout(inactivityTimerRef.current!);
    setShowTooltip(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleInteraction = () => {
      cancelTooltip();
      startInactivityTimer();
    };

    canvas.addEventListener("mousedown", handleInteraction);
    canvas.addEventListener("touchstart", handleInteraction);
    canvas.addEventListener("pointerdown", handleInteraction);

    startInactivityTimer();

    return () => {
      canvas.removeEventListener("mousedown", handleInteraction);
      canvas.removeEventListener("touchstart", handleInteraction);
      canvas.removeEventListener("pointerdown", handleInteraction);
      clearTimeout(inactivityTimerRef.current!);
    };
  }, []);

  // ----------------------
  // Device + Orientation
  // ----------------------

  useEffect(() => {
    setDeviceType(detectDeviceType());

    const handleResize = () =>
      setOrientation(window.innerWidth < window.innerHeight ? "portrait" : "landscape");

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ----------------------
  // Cursor Tracking
  // ----------------------

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setCursorPosition({ x: e.clientX, y: e.clientY });
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // ----------------------
  // Zoom + Reset Controls
  // ----------------------

  const handleZoomIn = () => {
    if (modelRef.current && zoomLevel < maxZoomLevel) {
      modelRef.current.scale.multiplyScalar(1.1);
      setZoomLevel((prev) => prev + 1);
    }
  };

  const handleZoomOut = () => {
    if (modelRef.current && zoomLevel > minZoomLevel) {
      modelRef.current.scale.multiplyScalar(0.9);
      setZoomLevel((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    if (modelRef.current && initialScaleRef.current && initialRotationRef.current) {
      modelRef.current.scale.copy(initialScaleRef.current);
      modelRef.current.rotation.copy(initialRotationRef.current);
      setZoomLevel(0);
    }
  };

  // ----------------------
  // 3D Scene Setup
  // ----------------------

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(1, 1, 1);
    scene.add(light);

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
        const scaleFactor = 2 / Math.max(size.x, size.y, size.z);
        rotationGroup.scale.setScalar(scaleFactor);

        initialScaleRef.current = rotationGroup.scale.clone();
        initialRotationRef.current = rotationGroup.rotation.clone();

        const offsetGroup = new THREE.Group();
        offsetGroup.add(rotationGroup);
        offsetGroup.position.y += size.y * scaleFactor * 1.5;
        scene.add(offsetGroup);

        modelRef.current = rotationGroup;

        const fovRadians = camera.fov * (Math.PI / 180);
        const cameraZ = Math.abs(Math.max(size.x, size.y, size.z) / 2 / Math.tan(fovRadians / 2)) * 1.5;
        camera.position.z = cameraZ;
        camera.lookAt(new THREE.Vector3(0, offsetGroup.position.y, 0));
      },
      undefined,
      (error) => console.error("Failed to load model", error)
    );

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      if (modelRef.current) setCurrentRotation(modelRef.current.rotation.y);
    };
    animate();

    return () => renderer.dispose();
  }, []);

  // ----------------------
  // Compass Values
  // ----------------------

  const heading = getCompassHeading(currentRotation);
  const direction = getDirectionLabel(heading);

  // ----------------------
  // JSX
  // ----------------------

  return (
    <section className={`interactive-section ${deviceType} ${orientation}`}>
      {showTooltip && !isPopupOpen && (
        <div className="asteroid-tooltip">🌀 Drag to explore 🌀</div>
      )}

      <canvas ref={canvasRef}></canvas>

      <div className="zoom-controls">
        <button onClick={handleZoomIn} disabled={zoomLevel >= maxZoomLevel}>Zoom In</button>
        <button onClick={handleZoomOut} disabled={zoomLevel <= minZoomLevel}>Zoom Out</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div className="compass-container">
        <img
          src="/compass-needle.png"
          alt="Compass"
          className="compass-needle"
          style={{ transform: `rotate(${-currentRotation}rad)` }}
        />
        <div className="compass-heading">{heading}° {direction}</div>
      </div>

      <img
        src={isClicking ? "/explosion.png" : "/spaceship.png"}
        alt="Cursor"
        style={{
          position: "fixed",
          top: cursorPosition.y,
          left: cursorPosition.x,
          width: "28px",
          height: "28px",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "filter 0.2s ease",
          filter: isClicking ? "drop-shadow(0 0 8px orange)" : "none",
        }}
      />
    </section>
  );
}