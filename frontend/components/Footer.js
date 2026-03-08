"use client";
import React from "react";
import styles from "./Footer.module.css";
import NorrisText from "./NorrisText";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Use environment variables or hardcoded details
  const github = process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/deshanFdo";
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/DeshanFdo31";
  const email = process.env.NEXT_PUBLIC_EMAIL || "deshanfernando67@gmail.com";
  const fullName = process.env.NEXT_PUBLIC_FULL_NAME || "Deshan Fernando";
  const firstName = fullName.split(" ")[0]?.toUpperCase() || "DESHAN";
  const lastName = fullName.split(" ").slice(1).join(" ").toUpperCase() || "FERNANDO";

  const socialLinks = [
    { name: "GitHub", href: github, icon: "🐙" },
    { name: "LinkedIn", href: linkedin, icon: "💼" },
    { name: "Email", href: `mailto:${email}`, icon: "📧" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.topBorder} />

      <div className={styles.inner}>
        <div className={styles.content}>
          {/* Logo & tagline */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <div className={styles.logoTextWrap}>
                <NorrisText
                  text={firstName}
                  className={styles.logoText}
                  charClassName={styles.logoChar}
                />
                <NorrisText
                  text={lastName}
                  className={styles.logoTextSecondary}
                  charClassName={styles.logoSecondaryChar}
                />
              </div>
              <span className={styles.logoDot} />
            </div>
            <p className={styles.tagline}>
              Building the future, one line of code at a time.
            </p>
          </div>

          {/* Quick links */}
          <div className={styles.linksSection}>
            <h4>Navigation</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Socials */}
          <div className={styles.linksSection}>
            <h4>Connect</h4>
            <ul className={styles.socials}>
              {socialLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <span>{link.icon}</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <p className={styles.copyright} suppressHydrationWarning>
            <span>© {currentYear}</span>
            <NorrisText
              text={fullName.toUpperCase()}
              className={styles.copyrightName}
              charClassName={styles.copyrightChar}
            />
            <span>All rights reserved.</span>
          </p>
          <p className={styles.made}>
            Made with <span className={styles.heart}>💚</span> in Sri Lanka
          </p>
        </div>
      </div>

      {/* Scanlines effect */}
      <div className={styles.scanlines} />
    </footer>
  );
}
