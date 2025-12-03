"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import TileGrid from "../../components/TileGrid";
import Preloader from "../../components/Preloader";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Skills from "../../components/Skills";
import Projects from "../../components/Projects";
import Experience from "../../components/Experience";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <main>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      <TileGrid />
      <div style={{ position: "relative", zIndex: 10 }}>
        <Navbar />
        <div style={{ height: "64px" }} />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
