"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Preloader.module.css";

const TERMINAL_MESSAGES = [
  { text: "boot sequence initiated", type: "system", speed: 24, hold: 260 },
  { text: "loading candidate profile bundle...", type: "loading", speed: 18, hold: 220 },
  { text: "requesting remote runtime from careers.deshan.dev", type: "loading", speed: 18, hold: 260 },
  { text: "error 503: remote runtime unavailable", type: "error", speed: 16, hold: 380 },
  { text: "retrying with motion layer package...", type: "loading", speed: 18, hold: 220 },
  { text: "error 403: animation package rejected by gateway", type: "error", speed: 16, hold: 420 },
  { text: "falling back to localhost render pipeline", type: "warning", speed: 19, hold: 280 },
  { text: "injecting hero viewport...", type: "loading", speed: 18, hold: 180 },
  { text: "hero robot scene mounted", type: "success", speed: 20, hold: 180 },
  { text: "syncing scroll surfaces and ambient halo", type: "loading", speed: 18, hold: 180 },
  { text: "ui motion layer online", type: "success", speed: 20, hold: 160 },
  { text: "verifying final route /", type: "loading", speed: 18, hold: 200 },
  { text: "localhost portfolio loaded [ok]", type: "success", speed: 20, hold: 250 },
  { text: "opening portfolio viewport...", type: "final", speed: 22, hold: 500 },
];

const MESSAGE_PREFIX = {
  system: "[#]",
  loading: "$",
  success: "[OK]",
  error: "[X]",
  warning: "[! ]",
  final: ">",
};

function seededRandom(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

let particleCounter = 0;

function Particle() {
  const [particleStyles] = useState(() => {
    const id = particleCounter++;
    return {
      left: `${seededRandom(id * 4 + 1) * 100}%`,
      top: `${seededRandom(id * 4 + 2) * 100}%`,
      duration: 3 + seededRandom(id * 4 + 3) * 2,
      delay: seededRandom(id * 4 + 4) * 2
    };
  });

  return (
    <motion.div
      className={styles.particle}
      style={{
        left: particleStyles.left,
        top: particleStyles.top,
        position: 'absolute',
        width: '3px',
        height: '3px',
        background: 'var(--ferrari-blue)',
        borderRadius: '50%',
        boxShadow: '0 0 10px var(--ferrari-blue)',
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
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [rejectionCount, setRejectionCount] = useState(0);
  const terminalRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, [onComplete]);

  const beginExit = useCallback(() => {
    setStage((currentStage) => {
      if (currentStage === "exit") return currentStage;

      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1200);

      return "exit";
    });
  }, [onComplete]);

  useEffect(() => {
    // Random glitch effect on logo
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.65) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 120);
      }
    }, 400);

    return () => {
      clearInterval(glitchInterval);
    };
  }, []);

  useEffect(() => {
    const currentMessage = TERMINAL_MESSAGES[currentMessageIndex];
    if (!currentMessage || stage === "exit") return;

    const textLength = currentMessage.text.length;
    const normalizedProgress = (currentMessageIndex + Math.min(typedLength / Math.max(textLength, 1), 1)) / TERMINAL_MESSAGES.length;
    setLoadProgress(Math.min(100, Math.floor(normalizedProgress * 100)));

    if (typedLength < textLength) {
      const typeTimer = setTimeout(() => {
        setTypedLength((prev) => prev + 1);
      }, currentMessage.speed);
      return () => clearTimeout(typeTimer);
    }

    const commitTimer = setTimeout(() => {
      setMessages((prev) => {
        if (prev[prev.length - 1]?.text === currentMessage.text) return prev;
        return [...prev, currentMessage];
      });

      if (currentMessage.type === "error") {
        setRejectionCount((prev) => prev + 1);
      }

      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }

      if (currentMessageIndex === TERMINAL_MESSAGES.length - 1) {
        setLoadProgress(100);
        setTimeout(() => beginExit(), 280);
        return;
      }

      setCurrentMessageIndex((prev) => prev + 1);
      setTypedLength(0);
    }, currentMessage.hold);

    return () => clearTimeout(commitTimer);
  }, [beginExit, currentMessageIndex, typedLength, stage]);

  const activeMessage = TERMINAL_MESSAGES[currentMessageIndex];
  const typingText = activeMessage?.text.slice(0, typedLength) || "";

  return (
    <AnimatePresence mode="wait">
      {stage !== "hidden" && (
        <motion.div
          className={styles.preloader}
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
                    "0 0 20px rgba(136, 168, 255, 0.35)",
                    "0 0 60px rgba(122, 215, 240, 0.45)",
                    "0 0 20px rgba(136, 168, 255, 0.35)",
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
                    <span className={styles.terminalTime} suppressHydrationWarning>
                      [{new Date().toLocaleTimeString('en-US', { hour12: false })}]
                    </span>
                    <span className={styles.terminalPrefix}>
                      {MESSAGE_PREFIX[msg.type]}
                    </span>
                    <span className={styles.terminalText}>
                      {msg.text}
                    </span>
                  </motion.div>
                ))}

                {stage === "loading" && activeMessage && (
                  <div className={`${styles.terminalLine} ${styles[activeMessage.type]} ${styles.typingLine}`}>
                    <span className={styles.terminalTime} suppressHydrationWarning>
                      [{new Date().toLocaleTimeString('en-US', { hour12: false })}]
                    </span>
                    <span className={styles.terminalPrefix}>{MESSAGE_PREFIX[activeMessage.type]}</span>
                    <span className={styles.terminalText}>
                      {typingText}
                      <span className={styles.cursorBlock}>_</span>
                    </span>
                  </div>
                )}
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
            <span>STATUS: {stage === "exit" ? "LOCALLY HOSTED" : rejectionCount > 0 ? `${rejectionCount} REJECTED` : "CONTACTING..."}</span>
            <span suppressHydrationWarning>© {new Date().getFullYear()}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
