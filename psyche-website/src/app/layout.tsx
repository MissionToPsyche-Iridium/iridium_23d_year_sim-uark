/**
 * This is the main layout file for the Year of Psyche website. It sets up the
 * overall structure of the page, including the header with a starry background,
 * waves, and the main content sections. The layout is styled using CSS and
 * includes interactive elements like a 3D model viewer and feature sections.
 * 
 * This layout is designed to be responsive and visually appealing, with
 * a focus on delivering information about the Psyche mission in a simple,
 * engaging way. The header features a starry background with animated waves,
 * and the main content includes sections for interactive elements and features.
 */

import "../styles/layout.css";
import InteractiveSection from "../components/InteractiveSection";
import SplitSection from "../components/SplitSection";
import FeatureSection from "../components/FeatureSection";
import { CircleStar, DiamondStar } from "@/components/Star";

export const metadata = {
  title: "Year of Psyche",
  description: "An interactive website to deliver information to users through text and clickable elements",
};

/**
 * This is the main layout component for the Year of Psyche website.
 * It defines the global HTML structure including the header, animated
 * backgrounds (stars and waves), and main content sections.
 * 
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Child elements to be rendered within the layout.
 * @returns {JSX.Element} The complete HTML structure for the webpage.
 */
export default function RootLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="body">
        <header className="header">
          <h1>YEAR OF PSYCHE</h1>

          {/* 
            Star Field Layer:
            This section renders a field of animated stars using an SVG.
            It utilizes helper components such as CircleStar and DiamondStar
            to display stars with different shapes, positions, and sizes.
          */}
          <div className="header-stars">
            <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
              <g>
                {/* Circle Shaped Stars */}
                <CircleStar centerX={50} centerY={50} radius={2} className="star-svg" />
                <CircleStar centerX={150} centerY={100} radius={3} className="star-svg" />
                <CircleStar centerX={300} centerY={180} radius={1.5} className="star-svg" />
                <CircleStar centerX={500} centerY={70} radius={2} className="star-svg" />
                <CircleStar centerX={700} centerY={210} radius={2.5} className="star-svg" />
                <CircleStar centerX={900} centerY={40} radius={2} className="star-svg" />
                <CircleStar centerX={1150} centerY={110} radius={3} className="star-svg" />
                <CircleStar centerX={1300} centerY={160} radius={1.5} className="star-svg" />

                {/* Diamond Shaped Stars */}
                <DiamondStar centerX={200} centerY={130} width={10} height={20} className="diamond-star" />
                <DiamondStar centerX={1350} centerY={235} width={10} height={20} className="diamond-star" />
              </g>
            </svg>
          </div>

          {/* 
            Waves Container:
            This section creates a visual effect of animated waves at the bottom of the header.
            It contains three overlapping SVG wave layers, each with unique fill colors.
          */}
          <div className="header-waves">
            {/* Wave 1 */}
            <div className="wave wave1">
              <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path
                  fill="#160827"
                  d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,80C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                />
              </svg>
            </div>
            
            {/* Wave 2 */}
            <div className="wave wave2">
              <svg viewBox="0 0 1440 340" preserveAspectRatio="none">
                <path
                  fill="#310945"
                  d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,80C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,340L1392,340C1344,340,1248,340,1152,340C1056,340,960,340,864,340C768,340,672,340,576,340C480,340,384,340,288,340C192,340,96,340,48,340L0,340Z"
                />
              </svg>
            </div>
            
            {/* Wave 3 */}
            <div className="wave wave3">
              <svg viewBox="0 0 1440 360" preserveAspectRatio="none">
                <path
                  fill="#4c106a"
                  d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,80C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,360L1392,360C1344,360,1248,360,1152,360C1056,360,960,360,864,360C768,360,672,360,576,360C480,360,384,360,288,360C192,360,96,360,48,360L0,360Z"
                />
              </svg>
            </div>
          </div>
        </header>

        {/* Website Content */}
        <InteractiveSection />
        <SplitSection />
        <FeatureSection />

        {children}
      </body>
    </html>
  );
}