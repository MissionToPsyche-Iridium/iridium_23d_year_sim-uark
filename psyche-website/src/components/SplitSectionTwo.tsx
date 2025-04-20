
// Code relating to content section next to Temp Slider and temp paragraph and magnet and metallic paragraph

"use client";

import React, { useState, useEffect } from "react";
import "../styles/SplitSectionTwo.css";
import TemperatureSlider from "./TemperatureSlider";
import TempContentParagraph from "./Paragraphs/TempContentParagraph";
import MetallicInfoParagraph from "./Paragraphs/MetallicInfoParagraph";

const SplitSectionTwo: React.FC = () => {
  return (


    <div className="split-section">
       <div className="tempwave-overlay3">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#0f0827"
            d="M0,192L60,176C120,160,240,128,360,122.7C480,117,600,139,720,170.7C840,203,960,245,1080,256C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="rotated">
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
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="rotated">
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
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="rotated">
          <path
            fill="#0c2159"
            d="M0,192L60,176C120,160,240,128,360,122.7C480,117,600,139,720,170.7C840,203,960,245,1080,256C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>

      {/* Left Section */}
      <div className="left-section">

        <div className="metal-row">
          <MetallicInfoParagraph />
        </div>


        {/* Bottom Row: Temperature Slider */}
        <div className="temperature-row">
          <TemperatureSlider />
        </div>
      
      </div>

      {/* Right Section */}
      <div className="right-section">

        {/* metal content visual should be above here  */}

        {/* Bottom Row: Temperature Content Paragraph */}
        <div className="temperature-content">
          <TempContentParagraph />
        </div>


      </div>

    </div>

  );
};

export default SplitSectionTwo;
