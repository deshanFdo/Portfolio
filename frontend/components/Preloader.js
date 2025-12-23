"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Preloader.module.css";

export default function Preloader({ onComplete }) {
  const [stage, setStage] = useState("loading"); // loading -> ready -> exit
  const [loadProgress, setLoadProgress] = useState(0);
  const [glitchText, setGlitchText] = useState("INITIALIZING");
  const containerRef = useRef(null);

  // Simulated loading
  useEffect(() => {
    const glitchMessages = [
      "INITIALIZING",
      "LOADING ASSETS",
      "PREPARING ENGINE",
      "CALIBRATING SYSTEMS",
      "READY TO LAUNCH"
    ];

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        setLoadProgress(100);
        setGlitchText("CLICK TO ENTER");
        setStage("ready");
        clearInterval(interval);
      } else {
        setLoadProgress(Math.floor(progress));
        setGlitchText(glitchMessages[Math.floor(progress / 25)] || glitchMessages[0]);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    if (stage === "ready") {
      setStage("exit");
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1000);
    }
  };

  return (
    <AnimatePresence>
      {stage !== "hidden" && (
        <motion.div
          ref={containerRef}
          className={styles.preloader}
          onClick={handleEnter}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)"
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Grid lines background */}
          <div className={styles.gridBackground}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={`h-${i}`} className={styles.gridLineH} style={{ top: `${i * 5}%` }} />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={`v-${i}`} className={styles.gridLineV} style={{ left: `${i * 5}%` }} />
            ))}
          </div>

          {/* Central content */}
          <div className={styles.content}>
            {/* Rotating ring */}
            <div className={styles.ringContainer}>
              <motion.div 
                className={styles.ring}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className={styles.ringInner}
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Logo / Name */}
            <motion.div 
              className={styles.logoContainer}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <span className={styles.logo}>DF</span>
            </motion.div>

            {/* Glitch text */}
            <motion.p 
              className={styles.statusText}
              data-text={glitchText}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {glitchText}
            </motion.p>

            {/* Progress bar */}
            <div className={styles.progressContainer}>
              <div className={styles.progressTrack}>
                <motion.div 
                  className={styles.progressFill}
                  initial={{ width: 0 }}
                  animate={{ width: `${loadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className={styles.progressValue}>{loadProgress}%</span>
            </div>

            {/* Ready indicator */}
            {stage === "ready" && (
              <motion.div
                className={styles.readyIndicator}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring" }}
              >
                <div className={styles.pulseRing} />
                <span>TAP ANYWHERE</span>
              </motion.div>
            )}
          </div>

          {/* Corner decorations */}
          <div className={`${styles.corner} ${styles.topLeft}`}>
            <span>SYS://INIT</span>
          </div>
          <div className={`${styles.corner} ${styles.topRight}`}>
            <span>v2.0.25</span>
          </div>
          <div className={`${styles.corner} ${styles.bottomLeft}`}>
            <span>DESHAN.DEV</span>
          </div>
          <div className={`${styles.corner} ${styles.bottomRight}`}>
            <span>PETRONAS</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
