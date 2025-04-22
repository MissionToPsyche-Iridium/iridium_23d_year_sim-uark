// VerticalCardCarousel.tsx

"use client";

import React, { useState, useEffect } from "react";
import "../styles/VerticalCardCarousel.css";

const cards = [
  { title: "Phase A", content: "Sept 2015 - Dec 2016" },
  { title: "Phase B", content: "Jan 2017 - May 2019" },
  { title: "Phase C", content: "May 2019 - Jan 2021" },
  { title: "Phase D", content: "Jan 2021" },
  { title: "Phase E", content: "WE ARE HERE" },
  { title: "Phase F", content: "Mission Closeout" },
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
  <div className="vertical-carousel-section">
    <div className="vertical-carousel-wrapper">
      <h1 className="section-title">The Psyche Mission consists of six phases, labeled A-F.  These phases span from initial studies and selection of the mission by NASA for its Discovery Program, through building and testing of instruments and the spacecraft, to launch, cruise, and arrival at the asteroid and finally to orbit and the closeout of the mission.  Scroll below to follow the journey of Psyche through the phases of the mission. </h1>
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
    </div>
  );
};

export default VerticalCardCarousel;
