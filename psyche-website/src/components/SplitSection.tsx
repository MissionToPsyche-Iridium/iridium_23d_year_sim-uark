"use client";

import { relative } from "path";
import React, { useState, useEffect } from "react";
// import '../styles/SplitSection.css'

{/* Card Deck Component 
    currentCardIndex: track the active card
    isHovered: track hover status
  */} 
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
      style={{
        backgroundColor: "#f0f0f0",
        border: "1px solid #ccc",
        borderRadius: "8px",
        textAlign: "center",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={() => setIsHovered(true)} // Pause auto-slide on hover
      onMouseLeave={() => setIsHovered(false)} // Resume auto-slide on mouse leaving
    >
      {/* Card Deck */}
      <div style={{ position: "relative", height: "150px" }}>
        {cards.map((card, index) => (
          <div
            key={card.id}
            style={{
              position: "absolute",
              top: 0,
              left: `${(index - currentCardIndex) * 100}%`,
              width: "100%",
              height: "100%",
              transition: "transform 0.5s ease",
              transform: `translateX(${(index - currentCardIndex) * 100}%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p style={{ fontSize: "16px", margin: 0, color: "black"}}>{card.fact}</p>
          </div>
        ))}
    </div>

    {/* Nagivation Arrows */}
    <button
      onClick={handlePrevious}
      style={{
        position: "absolute",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        background: "transparent",
        border: "none",
        fontSize: "20px",
        cursor: "pointer",
        zIndex: 10,
      }}
    >
      ⬅️ {/* Left arrow image */}
    </button>

    <button
      onClick={handleNext}
      style={{
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        background: "transparent",
        border: "none",
        fontSize: "20px",
        cursor: "pointer",
        zIndex: 10,
      }}
    >
      ➡️ {/* Right arrow image */}
    </button>
  </div>  
  );
};

const SplitSection: React.FC = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  // Update width on window resize
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate the padding and section width 
  const padding = 10;
  const sectionWidth = width - padding * 2;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: `${sectionWidth}px`,
        padding: `0 ${padding}px`,
        margin: "20px auto",
        gap: "20 px",
      }}
    >
      {/* Left Section */}
      <div style={{ flex: 1 }}>
        <CardDeck />
      </div>

      {/* Right Section */}
      <div 
        style={{
          flex: 1,
          backgroundColor: "rgb(120, 120, 120)",
          border: "1px solid #ccc",
          borderRadius: "8px",
          textAlign: "center",
          padding: "20px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>Right Section</h2>
        <p>Content for the right section</p>
      </div>
    </div>
  );
};

export default SplitSection;