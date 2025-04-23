"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import InteractiveSection from "./InteractiveSection/InteractiveSection";
import SplitSection from "./SplitSection";
import FeatureSection from "./FeatureSection";
import SplitSectionTwo from "./SplitSectionTwo";
import InteractiveStar from "./InteractiveStar";
import InfoContentParagraph from "./InfoContentParagraph";
import MetallicInfoParagraph from "./MetallicInfoParagraph";
import VerticalCardCarousel from "./VerticalCardCarousel";
import ImageCarousel from "./ImageCarousel";
import { CircleStar, DiamondStar } from "./Star";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(4);
  const pathname = usePathname();

  if (!pathname.startsWith("/") || !pathname.startsWith("/home")) {
    return <>{children}</>;
  }

  return (
    <>
      <header className="header">
        <h1>YEAR OF PSYCHE</h1>

        {/* Star Field */}
        <div className="header-stars">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
            <g>
              <CircleStar centerX={50} centerY={50} radius={3.5} className="star-svg" />
              <CircleStar centerX={150} centerY={100} radius={4} className="star-svg" />
              <CircleStar centerX={300} centerY={180} radius={3.5} className="star-svg" />
              <CircleStar centerX={500} centerY={70} radius={3} className="star-svg" />
              <CircleStar centerX={900} centerY={40} radius={3.5} className="star-svg" />
              <CircleStar centerX={1150} centerY={110} radius={4} className="star-svg" />
              <DiamondStar centerX={200} centerY={130} width={10} height={20} className="diamond-star" />
              <DiamondStar centerX={1350} centerY={235} width={10} height={20} className="diamond-star" />
            </g>
          </svg>
        </div>

        {/* Interactive Star */}
        <InteractiveStar
          onPopupOpen={() => setIsPopupOpen(true)}
          onPopupClose={() => setIsPopupOpen(false)}
        />

        {/* Waves Container */}
        <div className="header-waves">
          <div className="wave wave1">
            <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path
                fill="#160827"
                d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,80C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </svg>
          </div>
          <div className="wave wave2">
            <svg viewBox="0 0 1440 340" preserveAspectRatio="none">
              <path
                fill="#310945"
                d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,80C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,340L1392,340C1344,340,1248,340,1152,340C1056,340,960,340,864,340C768,340,672,340,576,340C480,340,384,340,288,340C192,340,96,340,48,340L0,340Z"
              />
            </svg>
          </div>
          <div className="wave wave3">
            <svg viewBox="0 0 1440 360" preserveAspectRatio="none">
              <path
                fill="#4c106a"
                d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,80C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,360L1392,360C1344,360,1248,360,1152,360C1056,360,960,360,864,360C768,360,672,360,576,360C480,360,384,360,288,360C192,360,96,360,48,360L0,360Z"
              />
            </svg>
          </div>
        </div>
      </header>

      {/* Main Sections */}
      <InteractiveSection isPopupOpen={isPopupOpen} />
      {children}
      <InfoContentParagraph />
      <SplitSection />
      <MetallicInfoParagraph />
      <VerticalCardCarousel currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
      <div style={{ marginTop: "80px", marginBottom: "-140px" }}>
        <ImageCarousel />
      </div>
      {/* <SplitSectionTwo /> */}
      <div style={{ marginTop: "140px" }}>
        <FeatureSection />
      </div>
    </>
  );
}
