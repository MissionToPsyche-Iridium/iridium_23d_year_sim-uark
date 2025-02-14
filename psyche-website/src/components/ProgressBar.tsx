"use client";

import React, {useEffect, useState} from "react";
import "../styles/ProgressBar.css";

interface ProgressBarProps {
  age: { years: number; days: number } | null;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ age }) => {
  //if (!age) return null;
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

//   const maxAge = 100;
//   const progress = Math.min((age.years / maxAge) * 100, 100);

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div className="meteor" style={{ left: `${progress}%` }}>
        ☄️
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
