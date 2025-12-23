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

// Dynamic imports for client-only components
const Scene3D = dynamic(() => import("../../components/Scene3D"), { ssr: false });
const CustomCursor = dynamic(() => import("../../components/CustomCursor"), { ssr: false });
const MiniGame = dynamic(() => import("../../components/MiniGame"), { ssr: false });

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDesktop(window.innerWidth > 768);

    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Custom cursor - desktop only */}
      {mounted && isDesktop && <CustomCursor />}

      {/* Preloader */}
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* Main content */}
      <main style={{ position: "relative", minHeight: "100vh" }}>
        {/* 3D Particle Background */}
        {mounted && !showPreloader && <Scene3D />}

        {/* Content */}
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

        {/* Snake Game */}
        {mounted && !showPreloader && <MiniGame />}
      </main>
    </>
  );
}
