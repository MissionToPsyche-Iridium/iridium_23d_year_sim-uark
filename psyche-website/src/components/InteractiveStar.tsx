"use client";

import React, { useRef, useState, MouseEvent } from "react";

type InteractiveStarProps = {
  onPopupOpen?: () => void;
  onPopupClose?: () => void;
};

function calculateMouseEffects(
  event: MouseEvent,
  svg: SVGSVGElement,
  cx: number,
  cy: number
) {
  const rect = svg.getBoundingClientRect();
  const svgX = event.clientX - rect.left;
  const svgY = event.clientY - rect.top;
  const viewX = svgX * (1440 / rect.width);
  const viewY = svgY * (320 / rect.height);
  const dx = viewX - cx;
  const dy = viewY - cy;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const brightnessMaxDistance = 200;
  const clampedDistance = Math.min(distance, brightnessMaxDistance);
  const brightness =
    1 + ((brightnessMaxDistance - clampedDistance) / brightnessMaxDistance) * 0.5;
  const scaleThreshold = 100;
  const maxScaleIncrement = 1;
  const scale =
    distance < scaleThreshold
      ? 1 + ((scaleThreshold - distance) / scaleThreshold) * maxScaleIncrement
      : 1;
  const translationFactor = 0.1;
  const maxTranslation = 20;
  const translateX = Math.max(-maxTranslation, Math.min(maxTranslation, dx * translationFactor));
  const translateY = Math.max(-maxTranslation, Math.min(maxTranslation, dy * translationFactor));
  return { brightness, scale, translateX, translateY };
}

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
    const currAngle = i * angle - Math.PI / 2;
    const x = cx + r * Math.cos(currAngle);
    const y = cy + r * Math.sin(currAngle);
    points += `${x},${y} `;
  }
  return points.trim();
}

const InteractiveStar: React.FC<InteractiveStarProps> = ({ onPopupOpen, onPopupClose }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [showPopup, setShowPopup] = useState(false);

  // Config
  const shapeSwitchThreshold = 1.1;
  const baseOuterRadius = 8;
  const baseInnerRadius = 5;
  const fallbackCircleRadius = 5;
  const haloRadius = 10;

  // Star data
  const stars = [
    {
      id: "youtube",
      cx: 700,
      cy: 210,
      onClick: () => window.open("https://www.youtube.com", "_blank"),
    },
    {
      id: "image",
      cx: 1300,
      cy: 160,
      onClick: () => {
        setShowPopup(true);
        onPopupOpen?.();
      },
    },
  ];

  // Track effects per star
  const [hoverState, setHoverState] = useState<{
    [key: string]: {
      brightness: number;
      scale: number;
      translateX: number;
      translateY: number;
    };
  }>({
    youtube: { brightness: 1, scale: 1, translateX: 0, translateY: 0 },
    image: { brightness: 1, scale: 1, translateX: 0, translateY: 0 },
  });

  const handleMouseMove = (event: MouseEvent) => {
    if (!svgRef.current) return;

    const updatedState: typeof hoverState = { ...hoverState };

    stars.forEach(({ id, cx, cy }) => {
      updatedState[id] = calculateMouseEffects(event, svgRef.current!, cx, cy);
    });

    setHoverState(updatedState);
  };

  const handleMouseLeave = () => {
    setHoverState({
      youtube: { brightness: 1, scale: 1, translateX: 0, translateY: 0 },
      image: { brightness: 1, scale: 1, translateX: 0, translateY: 0 },
    });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    onPopupClose?.();
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
        {stars.map(({ id, cx, cy, onClick }) => {
          const { brightness, scale, translateX, translateY } = hoverState[id];
          return (
            <g
              key={id}
              transform={`translate(${cx + translateX}, ${cy + translateY}) scale(${scale}) translate(${-cx}, ${-cy})`}
            >
              <circle
                cx={cx}
                cy={cy}
                r={haloRadius}
                fill="none"
                stroke="#ffd700"
                strokeOpacity="0.4"
                strokeWidth="3"
                pointerEvents="none"
              />
              {scale > shapeSwitchThreshold ? (
                <polygon
                  points={generateStarPoints(cx, cy, baseOuterRadius, baseInnerRadius)}
                  fill="#ffd700"
                  style={{
                    cursor: "pointer",
                    filter: `brightness(${brightness})`,
                  }}
                  onClick={onClick}
                />
              ) : (
                <circle
                  cx={cx}
                  cy={cy}
                  r={fallbackCircleRadius}
                  fill="#ffd700"
                  style={{
                    cursor: "pointer",
                    filter: `brightness(${brightness})`,
                  }}
                  onClick={onClick}
                />
              )}
            </g>
          );
        })}
      </svg>

      {showPopup && (
        <div
          onClick={handleClosePopup}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.92)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              background: "transparent",
              padding: "0",
              borderRadius: "8px",
              maxWidth: "90%",
              maxHeight: "90%",
            }}
          >
            <button
              onClick={handleClosePopup}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                color: "white",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                zIndex: 10000,
              }}
            >
              ✖
            </button>
            <img
              src="/PsycheSpacecraft.png"
              alt="Psyche"
              style={{
                display: "block",
                maxWidth: "100%",
                maxHeight: "90vh",
                borderRadius: "6px",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveStar;