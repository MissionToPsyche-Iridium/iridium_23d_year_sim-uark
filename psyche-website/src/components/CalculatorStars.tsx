import React from "react";
import "../styles/CalculatorStars.css";

const CalculatorStars: React.FC<{ showStars: boolean }> = ({ showStars }) => {
const numberOfStars = 10;
  
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < numberOfStars; i++) {
      stars.push(
        <div
          key={i}
          className="star"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`, 
            animationDelay: `${Math.random() * 2}s`, 
          }}
        >
        </div>
      );
    }
    return stars;
  };

  return (
    <div className={`star-container ${showStars ? "show" : ""}`} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
      {showStars && generateStars()}
    </div>
  );
};

export default CalculatorStars;