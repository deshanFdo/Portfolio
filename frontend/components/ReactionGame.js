"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ReactionGame.module.css";

export default function ReactionGame() {
  const [gameState, setGameState] = useState("idle"); // idle, waiting, ready, result
  const [reactionTime, setReactionTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const startTimeRef = useRef(null);
  const timeoutRef = useRef(null);

  // Load best time from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("reactionBestTime");
    if (saved) setBestTime(parseInt(saved));
  }, []);

  const startGame = useCallback(() => {
    setGameState("waiting");
    setReactionTime(null);
    
    // Random delay between 2-5 seconds
    const delay = 2000 + Math.random() * 3000;
    
    timeoutRef.current = setTimeout(() => {
      setGameState("ready");
      startTimeRef.current = performance.now();
    }, delay);
  }, []);

  const handleClick = useCallback(() => {
    if (gameState === "idle") {
      startGame();
    } else if (gameState === "waiting") {
      // Too early!
      clearTimeout(timeoutRef.current);
      setGameState("result");
      setReactionTime(-1); // -1 indicates too early
    } else if (gameState === "ready") {
      const endTime = performance.now();
      const time = Math.round(endTime - startTimeRef.current);
      setReactionTime(time);
      setGameState("result");
      
      // Update best time
      if (!bestTime || time < bestTime) {
        setBestTime(time);
        localStorage.setItem("reactionBestTime", time.toString());
      }
    } else if (gameState === "result") {
      setGameState("idle");
    }
  }, [gameState, bestTime, startGame]);

  const getTimeRating = (time) => {
    if (time < 200) return { text: "INSANE! 🏆", color: "#FFD700" };
    if (time < 250) return { text: "EXCELLENT! ⚡", color: "#00D2BE" };
    if (time < 300) return { text: "GREAT! 🔥", color: "#00D2BE" };
    if (time < 400) return { text: "GOOD 👍", color: "#8A8A8A" };
    return { text: "KEEP TRYING 💪", color: "#8A8A8A" };
  };

  return (
    <>
      {/* Floating game button */}
      <motion.button
        className={styles.floatingBtn}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <span className={styles.gameIcon}>🎮</span>
        <span className={styles.gameLabel}>Play Game</span>
      </motion.button>

      {/* Game modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                ✕
              </button>

              <div className={styles.header}>
                <h3>⚡ Reaction Speed Test</h3>
                <p>Test your reflexes like an F1 driver!</p>
              </div>

              {/* Game area */}
              <motion.div
                className={`${styles.gameArea} ${styles[gameState]}`}
                onClick={handleClick}
                whileTap={{ scale: 0.98 }}
              >
                {gameState === "idle" && (
                  <div className={styles.gameContent}>
                    <span className={styles.bigIcon}>🏁</span>
                    <p>Click to Start</p>
                  </div>
                )}

                {gameState === "waiting" && (
                  <div className={styles.gameContent}>
                    <span className={styles.bigIcon}>⏳</span>
                    <p>Wait for GREEN...</p>
                    <span className={styles.warning}>Don't click yet!</span>
                  </div>
                )}

                {gameState === "ready" && (
                  <div className={styles.gameContent}>
                    <span className={styles.bigIcon}>🚀</span>
                    <p>CLICK NOW!</p>
                  </div>
                )}

                {gameState === "result" && (
                  <div className={styles.gameContent}>
                    {reactionTime === -1 ? (
                      <>
                        <span className={styles.bigIcon}>❌</span>
                        <p className={styles.tooEarly}>TOO EARLY!</p>
                        <span className={styles.subtext}>Click to try again</span>
                      </>
                    ) : (
                      <>
                        <span className={styles.reactionTime}>{reactionTime}ms</span>
                        <p style={{ color: getTimeRating(reactionTime).color }}>
                          {getTimeRating(reactionTime).text}
                        </p>
                        <span className={styles.subtext}>Click to try again</span>
                      </>
                    )}
                  </div>
                )}
              </motion.div>

              {/* Stats */}
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Your Best</span>
                  <span className={styles.statValue}>
                    {bestTime ? `${bestTime}ms` : "---"}
                  </span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>F1 Driver Avg</span>
                  <span className={styles.statValue}>200ms</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
