export const metadata = {
    title: "Exploring a New World of Metal",
    description: "Explore the Psyche mission and its unique metal-rich asteroid.",
  };
  
  export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div style={{ background: "black", color: "white", minHeight: "100vh" }}>
        {children}
      </div>
    );
  }