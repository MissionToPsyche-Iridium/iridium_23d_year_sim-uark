"use client";

import React from "react";

const InteractiveStar: React.FC = () => {
  const handleClick = () => {
    window.open("https://www.youtube.com", "_blank");
  };

  return (
    <div className="interactive-star-layer">
      <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
        <g>
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
          {/* Main clickable star */}
          <circle
            cx={700}
            cy={210}
            r={2.5}
            fill="#ffd700"
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          />
        </g>
      </svg>
    </div>
  );
};

export default InteractiveStar;