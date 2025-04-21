export const metadata = {
    title: "Psyche Mission Flight Path Animation",
    description: "Explore the flight path of the Psyche mission in a 3D scene.",
  };
  
  export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div style={{ background: "black", color: "white", minHeight: "100vh" }}>
        {children}
      </div>
    );
  }