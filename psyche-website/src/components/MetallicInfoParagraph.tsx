import React from "react";
import "../styles/Paragraph.css";

const MetallicInfoParagraph: React.FC = () => {
  return (
    <div className="metal-row-container">
      <h2 className="metal-row-title">WHY PSYCHE'S METAL MATTERS</h2>
      <p className="metal-row-text">
      Iron cores like our own play a central role in creating a magnetic field around the planet, which in turn holds in the atmosphere and may well be essential to make a planet habitable. They are also key to understanding how planets form after a star is forged and remaining dense gases and dust are kicked out to form a protoplanetary disk, where planets are assembled.
      The Earth’s core starts about 1,800 miles below the surface, and the cores of gas giants such as Jupiter are much further inward, and even their elemental makeups are not fully understood.
      All this helps explains why the upcoming NASA mission to the asteroid Psyche is being eagerly anticipated, especially by scientists who focus on planetary formation.
      Psyche differs from other planetary bodies in that the presence of metal — rather than silicates (rock) or ice or gases — tells the story of how the asteroid formed to how it responds to impacts. Other asteroids and meteorites that crash into a metal body form a unique crater pattern.
      </p>
    </div>
  );
};

export default MetallicInfoParagraph;