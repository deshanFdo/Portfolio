"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import styles from "./Hero.module.css";

// Magnetic button component for cool hover effect
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
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}

// Floating code snippets in background
const CODE_SNIPPETS = [
  "const developer = 'Deshan';",
  "async function build() { }",
  "npm run create-awesome",
  "<Component />",
  "git push origin main",
  "return success;",
  "import { passion } from 'life';",
  "while(alive) { code(); }",
];

export default function Hero() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Use environment variables with fallbacks
  const fullName = process.env.NEXT_PUBLIC_FULL_NAME || "Deshan Fernando";
  const firstName = fullName.split(" ")[0]?.toUpperCase() || "DESHAN";
  const lastName = fullName.split(" ").slice(1).join(" ").toUpperCase() || "FERNANDO";
  const jobTitle = process.env.NEXT_PUBLIC_JOB_TITLE || "Software Engineer";
  const company = process.env.NEXT_PUBLIC_COMPANY || "Sri Lanka Telecom";
  const email = process.env.NEXT_PUBLIC_EMAIL || "#";
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
      {/* Enhanced grid overlay with perspective */}
      <motion.div
        className={styles.gridOverlay}
        style={{
          rotateX: mousePosition.y * 0.5,
          rotateY: mousePosition.x * 0.5,
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className={styles.gridLine}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: i * 0.08, duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </motion.div>

      {/* Floating code snippets */}
      <div className={styles.codeSnippets}>
        {CODE_SNIPPETS.map((code, i) => (
          <motion.div
            key={i}
            className={styles.codeSnippet}
            initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
            animate={{
              opacity: [0, 0.15, 0.15, 0],
              x: i % 2 === 0 ? [-100, 0] : [100, 0],
              y: [0, -50],
            }}
            transition={{
              duration: 8,
              delay: i * 1.2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            style={{
              top: `${15 + (i * 10) % 70}%`,
              [i % 2 === 0 ? 'left' : 'right']: '5%',
            }}
          >
            {code}
          </motion.div>
        ))}
      </div>

      {/* Glowing orb that follows mouse */}
      <motion.div
        className={styles.glowOrb}
        animate={{
          x: mousePosition.x * 10,
          y: mousePosition.y * 10,
        }}
        transition={{ type: "spring", damping: 30 }}
      />

      <motion.div
        className={styles.content}
        style={{ y, opacity, scale }}
      >
        {/* Status badge with typing effect */}
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

        {/* Main heading with dramatic reveal */}
        <motion.div
          className={styles.headingContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
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
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.05 }}
                  whileHover={{
                    y: -10,
                    color: "#00F5DD",
                    textShadow: "0 0 40px rgba(0, 245, 221, 0.8)"
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
            <motion.span
              className={styles.nameLast}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              {lastName}
            </motion.span>
          </h2>
        </motion.div>

        {/* Role with code-style brackets */}
        <motion.div
          className={styles.roleContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <motion.span
            className={styles.rolePrefix}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {"<"}
          </motion.span>
          <span className={styles.role}>{jobTitle}</span>
          <motion.span
            className={styles.rolePrefix}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            {" />"}
          </motion.span>
        </motion.div>

        {/* Company badge with glow */}
        <motion.div
          className={styles.companyBadge}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6 }}
          whileHover={{
            borderColor: "var(--petronas-teal)",
            boxShadow: "0 0 20px rgba(0, 210, 190, 0.3)"
          }}
        >
          <span className={styles.atSymbol}>@</span>
          <span>{company}</span>
        </motion.div>

        {/* Description */}
        <motion.p
          className={styles.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          Building scalable full-stack applications with React, Node.js & MySQL.
          <br />
          Transforming complex problems into elegant solutions.
        </motion.p>

        {/* Magnetic CTAs */}
        <motion.div
          className={styles.ctaContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <MagneticButton href="#projects" className={styles.ctaPrimary}>
            <span>View Projects</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </MagneticButton>
          <MagneticButton href="#contact" className={styles.ctaSecondary}>
            <span>Get in Touch</span>
          </MagneticButton>
        </motion.div>

        {/* Social links */}
        <motion.div
          className={styles.socials}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <motion.a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            whileHover={{ y: -3, color: "var(--petronas-teal)" }}
          >
            GitHub
          </motion.a>
          <span className={styles.socialDivider}>/</span>
          <motion.a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            whileHover={{ y: -3, color: "var(--petronas-teal)" }}
          >
            LinkedIn
          </motion.a>
          <span className={styles.socialDivider}>/</span>
          <motion.a
            href={`mailto:${email}`}
            className={styles.socialLink}
            whileHover={{ y: -3, color: "var(--petronas-teal)" }}
          >
            Email
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator with enhanced animation */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          className={styles.scrollMouse}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div className={styles.scrollWheel} />
        </motion.div>
        <span>Scroll to explore</span>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className={styles.decorLeft}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5 }}
      >
        <span>SOFT_ENG</span>
        <span>2024.25</span>
      </motion.div>
      <motion.div
        className={styles.decorRight}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5 }}
      >
        <span>COLOMBO</span>
        <span>SRI_LANKA</span>
      </motion.div>
    </section>
  );
}
