"use client";
import React from "react";
import styles from "./Experience.module.css";

const ITEMS = Array.from({ length: 5 }).map((_, i) => ({
  role: `Role ${i + 1}`,
  company: `Company ${i + 1}`,
  period: `20${i}-20${i + 1}`,
  desc: "Brief responsibilities summary placeholder.",
}));

export default function Experience() {
  return (
    <section className={styles.exp} id="experience">
      <div className={styles.inner}>
        <h2 className={styles.h2}>Experience</h2>
        <div className={styles.timeline}>
          {ITEMS.map((item, i) => (
            <div className={styles.item} key={i}>
              <div className={styles.dot} />
              <div className={styles.panel}>
                <div className={styles.row}>
                  <h3>{item.role}</h3>
                  <span className={styles.company}>{item.company}</span>
                </div>
                <span className={styles.period}>{item.period}</span>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
