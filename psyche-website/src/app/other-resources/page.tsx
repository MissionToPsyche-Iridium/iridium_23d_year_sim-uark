import "../../styles/FeatureSection.css";

import Link from "next/link";

export default function OtherResources() {
  return (
    <section className="other-resources-section">
      <h1 className="header-title">Other Resources</h1>
      <div className="button-container">
        <a
          href="https://psyche.asu.edu/mission/faq/"
          target="_blank"
          rel="noopener noreferrer"
          className="button-link"
        >
          Psyche FAQ
        </a>
        <a
          href="https://www.jpl.nasa.gov/press-kits/psyche/quick-facts/"
          target="_blank"
          rel="noopener noreferrer"
          className="button-link"
        >
          Quick Facts
        </a>
        <a
          href="https://psyche.asu.edu/mission/the-asteroid/"
          target="_blank"
          rel="noopener noreferrer"
          className="button-link"
        >
          The Asteroid
        </a>
        <a
          href="https://psyche.asu.edu/mission/launch/"
          target="_blank"
          rel="noopener noreferrer"
          className="button-link"
        >
          The Launch
        </a>
      </div>
      <div className="button-container">
      <a
          href="https://psyche.asu.edu/mission/the-spacecraft/"
          target="_blank"
          rel="noopener noreferrer"
          className="button-link"
        >
          The Spacecraft
        </a>
        <a
          href="https://science.nasa.gov/mission/psyche/spacecraft/"
          target="_blank"
          rel="noopener noreferrer"
          className="button-link"
        >
          Psyche Spacecraft
        </a>
        <a
          href="https://dataverse.jpl.nasa.gov/dataset.xhtml?persistentId=hdl:2014/51698"
          target="_blank"
          rel="noopener noreferrer"
          className="button-link"
        >
          JPL Open Repository: Spacecraft
        </a>
      </div>
      <div>
        <Link href="/home" className="button-link">
          Back to Home
        </Link>
      </div>
    </section>
  );
}