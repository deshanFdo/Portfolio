"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import NorrisText from "./NorrisText";
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
        {/* Header with Norris effect */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.label}>About</span>
          <a href="#about">
            <NorrisText text="Who I Am" fontSize="clamp(2.5rem, 8vw, 5rem)" />
          </a>
        </motion.div>

        <div className={styles.grid}>
          {/* Image */}
          <motion.div
            className={styles.imageWrap}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.image}>
              <span>{fullName.split(" ").map(n => n[0]).join("")}</span>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            className={styles.bio}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p>
              Results-oriented Computer Science undergraduate with expertise in 
              building scalable full-stack applications.
            </p>
            <p>
              {company && `Currently at ${company}, `}
              I specialize in React, Node.js, and modern web technologies — 
              crafting seamless experiences from concept to deployment.
            </p>

            <div className={styles.details}>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Location</span>
                <span className={styles.detailValue}>{location}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Role</span>
                <span className={styles.detailValue}>{jobTitle}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
