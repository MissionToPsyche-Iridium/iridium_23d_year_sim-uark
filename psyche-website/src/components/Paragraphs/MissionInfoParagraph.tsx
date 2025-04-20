import React from "react";
import "../../styles/Paragraph.css";

const MissionInfoParagraph: React.FC = () => {
  return (
    <div className="paragraph-container">
      <h2 className="paragraph-title">MISSION CAROUSEL CARDS</h2>
      <p className="paragraph-text">
        info about mission timeline with each card being different timestamps with the corresponding info. theres should be a draggable slider that works with the cards
      </p>
    </div>
  );
};

export default MissionInfoParagraph;