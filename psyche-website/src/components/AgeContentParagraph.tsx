import React from "react";
import "../styles/Paragraph.css";

const AgeContentParagraph: React.FC = () => {
  return (
    <div className="agecontent-container">
      <h2 className="agecontent-title">TIME ON PSYCHE</h2>
      <p className="agecontent-text">
        info about time on psyche with specifics about days, years, and hours so that the age calculator can make sense
      </p>
    </div>
  );
};

export default AgeContentParagraph;