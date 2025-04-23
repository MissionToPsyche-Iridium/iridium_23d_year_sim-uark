"use client";

import React, { useState, useEffect } from "react";
import "../styles/VerticalCardCarousel.css";

const cards = [
  { title: "Phase F", content: "Mission Closeout" },
  { title: "Phase E", content: "WE ARE HERE" },
  { title: "Phase D", content: "Jan 2021" },
  { title: "Phase C", content: "May 2019 - Jan 2021" },
  { title: "Phase B", content: "Jan 2017 - May 2019" },
  { title: "Phase A", content: "Sept 2015 - Dec 2016" },
];

const newDescriptions = [
  `<h3>Mission Closeout</h3>
   <ul><li>In this final phase, the mission team provides all remaining deliverables and safely decommissions the space flight systems.</li></ul>`,

  `<h3>Phase E of the mission encompasses:</h3>
   <ul>
     <li>Cruise including a Mars gravity assist...</li>
     <li>Arrival at the asteroid...</li>
     <li>Orbiting the asteroid...</li>
   </ul>`,

  `<h3>Important mission milestones in Phase D:</h3>
   <ul>
     <li>Instrument and spacecraft assembly...</li>
     <li>Shipping the spacecraft to the launch site...</li>
     <li>Mission launch and travel...</li>
   </ul>`,

  `<h3>Final Design & Subsystem Fabrication</h3>
   <ul>
     <li>Instrument construction and testing...</li>
     <li>Gravity field and communication tech...</li>
     <li>Critical Design Reviews and integration...</li>
   </ul>`,

  `<h3>Preliminary Design</h3>
   <ul>
     <li>Design and planning stages...</li>
     <li>Key Decision Point C and approvals...</li>
   </ul>`,

  `<h3>Concept Study</h3>
   <ul>
     <li>Proposal and team formation...</li>
     <li>Site visit and technical review...</li>
     <li>NASA flight selection announcement...</li>
   </ul>`,
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
    const slider = document.getElementById("vertical-slider") as HTMLInputElement;
    if (slider) {
      slider.value = currentIndex.toString();
    }
  }, [currentIndex]);

  return (
    <div className="vertical-carousel-section">
      <h1 className="section-title">
        The Psyche Mission consists of six phases, labeled A–F. These phases span from initial studies and selection of the mission by NASA for its Discovery Program, through building and testing of instruments and the spacecraft, to launch, cruise, and arrival at the asteroid and finally to orbit and the closeout of the mission.
        <br />
        Scroll below to follow the journey of Psyche through the phases of the mission.
      </h1>

      {/* RELATIVE WRAPPER */}
      <div className="carousel-position-wrapper">
        <div className="carousel-wrapper-horizontal">
          {/* Carousel Cards */}
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
            className="vertical-slider-horizontal"
          />
        </div>

        {/* Description Card */}
        <div className="carousel-card description-card-absolute">
          <div dangerouslySetInnerHTML={{ __html: newDescriptions[currentIndex] }} />
        </div>
      </div>
    </div>
  );
};

export default VerticalCardCarousel;