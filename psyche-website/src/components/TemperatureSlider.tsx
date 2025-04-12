import React, { useState } from "react";
import "../styles/TemperatureSlider.css";

const spaceTempDescriptions = [
  { temp: -270, label: "Deep Space", description: "Near absolute zero. Background radiation of space." },
  { temp: -150, label: "Asteroid Night Side", description: "Extremely cold shadow side of Psyche." },
  { temp: 0, label: "Freezing Point", description: "Still too cold for humans, but getting warmer." },
  { temp: 100, label: "Sunlit Asteroid", description: "Scorching heat from unfiltered sunlight." },
  { temp: 500, label: "Venus Surface", description: "Lead melts. Heat shields failing." },
  { temp: 1000, label: "Molten Metal", description: "Spacecraft materials vaporize!" },
];

const getDescription = (temp: number) => {
  return spaceTempDescriptions.reduce((prev, curr) =>
    Math.abs(curr.temp - temp) < Math.abs(prev.temp - temp) ? curr : prev
  );
};

// Interpolate color from temperature
const getTempColor = (temp: number) => {
  const percent = (temp + 270) / (1000 + 270); // Normalize to 0–1

  if (percent < 0.33) {
    // Cold: blue → cyan
    const blue = 255;
    const green = Math.round(255 * (percent / 0.33));
    return `rgb(0, ${green}, ${blue})`;
  } else if (percent < 0.66) {
    // Medium: cyan → orange
    const adj = (percent - 0.33) / 0.33;
    return `rgb(${Math.round(255 * adj)}, 255, 0)`;
  } else {
    // Hot: orange → red
    const adj = (percent - 0.66) / 0.34;
    return `rgb(255, ${Math.round(255 * (1 - adj))}, 0)`;
  }
};

const TemperatureSlider: React.FC = () => {
  const [temperature, setTemperature] = useState(-150);

  const { label, description } = getDescription(temperature);
  const fillColor = getTempColor(temperature);

  return (
    <div
        className="temperature-slider-container"
        style={{
            background: `radial-gradient(circle at center, ${fillColor}, #000)`,
            transition: "background 0.8s ease-in-out"
        }}
>
      <div className="slider-label">{label}</div>
      <input
        type="range"
        min={-270}
        max={1000}
        value={temperature}
        step={1}
        onChange={(e) => setTemperature(Number(e.target.value))}
        className="thermometer-slider"
        style={{
          background: `linear-gradient(to right, ${fillColor}, #000)`,
        }}
      />
      <div className="temperature-readout">
        <h2>{temperature}°C</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default TemperatureSlider;
