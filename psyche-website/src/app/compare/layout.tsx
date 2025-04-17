export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "black", minHeight: "100vh", margin: 0 }}>
      {children}
    </div>
  );
}