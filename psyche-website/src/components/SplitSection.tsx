"use client";

import React, { useState, useEffect } from "react";
import CalculatorStars from "./CalculatorStars";
import "../styles/SplitSection.css";

// Card Deck Component
const CardDeck: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Facts for the card deck
  const cards = [
    { id: 1, fact: "Scientists infer the presence of metallic cores, but these lie unreachably far below the planets' rocky mantles and crusts. Because we cannot see or measure Earth's core directly, Psyche offers a unique window into the violent history of collisions and accretion that created terrestrial planets." },
    { id: 2, fact: "It’s estimated that it will take the spacecraft about 2.2 billion miles (3.6 billion kilometers) to travel to Psyche." },
    { id: 3, fact: "Psyche is likely a mixture of rock and metal, with metal making up between 30% to 60% of its volume. It has been speculated that it is mainly composed of iron, nickel, and silicate." },
    { id: 4, fact: "The asteroid Psyche orbits the Sun in the outer part of the main asteroid belt between Mars and Jupiter, and it is approximately three times farther from the Sun than Earth is!" },
    { id: 5, fact: "Psyche has an irregular potato shape. If the asteroid were sliced in half horizontally at the equator – picture a squished oval – it would measure 173 miles (280 kilometers) across at its widest point and 144 miles (232 kilometers) long. It is estimated to have a surface area of about 64,000 square miles (165,800 square kilometers). " },
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
      <button onClick={handlePrevious} className="card-button left">⬅️</button>
      <button onClick={handleNext} className="card-button right">➡️</button>
    </div>
  );
};

const SplitSection: React.FC = () => {
  const [width, setWidth] = useState<number>(0);
  const [birthdate, setBirthdate] = useState<string>("");
  const [age, setAge] = useState<{ years: number; days: number } | null>(null);
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const psycheYear = 1825.95;
  const psycheDay = 4.2 / 24;

  const calculateAge = () => {
    if (birthdate) {
      const birthDate = new Date(birthdate);
      const today = new Date();
      const ageInDays = Math.floor(
        (today.getTime() - birthDate.getTime()) / (1000 * 3600 * 24)
      );
      const psycheYears = Math.floor(ageInDays / psycheYear);
      const remainingEarthDays = ageInDays % psycheYear;
      const psycheDays = Math.floor(remainingEarthDays / psycheDay);
      // Brief delay to simulate asynchronous update if needed
      setAge(null);
      setTimeout(() => {
        setAge({ years: psycheYears, days: psycheDays });
        // Triggers stars when age is calculated
        setShowStars(true); 
        // setTimeout(() => setShowStars(false), 3000);
      }, 100);
    }
  };

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
        <CardDeck />
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="birthday-input">
          <label htmlFor="birthdate">Enter your birthdate:</label>
          <br />
          <br />
          <div className="input-container">
            <input
              type="date"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
            <button onClick={calculateAge}>Calculate Age</button>
          </div>
        </div>

        {age !== null && (
          <div className="age-result">
            <p>
              You are {age.years} years and {age.days} days old!
            </p>
            {showStars && <CalculatorStars showStars = {showStars}/>}
          </div>
        )}
      </div>
    </div>
  );
};

export default SplitSection;
