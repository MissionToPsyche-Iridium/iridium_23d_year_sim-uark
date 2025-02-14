"use client";

import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import "../styles/SplitSection.css";

// Card Deck Component
const CardDeck: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Facts for the card deck
  const cards = [
    { id: 1, fact: "Fact 1" },
    { id: 2, fact: "Fact 2" },
    { id: 3, fact: "Fact 3" },
    { id: 4, fact: "Fact 4" },
    { id: 5, fact: "Fact 5" },
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

  // Update width on window resize (client-side only)
  useEffect(() => {
    // Check if window is defined (important for SSR)
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);

      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const psycheYear = 1825.95;
  const psycheDay = 4.2/24;

  const calculateAge = () => {
    if (birthdate) {
      const birthDate = new Date(birthdate);
      const today = new Date();
      const ageInDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 3600 * 24));

      const psycheYears = Math.floor(ageInDays / psycheYear);

      const remainingEarthDays = ageInDays % psycheYear;
      const psycheDays = Math.floor(remainingEarthDays / psycheDay);

    //  setAge({ years: psycheYears, days: psycheDays });
      setAge(null);
      setTimeout(() => {
        setAge({years: psycheYears, days:psycheDays });
      }, 100);
    }
  };

  return (
    <div className="split-section">
      {/* Left Section */}
      <div className="left-section">
        <CardDeck />
      </div>

      {/* Right Section */}
      <div className="right-section">
      {/*  <h2>Right Section</h2>
        <p>Content for the right section</p>
        <p>Window width: {width}</p> */}
        
        {/* Birthday Input */}
        <div className="birthday-input">
          <label htmlFor="birthdate">Enter your birthdate:</label>
          <br />
          <br />
          <input
            type="date"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
          <br />
          <br />
          <button onClick={calculateAge}>Calculate Age</button>
        </div>

        {/* Age Result */}
        {age !== null && (
          <div className="age-result">
            <h3>You are {age.years} years and {age.days} days old on Psyche!</h3>
            <ProgressBar age={age} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SplitSection;
