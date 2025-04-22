
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
  // phase a 
  `<div style="text-align: center;"><strong>Concept Study</strong></div>
  <ul>
    <li>In September of 2015, the Psyche Mission (as it was proposed in Step 1) was selected by NASA to develop a detailed concept study for consideration for NASA’s Discovery Program.</li>
    <li>The team had been working on the idea since 2011 and submitted a 256-page Step 1 proposal that was selected for the Phase A concept study.</li>
    <li>A large team worked on the study, led by Principal Investigator Lindy Elkins-Tanton, including scientists, engineers, project managers, schedulers, financial modelers, graphic designers, and marketing leads from ASU, JPL, Maxar Technologies, and over a dozen universities and research organizations.</li>
    <li>The team submitted the ~1,000-page concept study in August of 2016.</li>
    <li>In November of 2016, the team presented the proposed mission to 30 NASA reviewers during a nine-hour “site visit” at Maxar’s high bay, where the Psyche chassis will be built.</li>
    <li>The site visit was an intense, highly technical in-person review by science, technical, and industry experts, covering every aspect of the proposed mission.</li>
    <li>Following the site visit, the Principal Investigator presented to NASA’s Associate Administrator.</li>
    <li>On January 4 of 2017, the Psyche Mission’s selection for flight was announced by NASA.</li>
  </ul>`,

  //phase b
  `<div style="text-align: center;"><strong>Preliminary Design of All Instruments & Spacecraft</strong></div>
  <ul>
    <li>Science and engineering teams on the mission designed the spacecraft and the instruments that will be used to analyze the asteroid.</li>
    <li>March 2019, the team completed project and flight system Preliminary Design Review.</li>
    <li>May 2019, the team reached Key Decision Point C, which gave the team the official approval to move to the next phase (Phase C).</li>
  </ul>`,

  //phase c
  `<div style="text-align: center;"><strong>Final Design & Subsystem Fabrication, Assembly, & Test</strong></div>
  <ul>
    <li>Science and engineering teams begin to build their instruments.</li>
    <li>The instruments consist of a magnetometer, a multispectral imager, and a gamma ray and neutron spectrometer.</li>
    <li>The mission will use an X-band radio telecommunications system to measure Psyche’s gravity field to high precision. When combined with topography derived from onboard imagery, this will provide information on the interior structure of Psyche.</li>
    <li>The mission will also test a sophisticated new laser communication technology that encodes data in photons (rather than radio waves) to communicate between a probe in deep space and Earth. Using light instead of radio allows the spacecraft to communicate more data in a given amount of time.</li>
    <li>May 2020, the teams undergo Project and Flight System Critical Design Review, this is an integral step in the instrument engineering process.</li>
    <li>In January 2021, the team conducts the Systems Integration Review to ensure that the system is ready to be integrated. The last step in Phase C is Key Decision Point D that gives the team the official approval to move to the next phase.</li>
  </ul>`,

  // phase d
  `<div style="text-align: center;"><strong>Important mission milestones occur in Phase D, including:</strong></div>
  <ul>
    <li>Instrument and spacecraft assembly and testing: During this phase, all the spacecraft subsystems are integrated onto the spacecraft bus.</li>
    <li>Shipping the spacecraft to the launch site: The spacecraft measures about 81 feet long (24.76 meters) when the solar panels are unfolded. This is about the size of a singles tennis court.</li>
    <li>Mission launch: The spacecraft launches. Psyche launched at 10:19 a.m. EDT Friday, October 13, 2023 aboard a SpaceX Falcon Heavy rocket from Launch Pad 39A at NASA’s Kennedy Space Center in Florida.Once in space, the spacecraft travels using solar-electric propulsion. It arrives at the asteroid, located in the main asteroid belt between Mars and Jupiter. </li>
  </ul>`,

  // phase e
  `<div style="text-align: center;"><strong>Phase E of the mission encompasses:</strong></div>
  <ul>
    <li>Cruise (the activity that occurs between launch and the encounter with Psyche), including a Mars gravity assist: The spacecraft uses the gravity of Mars to increase speed and to set its trajectory to intersect with Psyche’s orbit around the Sun. It does this by entering and leaving the gravitational field of Mars. This slingshot maneuver saves propellant, time and expense.</li>
    <li>Arrival at the asteroid: Leading up to arrival at Psyche, the spacecraft spends 100 days in the approach phase. The spacecraft also measures the asteroid’s spin axis and rotation.</li>
    <li>Orbiting the asteroid: The spacecraft orbits the asteroid. It performs science operations from four different orbits, each successively closer to the asteroid. In each orbit, the instruments on board send data back to Earth to be analyzed by the mission’s science team. </li>
  </ul>`,

  // phase f
  `<div style="text-align: center;"><strong>Mission Closeout</strong></div>
  <ul>
    In this final phase, the mission team provides all remaining deliverables and safely decommissions the space flight systems.
  </ul>`,
];

const SplitSectionTwo: React.FC = () => {
  const [width, setWidth] = useState<number>(0);
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

    <div className="image-carousel-section" style={{ marginTop: "5rem", textAlign: "center" }}>
    <h2 className="image-carousel-title">Psyche Spacecraft Gallery</h2>
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <ImageCarousel />
    </div>
  </div>
  </div>
  );
};

export default SplitSectionTwo;
