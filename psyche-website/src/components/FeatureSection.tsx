
import "../styles/FeatureSection.css";

export default function FeatureSection() {
  return (
    <section className="feature-section">
      <div>
        <h1 className="header-title">Citations</h1>
        <a
          href="https://psyche.asu.edu/mission/the-asteroid/"
          target="_blank"
          rel="noopener noreferrer"
          className="button-link"
        >
          The Asteroid
        </a>
        <a
          href="https://psyche.asu.edu/mission/the-spacecraft/"
          target="_blank"
          rel="noopener noreferrer"
          className="button-link"
        >
          The Spacecraft
        </a>
        <a
          href="https://psyche.asu.edu/mission/launch/"
          target="_blank"
          rel="noopener noreferrer"
          className="button-link"
        >
          The Launch
        </a>
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
      </div>
      {/* Disclaimer Section */}
      <div className="disclaimer-section">
        <p>
          This work was created in partial fulfillment of The University of Arkansas Course “CSCE 49603″. The work is a result of the Psyche Student Collaborations component of NASA’s Psyche Mission (https://psyche.asu.edu). “Psyche: A Journey to a Metal World” [Contract number NNM16AA09C] is part of the NASA Discovery Program mission to solar system targets. Trade names and trademarks of ASU and NASA are used in this work for identification only. Their usage does not constitute an official endorsement, either expressed or implied, by Arizona State University or National Aeronautics and Space Administration. The content is solely the responsibility of the authors and does not necessarily represent the official views of ASU or NASA.
        </p>
      </div>
    </section>
  );
}