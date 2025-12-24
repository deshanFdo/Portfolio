"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Projects.module.css";

const PROJECTS = [
  {
    title: "NexusLink",
    role: "Full-Stack Developer",
    tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Zustand", "Tailwind CSS"],
    desc: "Knowledge-Graph Driven Collaboration Platform supporting documentation, development, and presentation projects with dedicated editors and workflows. Features dynamic knowledge graph visualization of project structure and relationships.",
    features: [
      "Real-time knowledge graph visualization",
      "Role-based access (Owner, Co-Owner, Member)",
      "Version history & document tracking",
      "Secure email invitations with Google SMTP"
    ],
    featured: true,
    link: "#",
    github: "#"
  },
  {
    title: "Smart Employee System",
    role: "Full-Stack Developer",
    tech: ["Node.js", "React", "MySQL", "TypeScript"],
    desc: "Comprehensive Role-Based Access Control (RBAC) system for employee assessments at Sri Lanka Telecom. Enables granular permission management and automated workflows for training assignments.",
    features: [
      "RBAC permission management",
      "Automated training workflows",
      "SMART status tracking"
    ],
    featured: false,
    link: "#",
    github: "#"
  },
  {
    title: "LawLinkLK",
    role: "Full-Stack Developer",
    tech: ["MERN Stack", "OpenAI API", "Socket.io"],
    desc: "Real-time legal consultation platform with AI-powered assistant and secure instant messaging between clients and lawyers.",
    features: [
      "Real-time chat with Socket.io",
      "AI-powered legal assistant",
      "JWT secure authentication"
    ],
    featured: false,
    link: "#",
    github: "#"
  },
  {
    title: "Airline Seat Booking",
    role: "Backend Developer",
    tech: ["Java", "REST API"],
    desc: "Robust core API for managing seat reservations and passenger manifests with focus on data consistency.",
    features: [
      "Seat reservation API",
      "Passenger management",
      "Data consistency"
    ],
    featured: false,
    link: "#",
    github: "#"
  }
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const featuredProject = PROJECTS.find(p => p.featured);
  const otherProjects = PROJECTS.filter(p => !p.featured);

  return (
    <section className={styles.projects} id="projects" ref={ref}>
      <div className={styles.inner}>
        {/* Section header */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionNumber}>03</span>
          <h2 className={styles.title}>PROJECTS</h2>
          <div className={styles.titleLine} />
        </motion.div>

        {/* Featured project */}
        {featuredProject && (
          <motion.div 
            className={styles.featured}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className={styles.featuredHeader}>
              <span className={styles.featuredBadge}>FEATURED PROJECT</span>
              <span className={styles.featuredRole}>{featuredProject.role}</span>
            </div>
            
            <h3 className={styles.featuredTitle}>{featuredProject.title}</h3>
            <p className={styles.featuredDesc}>{featuredProject.desc}</p>
            
            <div className={styles.featuredFeatures}>
              {featuredProject.features.map((f, i) => (
                <div key={i} className={styles.featureItem}>
                  <span className={styles.featureIcon}>▸</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            
            <div className={styles.techStack}>
              {featuredProject.tech.map((t, i) => (
                <span key={i} className={styles.techTag}>{t}</span>
              ))}
            </div>
            
            <div className={styles.featuredLinks}>
              <motion.a 
                href={featuredProject.github}
                className={styles.iconLink}
                whileHover={{ scale: 1.1, color: "var(--petronas-teal)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.a>
              <motion.a 
                href={featuredProject.link}
                className={styles.iconLink}
                whileHover={{ scale: 1.1, color: "var(--petronas-teal)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </motion.a>
            </div>
            
            {/* Decorative corner */}
            <div className={styles.featuredCorner} />
          </motion.div>
        )}

        {/* Other projects */}
        <div className={styles.projectsGrid}>
          {otherProjects.map((project, i) => (
            <motion.div 
              key={i}
              className={styles.projectCard}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + (i * 0.1), duration: 0.5 }}
              whileHover={{ y: -8, borderColor: "var(--petronas-teal)" }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.folderIcon}>📁</span>
                <div className={styles.cardLinks}>
                  <a href={project.github} className={styles.cardLink}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href={project.link} className={styles.cardLink}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <h4 className={styles.cardTitle}>{project.title}</h4>
              <p className={styles.cardRole}>{project.role}</p>
              <p className={styles.cardDesc}>{project.desc}</p>
              
              <div className={styles.cardTech}>
                {project.tech.map((t, j) => (
                  <span key={j}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
