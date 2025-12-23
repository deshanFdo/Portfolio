"use client";
import React from "react";
import { motion } from "framer-motion";
import NorrisText from "./NorrisText";
import styles from "./Hero.module.css";

export default function Hero() {
  const fullName = process.env.NEXT_PUBLIC_FULL_NAME || "Deshan Fernando";
  const firstName = fullName.split(" ")[0]?.toUpperCase() || "DESHAN";
  const lastName = fullName.split(" ").slice(1).join(" ").toUpperCase() || "FERNANDO";
  const jobTitle = process.env.NEXT_PUBLIC_JOB_TITLE || "Software Engineer";

  return (
    <section className={styles.hero} id="home">
      <div className={styles.content}>
        {/* Name with Norris effect */}
        <motion.div 
          className={styles.nameBlock}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <a href="#about" className={styles.nameLink}>
            <NorrisText text={firstName} fontSize="clamp(4rem, 18vw, 14rem)" />
          </a>
          <a href="#about" className={styles.nameLink}>
            <NorrisText text={lastName} fontSize="clamp(3rem, 12vw, 10rem)" />
          </a>
        </motion.div>

        {/* Role */}
        <motion.p 
          className={styles.role}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {jobTitle}
        </motion.p>

        {/* CTA with Norris effect */}
        <motion.div 
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <a href="#projects" className={styles.ctaLink}>
            <NorrisText text="View Work" fontSize="1.2rem" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className={styles.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div 
          className={styles.scrollLine}
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
