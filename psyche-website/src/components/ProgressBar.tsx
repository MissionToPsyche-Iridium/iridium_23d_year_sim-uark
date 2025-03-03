
"use client";

import React, { useEffect, useState } from "react";
import "../styles/ProgressBar.css";

interface Age {
  years: number;
  days: number;
}

interface Milestone {
  year: number;
  label: string;
  icon: string;
}

interface ProgressBarProps {
  age: Age | null;
  milestones?: Milestone[];
}

const defaultMilestones: Milestone[] = [
  { year: 1, label: "Baby Star", icon: "🌟" },
  { year: 2, label: "Becoming an Astronaut", icon: "👨‍🚀" },
  { year: 3, label: "Rocket Launch", icon: "🚀" },
  { year: 4, label: "Orbiting a Planet", icon:"🪐" },
  { year: 5, label: "Exploring the Cosmos", icon: "🌌" 
  },
];

const ProgressBar: React.FC<ProgressBarProps> = ({ age, milestones = defaultMilestones }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (age) {
      const maxAge = 50;
      const calculatedProgress = Math.min((age.years / maxAge) * 100, 100);
      setProgress(0);

      setTimeout(() => {
        setProgress(calculatedProgress);
      }, 200);
    }
  }, [age]);

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div className="meteor" style={{ left: `${progress}%` }}>☄️</div>

        {milestones.map((milestone) => (
          age && age.years >= milestone.year ? (
            <div
              key={milestone.year}
              className={`milestone ${age.years >= milestone.year ? 'visible' : ''}`}
              style={{ left: `${(milestone.year / 50) * 100}%` }}
            >
              {milestone.icon}
              <div className="milestone-label">{milestone.label}</div>
            </div>
          ) : null
        ))}
      </div>

      <div className="milestone-icons">
        {milestones.map((milestone) => (
          <div key={milestone.year} className="milestone-icon">
            {milestone.icon}
            <div className="milestone-label">{milestone.label}</div>
          </div>
        ))}
      </div>

      {/* <div className="age-text">
        <p>
          You are {age?.years} Psyche years, {age?.days} days, {age?.minutes} minutes, and {age?.seconds} seconds old!
        </p>
      </div> */}
    </div>
  );
};

export default ProgressBar;
