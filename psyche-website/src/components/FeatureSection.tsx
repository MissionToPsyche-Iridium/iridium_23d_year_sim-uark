import "../styles/FeatureSection.css";

import Link from "next/link";

export default function FeatureSection() {
  return (
    <section className="feature-section">
      <div>
        <div className="button-container">
          <Link href="/other-resources" className="button-link header-title">
            <h1>Resources</h1>
          </Link>
        </div>
        <div>
          <h1 className="header-title">Development Team</h1>
          <div className="button-container">
            <a className="credit-item">Vishal Jeyam</a>
            <a className="credit-item">Amber Morton</a>
            <a className="credit-item">Magaret Pedro Milne</a>
            <a className="credit-item">Jacob Round</a>
            <a className="credit-item">Cassie Smith</a>
            <a className="credit-item">Lei Taylor</a>
          </div>
        </div>
      </div>
      {/* Disclaimer Section */}
      <div className="disclaimer-section">
        <p>
          This work was created in partial fulfillment of The University of Arkansas Course “CSCE 49603″. The work is a result of the Psyche Student Collaborations component of NASA’s Psyche Mission (https://psyche.asu.edu). “Psyche: A Journey to a Metal World” [Contract number NNM16AA09C] is part of the NASA Discovery Program mission to solar system targets. Trade names and trademarks of ASU and NASA are used in this work for identification only. Their usage does not constitute an official endorsement, either expressed or implied, by Arizona State University or National Aeronautics and Space Administration. The content is solely the responsibility of the authors and does not necessarily represent the official views of ASU or NASA.
        </p>
      </div>
    </section>
  );
}