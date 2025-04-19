import React from "react";
import "../../styles/Paragraph.css";

const SpacecraftParagraph: React.FC = () => {
  return (
    <div className="paragraph-container">
      <h2 className="paragraph-title">Fun Fact!</h2>
      <p className="paragraph-text">
        Did you know that the highest temperature ever recorded on Earth was 134°F (56.7°C)
        in Furnace Creek, California, back in 1913? Extreme temperatures like this remind us
        of how powerful nature can be! 
      </p>
    </div>
  );
};

export default SpacecraftParagraph;