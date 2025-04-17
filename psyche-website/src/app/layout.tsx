"use client";

import { usePathname } from 'next/navigation';
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isComparePage = pathname.startsWith("/compare");

  return (
    <html lang="en">
      <body className="body" style={isComparePage ? { margin: 0, background: "black", color: "white" } : {}}>
        {children}
      </body>
    </html>
  );
}