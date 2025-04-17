// Similar code to SplitSection.tsx without any code relating to the age calculator
// Code relating to Fun Facts section next to Temp Sliders

"use client";

import React, { useState, useEffect } from "react";
import "../styles/SplitSection.css";
import TemperatureSlider from "./TemperatureSlider";

// Card Deck Component
const CardDeck: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Facts for the card deck
  const cards = [
    { id: 1, fact: "A year on Psyche lasts about five Earth years (about 1,828 Earth days)."},
    { id: 2, fact: "A day on Psyche is about 4 hours and 12 minutes. This is the sidereal rotation period, or the “amount of time it takes for a [body] to completely spin around and make one full rotation. You could live through just under six “days” on Psyche in the same time as one day on Earth!" },
    { id: 3, fact: "The asteroid was named for the goddess of the soul in ancient Greek mythology, often depicted as a butterfly-winged female figure." },
 ];

  // Auto slide cards every 10 seconds
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isHovered, cards.length]);

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevious = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <div
      className="card-deck"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Deck */}
      <div className="card-container">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="card"
            style={{
              left: `${(index - currentCardIndex) * 100}%`,
              transform: `translateX(${(index - currentCardIndex) * 100}%)`,
            }}
          >
            <p className="card-text">{card.fact}</p>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button onClick={handlePrevious} className="card-button left">&lt;</button>
      <button onClick={handleNext} className="card-button right">&gt;</button>
    </div>
  );
};

const SplitSectionTwo: React.FC = () => {
  return (
    <div className="split-section">
      {/* Wave Overlay: Positioned absolutely inside the split-section */}
      <div className="wave-overlay3">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#0f0827"
            d="M0,192L60,176C120,160,240,128,360,122.7C480,117,600,139,720,170.7C840,203,960,245,1080,256C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="rotated">
          <path
            fill="#0f0827"
            d="M0,192L60,176C120,160,240,128,360,122.7C480,117,600,139,720,170.7C840,203,960,245,1080,256C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>
      <div className="wave-overlay2">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#0f0c47"
            d="M0,192L60,176C120,160,240,128,360,122.7C480,117,600,139,720,170.7C840,203,960,245,1080,256C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="rotated">
          <path
            fill="#0f0c47"
            d="M0,192L60,176C120,160,240,128,360,122.7C480,117,600,139,720,170.7C840,203,960,245,1080,256C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>
      <div className="wave-overlay">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#0c2159"
            d="M0,192L60,176C120,160,240,128,360,122.7C480,117,600,139,720,170.7C840,203,960,245,1080,256C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="rotated">
          <path
            fill="#0c2159"
            d="M0,192L60,176C120,160,240,128,360,122.7C480,117,600,139,720,170.7C840,203,960,245,1080,256C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>

      {/* Left Section */}
      <div className="left-section">
        <TemperatureSlider />
      </div>

      {/* Right Section */}
      <div className="right-section">
        <CardDeck />
      </div>
    </div>
  );
};

export default SplitSectionTwo;
