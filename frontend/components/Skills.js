"use client";
import React from "react";
import styles from "./Skills.module.css";

const SKILL_CATEGORIES = [
  {
    category: "Frontend",
    icon: "🎨",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"]
  },
  {
    category: "Backend",
    icon: "⚙️",
    skills: ["Node.js", "Express", "Python", "REST APIs", "GraphQL"]
  },
  {
    category: "Database",
    icon: "🗄️",
    skills: ["MongoDB", "PostgreSQL", "Redis", "Prisma"]
  },
  {
    category: "DevOps",
    icon: "🚀",
    skills: ["Docker", "AWS", "CI/CD", "Git", "Linux"]
  }
];

export default function Skills() {
  return (
    <section className={styles.skills} id="skills">
      <div className={styles.inner}>
        {/* Section header */}
        <div className={styles.header}>
          <span className={styles.sectionNumber}>02</span>
          <h2 className={styles.h2}>Tech Stack</h2>
          <div className={styles.headerLine}></div>
        </div>
        
        <p className={styles.subtitle}>
          The technologies I use to build high-performance applications
        </p>

        <div className={styles.categoriesGrid}>
          {SKILL_CATEGORIES.map((cat, i) => (
            <div className={styles.category} key={i} style={{ animationDelay: `${i * 100}ms` }}>
              <div className={styles.categoryHeader}>
                <span className={styles.categoryIcon}>{cat.icon}</span>
                <h3 className={styles.categoryTitle}>{cat.category}</h3>
              </div>
              <div className={styles.skillTags}>
                {cat.skills.map((skill, j) => (
                  <span 
                    className={styles.tag} 
                    key={j}
                    style={{ animationDelay: `${(i * 100) + (j * 50)}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Speed meter visualization */}
        <div className={styles.speedMeter}>
          <div className={styles.meterLabel}>Performance Focus</div>
          <div className={styles.meterTrack}>
            <div className={styles.meterFill}></div>
          </div>
          <div className={styles.meterValue}>MAX</div>
        </div>
      </div>
    </section>
  );
}
