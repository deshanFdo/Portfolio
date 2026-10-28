"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";
import ErrorBoundary from "../../components/ErrorBoundary";
import Preloader from "../../components/Preloader";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Skills from "../../components/Skills";
import Projects from "../../components/Projects";
import Experience from "../../components/Experience";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import BackToTop from "../../components/BackToTop";
import F1Divider from "../../components/F1Divider";

const SpaceBackground = dynamic(() => import("../../components/SpaceBackground"), { ssr: false });
const AmbientEffects = dynamic(() => import("../../components/AmbientEffects"), { ssr: false });
const MiniGame = dynamic(() => import("../../components/MiniGame"), { ssr: false });

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [effectsReady, setEffectsReady] = useState(false);
  const [enhancedMotion, setEnhancedMotion] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setShowIntro(true);
    const query = window.matchMedia("(min-width: 1025px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnhancedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    // Decorative work waits until after the first content paint.
    const timer = window.setTimeout(() => setEffectsReady(true), 1200);
    return () => {
      query.removeEventListener("change", update);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        {showIntro && <Preloader onComplete={() => setShowIntro(false)} />}
        <a className="skip-link" href="#projects">Skip to projects</a>
        <main inert={showIntro} style={{ position: "relative", minHeight: "100vh" }}>
          {effectsReady && enhancedMotion && <><SpaceBackground /><AmbientEffects /></>}
          <div style={{ position: "relative", zIndex: 10 }}>
            <Navbar />
            <Hero />
            <F1Divider />
            <About />
            <F1Divider flip />
            <Skills />
            <F1Divider />
            <Projects />
            <F1Divider flip />
            <Experience />
            <F1Divider />
            <Contact />
            <Footer />
          </div>
          <BackToTop />
          {effectsReady && <MiniGame />}
        </main>
      </MotionConfig>
    </ErrorBoundary>
  );
}
