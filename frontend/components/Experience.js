"use client";
import React from "react";
import styles from "./Experience.module.css";

const ITEMS = [
  {
    role: "Senior Full-Stack Developer",
    company: "Tech Innovations Inc.",
    period: "2022 - Present",
    desc: "Leading development of high-traffic web applications. Architected microservices handling 10M+ daily requests.",
    lap: "P1"
  },
  {
    role: "Full-Stack Developer",
    company: "Digital Solutions Co.",
    period: "2020 - 2022",
    desc: "Built and maintained multiple client-facing applications. Improved performance by 40% through optimization.",
    lap: "P2"
  },
  {
    role: "Frontend Developer",
    company: "Creative Agency",
    period: "2019 - 2020",
    desc: "Developed responsive web interfaces and interactive dashboards for enterprise clients.",
    lap: "P3"
  },
  {
    role: "Junior Developer",
    company: "Startup Hub",
    period: "2018 - 2019", 
    desc: "Started my journey building MVPs and learning best practices in a fast-paced environment.",
    lap: "P4"
  }
];

export default function Experience() {
  return (
    <section className={styles.exp} id="experience">
      <div className={styles.inner}>
        {/* Section header */}
        <div className={styles.header}>
          <span className={styles.sectionNumber}>04</span>
          <h2 className={styles.h2}>Career Laps</h2>
          <div className={styles.headerLine}></div>
        </div>
        
        <p className={styles.subtitle}>
          Every position is a lap in the race. Here's my journey to the podium.
        </p>

        <div className={styles.timeline}>
          {/* Racing track line */}
          <div className={styles.trackLine}>
            <div className={styles.trackProgress}></div>
          </div>
          
          {ITEMS.map((item, i) => (
            <div className={styles.item} key={i} style={{ animationDelay: `${i * 150}ms` }}>
              <div className={styles.checkpoint}>
                <span className={styles.position}>{item.lap}</span>
              </div>
              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <div className={styles.roleInfo}>
                    <h3>{item.role}</h3>
                    <span className={styles.company}>{item.company}</span>
                  </div>
                  <span className={styles.period}>{item.period}</span>
                </div>
                <p className={styles.desc}>{item.desc}</p>
              </div>
            </div>
          ))}
          
          {/* Finish flag */}
          <div className={styles.finishFlag}>
            <span>🏁</span>
            <span className={styles.flagText}>Started Here</span>
          </div>
        </div>
      </div>
    </section>
  );
}
