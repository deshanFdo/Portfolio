"use client";
import React from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="home">
      {/* Speed lines background effect */}
      <div className={styles.speedLines} aria-hidden="true">
        <div className={styles.speedLine}></div>
        <div className={styles.speedLine}></div>
        <div className={styles.speedLine}></div>
      </div>
      
      {/* Glowing orbs */}
      <div className={styles.orbPapaya} aria-hidden="true" />
      <div className={styles.orbBlue} aria-hidden="true" />
      
      <div className={styles.content}>
        {/* Driver number accent */}
        <div className={styles.driverNumber} aria-hidden="true">04</div>
        
        <div className={styles.greeting}>
          <span className={styles.flag}>🏁</span>
          <span className={styles.greetingText}>Welcome to my pit lane</span>
        </div>
        
        <h1 className={styles.title}>
          <span className={styles.firstName}>Your</span>
          <span className={styles.lastName}>Name</span>
        </h1>
        
        <p className={styles.subtitle}>
          <span className={styles.role}>Full-Stack Developer</span>
          <span className={styles.divider}>|</span>
          <span className={styles.tagline}>Building high-performance digital experiences</span>
        </p>
        
        <div className={styles.ctaRow}>
          <a href="#projects" className={styles.ctaPrimary}>
            <span className={styles.ctaIcon}>🏎️</span>
            View Projects
          </a>
          <a href="#contact" className={styles.ctaSecondary}>
            <span className={styles.ctaIcon}>📧</span>
            Get in Touch
          </a>
        </div>
        
        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollMouse}>
            <div className={styles.scrollWheel}></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
