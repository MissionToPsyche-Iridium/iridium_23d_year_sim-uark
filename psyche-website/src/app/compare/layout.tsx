export const metadata = {
  title: "Psyche vs Earth Comparison",
  description: "Compare the rotation of Psyche and Earth in a 3D scene.",
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "black", color: "white", minHeight: "100vh" }}>
      {children}
    </div>
  );
}