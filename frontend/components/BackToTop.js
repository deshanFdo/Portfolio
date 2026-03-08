"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./BackToTop.module.css";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const radius = 23;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - progress * circumference;
  const depth = progress < 0.33 ? "shallow" : progress < 0.66 ? "mid" : "deep";

  useEffect(() => {
    const handleScroll = () => {
      const viewport = window.innerHeight;
      const maxScroll = Math.max(document.documentElement.scrollHeight - viewport, 1);
      setVisible(window.scrollY > 480);
      setProgress(Math.min(window.scrollY / maxScroll, 1));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className={styles.button}
          data-depth={depth}
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.92 }}
          transition={{ duration: 0.2 }}
          whileHover={{ y: -3, scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Back to top"
        >
          <span className={styles.orbit} />
          <svg className={styles.progressRing} viewBox="0 0 56 56" aria-hidden="true">
            <circle className={styles.ringTrack} cx="28" cy="28" r={radius} />
            <circle
              className={styles.ringProgress}
              cx="28"
              cy="28"
              r={radius}
              style={{ strokeDasharray: circumference, strokeDashoffset: dashOffset }}
            />
          </svg>
          <span className={styles.iconWrap}>
            <span className={styles.icon}>↑</span>
          </span>
          <span className={styles.labelWrap}>
            <span className={styles.labelKicker}>
              {depth === "deep" ? "Return" : depth === "mid" ? "Climb" : "Jump"}
            </span>
            <span className={styles.label}>
              {depth === "deep" ? "Top Locked" : depth === "mid" ? "Move Up" : "Back To Top"}
            </span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}