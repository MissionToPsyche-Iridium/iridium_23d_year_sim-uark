import React from "react";
import "../../styles/InfoContentParagraph.css";

const InfoContentParagraph: React.FC = () => {
  return (
    <div className="info-content-container">
      <h2 className="info-content-title">WHY LEARN ABOUT PSYCHE?</h2>
      <p className="info-content-text">
        Psyche is the name of an asteroid orbiting the Sun between Mars and Jupiter and the name of a NASA space mission to visit that asteroid, led by ASU. Psyche is the first mission to a world likely made largely of metal rather than rock or ice. 
        The science goals of the Psyche Mission are to understand these building blocks of planet formation and to explore first-hand a wholly new and unexplored type of world. The mission team seeks to determine whether Psyche is remnant core material, how old it is, whether it formed in conditions similar to the Earth’s core, and what its surface is like.
      </p>
    </div>
  );
};

export default InfoContentParagraph;