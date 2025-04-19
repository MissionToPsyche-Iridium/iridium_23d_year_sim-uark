"use client";

import Link from "next/link";
import CompareScene from "@/components/CompareScene";

export default function ComparePage() {
  return (
    <main style={{ padding: "40px" }}>
      <Link href="/" scroll={true} style={{ color: "white", textDecoration: "underline", marginBottom: "20px", display: "inline-block" }}>
        ← Back to Home
      </Link>

      <h1 style={{ color: "white", fontSize: "2rem", marginBottom: "20px" }}>
        🪐 Psyche vs Earth: Rotation Comparison
      </h1>

      <CompareScene />
    </main>
  );
}
