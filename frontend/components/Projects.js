"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Projects.module.css";

const PROJECTS = [
  {
    title: "Smart Employee System",
    category: "Full-Stack Development",
    description: "Role-Based Access Control platform for employee assessments at Sri Lanka Telecom.",
    tech: ["Node.js", "React", "MySQL", "TypeScript"],
    image: null,
  },
  {
    title: "LawLinkLK",
    category: "Full-Stack Development",
    description: "Real-time legal consultation platform with AI assistant and secure messaging.",
    tech: ["MERN Stack", "OpenAI API", "Socket.io"],
    image: null,
  },
  {
    title: "Airline Seat Booking",
    category: "Backend Development",
    description: "Core API for seat reservations and passenger manifest management.",
    tech: ["Java", "REST API"],
    image: null,
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.projects} id="projects" ref={ref}>
      <div className={styles.inner}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.headerLabel}>Selected</span>
          <h2 className={styles.headerTitle}>Work</h2>
        </motion.div>

        {/* Project list */}
        <div className={styles.projectList}>
          {PROJECTS.map((project, i) => (
            <motion.article
              key={i}
              className={styles.projectItem}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className={styles.projectContent}>
                <span className={styles.projectCategory}>{project.category}</span>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>{project.description}</p>
                <div className={styles.projectTech}>
                  {project.tech.map((t, j) => (
                    <span key={j}>{t}</span>
                  ))}
                </div>
              </div>
              <div className={styles.projectImage}>
                <div className={styles.imagePlaceholder}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
