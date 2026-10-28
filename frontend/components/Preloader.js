"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Preloader.module.css";

const LINES = ["Hello, world.", "A little curiosity. A lot of code.", "Welcome to my portfolio."];

export default function Preloader({ onComplete }) {
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const complete = useRef(onComplete);
  const closing = useRef(false);
  const closeTimer = useRef(null);
  useEffect(() => { complete.current = onComplete; }, [onComplete]);

  const finish = () => {
    if (closing.current) return;
    closing.current = true;
    setLeaving(true);
    closeTimer.current = window.setTimeout(() => complete.current?.(), 350);
  };

  useEffect(() => {
    const first = window.setTimeout(() => setStep(1), 550);
    const second = window.setTimeout(() => setStep(2), 1100);
    const end = window.setTimeout(finish, 1900);
    const onKey = (event) => { if (event.key === "Escape") finish(); };
    window.addEventListener("keydown", onKey);
    return () => {
      [first, second, end, closeTimer.current].forEach(window.clearTimeout);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return <motion.div className={styles.preloader} aria-label="Portfolio introduction" initial={{ opacity: 1 }} animate={{ opacity: leaving ? 0 : 1 }} transition={{ duration: .35 }}>
    <div className={styles.gridBackground} />
    <div className={styles.content}>
      <div className={styles.logoSection}>
        <div className={styles.ringContainer}><motion.div className={`${styles.ring} ${styles.ringOuter}`} animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} /></div>
        <div className={styles.ringContainer}><motion.div className={`${styles.ring} ${styles.ringInner}`} animate={{ rotate: -360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} /></div>
        <span className={styles.logo}>DF</span>
      </div>
      <div className={styles.terminal}>
        <div className={styles.terminalHeader}><div className={styles.terminalDots}><span className={styles.terminalDot} style={{ background: "#f27b83" }}/><span className={styles.terminalDot} style={{ background: "#e7c37e" }}/><span className={styles.terminalDot} style={{ background: "#8bcfa7" }}/></div><span className={styles.terminalTitle}>deshan@portfolio ~ welcome</span></div>
        <div className={styles.terminalBody} aria-live="polite">{LINES.slice(0, step + 1).map((line, i) => <div className={`${styles.terminalLine} ${styles.success}`} key={line}><span className={styles.terminalPrefix}>{i === 2 ? "↗" : ">"}</span><span className={styles.terminalText}>{line}</span></div>)}</div>
      </div>
      <div className={styles.progressTrack} aria-hidden="true"><motion.div className={styles.progressFill} initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.9, ease: "linear" }} /></div>
      <button className={styles.skipIntro} onClick={finish} autoFocus>Skip intro <span aria-hidden="true">↗</span></button>
    </div>
    <div className={`${styles.corner} ${styles.cornerTL}`}><span>DESHAN FERNANDO</span><span>SOFTWARE ENGINEER</span></div>
    <div className={`${styles.corner} ${styles.cornerBR}`}><span>BUILT WITH CURIOSITY</span><span>COLOMBO, SRI LANKA</span></div>
  </motion.div>;
}
