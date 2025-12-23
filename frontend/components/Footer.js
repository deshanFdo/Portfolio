"use client";
import React from "react";
import NorrisText from "./NorrisText";
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
          <a href="#home" className={styles.logo}>
            <NorrisText text="DF" fontSize="1.5rem" />
          </a>

          <div className={styles.links}>
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              <NorrisText text="LinkedIn" fontSize="0.85rem" />
            </a>
            <a href={github} target="_blank" rel="noopener noreferrer">
              <NorrisText text="GitHub" fontSize="0.85rem" />
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {year} {name}</p>
        </div>
      </div>
    </footer>
  );
}
