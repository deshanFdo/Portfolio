"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./F1Divider.module.css";

export default function F1Divider({ flip = false }) {
  const ref = useRef(null);
  // Track scroll progress: 0 when divider enters bottom of viewport → 1 when it leaves top
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to car left position: -10% → 105% of parent width
  const leftPercent = useTransform(scrollYProgress, [0, 1], [-10, 105]);
  const leftString = useTransform(leftPercent, (v) => `${v}%`);
  // Speed lines fade in at the middle of the scroll range
  const speedLineOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 0.6, 0.6, 0]);

  return (
    <div
      ref={ref}
      className={styles.divider}
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
    >
      {/* Track line */}
      <div className={styles.trackLine} />

      {/* F1 Car - position driven by scroll */}
      <motion.div
        className={styles.carContainer}
        style={{ left: leftString }}
      >
        {/* Tire marks / trail behind the car */}
        <div className={styles.trail}>
          <div className={styles.trailLine} />
          <div className={styles.trailLine} style={{ top: "12px" }} />
        </div>

        {/* Teal glow exhaust */}
        <motion.div
          className={styles.exhaust}
          animate={{ opacity: [0.4, 0.8, 0.4], scaleX: [0.8, 1.2, 0.8] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />

        {/* F1 Car SVG */}
        <svg
          className={styles.car}
          viewBox="0 0 120 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rear wing */}
          <rect x="2" y="4" width="3" height="14" rx="1" fill="#00D2BE" />
          <rect x="1" y="2" width="8" height="2" rx="0.5" fill="#00A89D" />

          {/* Engine cover / body rear */}
          <path
            d="M8 10 L20 8 L30 6 L30 22 L8 20 Z"
            fill="url(#carGradient)"
            stroke="#00D2BE"
            strokeWidth="0.5"
          />

          {/* Airbox / intake */}
          <path d="M28 6 L32 2 L35 2 L33 6" fill="#0a0a10" stroke="#00D2BE" strokeWidth="0.3" />

          {/* Main body */}
          <path
            d="M30 6 L75 4 L85 6 L90 8 L90 22 L85 24 L30 22 Z"
            fill="url(#carGradient)"
            stroke="#00A89D"
            strokeWidth="0.5"
          />

          {/* Cockpit */}
          <path
            d="M50 4 L55 0 L65 0 L68 4"
            fill="#0a0a10"
            stroke="#00D2BE"
            strokeWidth="0.4"
          />
          {/* Halo */}
          <path d="M52 4 L56 1 L64 1 L66 4" fill="none" stroke="#C6C6C6" strokeWidth="1" />

          {/* Side pod */}
          <path d="M40 6 L50 5 L50 10 L40 10" fill="#0a0a10" opacity="0.6" />
          <path d="M40 20 L50 21 L50 18 L40 18" fill="#0a0a10" opacity="0.6" />

          {/* Number */}
          <text x="60" y="16" textAnchor="middle" fill="#0a0a10" fontSize="8" fontWeight="bold" fontFamily="monospace">44</text>

          {/* Front nose */}
          <path
            d="M90 8 L110 10 L115 12 L115 18 L110 20 L90 22"
            fill="url(#carGradient)"
            stroke="#00A89D"
            strokeWidth="0.5"
          />

          {/* Front wing */}
          <path d="M112 8 L118 6 L120 6 L120 10 L115 10" fill="#00D2BE" />
          <path d="M112 22 L118 24 L120 24 L120 20 L115 20" fill="#00D2BE" />
          <path d="M115 10 L120 10 L120 20 L115 20" fill="#00A89D" opacity="0.5" />

          {/* Rear wheel */}
          <circle cx="22" cy="26" r="7" fill="#1a1a2e" stroke="#333" strokeWidth="1" />
          <circle cx="22" cy="26" r="3.5" fill="#2a2a3e" />
          <circle cx="22" cy="26" r="1.5" fill="#444" />

          {/* Front wheel */}
          <circle cx="95" cy="26" r="7" fill="#1a1a2e" stroke="#333" strokeWidth="1" />
          <circle cx="95" cy="26" r="3.5" fill="#2a2a3e" />
          <circle cx="95" cy="26" r="1.5" fill="#444" />

          {/* Teal accent stripe */}
          <line x1="10" y1="14" x2="110" y2="14" stroke="#00D2BE" strokeWidth="1.5" opacity="0.8" />

          {/* Petronas teal side accent */}
          <path d="M35 6 L85 5 L85 7 L35 8 Z" fill="#00D2BE" opacity="0.3" />
          <path d="M35 22 L85 23 L85 21 L35 20 Z" fill="#00D2BE" opacity="0.3" />

          <defs>
            <linearGradient id="carGradient" x1="0" y1="0" x2="120" y2="0">
              <stop offset="0%" stopColor="#1a1a2e" />
              <stop offset="50%" stopColor="#0f0f1a" />
              <stop offset="100%" stopColor="#1a1a2e" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Speed lines driven by scroll */}
      <motion.div
        className={styles.speedLines}
        style={{ opacity: speedLineOpacity }}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={styles.speedLine}
            style={{
              top: `${15 + i * 15}%`,
              width: `${40 + ((i * 17 + 7) % 30)}%`,
              left: `${(i * 13 + 5) % 30}%`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
