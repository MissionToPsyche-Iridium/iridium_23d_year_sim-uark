"use client";

import React, { useState, useEffect } from "react";
import "../styles/SplitSection.css";

{/* Card Deck Component */}
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
  const [width, setWidth] = useState<number>(window.innerWidth);

  // Update width on window resize
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="split-section">
      {/* Left Section */}
      <div className="left-section">
        <CardDeck />
      </div>

      {/* Right Section */}
      <div className="right-section">
        <h2>Right Section</h2>
        <p>Content for the right section</p>
      </div>
    </div>
  );
};

export default SplitSection;
