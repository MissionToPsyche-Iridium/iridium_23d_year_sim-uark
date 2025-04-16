"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <img
      src={isClicking ? "/explosion.png" : "/spaceship.png"}
      alt="Custom Cursor"
      style={{
        position: "fixed",
        top: pos.y,
        left: pos.x,
        width: "32px",
        height: "32px",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "filter 0.15s ease",
        filter: isClicking ? "drop-shadow(0 0 8px orange)" : "none",
      }}
    />
  );
}
