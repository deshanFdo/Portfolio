"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Experience.module.css";

const EXPERIENCE = [
  {
    role: "Software Engineer Intern",
    company: "Sri Lanka Telecom",
    location: "Colombo, Sri Lanka",
    period: "Jun 2025 - Present",
    current: true,
    highlights: [
      "Engineered high-performance RESTful API endpoints for 'Smart Employee' platform using Node.js",
      "Architected strict server-client panel isolation mechanism for 100% data privacy compliance",
      "Revamped assessor frontend using React with local caching and parallel data prefetching",
      "Led migration from legacy database structures to robust, normalized schemas"
    ]
  }
];

const EDUCATION = [
  {
    degree: "BSc (Hons) in Computer Science",
    institution: "University of Westminster, UK",
    period: "Jan 2023 - Present",
    status: "Reading",
    coursework: ["Advanced Algorithms", "Database Architecture", "OOP"]
  },
  {
    degree: "Foundation Certificate in Higher Education IT",
    institution: "IIT, Sri Lanka",
    period: "Jan 2023 - Sep 2023",
    status: "Distinction"
  }
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.experience} id="experience" ref={ref}>
      <div className={styles.inner}>
        {/* Section header */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionNumber}>04</span>
          <h2 className={styles.title}>EXPERIENCE</h2>
          <div className={styles.titleLine} />
        </motion.div>

        <div className={styles.grid}>
          {/* Work experience */}
          <div className={styles.workSection}>
            <h3 className={styles.sectionLabel}>
              <span className={styles.labelIcon}>💼</span>
              Work
            </h3>
            
            {EXPERIENCE.map((exp, i) => (
              <motion.div 
                key={i}
                className={styles.expCard}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
              >
                {exp.current && (
                  <div className={styles.currentBadge}>
                    <span className={styles.currentDot} />
                    CURRENT
                  </div>
                )}
                
                <div className={styles.expHeader}>
                  <h4 className={styles.expRole}>{exp.role}</h4>
                  <span className={styles.expPeriod}>{exp.period}</span>
                </div>
                
                <div className={styles.expCompany}>
                  <span>@ {exp.company}</span>
                  <span className={styles.expLocation}>📍 {exp.location}</span>
                </div>
                
                <ul className={styles.expHighlights}>
                  {exp.highlights.map((h, j) => (
                    <motion.li 
                      key={j}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + (j * 0.1), duration: 0.4 }}
                    >
                      <span className={styles.bulletIcon}>▸</span>
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Education */}
          <div className={styles.eduSection}>
            <h3 className={styles.sectionLabel}>
              <span className={styles.labelIcon}>🎓</span>
              Education
            </h3>
            
            {EDUCATION.map((edu, i) => (
              <motion.div 
                key={i}
                className={styles.eduCard}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + (i * 0.15), duration: 0.5 }}
              >
                <div className={styles.eduHeader}>
                  <h4 className={styles.eduDegree}>{edu.degree}</h4>
                  <span className={`${styles.eduStatus} ${edu.status === 'Distinction' ? styles.distinction : ''}`}>
                    {edu.status}
                  </span>
                </div>
                
                <p className={styles.eduInstitution}>{edu.institution}</p>
                <p className={styles.eduPeriod}>{edu.period}</p>
                
                {edu.coursework && (
                  <div className={styles.coursework}>
                    {edu.coursework.map((c, j) => (
                      <span key={j} className={styles.courseTag}>{c}</span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
