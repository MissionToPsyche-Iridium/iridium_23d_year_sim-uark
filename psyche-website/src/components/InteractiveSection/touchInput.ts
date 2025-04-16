import { useEffect, useRef } from "react";
import * as THREE from "three";

interface TouchRotationOptions {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  modelRef: React.MutableRefObject<THREE.Group | null>;
}

/**
 * Custom hook to enable touch-based rotation of a 3D model in a Three.js scene.
 *
 * This hook attaches touch event listeners to the provided canvas element and updates
 * the rotation of the referenced 3D model based on the user's finger movement on the screen.
 * It listens for 'touchstart', 'touchmove', 'touchend', and 'touchcancel' events.
 *
 * @param {TouchRotationOptions} options - The hook options.
 * @param {React.RefObject<HTMLCanvasElement | null>} options.canvasRef - Ref to the canvas element.
 * @param {React.MutableRefObject<THREE.Group | null>} options.modelRef - Mutable ref to the 3D model group.
 *
 * @returns {void}
 */
export function useTouchRotation({ canvasRef, modelRef }: TouchRotationOptions) {
  const isTouching = useRef(false);
  const previousTouchPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    // Begin touch interaction and store the initial touch position.
    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        isTouching.current = true;
        const touch = event.touches[0];
        previousTouchPosition.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    // Calculate and apply rotation based on finger movement.
    const onTouchMove = (event: TouchEvent) => {
      if (!isTouching.current || !modelRef.current || event.touches.length === 0) return;
      const touch = event.touches[0];

      const deltaMove = {
        x: touch.clientX - previousTouchPosition.current.x,
        y: touch.clientY - previousTouchPosition.current.y,
      };

      const rotationSpeed = 0.005;
      modelRef.current.rotation.y += deltaMove.x * rotationSpeed;
      modelRef.current.rotation.x += deltaMove.y * rotationSpeed;

      previousTouchPosition.current = { x: touch.clientX, y: touch.clientY };
      event.preventDefault();
    };

    // End the touch interaction.
    const onTouchEnd = () => {
      isTouching.current = false;
    };

    // Attach touch event listeners.
    canvasEl.addEventListener("touchstart", onTouchStart, { passive: false });
    canvasEl.addEventListener("touchmove", onTouchMove, { passive: false });
    canvasEl.addEventListener("touchend", onTouchEnd);
    canvasEl.addEventListener("touchcancel", onTouchEnd);

    // Clean up listeners on component unmount.
    return () => {
      canvasEl.removeEventListener("touchstart", onTouchStart);
      canvasEl.removeEventListener("touchmove", onTouchMove);
      canvasEl.removeEventListener("touchend", onTouchEnd);
      canvasEl.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [canvasRef, modelRef]);
}