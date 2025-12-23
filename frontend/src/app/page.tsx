"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Preloader from "../../components/Preloader";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Projects from "../../components/Projects";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* Vignette */}
      <div className="vignette" />

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
