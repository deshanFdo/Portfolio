"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Skills.module.css";

const SKILL_CATEGORIES = [
  {
    category: "Languages",
    icon: "⚡",
    skills: ["JavaScript (ES6+)", "TypeScript", "Java", "Python", "C#", "SQL"]
  },
  {
    category: "Frontend",
    icon: "🎨",
    skills: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Material-UI"]
  },
  {
    category: "Backend",
    icon: "⚙️",
    skills: ["Node.js", "Express.js", "ASP.NET Core", "REST APIs", "Socket.io", "JWT Auth"]
  },
  {
    category: "Database & Tools",
    icon: "🗄️",
    skills: ["MySQL", "MongoDB", "Git", "GitHub", "Docker", "Postman", "Jira"]
  }
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.skills} id="skills" ref={ref}>
      <div className={styles.inner}>
        {/* Section header */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionNumber}>02</span>
          <h2 className={styles.title}>TECH_STACK</h2>
          <div className={styles.titleLine} />
        </motion.div>

        {/* Skill categories */}
        <div className={styles.categoriesGrid}>
          {SKILL_CATEGORIES.map((cat, i) => (
            <motion.div 
              key={i} 
              className={styles.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ borderColor: "var(--petronas-teal)" }}
            >
              <div className={styles.categoryHeader}>
                <span className={styles.categoryIcon}>{cat.icon}</span>
                <h3 className={styles.categoryTitle}>{cat.category}</h3>
              </div>
              <div className={styles.skillsWrapper}>
                {cat.skills.map((skill, j) => (
                  <motion.span 
                    key={j} 
                    className={styles.skillTag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: (i * 0.15) + (j * 0.05), duration: 0.3 }}
                    whileHover={{ 
                      background: "var(--petronas-teal)",
                      color: "var(--black)",
                      scale: 1.05
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive skill meter */}
        <motion.div 
          className={styles.meterSection}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className={styles.meterHeader}>
            <span className={styles.meterLabel}>SYSTEM_PERFORMANCE</span>
            <span className={styles.meterValue}>OPTIMAL</span>
          </div>
          <div className={styles.meterTrack}>
            <motion.div 
              className={styles.meterFill}
              initial={{ width: 0 }}
              animate={isInView ? { width: "92%" } : {}}
              transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
            />
            <div className={styles.meterGlow} />
          </div>
          <div className={styles.meterMarkers}>
            {[0, 25, 50, 75, 100].map((val) => (
              <span key={val}>{val}%</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
