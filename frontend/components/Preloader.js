"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Preloader.module.css";

const FUNNY_MESSAGES = [
  { text: "Establishing connection to NASA servers...", delay: 0 },
  { text: "ACCESS DENIED - Clearance Level: Insufficient", delay: 800, isError: true },
  { text: "Trying SpaceX backup satellites...", delay: 1600 },
  { text: "Elon says no. Rude.", delay: 2200, isError: true },
  { text: "Hacking into Area 51 mainframe...", delay: 3000 },
  { text: "FBI has entered the chat 👀", delay: 3600, isError: true },
  { text: "Fine, loading from local storage...", delay: 4400 },
  { text: "Found some coffee and snacks ☕", delay: 5000 },
  { text: "Portfolio data located!", delay: 5600, isSuccess: true },
  { text: "READY TO LAUNCH 🚀", delay: 6200, isSuccess: true },
];

export default function Preloader({ onComplete }) {
  const [stage, setStage] = useState("loading");
  const [loadProgress, setLoadProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const terminalRef = useRef(null);

  useEffect(() => {
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 8;
      if (progress >= 100) {
        progress = 100;
        setLoadProgress(100);
        clearInterval(progressInterval);
      } else {
        setLoadProgress(Math.floor(progress));
      }
    }, 300);

    const messageTimeouts = FUNNY_MESSAGES.map((msg, i) => {
      return setTimeout(() => {
        setMessageIndex(i);
        // Auto-scroll terminal
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
        if (i === FUNNY_MESSAGES.length - 1) {
          setTimeout(() => setStage("ready"), 500);
        }
      }, msg.delay);
    });

    return () => {
      clearInterval(progressInterval);
      messageTimeouts.forEach(t => clearTimeout(t));
    };
  }, []);

  const handleEnter = () => {
    if (stage === "ready") {
      setStage("exit");
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 800);
    }
  };

  return (
    <AnimatePresence>
      {stage !== "hidden" && (
        <motion.div
          className={styles.preloader}
          onClick={handleEnter}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Grid background */}
          <div className={styles.gridBackground} />

          {/* Main content - two column layout */}
          <div className={styles.content}>
            {/* Left side - Logo */}
            <div className={styles.logoSection}>
              <div className={styles.ringContainer}>
                <motion.div 
                  className={styles.ring}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <span className={styles.logo}>DF</span>
              
              {/* Progress below logo */}
              <div className={styles.progressContainer}>
                <div className={styles.progressTrack}>
                  <motion.div 
                    className={styles.progressFill}
                    animate={{ width: `${loadProgress}%` }}
                  />
                </div>
                <span className={styles.progressValue}>{loadProgress}%</span>
              </div>
            </div>

            {/* Right side - Terminal */}
            <div className={styles.terminalSection}>
              <div className={styles.terminal}>
                <div className={styles.terminalHeader}>
                  <span className={styles.terminalDot} style={{ background: "#EF4444" }} />
                  <span className={styles.terminalDot} style={{ background: "#F59E0B" }} />
                  <span className={styles.terminalDot} style={{ background: "#22C55E" }} />
                  <span className={styles.terminalTitle}>system.log</span>
                </div>
                <div className={styles.terminalBody} ref={terminalRef}>
                  {FUNNY_MESSAGES.slice(0, messageIndex + 1).map((msg, i) => (
                    <motion.div 
                      key={i}
                      className={`${styles.terminalLine} ${msg.isError ? styles.error : ''} ${msg.isSuccess ? styles.success : ''}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <span className={styles.terminalPrefix}>
                        {msg.isError ? "✗" : msg.isSuccess ? "✓" : ">"}
                      </span>
                      <span>{msg.text}</span>
                    </motion.div>
                  ))}
                  <span className={styles.cursor}>▌</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ready indicator - bottom center */}
          {stage === "ready" && (
            <motion.div
              className={styles.readyIndicator}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={styles.pulseRing} />
              <span>TAP ANYWHERE TO ENTER</span>
            </motion.div>
          )}

          {/* Corners */}
          <div className={`${styles.corner} ${styles.topLeft}`}>SYS://INIT</div>
          <div className={`${styles.corner} ${styles.topRight}`}>v2.0.25</div>
          <div className={`${styles.corner} ${styles.bottomLeft}`}>DESHAN.DEV</div>
          <div className={`${styles.corner} ${styles.bottomRight}`}>LOCAL_MODE</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
