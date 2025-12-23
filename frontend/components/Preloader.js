"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Preloader.module.css";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simple smooth loading
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsReady(true), 300);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    if (isReady && !isExiting) {
      setIsExiting(true);
      setTimeout(() => onComplete?.(), 600);
    }
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className={styles.preloader}
          onClick={handleEnter}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Centered content */}
          <div className={styles.content}>
            {/* Name with signature style */}
            <motion.div
              className={styles.nameContainer}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className={styles.firstName}>DESHAN</span>
              <span className={styles.lastName}>Fernando</span>
            </motion.div>

            {/* Progress bar */}
            <div className={styles.progressContainer}>
              <div className={styles.progressTrack}>
                <motion.div
                  className={styles.progressFill}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <span className={styles.progressText}>
                {Math.min(Math.floor(progress), 100)}%
              </span>
            </div>

            {/* Enter prompt */}
            {isReady && (
              <motion.p
                className={styles.enterPrompt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Click anywhere to enter
              </motion.p>
            )}
          </div>

          {/* Corner signature */}
          <div className={styles.signature}>DF</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
