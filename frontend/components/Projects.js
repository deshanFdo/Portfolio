"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import NorrisText from "./NorrisText";
import styles from "./Projects.module.css";

const PROJECTS = [
  {
    num: "01",
    title: "Smart Employee System",
    desc: "Role-Based Access Control platform for assessments",
    tech: "Node.js • React • MySQL",
  },
  {
    num: "02",
    title: "LawLinkLK",
    desc: "Real-time legal consultation with AI assistant",
    tech: "MERN Stack • OpenAI • Socket.io",
  },
  {
    num: "03",
    title: "Airline Seat Booking",
    desc: "Core API for reservations and manifest management",
    tech: "Java • REST API",
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
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.label}>Selected</span>
          <a href="#projects">
            <NorrisText text="Work" fontSize="clamp(3rem, 10vw, 7rem)" />
          </a>
        </motion.div>

        {/* Projects list */}
        <div className={styles.list}>
          {PROJECTS.map((project, i) => (
            <motion.article
              key={i}
              className={styles.item}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + (i * 0.15) }}
            >
              <span className={styles.num}>{project.num}</span>
              <div className={styles.content}>
                <a href="#" className={styles.titleLink}>
                  <NorrisText text={project.title} fontSize="clamp(1.5rem, 4vw, 2.5rem)" />
                </a>
                <p className={styles.desc}>{project.desc}</p>
                <span className={styles.tech}>{project.tech}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
