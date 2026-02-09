"use client";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import dynamic from 'next/dynamic';
import styles from "./Hero.module.css";

// Sound effects hook
function useSounds() {
  const playHover = () => {
    if (typeof window === 'undefined') return;
    try {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      oscillator.frequency.value = 2000;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.05, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.05);
      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + 0.05);
    } catch (e) { }
  };

  const playClick = () => {
    if (typeof window === 'undefined') return;
    try {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      oscillator.frequency.value = 800;
      oscillator.type = 'square';
      gainNode.gain.setValueAtTime(0.08, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.08);
      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + 0.08);
    } catch (e) { }
  };

  return { playHover, playClick };
}

// Lazy load Spline (using local embed to bypass package export issues)
const Spline = dynamic(
  () => import('./SplineEmbed'),
  {
    ssr: false,
    loading: () => (
      <div className={styles.sceneLoader}>
        <motion.div
          className={styles.loaderOrb}
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <span className={styles.loaderText}>LOADING 3D SCENE</span>
      </div>
    )
  }
);

// Magnetic button component with sound
function MagneticButton({ children, href, className, onHover }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onHover}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}

// Animated particles background
function ParticleField() {
  return (
    <div className={styles.particleField}>
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className={styles.particle}
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.1,
          }}
          animate={{
            y: [null, '-20%'],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { playHover, playClick } = useSounds();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Environment variables
  const fullName = process.env.NEXT_PUBLIC_FULL_NAME || "Deshan Fernando";
  const firstName = fullName.split(" ")[0]?.toUpperCase() || "DESHAN";
  const lastName = fullName.split(" ").slice(1).join(" ").toUpperCase() || "FERNANDO";
  const jobTitle = process.env.NEXT_PUBLIC_JOB_TITLE || "Software Engineer";
  const company = process.env.NEXT_PUBLIC_COMPANY || "Sri Lanka Telecom";
  const github = process.env.NEXT_PUBLIC_GITHUB_URL || "#";
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL || "#";

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className={styles.hero} id="home" ref={containerRef}>
      {/* Animated gradient background */}
      <div className={styles.gradientBg}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
      </div>

      {/* Particle field */}
      <ParticleField />

      {/* Grid overlay with perspective */}
      <motion.div
        className={styles.gridOverlay}
        style={{
          rotateX: mousePosition.y * 0.3,
          rotateY: mousePosition.x * 0.3,
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className={styles.gridLine}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: i * 0.08, duration: 0.8 }}
          />
        ))}
      </motion.div>

      {/* Split layout: Content + Spline */}
      <div className={styles.splitContainer}>
        {/* Left: Text content */}
        <motion.div
          className={styles.content}
          style={{ y, opacity, scale }}
        >
          {/* Status badge */}
          <motion.div
            className={styles.statusBadge}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <motion.span
              className={styles.statusDot}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(0, 210, 190, 0.7)",
                  "0 0 0 8px rgba(0, 210, 190, 0)",
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span>Available for Opportunities</span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            className={styles.headingContainer}
            style={{ y: textY }}
          >
            <motion.h1
              className={styles.greeting}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Hello, I'm
            </motion.h1>

            <h2 className={styles.name} data-text={firstName}>
              <motion.span
                className={styles.nameFirst}
                initial={{ opacity: 0, y: 50, skewY: 5 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {firstName.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    className={styles.nameChar}
                    whileHover={{
                      y: -10,
                      color: '#00F5DD',
                      textShadow: '0 0 30px rgba(0, 210, 190, 0.8)'
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onMouseEnter={playHover}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
              <motion.span
                className={styles.nameLast}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                {lastName}
              </motion.span>
            </h2>
          </motion.div>

          {/* Role */}
          <motion.div
            className={styles.roleContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <span className={styles.rolePrefix}>{'<'}</span>
            <span className={styles.role}>{jobTitle}</span>
            <span className={styles.rolePrefix}>{'/>'}</span>
          </motion.div>

          {/* Company badge */}
          <motion.div
            className={styles.companyBadge}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 }}
            whileHover={{ scale: 1.05, borderColor: 'var(--petronas-teal)' }}
            onMouseEnter={playHover}
          >
            <span className={styles.atSymbol}>@</span>
            <span>{company}</span>
          </motion.div>

          {/* Description */}
          <motion.p
            className={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Building digital experiences that push boundaries.
            Passionate about clean code, innovative solutions, and turning ideas into reality.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className={styles.ctaContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <MagneticButton
              href="#projects"
              className={styles.ctaPrimary}
              onHover={playHover}
            >
              <span>View Projects</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className={styles.ctaSecondary}
              onHover={playHover}
            >
              <span>Get in Touch</span>
            </MagneticButton>
          </motion.div>

          {/* Social links */}
          <motion.div
            className={styles.socials}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <motion.a
              href={github}
              className={styles.socialLink}
              whileHover={{ color: 'var(--petronas-teal)' }}
              onMouseEnter={playHover}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </motion.a>
            <span className={styles.socialDivider}>/</span>
            <motion.a
              href={linkedin}
              className={styles.socialLink}
              whileHover={{ color: 'var(--petronas-teal)' }}
              onMouseEnter={playHover}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right: Spline 3D Scene */}
        <motion.div
          className={styles.splineContainer}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <div className={styles.splineWrapper}>
            <Suspense fallback={
              <div className={styles.sceneLoader}>
                <motion.div
                  className={styles.loaderOrb}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <span className={styles.loaderText}>LOADING 3D</span>
              </div>
            }>
              <Spline scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
            </Suspense>
          </div>
          {/* Spotlight effect on Spline */}
          <motion.div
            className={styles.splineSpotlight}
            animate={{
              x: mousePosition.x * 15,
              y: mousePosition.y * 15,
            }}
            transition={{ type: "spring", damping: 20 }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className={styles.scrollMouse}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className={styles.scrollWheel}
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
        <span>SCROLL</span>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className={styles.decorLeft}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span>LAT 6.9271° N</span>
        <span>LON 79.8612° E</span>
      </motion.div>
      <motion.div
        className={styles.decorRight}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span>© 2024</span>
        <span>PORTFOLIO v2.0</span>
      </motion.div>
    </section>
  );
}
