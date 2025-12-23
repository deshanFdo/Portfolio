"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./About.module.css";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "5+", label: "Projects Shipped" },
    { value: "3+", label: "Years Learning" },
    { value: "10+", label: "Technologies" },
    { value: "∞", label: "Coffee Cups" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className={styles.about} id="about" ref={ref}>
      <div className={styles.inner}>
        {/* Section header */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionNumber}>01</span>
          <h2 className={styles.title}>ABOUT_ME</h2>
          <div className={styles.titleLine} />
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Profile card */}
          <motion.div className={styles.profileCard} variants={itemVariants}>
            <div className={styles.imageContainer}>
              {/* Placeholder for profile image */}
              <div className={styles.imagePlaceholder}>
                <span className={styles.initials}>DF</span>
                <div className={styles.imageGlow} />
              </div>
              <div className={styles.imageFrame} />
            </div>
            
            <div className={styles.profileInfo}>
              <h3 className={styles.profileName}>Deshan Fernando</h3>
              <p className={styles.profileRole}>Software Engineer Intern</p>
              <div className={styles.locationBadge}>
                <span>📍</span>
                <span>Colombo, Sri Lanka</span>
              </div>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
              {stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  className={styles.statItem}
                  whileHover={{ scale: 1.05, borderColor: "var(--petronas-teal)" }}
                >
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bio content */}
          <motion.div className={styles.bioContent} variants={itemVariants}>
            <div className={styles.bioSection}>
              <h4 className={styles.bioTitle}>
                <span className={styles.bioIcon}>{">"}</span>
                whoami
              </h4>
              <p className={styles.bioText}>
                Results-oriented Computer Science undergraduate at the University of Westminster 
                with proven expertise in building scalable full-stack applications. Currently 
                interning at Sri Lanka Telecom, where I architect high-performance systems 
                and solve complex architectural challenges.
              </p>
            </div>

            <div className={styles.bioSection}>
              <h4 className={styles.bioTitle}>
                <span className={styles.bioIcon}>{">"}</span>
                what_i_do
              </h4>
              <p className={styles.bioText}>
                I specialize in React, Node.js, and MySQL — crafting seamless user experiences 
                and robust backend systems. From data isolation mechanisms to performance 
                optimization, I deliver production-ready solutions.
              </p>
            </div>

            <div className={styles.bioSection}>
              <h4 className={styles.bioTitle}>
                <span className={styles.bioIcon}>{">"}</span>
                achievements
              </h4>
              <ul className={styles.achievementList}>
                <li>
                  <span className={styles.achieveIcon}>🏆</span>
                  Top 10 Finalist - IEEE Xtreme Encode (Region 10)
                </li>
                <li>
                  <span className={styles.achieveIcon}>🎓</span>
                  Foundation Certificate - Distinction
                </li>
                <li>
                  <span className={styles.achieveIcon}>📜</span>
                  Postman API Fundamentals Student Expert
                </li>
              </ul>
            </div>

            {/* Download CV button */}
            <motion.a 
              href="#" 
              className={styles.downloadBtn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Download CV</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
