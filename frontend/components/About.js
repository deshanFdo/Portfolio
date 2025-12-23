"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./About.module.css";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const fullName = process.env.NEXT_PUBLIC_FULL_NAME || "Deshan Fernando";
  const location = process.env.NEXT_PUBLIC_LOCATION || "Sri Lanka";
  const jobTitle = process.env.NEXT_PUBLIC_JOB_TITLE || "Software Engineer";
  const company = process.env.NEXT_PUBLIC_COMPANY || "";

  return (
    <section className={styles.about} id="about" ref={ref}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Left - Image/Avatar */}
          <motion.div
            className={styles.imageSection}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.imageFrame}>
              <div className={styles.imagePlaceholder}>
                <span>{fullName.split(" ").map(n => n[0]).join("")}</span>
              </div>
            </div>
            <div className={styles.imageAccent} />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            className={styles.contentSection}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className={styles.sectionTitle}>
              <span className={styles.titleLabel}>About</span>
              <span className={styles.titleMain}>Me</span>
            </h2>

            <p className={styles.bio}>
              Results-oriented Computer Science undergraduate with expertise in 
              building scalable full-stack applications. Currently at {company || "the industry"}, 
              architecting high-performance systems and solving complex challenges.
            </p>

            <p className={styles.bio}>
              I specialize in React, Node.js, and modern web technologies — 
              crafting seamless experiences from concept to deployment.
            </p>

            <div className={styles.details}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Location</span>
                <span className={styles.detailValue}>{location}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Current Role</span>
                <span className={styles.detailValue}>{jobTitle}</span>
              </div>
            </div>

            <a href="#contact" className={styles.contactLink}>
              Get in Touch →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
