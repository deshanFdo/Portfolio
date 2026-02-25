"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import styles from "./About.module.css";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Use environment variables or defaults from CV
  const fullName = process.env.NEXT_PUBLIC_FULL_NAME || "Deshan Fernando";
  const location = "Sri Lanka";
  const jobTitle = process.env.NEXT_PUBLIC_JOB_TITLE || "Software Engineer";

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
              {/* User Image - Place your image at public/images/profile.jpg */}
              <div className={styles.imagePlaceholder}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/profile.jpg`}
                  alt={fullName}
                  fill
                  className={styles.profileImage}
                  style={{ objectFit: 'cover', borderRadius: '50%' }}
                  priority
                  onError={(e) => {
                    // Fallback to placeholder if image not found
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.classList.add(styles.showInitials);
                  }}
                />
                <span className={styles.initials} style={{ position: 'absolute', zIndex: -1 }}>
                  {fullName.split(" ").map(n => n[0]).join("")}
                </span>
                <div className={styles.imageGlow} />
              </div>
              <div className={styles.imageFrame} />
            </div>

            <div className={styles.profileInfo}>
              <h3 className={styles.profileName}>{fullName}</h3>
              <p className={styles.profileRole}>{jobTitle}</p>
              <div className={styles.locationBadge}>
                <span>📍</span>
                <span>{location}</span>
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
                Detail-oriented software engineering undergraduate with hands-on experience in full-stack development,
                RESTful API design, secure authentication systems, and data-oriented application development.
                Strong foundation in backend engineering, frontend frameworks, databases, and Python-based data analysis.
              </p>
            </div>

            <div className={styles.bioSection}>
              <h4 className={styles.bioTitle}>
                <span className={styles.bioIcon}>{">"}</span>
                career_objective
              </h4>
              <p className={styles.bioText}>
                Seeking an internship opportunity to contribute to scalable enterprise systems while growing skills
                in software engineering and data-driven technologies.
              </p>
            </div>

            {/* Achievements section removed as requested */}

            {/* Download CV button */}
            <motion.a
              href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/Deshan_Fernando_CV.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.downloadBtn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Download CV</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
