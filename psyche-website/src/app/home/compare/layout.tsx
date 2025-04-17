export const metadata = {
  title: "Psyche vs Earth Comparison",
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body style={{ margin: 0, background: "black", color: "white" }}>
        {children}
      </body>
    </html>
  );
}