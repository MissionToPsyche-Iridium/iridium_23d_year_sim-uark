import React, { useState } from "react";
import "../styles/TemperatureSlider.css";

const spaceTempDescriptions = [
  { temp: -340, description: "This is the coldest it gets on Psyche and Earth. It would be around -340°F on the dark side of Psyche and the coldest record temperature on Earth was -133°F in Antarctica" },
  { temp: -220, description: "This is still pretty cold for Earth but it is only a standard day for Psyche. These temperatures would be around where the Sun barely hits the asteroid." },
  { temp: -100, description: "This is about as hot as it gets for Psyche and Earth. This would happen when the Sun is directly above you on the asteroid." },
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

  const { description } = getDescription(temperature);
  const fillColor = getTempColor(temperature);

  return (
    <div
        className="temperature-slider-container"
        style={{
            background: `radial-gradient(circle at center, ${fillColor}, #000)`,
            transition: "background 0.8s ease-in-out"
        }}
>      
      <h1 className="slider-title">Psyche Temperature vs. Earth Temperature</h1>
      
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
        <h2>{temperature}°F on Psyche {Math.floor(((temperature + 220) / 120) * 134)}°F on Earth</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default TemperatureSlider;
