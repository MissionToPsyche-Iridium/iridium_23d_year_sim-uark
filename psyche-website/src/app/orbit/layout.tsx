export const metadata = {
    title: "Psyche Mission Orbit",
    description: "Explore the orbit of Psyche around the Sun.",
  };
  
  export default function CompareLayout({ children }: { children: React.ReactNode }) {
    return (
      <div style={{ background: "black", color: "white", minHeight: "100vh" }}>
        {children}
      </div>
    );
  }