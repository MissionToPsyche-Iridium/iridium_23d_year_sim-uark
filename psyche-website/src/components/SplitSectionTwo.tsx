// Similar code to SplitSection.tsx without any code relating to the age calculator
// Code relating to Fun Facts section next to Temp Sliders

"use client";

import React, { useState, useEffect } from "react";
import "../styles/SplitSection.css";
import TemperatureSlider from "./TemperatureSlider";
import AgeContentParagraph from "./Paragraphs/AgeContentParagraph";

const SplitSectionTwo: React.FC = () => {
  return (
    <div className="split-section">

      {/* Left Section */}
      <div className="left-section">
        <TemperatureSlider />
      </div>

      {/* Right Section */}
      <div className="right-section">
        <AgeContentParagraph />

      </div>
    </div>
  );
};

export default SplitSectionTwo;
