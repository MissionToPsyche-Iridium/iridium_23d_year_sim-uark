export default function InteractiveSection() {
    return (
      <section
        style={{
          height: "400px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#222", // Dark background
          border: "2px solid #444",
        }}
      >
        <div
          style={{
            width: "90%",
            height: "90%",
            backgroundColor: "#555",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "1.5rem",
          }}
        >
          Interactive Content Goes Here
        </div>
      </section>
    );
  }  