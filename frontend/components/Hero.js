"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Hero.module.css";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Use environment variables with fallbacks
  const fullName = process.env.NEXT_PUBLIC_FULL_NAME || "Your Name";
  const firstName = fullName.split(" ")[0]?.toUpperCase() || "FIRST";
  const lastName = fullName.split(" ").slice(1).join(" ").toUpperCase() || "LAST";
  const jobTitle = process.env.NEXT_PUBLIC_JOB_TITLE || "Software Engineer";
  const company = process.env.NEXT_PUBLIC_COMPANY || "Company";
  const email = process.env.NEXT_PUBLIC_EMAIL || "#";
  const github = process.env.NEXT_PUBLIC_GITHUB_URL || "#";
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL || "#";

  return (
    <section className={styles.hero} id="home" ref={containerRef}>
      {/* Animated grid lines */}
      <div className={styles.gridOverlay}>
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className={styles.gridLine}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </div>

      <motion.div 
        className={styles.content}
        style={{ y, opacity, scale }}
      >
        {/* Status badge */}
        <motion.div 
          className={styles.statusBadge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className={styles.statusDot} />
          <span>Available for Opportunities</span>
        </motion.div>

        {/* Main heading with glitch */}
        <motion.div 
          className={styles.headingContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h1 className={styles.greeting}>Hello, I'm</h1>
          <h2 className={styles.name} data-text={firstName}>
            <span className={styles.nameFirst}>{firstName}</span>
            <span className={styles.nameLast}>{lastName}</span>
          </h2>
        </motion.div>

        {/* Role with typewriter effect */}
        <motion.div 
          className={styles.roleContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <span className={styles.rolePrefix}>{"<"}</span>
          <span className={styles.role}>{jobTitle}</span>
          <span className={styles.rolePrefix}>{" />"}</span>
        </motion.div>

        {/* Company badge */}
        <motion.div 
          className={styles.companyBadge}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className={styles.atSymbol}>@</span>
          <span>{company}</span>
        </motion.div>

        {/* Description */}
        <motion.p 
          className={styles.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          Building scalable full-stack applications with React, Node.js & MySQL.
          <br />
          Transforming complex problems into elegant solutions.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          className={styles.ctaContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <a href="#projects" className={styles.ctaPrimary}>
            <span>View Projects</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#contact" className={styles.ctaSecondary}>
            <span>Get in Touch</span>
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div 
          className={styles.socials}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <a href={github} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            GitHub
          </a>
          <span className={styles.socialDivider}>/</span>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            LinkedIn
          </a>
          <span className={styles.socialDivider}>/</span>
          <a href={`mailto:${email}`} className={styles.socialLink}>
            Email
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className={styles.scrollLine} />
        <span>Scroll to explore</span>
      </motion.div>

      {/* Decorative elements */}
      <div className={styles.decorLeft}>
        <span>SOFT_ENG</span>
        <span>2024.25</span>
      </div>
      <div className={styles.decorRight}>
        <span>COLOMBO</span>
        <span>SRI_LANKA</span>
      </div>
    </section>
  );
}
