export default function SplitSection() {
    return (
      <section
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "500px",
        }}
      >
        {/* Left: Cards Section */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#333",
            padding: "20px",
            borderRight: "2px solid #444",
            color: "white",
          }}
        >
          <h2>Deck of Cards</h2>
          {/* Placeholder for cards */}
        </div>
  
        {/* Right: Image Section */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#444",
            padding: "20px",
            color: "white",
          }}
        >
          <h2>Image Section</h2>
          {/* Placeholder for the image */}
        </div>
      </section>
    );
  }
  