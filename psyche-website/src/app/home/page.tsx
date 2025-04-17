"use client";

import Link from "next/link";
import "../../styles/FeatureSection.css";

export default function Home() {
  return (
    <section className="feature-section">
      <div className="widget welcome-widget">
        <h2 className="widget-title">🌌 Welcome to Year of Psyche</h2>
        <Link href="/home/compare">
          <button className="launch-button">
            🚀 Launch Comparison
          </button>
        </Link>
      </div>
    </section>
  );
}
