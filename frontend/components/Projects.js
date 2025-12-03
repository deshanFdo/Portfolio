"use client";
import React from "react";
import styles from "./Projects.module.css";

const PROJECTS = Array.from({ length: 8 }).map((_, i) => ({
  title: `Project ${i + 1}`,
  desc: "Short description placeholder lorem ipsum dolor sit amet.",
  tags: ["Next.js", "React", "CSS"],
}));

export default function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <div className={styles.inner}>
        <h2 className={styles.h2}>Projects</h2>
        <div className={styles.grid}>
          {PROJECTS.map((p, i) => (
            <article className={styles.card} key={i}>
              <div className={styles.preview}>
                <div className={styles.previewGlow} />
              </div>
              <div className={styles.body}>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className={styles.tagRow}>
                  {p.tags.map((t, j) => (<span key={j} className={styles.tag}>{t}</span>))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
