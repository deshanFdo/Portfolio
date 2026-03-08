"use client";
import React, { useEffect } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import styles from "./AmbientEffects.module.css";

export default function AmbientEffects() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const { scrollYProgress } = useScroll();

  const followX = useSpring(pointerX, { stiffness: 90, damping: 24, mass: 0.8 });
  const followY = useSpring(pointerY, { stiffness: 90, damping: 24, mass: 0.8 });
  const progressScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.6 });

  const ringOneRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const ringTwoRotate = useTransform(scrollYProgress, [0, 1], [0, -240]);
  const ringThreeRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const ringOneY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const ringTwoX = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      pointerX.set(event.clientX - window.innerWidth / 2);
      pointerY.set(event.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [pointerX, pointerY]);

  return (
    <div className={styles.stage} aria-hidden="true">
      <motion.div className={styles.progressBar} style={{ scaleX: progressScale }} />

      <motion.div
        className={styles.spotlight}
        style={{ x: followX, y: followY }}
      />

      <motion.div
        className={`${styles.hollowRing} ${styles.ringOne}`}
        style={{ rotate: ringOneRotate, y: ringOneY }}
      />

      <motion.div
        className={`${styles.hollowRing} ${styles.ringTwo}`}
        style={{ rotate: ringTwoRotate, x: ringTwoX }}
      />

      <motion.div
        className={`${styles.hollowRing} ${styles.ringThree}`}
        style={{ rotate: ringThreeRotate }}
      />

      <motion.div
        className={styles.orb}
        style={{ x: useTransform(followX, [-500, 500], [-30, 30]), y: orbY }}
      />

      <div className={styles.scanGrid} />
    </div>
  );
}