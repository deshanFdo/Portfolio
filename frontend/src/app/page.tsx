"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "../../components/Navbar";
import Preloader from "../../components/Preloader";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Skills from "../../components/Skills";
import Projects from "../../components/Projects";
import Experience from "../../components/Experience";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";

// Dynamic import for 3D scene to avoid SSR issues
const Scene3D = dynamic(() => import("../../components/Scene3D"), {
  ssr: false,
  loading: () => <div style={{ position: "fixed", inset: 0, background: "#000" }} />
});

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Custom cursor - only on desktop */}
      {mounted && typeof window !== "undefined" && window.innerWidth > 768 && (
        <CustomCursor />
      )}

      {/* Preloader */}
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* Main content */}
      <main style={{ position: "relative", minHeight: "100vh" }}>
        {/* 3D Background */}
        {mounted && !showPreloader && <Scene3D />}

        {/* Content layer */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </div>
      </main>

      {/* Noise overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0.02,
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />
    </>
  );
}
