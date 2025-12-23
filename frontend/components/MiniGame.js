"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./MiniGame.module.css";

const GRID_SIZE = 15;
const INITIAL_SNAKE = [{ x: 7, y: 7 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };

export default function MiniGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 10, y: 7 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameState, setGameState] = useState("idle"); // idle, playing, gameover
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const gameLoopRef = useRef(null);
  const directionRef = useRef(direction);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem("snakeHighScore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  // Spawn food
  const spawnFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(s => s.x === newFood.x && s.y === newFood.y));
    setFood(newFood);
  }, [snake]);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;

    gameLoopRef.current = setInterval(() => {
      setSnake(prev => {
        const newHead = {
          x: prev[0].x + directionRef.current.x,
          y: prev[0].y + directionRef.current.y,
        };

        // Wall collision
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setGameState("gameover");
          return prev;
        }

        // Self collision
        if (prev.some(s => s.x === newHead.x && s.y === newHead.y)) {
          setGameState("gameover");
          return prev;
        }

        const newSnake = [newHead, ...prev];

        // Food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => {
            const newScore = s + 10;
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem("snakeHighScore", newScore.toString());
            }
            return newScore;
          });
          spawnFood();
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 150);

    return () => clearInterval(gameLoopRef.current);
  }, [gameState, food, spawnFood, highScore]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      if (gameState !== "playing") return;
      
      const keyMap = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
      };

      const newDir = keyMap[e.key];
      if (newDir) {
        // Prevent reversing
        if (directionRef.current.x + newDir.x !== 0 || directionRef.current.y + newDir.y !== 0) {
          directionRef.current = newDir;
          setDirection(newDir);
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameState]);

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setScore(0);
    spawnFood();
    setGameState("playing");
  };

  const handleMobileControl = (dir) => {
    if (gameState !== "playing") return;
    if (directionRef.current.x + dir.x !== 0 || directionRef.current.y + dir.y !== 0) {
      directionRef.current = dir;
      setDirection(dir);
    }
  };

  return (
    <>
      {/* Floating button */}
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
        <span className={styles.gameLabel}>Play</span>
      </motion.button>

      {/* Game modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setIsOpen(false); setGameState("idle"); }}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={() => { setIsOpen(false); setGameState("idle"); }}>
                ✕
              </button>

              <div className={styles.header}>
                <h3>🐍 Snake Game</h3>
                <p>Use arrow keys or WASD to move</p>
              </div>

              {/* Game grid */}
              <div className={styles.gameContainer}>
                <div className={styles.grid}>
                  {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                    const x = i % GRID_SIZE;
                    const y = Math.floor(i / GRID_SIZE);
                    const isSnake = snake.some(s => s.x === x && s.y === y);
                    const isHead = snake[0].x === x && snake[0].y === y;
                    const isFood = food.x === x && food.y === y;

                    return (
                      <div
                        key={i}
                        className={`${styles.cell} ${isSnake ? styles.snake : ''} ${isHead ? styles.head : ''} ${isFood ? styles.food : ''}`}
                      />
                    );
                  })}
                </div>

                {/* Overlay states */}
                {gameState === "idle" && (
                  <div className={styles.gameOverlay}>
                    <button onClick={startGame} className={styles.startBtn}>
                      Start Game
                    </button>
                  </div>
                )}

                {gameState === "gameover" && (
                  <div className={styles.gameOverlay}>
                    <p className={styles.gameOverText}>Game Over!</p>
                    <p className={styles.finalScore}>Score: {score}</p>
                    <button onClick={startGame} className={styles.startBtn}>
                      Play Again
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile controls */}
              <div className={styles.mobileControls}>
                <button onClick={() => handleMobileControl({ x: 0, y: -1 })}>▲</button>
                <div className={styles.mobileRow}>
                  <button onClick={() => handleMobileControl({ x: -1, y: 0 })}>◀</button>
                  <button onClick={() => handleMobileControl({ x: 1, y: 0 })}>▶</button>
                </div>
                <button onClick={() => handleMobileControl({ x: 0, y: 1 })}>▼</button>
              </div>

              {/* Score */}
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Score</span>
                  <span className={styles.statValue}>{score}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Best</span>
                  <span className={styles.statValue}>{highScore}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
