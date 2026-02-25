"use client";
import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import styles from "./Skills.module.css";

// Skills with project connections
const SKILL_CATEGORIES = [
  {
    id: "languages",
    category: "Languages",
    icon: "⚡",
    description: "Core programming languages",
    skills: [
      { name: "JavaScript", level: 95, icon: "JS", projects: ["NexusLink", "Smart Employee System", "LawLinkLK"] },
      { name: "TypeScript", level: 90, icon: "TS", projects: ["NexusLink", "Smart Employee System"] },
      { name: "Java", level: 85, icon: "JV", projects: ["Airline Seat Booking"] },
      { name: "Python", level: 80, icon: "PY", projects: [] },
      { name: "C#", level: 75, icon: "C#", projects: [] },
      { name: "SQL", level: 85, icon: "DB", projects: ["NexusLink", "Smart Employee System"] }
    ]
  },
  {
    id: "frontend",
    category: "Frontend",
    icon: "🎨",
    description: "UI/UX development",
    skills: [
      { name: "React.js", level: 95, icon: "RE", projects: ["NexusLink", "Smart Employee System", "LawLinkLK"] },
      { name: "HTML5", level: 95, icon: "HT", projects: ["NexusLink", "Smart Employee System", "LawLinkLK"] },
      { name: "CSS3", level: 92, icon: "CS", projects: ["NexusLink", "Smart Employee System", "LawLinkLK"] },
      { name: "Tailwind", level: 88, icon: "TW", projects: ["NexusLink"] },
      { name: "Bootstrap", level: 85, icon: "BS", projects: [] },
      { name: "Material-UI", level: 82, icon: "MU", projects: ["LawLinkLK"] }
    ]
  },
  {
    id: "backend",
    category: "Backend",
    icon: "⚙️",
    description: "Server-side development",
    skills: [
      { name: "Node.js", level: 92, icon: "ND", projects: ["Smart Employee System", "LawLinkLK"] },
      { name: "Express", level: 90, icon: "EX", projects: ["LawLinkLK"] },
      { name: "ASP.NET", level: 78, icon: "NT", projects: [] },
      { name: "REST APIs", level: 95, icon: "AP", projects: ["Smart Employee System", "Airline Seat Booking"] },
      { name: "Socket.io", level: 85, icon: "IO", projects: ["LawLinkLK"] },
      { name: "JWT Auth", level: 88, icon: "JW", projects: ["LawLinkLK"] }
    ]
  },
  {
    id: "tools",
    category: "DevOps & Tools",
    icon: "🛠️",
    description: "Infrastructure & workflows",
    skills: [
      { name: "Git & GitHub", level: 95, icon: "GT", projects: ["NexusLink", "Smart Employee System"] },
      { name: "Postman", level: 92, icon: "PM", projects: ["Smart Employee System", "Airline Seat Booking"] },
      { name: "Azure (Fund.)", level: 80, icon: "AZ", projects: [] },
      { name: "Linux", level: 75, icon: "LX", projects: [] },
      { name: "Vercel/Render", level: 85, icon: "DP", projects: ["LawLinkLK"] },
      { name: "Jira", level: 88, icon: "JA", projects: ["Smart Employee System"] }
    ]
  },
  {
    id: "data",
    category: "Data & Analytics",
    icon: "📊",
    description: "Analysis & Intelligence",
    skills: [
      { name: "pandas", level: 85, icon: "PD", projects: [] },
      { name: "NumPy", level: 82, icon: "NP", projects: [] },
      { name: "EDA", level: 88, icon: "DA", projects: [] },
      { name: "Matplotlib", level: 80, icon: "MP", projects: [] },
      { name: "Jupyter", level: 85, icon: "JP", projects: [] },
      { name: "Machine Learning", level: 70, icon: "ML", projects: [] }
    ]
  },
  {
    id: "certs",
    category: "Certifications",
    icon: "📜",
    description: "Professional Achievements",
    skills: [
      { name: "Postman Student Expert", level: 100, icon: "🏆", projects: [] },
      { name: "Azure Fundamentals (AZ-900)", level: 100, icon: "☁️", projects: [] },
      { name: "Python for Data Analysis", level: 100, icon: "🐍", projects: [] },
      { name: "Meta Database Intro", level: 100, icon: "🗄️", projects: [] },
      { name: "Cloud Computing Core", level: 100, icon: "☁️", projects: [] },
      { name: "IEEE Xtreme Leader", level: 100, icon: "🥇", projects: [] }
    ]
  }
];

