"use client";

// import Link from "next/link";
import MarbleSim from "@/components/MarbleSimulation";

export default function Page() {
    return (
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <MarbleSim />
      </div>
    );
  }