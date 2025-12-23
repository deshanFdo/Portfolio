"use client";
import React from "react";
import styles from "./Projects.module.css";

const PROJECTS = [
  {
    title: "Project Alpha",
    desc: "A high-performance e-commerce platform built with Next.js and Stripe integration. Features real-time inventory and lightning-fast checkout.",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    featured: true,
    link: "#",
    github: "#"
  },
  {
    title: "Dashboard Pro",
    desc: "Real-time analytics dashboard with interactive charts and live data streaming capabilities.",
    tags: ["React", "D3.js", "WebSocket", "Node.js"],
    featured: false,
    link: "#",
    github: "#"
  },
  {
    title: "Mobile App API",
    desc: "Scalable REST API serving millions of requests daily with sub-100ms response times.",
    tags: ["Node.js", "Redis", "Docker", "AWS"],
    featured: false,
    link: "#",
    github: "#"
  },
  {
    title: "AI Chat Interface",
    desc: "Modern chat interface with AI-powered responses and beautiful animations.",
    tags: ["React", "OpenAI", "Framer Motion"],
    featured: false,
    link: "#",
    github: "#"
  },
  {
    title: "Design System",
    desc: "Comprehensive component library with 50+ reusable components and full documentation.",
    tags: ["React", "Storybook", "CSS"],
    featured: false,
    link: "#",
    github: "#"
  },
  {
    title: "Portfolio V2",
    desc: "This very portfolio you're looking at. Built with Next.js and racing aesthetics.",
    tags: ["Next.js", "CSS Modules"],
    featured: false,
    link: "#",
    github: "#"
  }
];

export default function Projects() {
  const featuredProject = PROJECTS.find(p => p.featured);
  const otherProjects = PROJECTS.filter(p => !p.featured);

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.inner}>
        {/* Section header */}
        <div className={styles.header}>
          <span className={styles.sectionNumber}>03</span>
          <h2 className={styles.h2}>Projects</h2>
          <div className={styles.headerLine}></div>
        </div>

        {/* Featured Project */}
        {featuredProject && (
          <article className={styles.featured}>
            <div className={styles.featuredBadge}>
              <span className={styles.badgeIcon}>⭐</span>
              Featured
            </div>
            <div className={styles.featuredContent}>
              <div className={styles.featuredInfo}>
                <h3 className={styles.featuredTitle}>{featuredProject.title}</h3>
                <p className={styles.featuredDesc}>{featuredProject.desc}</p>
                <div className={styles.tagRow}>
                  {featuredProject.tags.map((t, j) => (
                    <span key={j} className={styles.tag}>{t}</span>
                  ))}
                </div>
                <div className={styles.featuredLinks}>
                  <a href={featuredProject.link} className={styles.linkPrimary}>
                    View Live →
                  </a>
                  <a href={featuredProject.github} className={styles.linkSecondary}>
                    GitHub
                  </a>
                </div>
              </div>
              <div className={styles.featuredPreview}>
                <div className={styles.previewWindow}>
                  <div className={styles.windowDots}>
                    <span></span><span></span><span></span>
                  </div>
                  <div className={styles.previewContent}>
                    <div className={styles.previewGlow}></div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Projects Grid */}
        <div className={styles.grid}>
          {otherProjects.map((p, i) => (
            <article className={styles.card} key={i} style={{ animationDelay: `${i * 100}ms` }}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>📁</span>
                <div className={styles.cardLinks}>
                  <a href={p.github} className={styles.iconLink} aria-label="GitHub">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href={p.link} className={styles.iconLink} aria-label="Live site">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                </div>
              </div>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.desc}</p>
              <div className={styles.tagRow}>
                {p.tags.map((t, j) => (
                  <span key={j} className={styles.tagSmall}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
