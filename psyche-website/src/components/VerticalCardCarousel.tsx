// VerticalCardCarousel.tsx

"use client";

import React, { useState, useEffect } from "react";
import "../styles/VerticalCardCarousel.css";

const cards = [
  { title: "Testing 1 (Mission Milestone)", content: "This is a description of Testing 1" },
  { title: "Testing 2 (Mission Milestone)", content: "This is a description of Testing 2" },
  { title: "Testing 3 (Mission Milestone)", content: "This is a description of Testing 3" },
  { title: "Testing 4 (Mission Milestone)", content: "This is a description of Testing 4" },
  { title: "Testing 5 (Mission Milestone)", content: "This is a description of Testing 5" },
  { title: "Testing 6 (Mission Milestone)", content: "This is a description of Testing 6" },
];

interface VerticalCardCarouselProps {
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const VerticalCardCarousel: React.FC<VerticalCardCarouselProps> = ({ currentIndex, setCurrentIndex }) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCurrentIndex(value);
  };

  useEffect(() => {
    // Ensure slider starts from the middle
    const slider = document.getElementById("vertical-slider") as HTMLInputElement;
    if (slider) {
      slider.value = currentIndex.toString();
    }
  }, [currentIndex]);

  return (
    <div className="vertical-carousel-wrapper">
      <div className="carousel-and-slider">
        {/* Carousel */}
        <div className="vertical-carousel">
          {cards.map((card, index) => {
            const offset = index - currentIndex;
            return (
              <div
                key={index}
                className={`carousel-card ${offset === 0 ? "active" : "inactive"}`}
                style={{
                  transform: `translateY(${offset * 100}px) scale(${offset === 0 ? 1 : 0.8})`,
                  zIndex: cards.length - Math.abs(offset),
                  opacity: offset === 0 ? 1 : 0.4,
                  filter: offset === 0 ? "none" : "blur(2px)",
                }}
              >
                <h3>{card.title}</h3>
                <p>{card.content}</p>
              </div>
            );
          })}
        </div>

        {/* Slider */}
        <input
          id="vertical-slider"
          type="range"
          min="0"
          max={cards.length - 1}
          value={currentIndex}
          onChange={handleSliderChange}
          className="vertical-slider"
        />
      </div>
    </div>
  );
};

export default VerticalCardCarousel;
