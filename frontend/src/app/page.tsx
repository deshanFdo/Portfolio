"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "../../components/Navbar";
import Preloader from "../../components/Preloader";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Projects from "../../components/Projects";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";

const CustomCursor = dynamic(() => import("../../components/CustomCursor"), { ssr: false });

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDesktop(window.innerWidth > 768);
  }, []);

  return (
    <>
      {mounted && isDesktop && <CustomCursor />}

      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* Background layers */}
      <div className="topo-bg" />
      <div className="vignette-overlay" />

      {/* Content */}
      <main>
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
