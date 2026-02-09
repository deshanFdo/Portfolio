"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Preloader.module.css";

const TERMINAL_MESSAGES = [
  { text: "SYSTEM_BOOT_SEQUENCE_INITIATED", delay: 0, type: "system" },
  { text: "Loading core modules...", delay: 400, type: "loading" },
  { text: "Establishing secure connection", delay: 800, type: "loading" },
  { text: "CONNECTION_ESTABLISHED ✓", delay: 1200, type: "success" },
  { text: "Initializing visual interface...", delay: 1600, type: "loading" },
  { text: "Compiling creative assets...", delay: 2000, type: "loading" },
  { text: "CREATIVE_ENGINE_ONLINE ✓", delay: 2400, type: "success" },
  { text: "Calibrating experience parameters", delay: 2800, type: "loading" },
  { text: "ALL_SYSTEMS_NOMINAL ✓", delay: 3200, type: "success" },
  { text: "READY_TO_LAUNCH →", delay: 3600, type: "final" },
];

export default function Preloader({ onComplete }) {
  const [stage, setStage] = useState("loading");
  const [loadProgress, setLoadProgress] = useState(0);
  const [messages, setMessages] = useState([]);
  const [glitchActive, setGlitchActive] = useState(false);
  const terminalRef = useRef(null);

  useEffect(() => {
    // Random glitch effect on logo
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.75) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 100);
      }
    }, 400);

    // Progress bar
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 8 + 3;
      if (progress >= 100) {
        progress = 100;
        setLoadProgress(100);
        clearInterval(progressInterval);
      } else {
        setLoadProgress(Math.floor(progress));
      }
    }, 200);

    // Terminal messages
    TERMINAL_MESSAGES.forEach((msg, i) => {
      setTimeout(() => {
        setMessages(prev => [...prev, msg]);
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
        if (msg.type === "final") {
          setTimeout(() => setStage("ready"), 300);
        }
      }, msg.delay);
    });

    return () => {
      clearInterval(progressInterval);
      clearInterval(glitchInterval);
    };
  }, []);

  const handleEnter = () => {
    if (stage === "ready") {
      setStage("exit");
      // Trigger the curtain exit
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1200); // Match animation duration
    }
  };

  // Auto-enter after ready state
  useEffect(() => {
    if (stage === "ready") {
      const autoEnter = setTimeout(() => {
        handleEnter();
      }, 800);
      return () => clearTimeout(autoEnter);
    }
  }, [stage]);

  return (
    <AnimatePresence mode="wait">
      {stage !== "hidden" && (
        <motion.div
          className={styles.preloader}
          onClick={handleEnter}
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          }}
          transition={{
            duration: 1.2,
            ease: [0.76, 0, 0.24, 1], // Expo ease
          }}
        >
          {/* Animated grid background */}
          <div className={styles.gridBackground} />

          {/* Curtain panels for dramatic reveal */}
          <motion.div
            className={styles.curtainLeft}
            animate={stage === "exit" ? { x: "-100%" } : { x: "0%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className={styles.curtainRight}
            animate={stage === "exit" ? { x: "100%" } : { x: "0%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Scanning line effect */}
          <motion.div
            className={styles.scanLine}
            animate={stage === "exit" ? { opacity: 0 } : { y: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Floating particles */}
          <div className={styles.particleField}>
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className={styles.particle}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <motion.div
            className={styles.content}
            animate={stage === "exit" ? {
              scale: 1.1,
              opacity: 0,
              filter: "blur(10px)"
            } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Logo section with rotating rings */}
            <div className={styles.logoSection}>
              {/* Ring 1 - Outer */}
              <div className={styles.ringContainer}>
                <motion.div
                  className={`${styles.ring} ${styles.ringOuter}`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Ring 2 - Middle */}
              <div className={styles.ringContainer}>
                <motion.div
                  className={`${styles.ring} ${styles.ringMiddle}`}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Ring 3 - Inner */}
              <div className={styles.ringContainer}>
                <motion.div
                  className={`${styles.ring} ${styles.ringInner}`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Logo with glitch effect */}
              <motion.span
                className={`${styles.logo} ${glitchActive ? styles.glitchActive : ''}`}
                data-text="DF"
                animate={stage === "ready" ? {
                  textShadow: [
                    "0 0 20px rgba(0, 210, 190, 0.5)",
                    "0 0 60px rgba(0, 210, 190, 0.8)",
                    "0 0 20px rgba(0, 210, 190, 0.5)",
                  ]
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                DF
              </motion.span>
            </div>

            {/* Terminal section */}
            <div className={styles.terminal}>
              <div className={styles.terminalHeader}>
                <div className={styles.terminalDots}>
                  <span className={styles.dotRed}></span>
                  <span className={styles.dotYellow}></span>
                  <span className={styles.dotGreen}></span>
                </div>
                <span className={styles.terminalTitle}>deshan@portfolio ~ system</span>
                <span className={styles.liveStatus}>
                  <span className={styles.liveDot}></span>
                  LIVE
                </span>
              </div>

              <div className={styles.terminalBody} ref={terminalRef}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    className={`${styles.terminalLine} ${styles[msg.type]}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className={styles.timestamp}>
                      [{new Date().toLocaleTimeString('en-US', { hour12: false })}]
                    </span>
                    <span className={styles.prompt}>$</span>
                    <span className={styles.message}>
                      {msg.text}
                      {msg.type === "loading" && (
                        <span className={styles.loadingDots}>...</span>
                      )}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className={styles.progressContainer}>
              <div className={styles.progressTrack}>
                <motion.div
                  className={styles.progressFill}
                  initial={{ width: "0%" }}
                  animate={{ width: `${loadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className={styles.progressText}>{loadProgress}%</span>
            </div>

            {/* Enter prompt */}
            <AnimatePresence>
              {stage === "ready" && (
                <motion.div
                  className={styles.enterPrompt}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    [ CLICK TO ENTER ]
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Corner decorations */}
          <div className={`${styles.corner} ${styles.cornerTL}`}>
            <span>SYS.BOOT</span>
            <span>v2.0.1</span>
          </div>
          <div className={`${styles.corner} ${styles.cornerTR}`}>
            <span>DESHAN.DEV</span>
            <span>SRI LANKA</span>
          </div>
          <div className={`${styles.corner} ${styles.cornerBL}`}>
            <span>LAT 6.9271°</span>
            <span>LON 79.8612°</span>
          </div>
          <div className={`${styles.corner} ${styles.cornerBR}`}>
            <span>STATUS: {stage === "ready" ? "READY" : "LOADING"}</span>
            <span>© 2024</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
