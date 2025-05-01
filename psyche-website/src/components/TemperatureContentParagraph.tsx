import React from "react";
import "../styles/Paragraph.css";

const AgeContentParagraph: React.FC = () => {
  return (
    <div className="temperature-container">
      <h2 className="temperature-title">TEMPERATURE ON PSYCHE</h2>
      <p className="temperature-text">
        The temperature on Psyche ranges from about -340°F (-210°C) to -100°F (-73°C). However, all information about the surface temperature is speculative, and will be confirmed by the satellite once it reaces Psyche.
      </p>
    </div>
  );
};

export default AgeContentParagraph;