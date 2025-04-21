"use client";

import React, { useState } from "react";
import "../styles/ImageCarousel.css";

const spacecraftData = [
  { imgSrc: "/images/spacecraft1.jpg", caption: "insert caption related to photo" },
  { imgSrc: "/images/spacecraft2.jpg", caption: "insert caption related to photo" },
  { imgSrc: "/images/spacecraft3.jpg", caption: "insert caption related to photo" },
  { imgSrc: "/images/spacecraft4.jpg", caption: "insert caption related to photo" },
  { imgSrc: "/images/spacecraft5.jpg", caption: "insert caption related to photo" }
];

const ImageCarousel: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? spacecraftData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === spacecraftData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="image-carousel">
      <button onClick={handlePrev} className="carousel-button">{"<"}</button>
      
      <div className="image-carousel-container">
        <img
          src={spacecraftData[currentImageIndex].imgSrc}
          alt={spacecraftData[currentImageIndex].caption}
          className="image-carousel"
        />
        <p className="image-carousel-caption">{spacecraftData[currentImageIndex].caption}</p>
      </div>

      <button onClick={handleNext} className="carousel-button">{">"}</button>
    </div>
  );
};

export default ImageCarousel;
