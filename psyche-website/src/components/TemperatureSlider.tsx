import React, { useState } from "react";
import "../styles/TemperatureSlider.css";

const spaceTempDescriptions = [
  { temp: -340, label: "Psyche Temperature vs. Earth Temperature", description: "Near absolute zero. Background radiation of space." },
  { temp: -220, label: "Psyche Temperature vs. Earth Temperature", description: "Extremely cold shadow side of Psyche." },
  { temp: -100, label: "Psyche Temperature vs. Earth Temperature", description: "Still too cold for humans, but getting warmer." },
];

const getDescription = (temp: number) => {
  return spaceTempDescriptions.reduce((prev, curr) =>
    Math.abs(curr.temp - temp) < Math.abs(prev.temp - temp) ? curr : prev
  );
};

// Interpolate color from temperature
const getTempColor = (temp: number) => {
  const percent = (temp + 340) / (240); // Normalize to 0–1

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
  const [temperature, setTemperature] = useState(-220);

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
        min={-340}
        max={-100}
        value={temperature}
        step={1}
        onChange={(e) => setTemperature(Number(e.target.value))}
        className="thermometer-slider"
        style={{
          background: `linear-gradient(to right, ${fillColor}, #000)`,
        }}
      />
      <div className="temperature-readout">
        <h2>{temperature}°F on Psyche {temperature + 207}°F on Earth</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default TemperatureSlider;
