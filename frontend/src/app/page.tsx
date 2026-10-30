"use client";
import { useCallback, useEffect, useState } from "react";
import { Barlow_Condensed } from "next/font/google";
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
import styles from "./mercedes.module.css";

const racing = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700"], style: ["normal", "italic"], variable: "--font-mercedes" });

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const finishIntro = useCallback(() => { setShowIntro(false); setReady(true); }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(preference.matches);
    if (preference.matches) setReady(true);
    else setShowIntro(true);
    const change = () => setReducedMotion(preference.matches);
    preference.addEventListener("change", change);
    return () => preference.removeEventListener("change", change);
  }, []);

  return <ErrorBoundary><MotionConfig reducedMotion="user">
    <div className={`${styles.mercedes} ${racing.variable}`}>
      {showIntro && <Preloader onComplete={finishIntro} />}
      <a className="skip-link" href="#projects">Skip to projects</a>
      <main>
        <Navbar />
        <Hero ready={ready} reducedMotion={reducedMotion} />
        <F1Divider />
        <About />
        <Skills />
        <F1Divider flip />
        <Projects />
        <Experience />
        <F1Divider />
        <Contact />
        <Footer onReplay={() => setShowIntro(true)} reducedMotion={reducedMotion} />
        <BackToTop />
      </main>
    </div>
  </MotionConfig></ErrorBoundary>;
}
