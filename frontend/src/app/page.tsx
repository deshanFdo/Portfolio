"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import TileGrid from "../../components/TileGrid";
import Preloader from "../../components/Preloader";

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      <div style={{ position: "fixed", width: "100vw", height: "100vh", overflow: "hidden" }}>
        <Navbar />
        <TileGrid />
        {/* Portfolio content goes here */}
      </div>
    </>
  );
}