// Project details for the popup
const PROJECT_DETAILS = {
  "Smart Employee System": {
    role: "Full-Stack Developer",
    description: "Comprehensive RBAC system for employee assessments at Sri Lanka Telecom",
    image: "/images/projects/smart-employee.png"
  },
  "LawLinkLK": {
    role: "Full-Stack Developer",
    description: "Real-time legal consultation platform with AI-powered assistant",
    image: "/images/projects/lawlink.png"
  },
  "Airline Seat Booking": {
    role: "Backend Developer",
    description: "Robust API for managing seat reservations and passenger manifests",
    image: "/images/projects/airline.png"
  },
  "NexusLink": {
    role: "Full-Stack Developer",
    description: "Knowledge-Graph Driven Collaboration Platform with real-time visualization",
    image: "/images/projects/nexuslink.png"
  }
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("languages");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const activeData = SKILL_CATEGORIES.find(c => c.id === activeCategory);

  const handleSkillClick = (skill) => {
    if (skill.projects.length > 0) {
      setSelectedSkill(selectedSkill?.name === skill.name ? null : skill);
    }
  };

  const scrollToProject = (projectName) => {
    // Scroll to projects section
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
    setSelectedSkill(null);
  };

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

        {/* Selected skill project popup */}
        <AnimatePresence>
          {selectedSkill && selectedSkill.projects.length > 0 && (
            <motion.div
              className={styles.projectsPopup}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.popupHeader}>
                <div className={styles.popupTitle}>
                  <span className={styles.popupIcon}>{selectedSkill.icon}</span>
                  <div>
                    <h4>{selectedSkill.name}</h4>
                    <span className={styles.popupSubtitle}>Used in {selectedSkill.projects.length} project{selectedSkill.projects.length > 1 ? 's' : ''}</span>
                  </div>
                </div>
                <button
                  className={styles.popupClose}
                  onClick={() => setSelectedSkill(null)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className={styles.popupProjects}>
                {selectedSkill.projects.map((projectName, i) => {
                  const projectInfo = PROJECT_DETAILS[projectName];
                  return (
                    <motion.button
                      key={projectName}
                      className={styles.projectLink}
                      onClick={() => scrollToProject(projectName)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ x: 5, backgroundColor: 'rgba(0, 210, 190, 0.1)' }}
                    >
                      <div className={styles.projectThumbnail}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="3" width="20" height="14" rx="2" />
                          <path d="M8 21h8M12 17v4" />
                        </svg>
                      </div>
                      <div className={styles.projectInfo}>
                        <span className={styles.projectName}>{projectName}</span>
                        <span className={styles.projectRole}>{projectInfo?.role}</span>
                      </div>
                      <div className={styles.projectArrow}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className={styles.popupFooter}>
                <span className={styles.popupHint}>Click a project to navigate →</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content grid */}
        <div className={styles.mainGrid}>
          {/* Category selector - left side */}
          <motion.div
            className={styles.categorySelector}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.selectorLabel}>
              <span>SELECT_MODULE</span>
              <span className={styles.blinkingDot} />
            </div>

            {SKILL_CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat.id}
                className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.active : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={styles.categoryIcon}>{cat.icon}</span>
                <div className={styles.categoryInfo}>
                  <span className={styles.categoryName}>{cat.category}</span>
                  <span className={styles.categoryDesc}>{cat.description}</span>
                </div>
                <div className={styles.categoryArrow}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </motion.button>
            ))}

            {/* Stats summary */}
            <motion.div
              className={styles.statsSummary}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <div className={styles.statItem}>
                <span className={styles.statValue}>24+</span>
                <span className={styles.statLabel}>Technologies</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>3+</span>
                <span className={styles.statLabel}>Years Learning</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Skills display - right side */}
          <motion.div
            className={styles.skillsDisplay}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Display header */}
            <div className={styles.displayHeader}>
              <div className={styles.displayTitle}>
                <span className={styles.moduleLabel}>MODULE:</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeCategory}
                    className={styles.moduleName}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeData?.category.toUpperCase()}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className={styles.displayStatus}>
                <span className={styles.statusDot} />
                <span>ACTIVE</span>
              </div>
            </div>

            {/* Skill hint */}
            <motion.div
              className={styles.skillHint}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              <span>Click a skill to see related projects</span>
            </motion.div>

            {/* Skills grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className={styles.skillsGrid}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                {activeData?.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    className={`${styles.skillCard} ${hoveredSkill === skill.name ? styles.hovered : ''} ${skill.projects.length > 0 ? styles.hasProjects : ''} ${selectedSkill?.name === skill.name ? styles.selected : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    onClick={() => handleSkillClick(skill)}
                    whileHover={{ y: -8 }}
                  >
                    {/* Project indicator badge */}
                    {skill.projects.length > 0 && (
                      <div className={styles.projectBadge}>
                        <span>{skill.projects.length}</span>
                      </div>
                    )}

                    {/* Progress ring background */}
                    <div className={styles.progressRing}>
                      <svg viewBox="0 0 100 100">
                        <circle
                          className={styles.progressBg}
                          cx="50" cy="50" r="42"
                        />
                        <motion.circle
                          className={styles.progressFill}
                          cx="50" cy="50" r="42"
                          initial={{ strokeDashoffset: 264 }}
                          animate={isInView ? {
                            strokeDashoffset: 264 - (264 * skill.level / 100)
                          } : {}}
                          transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: "easeOut" }}
                        />
                      </svg>
                      <div className={styles.skillIcon}>
                        <span>{skill.icon}</span>
                      </div>
                    </div>

                    <div className={styles.skillInfo}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <div className={styles.levelBar}>
                        <motion.div
                          className={styles.levelFill}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                        />
                      </div>
                      <span className={styles.levelPercent}>{skill.level}%</span>
                    </div>

                    {/* Hover indicator for clickable skills */}
                    {skill.projects.length > 0 && (
                      <div className={styles.clickIndicator}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Terminal-style footer */}
            <motion.div
              className={styles.terminalFooter}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
            >
              <div className={styles.terminalLine}>
                <span className={styles.terminalPrompt}>$</span>
                <span className={styles.terminalCommand}>
                  skills --list &quot;{activeData?.category}&quot; --format=visual
                </span>
                <span className={styles.terminalCursor}>|</span>
              </div>
              <div className={styles.outputLine}>
                <span className={styles.outputSuccess}>✓</span>
                <span>Loaded {activeData?.skills.length} skills successfully</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
