"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/ImageCarousel.css";

const spacecraftData = [
  {
    imgSrc: "/iridium_23d_year_sim-uark/images/spacecraft1.jpg",
    title: "Psyche Spacecraft",
    description:
      "After Maxar Technologies successfully installed Psyche’s High Gain Antenna, their team moved the Psyche Solar Electric Propulsion (SEP) Chassis to the alignment stand at their factory in Palo Alto, CA.",
    dateAdded: "03-12-2021",
    credit: "Maxar Technologies",
  },
  {
    imgSrc: "/images/spacecraft2.jpg",
    title: "Psyche Spacecraft Prepares for Transport",
    description:
      "The Maxar team prepares the Psyche Solar Electric Propulsion (SEP) Chassis for shipment to NASA’s JPL.",
    dateAdded: "03-19-2021",
    credit: "Maxar Technologies",
  },
  {
    imgSrc: "/images/spacecraft3.jpg",
    title: "Psyche Spacecraft",
    description:
      "The Solar Electric Propulsion (SEP) Chassis of NASA’s Psyche spacecraft is mounted onto a rotation fixture in High Bay 1 of the Spacecraft Assembly Facility at NASA’s Jet Propulsion Laboratory in Southern California. This photo was taken March 28, 2021, just after the chassis – a major component of the Psyche spacecraft – was delivered to JPL by Maxar Technologies.",
    dateAdded: "03-29-2021",
    credit: "Maxar Technologies",
  },
  {
    imgSrc: "/images/spacecraft4.jpg",
    title: "Psyche Spacecraft: Main Body",
    description:
      "Psyche’s SEP chassis is currently in main body integration in Maxar’s Palo Alto, Calif. manufacturing facility. The equipment panels have been mated to Psyche’s propulsion module and technicians will soon begin installing attitude control components.",
    dateAdded: "12-01-2020",
    credit: "Maxar Technologies",
  },
  {
    imgSrc: "/images/spacecraft5.jpg",
    title: "Testing the Psyche Spacecraft",
    description:
      "Psyche’s spacecraft body being tested at Maxar’s Palo Alto, California manufacturing facility.",
    dateAdded: "04-16-2020",
    credit: "Maxar Technologies",
  },
  {
    imgSrc: "/images/spacecraft6.jpg",
    title: "Preparing Psyche’s Thruster Installation",
    description:
      "Engineers at NASA’s Jet Propulsion Laboratory in Southern California prepare to integrate four Hall thrusters (beneath red protective covers) into the agency’s Psyche spacecraft in July 2021.",
    dateAdded: "09-20-2021",
    credit: "NASA/JPL-Caltech",
  },
  {
    imgSrc: "/images/spacecraft7.jpg",
    title: "Psyche Gamma-Ray Spectrometer",
    description:
      "The Psyche gamma-ray spectrometer uses a high-purified germanium crystal to capture gamma rays emitted by asteroid Psyche. These gamma rays can reveal what elements the surface is made of.",
    dateAdded: "09-02-2021",
    credit: "Johns Hopkins APL/Ed Whitman"
  },
  {
    imgSrc: "/images/spacecraft8.jpg",
    title: "Psyche Spacecraft: High Gain Antenna",
    description:
      "Psyche’s high gain antenna has completed fabrication and is undergoing standard testing in Maxar’s Near Field Range to verify that it will work as intended once launched.",
    dateAdded: "12-01-2020",
    credit: "Maxar Technologies"
  },
  {
    imgSrc: "/images/spacecraft9.jpg",
    title: "Integration of Part of Psyche’s Electric Propulsion Subsystem",
    description:
      "A Maxar technician prepares to integrate part of Psyche’s electric propulsion subsystem.",
    dateAdded: "04-16-2020",
    credit: "Maxar Technologies"
  },
];

const ImageCarousel: React.FC = () => {
  return (
    <div
      className="image-carousel"
      style={{ width: "100%", maxWidth: "1400px", margin: "0 auto" }}
    >
      <Swiper
        modules={[Navigation]}
        navigation
        loop
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          backgroundColor: "#0c0c1e",
          position: "relative",
        }}
      >
        {spacecraftData.map((spacecraft, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* PHOTO CONTAINER */}
              <div
                style={{
                  width: "100%",
                  maxHeight: "700px", // Set a max height for the image container
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "20px",
                }}
              >
                <img
                  src={spacecraft.imgSrc}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain", // Ensures the image fits nicely within the container
                  }}
                />
              </div>

              {/* CAPTION UNDERNEATH */}
              <div
                style={{
                  marginTop: "10px",
                  backgroundColor: "#0c0c1e",
                  color: "white",
                  padding: "10px 20px",
                  textAlign: "center",
                  borderRadius: "10px",
                  maxWidth: "90%",
                  fontSize: "18px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <strong style={{ fontSize: "22px" }}>
                  {spacecraft.title}
                </strong>
                <p style={{ marginTop: "10px", fontSize: "18px" }}>
                  {spacecraft.description}
                </p>
                {/* Date and Credit */}
                <p style={{ marginTop: "10px", fontSize: "16px" }}>
                  <strong>Date Added:</strong> {spacecraft.dateAdded}
                </p>
                <p style={{ marginTop: "5px", fontSize: "16px" }}>
                  <strong>Credit:</strong> {spacecraft.credit}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;