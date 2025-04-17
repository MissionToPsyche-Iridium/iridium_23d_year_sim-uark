import "../styles/layout.css";
import LayoutContent from "../components/LayoutContent";

export const metadata = {
  title: "Year of Psyche",
  description: "An interactive website to deliver information through text and clickable elements",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="body">
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}