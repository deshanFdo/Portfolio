"use client";
import React from "react";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.inner}>
        <h2 className={styles.h2}>About</h2>
        <p className={styles.lead}>Short intro goes here. Keep it concise and friendly.</p>
        <div className={styles.grid}>
          <div className={styles.card}><h3>What I Do</h3><p>Frontend, backend, and cloud-native apps.</p></div>
          <div className={styles.card}><h3>How I Work</h3><p>Pragmatic, collaborative, and quality-focused.</p></div>
          <div className={styles.card}><h3>What I Love</h3><p>Design systems, performance, and DX.</p></div>
        </div>
      </div>
    </section>
  );
}
