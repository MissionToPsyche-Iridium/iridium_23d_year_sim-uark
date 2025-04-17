"use client";

import { useEffect } from "react";
import CompareScene from "@/components/CompareScene";

export default function ComparePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ padding: "40px", background: "black", minHeight: "100vh" }}>
      <h1 style={{ color: "white", fontSize: "2rem", marginBottom: "20px" }}>
        🪐 Psyche vs Earth: Rotation Comparison
      </h1>
      <CompareScene />
    </main>
  );
}
