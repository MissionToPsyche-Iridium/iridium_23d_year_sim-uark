export const metadata = {
    title: "Year of Psyche",
    description: "An interactive website to deliver information to users through text and clickable elements", // Update description?
  };
  
  // Import any reusable components here
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
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Caveat+Brush&family=Jost:wght@300&family=Oregano:ital@0;1&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          style={{
            margin: 0,
            padding: 0,           
            backgroundColor: "black",
            color: "white",
            fontFamily: "'Caveat Brush', sans-serif",
          }}
        >
          {/* Heading Section */}
          <header
            style={{
              textAlign: "center",
              padding: "10px",
              margin: 0,
              fontSize: "calc(10px + 2vmin)",
            }}
          >
            <h1 style={{ margin: 0, padding: 0, lineHeight: "1.2" }}>YEAR OF PSYCHE</h1>
          </header>
  
          {/* Interactive Section */}
          <InteractiveSection />
  
          {/* Split Screen Section */}
          <SplitSection />
  
          {/* Full-Width Feature Section */}
          <FeatureSection />
  
          {/* Render children (optional, for nested components/pages) */}
          {children}
        </body>
      </html>
    );
  }
  