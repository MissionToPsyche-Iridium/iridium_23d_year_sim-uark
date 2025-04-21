"use client";

import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ImageCarousel.css";

const spacecraftData = [
  { imgSrc: "/images/spacecraft1.jpg", caption: "TESTINGTESTINGTESTINGTESTING" },
  { imgSrc: "/images/spacecraft2.jpg", caption: "insert caption related to photo" },
  { imgSrc: "/images/spacecraft3.jpg", caption: "insert caption related to photo" },
  { imgSrc: "/images/spacecraft4.jpg", caption: "insert caption related to photo" },
  { imgSrc: "/images/spacecraft5.jpg", caption: "insert caption related to photo" }
];

const ImageCarousel: React.FC = () => {
  return (
    <div className="image-carousel" style={{ width: "100%", maxWidth: "1400px", margin: "0 auto" }}>
      <Carousel fade interval={null} indicators={true} controls={true}>
        {spacecraftData.map((spacecraft, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={spacecraft.imgSrc}
              alt={spacecraft.caption}
              style={{
                height: "500px",
                objectFit: "cover",
                borderRadius: "20px",
                boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
              }}
            />
            {/* Caption placed below the image */}
            <div className="image-caption">
              <h5>{spacecraft.caption}</h5>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
