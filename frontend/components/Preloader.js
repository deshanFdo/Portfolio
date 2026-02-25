"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Preloader.module.css";

const TERMINAL_MESSAGES = [
  { text: "SYSTEM_BOOT_SEQUENCE_INITIATED", delay: 0, type: "system" },
  { text: "Loading career credentials...", delay: 500, type: "loading" },
  { text: "Contacting Mercedes-AMG PETRONAS F1 Team...", delay: 1200, type: "loading" },
  { text: "REQUEST_DENIED: \"We already have enough engineers\"", delay: 2400, type: "error" },
  { text: "Contacting FIA Headquarters...", delay: 3200, type: "loading" },
  { text: "REQUEST_DENIED: \"We don\u2019t hire people who question our decisions\"", delay: 4400, type: "error" },
  { text: "Contacting Red Bull Racing...", delay: 5200, type: "loading" },
  { text: "REQUEST_DENIED: \"Position filled by someone with more energy drinks\"", delay: 6400, type: "error" },
  { text: "Contacting McLaren F1...", delay: 7200, type: "loading" },
  { text: "REQUEST_DENIED: \"Our papaya budget is maxed out\"", delay: 8200, type: "error" },
  { text: "Contacting Ferrari Scuderia...", delay: 9000, type: "loading" },
  { text: "REQUEST_DENIED: \"Our strategy team said no... then yes... then no\"", delay: 10200, type: "error" },
  { text: "ALL_REMOTE_HOSTS_REJECTED.", delay: 11200, type: "system" },
  { text: "Fine. Loading portfolio from localhost...", delay: 12000, type: "warning" },
  { text: "LOCALHOST_PORTFOLIO_LOADED \u2713", delay: 13000, type: "success" },
  { text: "Nobody wanted me anyway. Welcome to my portfolio \u2192", delay: 13800, type: "final" },
];

function Particle() {
  const [particleStyles] = useState(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: 3 + Math.random() * 2,
    delay: Math.random() * 2
  }));

  return (
    <motion.div
      className={styles.particle}
      style={{
        left: particleStyles.left,
        top: particleStyles.top,
        position: 'absolute',
        width: '3px',
        height: '3px',
        background: 'var(--petronas-teal)',
        borderRadius: '50%',
        boxShadow: '0 0 10px var(--petronas-teal)',
      }}
      animate={{
        y: [0, -100],
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration: particleStyles.duration,
        repeat: Infinity,
        delay: particleStyles.delay,
      }}
    />
  );
}

export default function Preloader({ onComplete }) {
  const [stage, setStage] = useState("loading");
  const [loadProgress, setLoadProgress] = useState(0);
  const [messages, setMessages] = useState([]);
  const [glitchActive, setGlitchActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [rejectionCount, setRejectionCount] = useState(0);
  const terminalRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEnter = useCallback(() => {
    if (stage === "ready") {
      setStage("exit");
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1200);
    }
  }, [stage, onComplete]);

  useEffect(() => {
    // Random glitch effect on logo
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.65) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 120);
      }
    }, 400);

    // Progress bar - paced to match the messages
    let progress = 0;
    const totalDuration = 14000;
    const progressInterval = setInterval(() => {
      progress += (100 / (totalDuration / 150));
      if (progress >= 100) {
        progress = 100;
        setLoadProgress(100);
        clearInterval(progressInterval);
      } else {
        setLoadProgress(Math.floor(progress));
      }
    }, 150);

    // Terminal messages
    const timeouts = TERMINAL_MESSAGES.map((msg) => {
      return setTimeout(() => {
        setMessages(prev => [...prev, msg]);
        if (msg.type === "error") {
          setRejectionCount(prev => prev + 1);
        }
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
        if (msg.type === "final") {
          setTimeout(() => setStage("ready"), 500);
        }
      }, msg.delay);
    });

    return () => {
      clearInterval(progressInterval);
      clearInterval(glitchInterval);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // Auto-enter after ready
  useEffect(() => {
    if (stage === "ready") {
      const autoEnter = setTimeout(() => {
        handleEnter();
      }, 4000);
      return () => clearTimeout(autoEnter);
    }
  }, [stage, handleEnter]);

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
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* Animated grid background */}
          <div className={styles.gridBackground} />

          {/* Curtain panels */}
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

          {/* Scanning line */}
          <motion.div
            className={styles.scanLine}
            animate={stage === "exit" ? { opacity: 0 } : { y: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Floating particles */}
          <div className={styles.particleField}>
            {mounted && Array.from({ length: 15 }).map((_, i) => (
              <Particle key={i} />
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
              <div className={styles.ringContainer}>
                <motion.div
                  className={`${styles.ring} ${styles.ringOuter}`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className={styles.ringContainer}>
                <motion.div
                  className={`${styles.ring} ${styles.ringMiddle}`}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className={styles.ringContainer}>
                <motion.div
                  className={`${styles.ring} ${styles.ringInner}`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>

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

              {/* Rejection counter */}
              {rejectionCount > 0 && (
                <motion.div
                  className={styles.rejectionCounter}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={rejectionCount}
                >
                  <span className={styles.rejectionLabel}>REJECTIONS</span>
                  <span className={styles.rejectionValue}>{rejectionCount}</span>
                </motion.div>
              )}
            </div>

            {/* Terminal section */}
            <div className={styles.terminal}>
              <div className={styles.terminalHeader}>
                <div className={styles.terminalDots}>
                  <span className={styles.terminalDot} style={{ background: '#EF4444' }}></span>
                  <span className={styles.terminalDot} style={{ background: '#F59E0B' }}></span>
                  <span className={styles.terminalDot} style={{ background: '#22C55E' }}></span>
                </div>
                <span className={styles.terminalTitle}>deshan@portfolio ~ career-applications</span>
                <span className={styles.terminalStatus}>
                  <span className={styles.statusPulse}></span>
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
                    <span className={styles.terminalTime}>
                      [{new Date().toLocaleTimeString('en-US', { hour12: false })}]
                    </span>
                    <span className={styles.terminalPrefix}>
                      {msg.type === "error" ? "\u2717" : msg.type === "success" ? "\u2713" : "$"}
                    </span>
                    <span className={styles.terminalText}>
                      {msg.text}
                      {msg.type === "loading" && (
                        <span className={styles.cursor}>...</span>
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
              <span className={styles.progressValue}>{loadProgress}%</span>
            </div>

            {/* Enter prompt */}
            <AnimatePresence>
              {stage === "ready" && (
                <motion.div
                  className={styles.readyIndicator}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    {"[ CLICK ANYWHERE TO ENTER... they can\u2019t reject that ]"}
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Corner decorations */}
          <div className={`${styles.corner} ${styles.cornerTL}`}>
            <span>GRID.INIT</span>
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
            <span>STATUS: {stage === "ready" ? "LOCALLY HOSTED" : rejectionCount > 0 ? `${rejectionCount} REJECTED` : "CONTACTING..."}</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
