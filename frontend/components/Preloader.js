"use client";
import React, { useState, useEffect } from "react";
import styles from "./Preloader.module.css";

const COLS = 20;
const ROWS = 12;
const CUBE_COUNT = COLS * ROWS;

const COLORS = [
  "rgba(100, 116, 139, 0.4)", // slate
  "rgba(71, 85, 105, 0.4)",   // slate darker
  "rgba(148, 163, 184, 0.4)", // slate light
  "rgba(51, 65, 85, 0.4)",    // slate darkest
  "rgba(203, 213, 225, 0.3)", // slate lightest
];

export default function Preloader({ onComplete }) {
  const [stage, setStage] = useState("waiting"); // waiting -> splitting -> falling -> hidden
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (!clicked) {
      setClicked(true);
      setStage("splitting");
      
      setTimeout(() => {
        setStage("falling");
      }, 200);

      setTimeout(() => {
        setStage("hidden");
        if (onComplete) onComplete();
      }, 3500);
    }
  };

  if (stage === "hidden") return null;

  return (
    <div className={`${styles.preloader} ${styles[stage]}`} onClick={handleClick}>
      <div className={styles.cubesContainer}>
        {Array.from({ length: CUBE_COUNT }).map((_, i) => {
          const row = Math.floor(i / COLS);
          const col = i % COLS;
          const color = COLORS[i % COLORS.length];
          
          // Determine which side of the split
          const isLeftHalf = col < COLS / 2;
          const distanceFromCenter = Math.abs(col - COLS / 2);
          const jitter = Math.random() * 0.04; // subtle randomness
          const delay = distanceFromCenter * 0.12 + jitter;
          
          // Movement values
          const xOffset = isLeftHalf ? -150 : 150;
          const yOffset = 80;
          const zOffset = -1400;
          const rotateX = (Math.random() * 360 - 180);
          const rotateY = (Math.random() * 360 - 180);
          const rotateZ = (Math.random() * 360 - 180);

          return (
            <div
              key={i}
              className={styles.cube}
              style={{
                left: `${(col / COLS) * 100}%`,
                top: `${(row / ROWS) * 100}%`,
                width: `${100 / COLS}%`,
                height: `${100 / ROWS}%`,
                backgroundColor: color,
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
                <div className={styles.cubeFace} style={{ backgroundColor: color }}></div>
              </div>
            </div>
          );
        })}
      </div>
      {stage === "waiting" && (
        <div className={styles.clickPrompt}>
          <p>Click to Enter</p>
        </div>
      )}
    </div>
  );
}
