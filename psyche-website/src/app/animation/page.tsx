"use client";

import Link from "next/link";
import LaunchScene from '@/components/LaunchScene';
import { use } from "react";

export default function AnimationPage() {
  return (
    <div style={{ width: '100%', height: '100vh', background: 'black' }}>
      <main style={{ padding: "40px" }}>
      <Link href="/" scroll={true} style={{ color: "white", textDecoration: "underline", marginBottom: "20px", display: "inline-block" }}>
        ← Back to Home
      </Link>

      <h1 style={{ color: "white", fontSize: "2rem", marginBottom: "20px" }}>
        🪐 Psyche vs Earth: Rotation Comparison
      </h1>

      <LaunchScene />
    </main>
    </div>
  );
}