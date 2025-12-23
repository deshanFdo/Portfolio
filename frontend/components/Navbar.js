"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Work" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <motion.nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <a href="#home" className={styles.logo}>
          <span className={styles.logoText}>DF</span>
        </a>

        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <button
          className={`${styles.menuBtn} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>
      </motion.nav>

      {/* Full-screen menu */}
      <motion.div
        className={styles.fullMenu}
        initial={false}
        animate={menuOpen ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
      >
        <ul>
          {links.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, x: -50 }}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: i * 0.1 }}
            >
              <a href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </>
  );
}
