"use client";
import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  const name = process.env.NEXT_PUBLIC_FULL_NAME || "Deshan Fernando";
  const github = process.env.NEXT_PUBLIC_GITHUB_URL || "#";
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL || "#";

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>DF</span>
            <span className={styles.tagline}>Building digital experiences.</span>
          </div>

          <div className={styles.socials}>
            <a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {year} {name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
