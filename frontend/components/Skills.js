"use client";
import React from "react";
import styles from "./Skills.module.css";

const SKILLS = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "CSS", "Tailwind", "REST", "GraphQL", "MongoDB", "PostgreSQL", "Docker", "CI/CD", "Azure"
];

export default function Skills() {
  return (
    <section className={styles.skills} id="skills">
      <div className={styles.inner}>
        <h2 className={styles.h2}>Skills</h2>
        <div className={styles.tags}>
          {SKILLS.map((s, i) => (
            <span className={styles.tag} key={i} style={{ animationDelay: `${i * 80}ms` }}>{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
