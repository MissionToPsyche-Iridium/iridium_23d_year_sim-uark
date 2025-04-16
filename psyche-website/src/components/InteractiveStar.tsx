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
): { brightness: number; scale: number; translateX: number; translateY: number } {
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
  const [brightness, setBrightness] = useState(1);
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleClickYoutube = () => {
    window.open("https://www.youtube.com", "_blank");
  };

  const handleClickImage = () => {
    setShowPopup(true);
    onPopupOpen?.(); // Notify parent
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    onPopupClose?.(); // Notify parent
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!svgRef.current) return;
    const { brightness, scale, translateX, translateY } = calculateMouseEffects(
      event,
      svgRef.current,
      700,
      210
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

  const shapeSwitchThreshold = 1.1;
  const baseOuterRadius = 4;
  const baseInnerRadius = 2.5;

  return (
    <div className="interactive-star-layer">
      <svg
        ref={svgRef}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* YouTube Star */}
        <g
          transform={`translate(${700 + translateX}, ${210 + translateY}) scale(${scale}) translate(${-700}, ${-210})`}
        >
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

        {/* Image Popup Star */}
        <circle
          cx={1300}
          cy={160}
          r={2.5}
          fill="#ffd700"
          style={{ cursor: "pointer" }}
          onClick={handleClickImage}
        />
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