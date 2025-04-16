"use client";

import React, { useRef, useState, MouseEvent } from "react";

/**
 * Calculates the brightness and scale based on the mouse's proximity to the star.
 *
 * The function converts the mouse event's screen coordinates into the SVG viewBox
 * coordinate system, computes the Euclidean distance from the mouse pointer to the
 * star's center (assumed to be at coordinates 700, 210), and then returns updated values:
 *
 * - `brightness` increases from 1 (farther away) up to 1.5 (when the mouse is very close, using a max distance of 200 pixels).
 * - `scale` increases from 1 (mouse farther than 100 pixels) up to 1.5 (when the mouse is exactly on the star).
 *
 * @param event - The mouse event from the SVG.
 * @param svg - The SVG element used to compute relative mouse coordinates.
 * @returns An object containing the calculated brightness and scale values.
 */
function calculateMouseEffects(
  event: MouseEvent,
  svg: SVGSVGElement
): { brightness: number; scale: number } {
  const rect = svg.getBoundingClientRect();

  // Mouse coordinates relative to the SVG element
  const svgX = event.clientX - rect.left;
  const svgY = event.clientY - rect.top;

  // Convert screen coordinates to viewBox coordinates (viewBox: "0 0 1440 320")
  const viewX = svgX * (1440 / rect.width);
  const viewY = svgY * (320 / rect.height);

  // Compute distance from the mouse to the star's center (700, 210)
  const dx = viewX - 700;
  const dy = viewY - 210;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // When the mouse is at distance 0, brightness = 1.5; at distance >=200, brightness = 1.
  const brightnessMaxDistance = 200;
  const clampedDistance = Math.min(distance, brightnessMaxDistance);
  const brightness = 1 + ((brightnessMaxDistance - clampedDistance) / brightnessMaxDistance) * 0.5;

  // When the mouse is within 100 pixels, the star scales up to a maximum of 1.5x at distance 0.
  const scaleThreshold = 100;
  const maxScaleIncrement = 0.5;
  const scale =
    distance < scaleThreshold
      ? 1 + ((scaleThreshold - distance) / scaleThreshold) * maxScaleIncrement
      : 1;

  return { brightness, scale };
}

const InteractiveStar: React.FC = () => {
  const [brightness, setBrightness] = useState(1);
  const [scale, setScale] = useState(1);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleClick = () => {
    window.open("https://www.youtube.com", "_blank");
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!svgRef.current) return;
    const { brightness, scale } = calculateMouseEffects(event, svgRef.current);
    setBrightness(brightness);
    setScale(scale);
  };

  const handleMouseLeave = () => {
    setBrightness(1);
    setScale(1);
  };

  return (
    <div className="interactive-star-layer">
      <svg
        ref={svgRef}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <g>
          {/* Halo ring (non-clickable) with scaling */}
          <circle
            cx={700}
            cy={210}
            r={6}
            fill="none"
            stroke="#ffd700"
            strokeOpacity="0.4"
            strokeWidth="3"
            pointerEvents="none"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center",
            }}
          />
          {/* Main clickable star with scaling and brightness */}
          <circle
            cx={700}
            cy={210}
            r={2.5}
            fill="#ffd700"
            style={{
              cursor: "pointer",
              filter: `brightness(${brightness})`,
              transform: `scale(${scale})`,
              transformOrigin: "center",
            }}
            onClick={handleClick}
          />
        </g>
      </svg>
    </div>
  );
};

export default InteractiveStar;