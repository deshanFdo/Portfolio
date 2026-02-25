"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.nav 
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className={styles.inner}>
        {/* Logo */}
        <a href="#home" className={styles.logo}>
          <span className={styles.logoText}>DF</span>
          <span className={styles.logoDot}></span>
        </a>

        {/* Desktop links */}
        <ul className={styles.links}>
          {navLinks.map((link, i) => (
            <motion.li 
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (i * 0.05) }}
            >
              <a href={link.href}>{link.label}</a>
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <motion.a 
          href="#contact" 
          className={styles.cta}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          Let&apos;s Talk
        </motion.a>

        {/* Mobile toggle */}
        <button 
          className={`${styles.toggle} ${mobileOpen ? styles.open : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div 
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileOpen : ""}`}
        initial={false}
        animate={mobileOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
        transition={{ duration: 0.3 }}
      >
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a 
                href={link.href}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.nav>
  );
}
