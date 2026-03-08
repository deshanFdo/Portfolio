"use client";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import dynamic from 'next/dynamic';
import styles from "./Hero.module.css";

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

function MagneticButton({ children, href, className }) {
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
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}

function seededRandom(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function HeroParticle({ index }) {
  const [particleProps] = useState(() => ({
    x: seededRandom(index * 6 + 1) * 100 + '%',
    y: seededRandom(index * 6 + 2) * 100 + '%',
    scale: seededRandom(index * 6 + 3) * 0.5 + 0.5,
    opacity: seededRandom(index * 6 + 4) * 0.5 + 0.1,
    duration: seededRandom(index * 6 + 5) * 10 + 10,
    delay: seededRandom(index * 6 + 6) * 10
  }));

  return (
    <motion.div
      className={styles.particle}
      initial={{
        x: particleProps.x,
        y: particleProps.y,
        scale: particleProps.scale,
        opacity: particleProps.opacity,
      }}
      animate={{
        y: [null, '-20%'],
        opacity: [null, 0],
      }}
      transition={{
        duration: particleProps.duration,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
        delay: particleProps.delay,
      }}
    />
  );
}

// Animated particles background
function ParticleField() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={styles.particleField}>
      {mounted && Array.from({ length: 20 }).map((_, i) => (
        <HeroParticle key={i} index={i} />
      ))}
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const [heroReady, setHeroReady] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 45, damping: 20, mass: 0.8 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 45, damping: 20, mass: 0.8 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const haloX = useTransform(smoothMouseX, [-12, 12], [-36, 36]);
  const haloY = useTransform(smoothMouseY, [-12, 12], [-36, 36]);
  const ringX = useTransform(smoothMouseX, [-12, 12], [24, -24]);
  const ringY = useTransform(smoothMouseY, [-12, 12], [18, -18]);
  const ringRotate = useTransform(smoothMouseX, [-12, 12], [-8, 8]);
  const gridRotateX = useTransform(smoothMouseY, [-12, 12], [2.2, -2.2]);
  const gridRotateY = useTransform(smoothMouseX, [-12, 12], [-2.2, 2.2]);
  const contentRotateX = useTransform(smoothMouseY, [-12, 12], [0.8, -0.8]);
  const contentRotateY = useTransform(smoothMouseX, [-12, 12], [-0.8, 0.8]);
  const splineRotateX = useTransform(smoothMouseY, [-12, 12], [1.4, -1.4]);
  const splineRotateY = useTransform(smoothMouseX, [-12, 12], [-1.4, 1.4]);
  const spotlightX = useTransform(smoothMouseX, [-12, 12], [-40, 40]);
  const spotlightY = useTransform(smoothMouseY, [-12, 12], [-40, 40]);

  // Environment variables
  const fullName = process.env.NEXT_PUBLIC_FULL_NAME || "Deshan Fernando";
  const firstName = fullName.split(" ")[0]?.toUpperCase() || "DESHAN";
  const lastName = fullName.split(" ").slice(1).join(" ").toUpperCase() || "FERNANDO";
  const jobTitle = process.env.NEXT_PUBLIC_JOB_TITLE || "Software Engineering Intern";
  const github = process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/deshanFdo";
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/DeshanFdo31";

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 24);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 24);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 140);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.hero} id="home" ref={containerRef}>
      {/* Animated gradient background */}
      <div className={styles.gradientBg}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
      </div>

      <motion.div
        className={styles.heroHalo}
        style={{ x: haloX, y: haloY }}
      />

      <motion.div
        className={styles.heroRing}
        style={{ x: ringX, y: ringY, rotate: ringRotate }}
      />

      {/* Particle field */}
      <ParticleField />

      {/* Grid overlay with perspective */}
      <motion.div
        className={styles.gridOverlay}
        style={{ rotateX: gridRotateX, rotateY: gridRotateY }}
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
      <motion.div
        className={styles.splitContainer}
        initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
        animate={heroReady ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Left: Text content */}
        <motion.div
          className={styles.content}
          style={{ y, rotateX: contentRotateX, rotateY: contentRotateY }}
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
                  "0 0 0 0 rgba(255, 242, 0, 0.7)",
                  "0 0 0 8px rgba(255, 242, 0, 0)",
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
              Hello, I&apos;m
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
                      y: -8,
                      color: 'var(--ferrari-blue-light)',
                      textShadow: '0 0 24px rgba(122, 215, 240, 0.45)'
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
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
            <span className={styles.role}>{jobTitle}</span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className={styles.ctaContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.08 }}
          >
            <MagneticButton
              href="#projects"
              className={styles.ctaPrimary}
            >
              <span>View Projects</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className={styles.ctaSecondary}
            >
              <span>Get in Touch</span>
            </MagneticButton>
          </motion.div>

          {/* Description */}
          <motion.p
            className={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Software engineering undergraduate with internship experience building secure,
            production-oriented web applications. Skilled in REST API design, API gateway patterns,
            and full-stack development with modern frameworks.
          </motion.p>

          {/* Social links */}
          <motion.div
            className={styles.socials}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.45 }}
          >
            <motion.a
              href={github}
              className={styles.socialLink}
              whileHover={{ color: 'var(--ferrari-blue)' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </motion.a>
            <span className={styles.socialDivider}>/</span>
            <motion.a
              href={linkedin}
              className={styles.socialLink}
              whileHover={{ color: 'var(--ferrari-blue)' }}
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
          animate={heroReady ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 24 }}
          transition={{ delay: 0.22, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          style={{ rotateX: splineRotateX, rotateY: splineRotateY }}
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
            style={{ x: spotlightX, y: spotlightY }}
          />
        </motion.div>
      </motion.div>

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
        <span suppressHydrationWarning>© {new Date().getFullYear()}</span>
        <span>PORTFOLIO v2.0</span>
      </motion.div>
    </section>
  );
}
