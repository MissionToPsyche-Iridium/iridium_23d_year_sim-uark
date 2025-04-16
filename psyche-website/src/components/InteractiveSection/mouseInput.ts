/**
 * Custom hook to enable drag-to-rotate functionality for a 3D model in a Three.js scene.
 *
 * @param {Object} param0 - The options object.
 * @param {React.RefObject<HTMLCanvasElement | null>} param0.canvasRef - A reference to the canvas element where the 3D scene is rendered.
 * @param {React.MutableRefObject<THREE.Group | null>} param0.modelRef - A reference to the 3D model's group that will be rotated.
 *
 * @description
 * This hook allows users to click and drag on a canvas to rotate a 3D model. It listens for mouse events
 * (`mousedown`, `mousemove`, `mouseup`, and `mouseleave`) on the canvas element and updates the model's
 * rotation based on the mouse movement. The rotation speed is controlled by a constant factor.
 *
 * - `mousedown`: Starts the drag interaction and records the initial mouse position.
 * - `mousemove`: Updates the model's rotation based on the mouse movement while dragging.
 * - `mouseup` or `mouseleave`: Ends the drag interaction.
 *
 * @example
 * ```tsx
 * const canvasRef = useRef<HTMLCanvasElement | null>(null);
 * const modelRef = useRef<THREE.Group | null>(null);
 *
 * useDragRotation({ canvasRef, modelRef });
 *
 * return <canvas ref={canvasRef} />;
 * ```
 *
 * @returns {void} This hook does not return any value.
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface DragRotationOptions {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  modelRef: React.MutableRefObject<THREE.Group | null>;
}

export function useDragRotation({ canvasRef, modelRef }: DragRotationOptions) {
  // Local refs for drag state management
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    // Handler for starting the drag interaction
    const onMouseDown = (event: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    // Handler for rotating the model during mouse move
    const onMouseMove = (event: MouseEvent) => {
      if (isDragging.current && modelRef.current) {
        const deltaMove = {
          x: event.clientX - previousMousePosition.current.x,
          y: event.clientY - previousMousePosition.current.y,
        };

        const rotationSpeed = 0.005;
        // Rotate the model's rotation group based on mouse movement
        modelRef.current.rotation.y += deltaMove.x * rotationSpeed;
        modelRef.current.rotation.x += deltaMove.y * rotationSpeed;
        previousMousePosition.current = { x: event.clientX, y: event.clientY };
      }
    };

    // Handler to stop the drag interaction
    const onMouseUpOrLeave = () => {
      isDragging.current = false;
    };

    // Attach the event listeners
    canvasEl.addEventListener("mousedown", onMouseDown);
    canvasEl.addEventListener("mousemove", onMouseMove);
    canvasEl.addEventListener("mouseup", onMouseUpOrLeave);
    canvasEl.addEventListener("mouseleave", onMouseUpOrLeave);

    // Clean up when the component unmounts or dependencies change
    return () => {
      canvasEl.removeEventListener("mousedown", onMouseDown);
      canvasEl.removeEventListener("mousemove", onMouseMove);
      canvasEl.removeEventListener("mouseup", onMouseUpOrLeave);
      canvasEl.removeEventListener("mouseleave", onMouseUpOrLeave);
    };
  }, [canvasRef, modelRef]);
}