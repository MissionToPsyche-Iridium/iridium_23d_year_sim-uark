import React from "react";
import "../../styles/Paragraph.css";

const TempContentParagraph: React.FC = () => {
  return (
    <div className="tempcontent-container">
      <h2 className="tempcontent-title">TEMPERATURE CONTENT</h2>
      <p className="tempcontent-text">
        info about temp on psyche. pull specific numbers from the research paper 
      </p>
    </div>
  );
};

export default TempContentParagraph;