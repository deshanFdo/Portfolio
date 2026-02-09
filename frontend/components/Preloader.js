"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Preloader.module.css";

const FUNNY_MESSAGES = [
  { text: "Initializing neural interface...", delay: 0 },
  { text: "Connecting to satellite uplink...", delay: 600, isLoading: true },
  { text: "SIGNAL_LOST - Rerouting through Mars...", delay: 1200, isError: true },
  { text: "Elon: 'Not my satellites' 🚀", delay: 1800, isError: true },
  { text: "Hacking into mainframe...", delay: 2400, isLoading: true },
  { text: "Firewall detected. Deploying countermeasures...", delay: 3000 },
  { text: "ACCESS_GRANTED ✓", delay: 3600, isSuccess: true },
  { text: "Loading creative assets...", delay: 4200, isLoading: true },
  { text: "Calibrating awesome levels...", delay: 4800 },
  { text: "SYSTEM_READY 🎯", delay: 5400, isSuccess: true },
  { text: "LAUNCHING EXPERIENCE →", delay: 6000, isSuccess: true, isFinal: true },
];

export default function Preloader({ onComplete }) {
  const [stage, setStage] = useState("loading");
  const [loadProgress, setLoadProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const terminalRef = useRef(null);

  useEffect(() => {
    // Random glitch effect on logo
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }
    }, 500);

    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 6 + 2;
      if (progress >= 100) {
        progress = 100;
        setLoadProgress(100);
        clearInterval(progressInterval);
      } else {
        setLoadProgress(Math.floor(progress));
      }
    }, 250);

    const messageTimeouts = FUNNY_MESSAGES.map((msg, i) => {
      return setTimeout(() => {
        setMessageIndex(i);
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
        if (i === FUNNY_MESSAGES.length - 1) {
          setTimeout(() => setStage("ready"), 400);
        }
      }, msg.delay);
    });

    return () => {
      clearInterval(progressInterval);
      clearInterval(glitchInterval);
      messageTimeouts.forEach(t => clearTimeout(t));
    };
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
          className={styles.preloader}
          onClick={handleEnter}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.2, 
            filter: "blur(30px) brightness(2)",
          }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Animated grid background */}
          <div className={styles.gridBackground} />
          
          {/* Scanning line effect */}
          <motion.div 
            className={styles.scanLine}
            animate={{ y: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Floating particles */}
          <div className={styles.particleField}>
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className={styles.particle}
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%",
                  opacity: 0 
                }}
                animate={{ 
                  y: [null, "-20%"],
                  opacity: [0, 0.6, 0],
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Main content - two column layout */}
          <div className={styles.content}>
            {/* Left side - Logo with multiple rings */}
            <div className={styles.logoSection}>
              {/* Outer ring - slow */}
              <div className={styles.ringContainer}>
                <motion.div 
                  className={`${styles.ring} ${styles.ringOuter}`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </div>
              
              {/* Middle ring - medium */}
              <div className={styles.ringContainer}>
                <motion.div 
                  className={`${styles.ring} ${styles.ringMiddle}`}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
              </div>
              
              {/* Inner ring - fast */}
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
                    "0 0 30px rgba(0, 210, 190, 0.4)",
                    "0 0 60px rgba(0, 210, 190, 0.8)",
                    "0 0 30px rgba(0, 210, 190, 0.4)",
                  ]
                } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                DF
              </motion.span>
              
              {/* Progress below logo */}
              <div className={styles.progressContainer}>
                <div className={styles.progressTrack}>
                  <motion.div 
                    className={styles.progressFill}
                    animate={{ width: `${loadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className={styles.progressGlow}
                    animate={{ width: `${loadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className={styles.progressValue}>{loadProgress}%</span>
              </div>
            </div>

            {/* Right side - Terminal */}
            <div className={styles.terminalSection}>
              <div className={styles.terminal}>
                <div className={styles.terminalHeader}>
                  <div className={styles.terminalDots}>
                    <span className={styles.terminalDot} style={{ background: "#EF4444" }} />
                    <span className={styles.terminalDot} style={{ background: "#F59E0B" }} />
                    <span className={styles.terminalDot} style={{ background: "#22C55E" }} />
                  </div>
                  <span className={styles.terminalTitle}>system.log</span>
                  <div className={styles.terminalStatus}>
                    <motion.span 
                      className={styles.statusPulse}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span>LIVE</span>
                  </div>
                </div>
                <div className={styles.terminalBody} ref={terminalRef}>
                  {FUNNY_MESSAGES.slice(0, messageIndex + 1).map((msg, i) => (
                    <motion.div 
                      key={i}
                      className={`${styles.terminalLine} ${msg.isError ? styles.error : ''} ${msg.isSuccess ? styles.success : ''} ${msg.isLoading ? styles.loading : ''}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className={styles.terminalTime}>
                        {new Date().toLocaleTimeString('en-US', { hour12: false })}
                      </span>
                      <span className={styles.terminalPrefix}>
                        {msg.isError ? "✗" : msg.isSuccess ? "✓" : msg.isLoading ? "◌" : ">"}
                      </span>
                      <span className={styles.terminalText}>
                        {msg.text}
                        {msg.isLoading && i === messageIndex && (
                          <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >...</motion.span>
                        )}
                      </span>
                    </motion.div>
                  ))}
                  <span className={styles.cursor}>▌</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ready indicator - bottom center */}
          <AnimatePresence>
            {stage === "ready" && (
              <motion.div
                className={styles.readyIndicator}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <div className={styles.pulseRingOuter} />
                <div className={styles.pulseRing} />
                <motion.span
                  animate={{ 
                    opacity: [1, 0.5, 1],
                    letterSpacing: ["0.2em", "0.3em", "0.2em"]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  TAP ANYWHERE TO ENTER
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Corners with animated borders */}
          <div className={`${styles.corner} ${styles.topLeft}`}>
            <span className={styles.cornerLine} />
            <span>SYS://INIT</span>
          </div>
          <div className={`${styles.corner} ${styles.topRight}`}>
            <span>v2.0.25</span>
            <span className={styles.cornerLine} />
          </div>
          <div className={`${styles.corner} ${styles.bottomLeft}`}>
            <span className={styles.cornerLineV} />
            <span>DESHAN.DEV</span>
          </div>
          <div className={`${styles.corner} ${styles.bottomRight}`}>
            <span>LOCAL_MODE</span>
            <span className={styles.cornerLineV} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
