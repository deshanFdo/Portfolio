"use client";
import React, { useState, useEffect } from "react";
import styles from "./Preloader.module.css";

// Muted, solid cube colors (no glass/transparency)
const COLORS = [
  "#1f2937", // slate-800
  "#111827", // gray-900
  "#334155", // slate-700
  "#0b1220", // deep navy
  "#2a3342", // muted blue-gray
];

export default function Preloader({ onComplete }) {
  const [stage, setStage] = useState("waiting"); // waiting -> splitting -> falling -> clearing -> hidden
  const [clicked, setClicked] = useState(false);
  const [grid, setGrid] = useState({ cols: 16, rows: 10 });
  const [mounted, setMounted] = useState(false);

  // Calculate an adaptive grid based on viewport for performance
  useEffect(() => {
    setMounted(true);
    const calcGrid = () => {
      const target = 64; // approx cube size in px
      const cols = Math.max(12, Math.min(22, Math.ceil(window.innerWidth / target)));
      const rows = Math.max(8, Math.min(14, Math.ceil(window.innerHeight / target)));
      setGrid({ cols, rows });
    };
    calcGrid();
    // Resize handler (preloader is short-lived, so lightweight is fine)
    const onResize = () => {
      if (stage === "waiting") calcGrid();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [stage]);

  const handleClick = () => {
    if (!clicked) {
      setClicked(true);
      setStage("splitting");
      
      setTimeout(() => {
        setStage("falling");
      }, 200);

      // After fall completes (account for max per-cube delay), fade overlay, then hide
      setTimeout(() => {
        setStage("clearing");
      }, 3800);

      setTimeout(() => {
        setStage("hidden");
        if (onComplete) onComplete();
      }, 4100);
    }
  };

  if (!mounted || stage === "hidden") return null;

  return (
    <div className={`${styles.preloader} ${styles[stage]}`} onClick={handleClick}>
      <div className={styles.cubesContainer}>
        {Array.from({ length: grid.cols * grid.rows }).map((_, i) => {
          const row = Math.floor(i / grid.cols);
          const col = i % grid.cols;
          const color = COLORS[i % COLORS.length];
          
          // Determine which side of the split
          const isLeftHalf = col < grid.cols / 2;
          const distanceFromCenter = Math.abs(col - grid.cols / 2);
          const jitter = Math.random() * 0.04; // subtle randomness
          const delay = distanceFromCenter * 0.12 + jitter;
          
          // Movement values
          const xOffset = isLeftHalf ? -140 : 140;
          const yOffset = 80;
          const zOffset = -1400;
          const rotateX = (Math.random() * 240 - 120);
          const rotateY = (Math.random() * 240 - 120);
          const rotateZ = (Math.random() * 240 - 120);

          return (
            <div
              key={i}
              className={styles.cube}
              style={{
                left: `${(col / grid.cols) * 100}%`,
                top: `${(row / grid.rows) * 100}%`,
                width: `${100 / grid.cols}%`,
                height: `${100 / grid.rows}%`,
                "--cube-color": color,
                animationDelay: `${delay}s`,
                "--x-offset": `${xOffset}px`,
                "--y-offset": `${yOffset}px`,
                "--z-offset": `${zOffset}px`,
                "--rotate-x": `${rotateX}deg`,
                "--rotate-y": `${rotateY}deg`,
                "--rotate-z": `${rotateZ}deg`,
                "--lift-z": `${-60 - Math.random() * 40}px`,
              }}
            >
              <div className={styles.cubeInner}>
                <div className={styles.cubeFace}></div>
              </div>
            </div>
          );
        })}
      </div>
      {stage === "waiting" && (
        <div className={styles.clickPrompt}>
          <p>click to enter</p>
        </div>
      )}
    </div>
  );
}
