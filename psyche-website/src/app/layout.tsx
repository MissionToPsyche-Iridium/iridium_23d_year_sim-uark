export const metadata = {
  title: "Year of Psyche",
  description:
    "An interactive website to deliver information to users through text and clickable elements",
};

// Import global layout styling
import "../styles/layout.css";

// Import the reusable components
import InteractiveSection from "../components/InteractiveSection";
import SplitSection from "../components/SplitSection";
import FeatureSection from "../components/FeatureSection";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat+Brush&family=Jost:wght@300&family=Oregano:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="body">
        {/* Header / Title Section */}
        <header className="header">
          <h1>YEAR OF PSYCHE</h1>
          {/* Container for layered header waves */}
          <div className="header-waves">
            {/* Wave 1: viewBox 0 0 1440 320, fill "#4c106a" */}
            <div className="wave wave1">
              <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path
                  fill="#4c106a"
                  d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,80C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>
            {/* Wave 2: viewBox 0 0 1440 340, fill "#310945" */}
            <div className="wave wave2">
              <svg viewBox="0 0 1440 340" preserveAspectRatio="none">
                <path
                  fill="#310945"
                  d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,80C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,340L1392,340C1344,340,1248,340,1152,340C1056,340,960,340,864,340C768,340,672,340,576,340C480,340,384,340,288,340C192,340,96,340,48,340L0,340Z"
                ></path>
              </svg>
            </div>
            {/* Wave 3: viewBox 0 0 1440 360, fill "#160827" */}
            <div className="wave wave3">
              <svg viewBox="0 0 1440 360" preserveAspectRatio="none">
                <path
                  fill="#160827"
                  d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,80C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,360L1392,360C1344,360,1248,360,1152,360C1056,360,960,360,864,360C768,360,672,360,576,360C480,360,384,360,288,360C192,360,96,360,48,360L0,360Z"
                ></path>
              </svg>
            </div>
          </div>
        </header>

        {/* Main Content Sections */}
        <InteractiveSection />
        <SplitSection />
        <FeatureSection />

        {children}
      </body>
    </html>
  );
}
