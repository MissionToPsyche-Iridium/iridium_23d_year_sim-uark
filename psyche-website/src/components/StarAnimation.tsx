"use client";

import React, { useEffect, useState } from "react";
import "../styles/StarAnimation.css";

interface StarAnimationProps {
  show: boolean;
}

const StarAnimation: React.FC<StarAnimationProps> = ({ show }) => {
  const [stars, setStars] = useState<number[]>([]);

  useEffect(() => {
    if (show) {
      setStars(Array.from({ length: 6 }, (_, i) => i));
    } else {
      setStars([]);
    }
  }, [show]);

  return (
    <div className="star-animation-container">
      {stars.map((star) => (
        <div key={star} className="star" style={{
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 80 + 10}%`,
          animationDuration: `${Math.random() * 1 + 1}s`,
          animationDelay: `${Math.random() * 0.5}s`,
        }} />
      ))}
    </div>
  );
};

export default StarAnimation;
