"use client";

import React, { useRef, useState, MouseEvent } from "react";

/**
 * Calculates the brightness, scale, and translation based on the mouse's proximity to the star.
 *
 * The function converts the mouse event's screen coordinates into the SVG viewBox coordinate system,
 * computes the Euclidean distance from the mouse pointer to the star's center (assumed to be at (700, 210)),
 * and then returns updated values:
 *
 * - brightness increases from 1 (farther away) to 1.5 (when very close; up to 200px).
 * - scale increases from 1 (for distances ≥ 100px) up to 2 (when the mouse is at the star).
 * - translateX and translateY form a small translation vector so the star shifts toward the mouse,
 *   clamped to a maximum offset.
 *
 * @param event - The mouse event from the SVG.
 * @param svg - The SVG element used to compute relative mouse coordinates.
 * @returns An object containing brightness, scale, translateX, and translateY.
 */
function calculateMouseEffects(
  event: MouseEvent,
  svg: SVGSVGElement
): { brightness: number; scale: number; translateX: number; translateY: number } {
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

  // Calculate brightness: from 1 (at distance >=200) to 1.5 (at distance 0)
  const brightnessMaxDistance = 200;
  const clampedDistance = Math.min(distance, brightnessMaxDistance);
  const brightness =
    1 + ((brightnessMaxDistance - clampedDistance) / brightnessMaxDistance) * 0.5;

  // Calculate scale: from 1 (for distance ≥ 100) to 2 (when distance is 0)
  const scaleThreshold = 100;
  const maxScaleIncrement = 1; // Increased so that at distance=0, scale becomes 1 + 1 = 2.
  const scale =
    distance < scaleThreshold
      ? 1 + ((scaleThreshold - distance) / scaleThreshold) * maxScaleIncrement
      : 1;

  // Calculate translation: move the star slightly toward the mouse.
  const translationFactor = 0.1;
  const maxTranslation = 20;
  const translateX = Math.max(-maxTranslation, Math.min(maxTranslation, dx * translationFactor));
  const translateY = Math.max(-maxTranslation, Math.min(maxTranslation, dy * translationFactor));

  return { brightness, scale, translateX, translateY };
}

/**
 * Generates the points for a five-pointed star polygon.
 *
 * @param cx - The x-coordinate of the star's center.
 * @param cy - The y-coordinate of the star's center.
 * @param outerRadius - The radius of the outer points.
 * @param innerRadius - The radius of the inner points.
 * @param numPoints - The number of points in the star (default is 5).
 * @returns A string with the polygon points formatted for the SVG "points" attribute.
 */
function generateStarPoints(
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  numPoints = 5
): string {
  const angle = Math.PI / numPoints;
  let points = "";
  for (let i = 0; i < 2 * numPoints; i++) {
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const currAngle = i * angle - Math.PI / 2; // start from the top
    const x = cx + r * Math.cos(currAngle);
    const y = cy + r * Math.sin(currAngle);
    points += `${x},${y} `;
  }
  return points.trim();
}

/**
 * InteractiveStar Component
 *
 * This component renders an SVG star with an interactive halo ring.
 * Both elements are grouped together so they move, scale, and shift together based on mouse interaction.
 * As the mouse comes close, brightness and scale increase, and when scale exceeds 1.1 the clickable shape changes
 * from a circle to a five-pointed star polygon.
 * Additionally, when the interactive effects are strong (i.e. when the mouse is near), the cursor changes to a spaceship.
 * Clicking the shape opens "https://www.youtube.com" in a new tab.
 *
 * @returns {JSX.Element} The rendered interactive star component.
 */
const InteractiveStar: React.FC = () => {
  const [brightness, setBrightness] = useState(1);
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleClickYoutube = () => {
    window.open("https://www.youtube.com", "_blank");
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!svgRef.current) return;
    const { brightness, scale, translateX, translateY } = calculateMouseEffects(
      event,
      svgRef.current
    );
    setBrightness(brightness);
    setScale(scale);
    setTranslateX(translateX);
    setTranslateY(translateY);
  };

  const handleMouseLeave = () => {
    setBrightness(1);
    setScale(1);
    setTranslateX(0);
    setTranslateY(0);
  };

  // When scale exceeds this threshold, switch from rendering a circle to a star polygon.
  const shapeSwitchThreshold = 1.1;
  // Base radii for the star polygon when scale === 1.
  const baseOuterRadius = 4;
  const baseInnerRadius = 2.5;

  // Determine if the mouse is near enough to trigger the spaceship cursor.
  const isNear = scale > shapeSwitchThreshold;

  return (
    <div
      className="interactive-star-layer"
      // Change cursor to a spaceship image when near; ensure `/spaceship.png` exists in your public folder.

    >
      <svg
        ref={svgRef}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <g
          // Composite transform: first, translate the group to the new position (including mouse translation),
          // then scale it about the star's center, then translate back.
          transform={`translate(${700 + translateX}, ${210 + translateY}) scale(${scale}) translate(${-700}, ${-210})`}
        >
          {/* Halo ring (non-clickable) */}
          <circle
            cx={700}
            cy={210}
            r={6}
            fill="none"
            stroke="#ffd700"
            strokeOpacity="0.4"
            strokeWidth="3"
            pointerEvents="none"
          />
          {/* Clickable shape: circle or star polygon based on scale */}
          {scale > shapeSwitchThreshold ? (
            <polygon
              points={generateStarPoints(700, 210, baseOuterRadius, baseInnerRadius)}
              fill="#ffd700"
              style={{
                cursor: "pointer",
                filter: `brightness(${brightness})`,
              }}
              onClick={handleClickYoutube}
            />
          ) : (
            <circle
              cx={700}
              cy={210}
              r={2.5}
              fill="#ffd700"
              style={{
                cursor: "pointer",
                filter: `brightness(${brightness})`,
              }}
              onClick={handleClickYoutube}
            />
          )}
        </g>
      </svg>
    </div>
  );
};

export default InteractiveStar;
