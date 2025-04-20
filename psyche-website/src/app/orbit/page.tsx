"use client";

import Link from "next/link";
// import OrbitPhaseExplorer from "@/components/Orbit/PsycheOrbit";
import OrbitPhaseExplorer from "@/components/PsycheOrbit";

export default function Page() {
  return (
    <main style={{ padding: "40px" }}>
      <Link href="/" scroll={true} style={{ color: "white", textDecoration: "underline", marginBottom: "20px", display: "inline-block" }}>
        ← Back to Home
      </Link>

      <h1 style={{ color: "white", fontSize: "2rem", marginBottom: "20px" }}>
        🪐 Psyche vs Earth: Rotation Comparison
      </h1>

      <OrbitPhaseExplorer />
    </main>
  );
}