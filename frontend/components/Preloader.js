"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NorrisText from "./NorrisText";
import styles from "./Preloader.module.css";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setReady(true), 500);
          return 100;
        }
        return p + Math.random() * 20;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (ready) {
      setExiting(true);
      setTimeout(() => onComplete?.(), 800);
    }
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className={styles.preloader}
          onClick={handleClick}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.content}>
            {/* Initials with Norris effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <NorrisText text="DF" fontSize="clamp(6rem, 20vw, 12rem)" />
            </motion.div>

            {/* Progress */}
            <motion.div 
              className={styles.progress}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className={styles.bar}>
                <motion.div
                  className={styles.fill}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <span className={styles.percent}>{Math.min(Math.floor(progress), 100)}%</span>
            </motion.div>

            {/* Enter prompt */}
            {ready && (
              <motion.p
                className={styles.prompt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Click to enter
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
