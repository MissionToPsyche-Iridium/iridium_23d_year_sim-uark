"use client";

import Link from "next/link";
import "../../styles/FeatureSection.css";

export default function Home() {
  return (
    <section className="feature-section">
      <div className="widget welcome-widget">
        <h2 className="widget-title">🌌 Click to view a model comparing the sizes of the Earth, Mars, Moon, and Ceres to Psyche.</h2>
        <Link href="/compare">
          <button className="launch-button">
            🌔 Planetary Size Comparison
          </button>
        </Link>
      </div>
      <div className="widget welcome-widget">
        <h2 className="widget-title">🌌 Click to view an animation showcasing the Psyche spacecraft from liftoff to its destination.</h2>
        <Link href="/animation">
          <button className="launch-button">
            🚀 Flight Path Animation
          </button>
        </Link>
      </div>
      <div className="widget welcome-widget">
        <h2 className="widget-title">🌌 Click to view the orbital model.</h2>
        <Link href="/orbit">
          <button className="launch-button">
            🛰️ Psyche Spacecraft Orbital Model
          </button>
        </Link>
      </div>
    </section>
  );
}
