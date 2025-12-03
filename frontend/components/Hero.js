"use client";
import React from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.content}>
        <h1 className={styles.title}><span className={styles.wave}>👋</span> Your Name</h1>
        <p className={styles.subtitle}>Building delightful experiences on the web.</p>
        <div className={styles.ctaRow}>
          <a href="#projects" className={`${styles.cta} ${styles.primary}`}>View Projects</a>
          <a href="#contact" className={`${styles.cta} ${styles.secondary}`}>Contact Me</a>
        </div>
      </div>
      <div className={styles.orb} aria-hidden="true" />
    </section>
  );
}
