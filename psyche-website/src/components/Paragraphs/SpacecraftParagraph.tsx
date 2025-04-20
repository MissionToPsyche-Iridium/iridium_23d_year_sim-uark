import React from "react";
import "../../styles/Paragraph.css";

const SpacecraftParagraph: React.FC = () => {
  return (
    <div className="paragraph-container">
      <h2 className="paragraph-title">SPACECRAFT CAPTIONS</h2>
      <p className="paragraph-text">
        info about the spacecraft photos. use photos from asu or nasa website with the info about the spacecraft underneath. the photos should be side by side so that a user can click an arrow and go through the photos
      </p>
    </div>
  );
};

export default SpacecraftParagraph;