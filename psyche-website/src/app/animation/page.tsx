"use client";

import Link from "next/link";
import LaunchScene from '@/components/LaunchScene';

export default function Page() {
  return (
    <div style={{ width: '100%', height: '100vh', background: 'black' }}>
      <main style={{ padding: "40px" }}>
      <Link href="/" scroll={true} style={{ color: "white", textDecoration: "underline", marginBottom: "20px", display: "inline-block" }}>
        ← Back to Home
      </Link>

      <h1 style={{ color: "white", fontSize: "2rem", marginBottom: "20px" }}>
        Psyche Mission Flight Path Animation
      </h1>

      <LaunchScene />
    </main>
    </div>
  );
}