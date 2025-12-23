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

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const fullName = process.env.NEXT_PUBLIC_FULL_NAME || "Deshan Fernando";
  const firstName = fullName.split(" ")[0]?.toUpperCase() || "DESHAN";
  const lastName = fullName.split(" ").slice(1).join(" ") || "Fernando";
  const jobTitle = process.env.NEXT_PUBLIC_JOB_TITLE || "Software Engineer";

  return (
    <section className={styles.hero} id="home" ref={containerRef}>
      <motion.div className={styles.content} style={{ y, opacity }}>
        {/* Large signature name */}
        <div className={styles.nameWrapper}>
          <motion.h1
            className={styles.firstName}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {firstName}
          </motion.h1>
          <motion.span
            className={styles.lastName}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {lastName}
          </motion.span>
        </div>

        {/* Role */}
        <motion.p
          className={styles.role}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {jobTitle}
        </motion.p>

        {/* CTA */}
        <motion.div
          className={styles.ctaGroup}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <a href="#projects" className={styles.ctaPrimary}>
            View Work
          </a>
          <a href="#contact" className={styles.ctaSecondary}>
            Contact
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </motion.div>

      {/* Background signature */}
      <div className={styles.bgSignature}>DF</div>
    </section>
  );
}
