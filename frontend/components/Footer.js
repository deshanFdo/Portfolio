"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/deshanFdo", icon: "🐙" },
    { name: "LinkedIn", href: "https://linkedin.com/in/DeshanFdo31", icon: "💼" },
    { name: "Email", href: "mailto:deshanfernando67@gmail.com", icon: "📧" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.topBorder} />
      
      <div className={styles.inner}>
        <div className={styles.content}>
          {/* Logo & tagline */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoText}>DF</span>
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
              <li><a href="#projects">Projects</a></li>
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
          <p>© {currentYear} Deshan Fernando. All rights reserved.</p>
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
