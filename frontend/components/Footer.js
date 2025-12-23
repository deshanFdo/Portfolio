"use client";
import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: "GitHub", icon: "🐙", href: "#" },
    { name: "LinkedIn", icon: "💼", href: "#" },
    { name: "Twitter", icon: "🐦", href: "#" },
    { name: "Email", icon: "📧", href: "mailto:your@email.com" },
  ];

  return (
    <footer className={styles.footer}>
      {/* Top border accent */}
      <div className={styles.topBorder}></div>
      
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Brand section */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>🏎️</span>
              <span className={styles.logoText}>YN</span>
            </div>
            <p className={styles.tagline}>
              Building high-performance digital experiences.
            </p>
          </div>
          
          {/* Quick links */}
          <div className={styles.linksSection}>
            <h4 className={styles.linksTitle}>Quick Links</h4>
            <nav className={styles.links}>
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
          
          {/* Social links */}
          <div className={styles.socialSection}>
            <h4 className={styles.linksTitle}>Connect</h4>
            <div className={styles.socials}>
              {socialLinks.map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  className={styles.socialLink}
                  aria-label={social.name}
                >
                  <span className={styles.socialIcon}>{social.icon}</span>
                  <span className={styles.socialName}>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Your Name. Built with Next.js & passion.
          </p>
          <div className={styles.madeWith}>
            <span>Made with</span>
            <span className={styles.heart}>🧡</span>
            <span>and lots of</span>
            <span className={styles.coffee}>☕</span>
          </div>
        </div>
      </div>
      
      {/* Checkered flag pattern */}
      <div className={styles.checkered} aria-hidden="true"></div>
    </footer>
  );
}
