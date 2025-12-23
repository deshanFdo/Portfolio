"use client";
import React from "react";
import styles from "./About.module.css";

export default function About() {
  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "50+", label: "Projects Completed" },
    { value: "99%", label: "Success Rate" },
    { value: "24/7", label: "Availability" },
  ];

  return (
    <section className={styles.about} id="about">
      <div className={styles.inner}>
        {/* Section header */}
        <div className={styles.header}>
          <span className={styles.sectionNumber}>01</span>
          <h2 className={styles.h2}>About Me</h2>
          <div className={styles.headerLine}></div>
        </div>

        <div className={styles.grid}>
          {/* Driver Card */}
          <div className={styles.driverCard}>
            <div className={styles.cardHeader}>
              <div className={styles.teamLogo}>🏎️</div>
              <div className={styles.driverInfo}>
                <span className={styles.driverName}>Your Name</span>
                <span className={styles.driverRole}>Full-Stack Developer</span>
              </div>
              <div className={styles.driverNumber}>04</div>
            </div>
            
            <div className={styles.cardBody}>
              <p className={styles.bio}>
                A passionate developer with a need for speed when it comes to building 
                high-performance web applications. I specialize in crafting seamless 
                user experiences with modern technologies.
              </p>
              
              {/* Stats grid */}
              <div className={styles.statsGrid}>
                {stats.map((stat, i) => (
                  <div className={styles.statItem} key={i}>
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={styles.cardFooter}>
              <div className={styles.carbonTexture}></div>
            </div>
          </div>

          {/* Info cards */}
          <div className={styles.infoCards}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>⚡</div>
              <h3>What I Do</h3>
              <p>Building blazing-fast web applications with React, Next.js, and Node.js. 
                 From concept to deployment, I deliver production-ready solutions.</p>
            </div>
            
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🎯</div>
              <h3>How I Work</h3>
              <p>Precision-driven development with a focus on clean code, performance 
                 optimization, and seamless user experiences.</p>
            </div>
            
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🔥</div>
              <h3>What I Love</h3>
              <p>Design systems, micro-interactions, performance tuning, and pushing 
                 the boundaries of what's possible on the web.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
