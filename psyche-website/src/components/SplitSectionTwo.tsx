
// Code relating to content section next to Temp Slider and temp paragraph, magnet and metallic paragraph
// includes mission timeline cards and image carousel

"use client";

import React, { useState, useEffect } from "react";
import "../styles/SplitSectionTwo.css";
import TemperatureSlider from "./TemperatureSlider";
import TempContentParagraph from "./Paragraphs/TempContentParagraph";
import MetallicInfoParagraph from "./Paragraphs/MetallicInfoParagraph";
import VerticalCardCarousel from "./VerticalCardCarousel"
import DescriptionCardDeck from "./DescriptionCardDeck";
import ImageCarousel from "./ImageCarousel";


const newDescriptions = [
  "Detailed explanation of Testing 1's mission and milestones.",
  "Detailed explanation of Testing 2's mission and milestones.",
  "Detailed explanation of Testing 3's mission and milestones.",
  "Detailed explanation of Testing 4's mission and milestones.",
  "Detailed explanation of Testing 5's mission and milestones.",
  "Detailed explanation of Testing 6's mission and milestones.",
];

const SplitSectionTwo: React.FC = () => {
  const [width, setWidth] = useState<number | null>(null); // Defaulting to null until mounted on the client
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
  
    window.addEventListener("resize", handleResize);
    handleResize();
  
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
  <div>
    <div className="split-section">
      {/* Conditionally render wave overlays based on width */}
      {width && (
        <>
          <div className="tempwave-overlay3">
            <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path
                fill="#0f0827"
                d="M0,192L60,176C120,160,240,128,360,122.7C480,117,600,139,720,170.7C840,203,960,245,1080,256C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              />
            </svg>
          </div>

          <div className="tempwave-overlay2">
            <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path
                fill="#0f0c47"
                d="M0,192L60,176C120,160,240,128,360,122.7C480,117,600,139,720,170.7C840,203,960,245,1080,256C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              />
            </svg>
          </div>

          <div className="tempwave-overlay">
            <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path
                fill="#0c2159"
                d="M0,192L60,176C120,160,240,128,360,122.7C480,117,600,139,720,170.7C840,203,960,245,1080,256C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              />
            </svg>
          </div>

          {/* Flipped waves */}
          <div className="tempwave-overlay-flipped">
            <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path
                fill="#0f0827"
                d="M0,192L60,176C120,160,240,128,360,122.7C480,117,600,139,720,170.7C840,203,960,245,1080,256C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              />
            </svg>
          </div>

          <div className="tempwave-overlay2-flipped">
            <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path
                fill="#0f0c47"
                d="M0,192L60,176C120,160,240,128,360,122.7C480,117,600,139,720,170.7C840,203,960,245,1080,256C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              />
            </svg>
          </div>

          <div className="tempwave-overlay3-flipped">
            <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path
                fill="#0c2159"
                d="M0,192L60,176C120,160,240,128,360,122.7C480,117,600,139,720,170.7C840,203,960,245,1080,256C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              />
            </svg>
          </div>
        </>
      )}

      {/* Left Section */}
      <div className="left-section">

        <div className="metal-row">
          <MetallicInfoParagraph />
        </div>


        {/* Bottom Row: Temperature Slider */}
        <div className="temperature-row">
          <TemperatureSlider />

          <VerticalCardCarousel currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />

        </div>
      
      </div>

      {/* Right Section */}
      <div className="right-section">

        {/* metal content visual should be above here  */}

        {/* Temperature Content Paragraph */}
        <div className="temperature-content">
          <TempContentParagraph />
        </div>

        {/* New Card Deck (Description) */}
        <DescriptionCardDeck currentIndex={currentIndex} descriptions={newDescriptions} />
        
      </div>
    </div>

    <div className="image-carousel-section" style={{ marginTop: "3rem", textAlign: "center" }}>
    <h2 className="image-carousel-title">Psyche Spacecraft Gallery</h2>
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <ImageCarousel />
    </div>
  </div>
  </div>
  );
};

export default SplitSectionTwo;
