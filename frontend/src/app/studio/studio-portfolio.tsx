"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import BuildFlow from "./build-flow";
import { useMotionPreference, useStudioMotion } from "./studio-motion";
import styles from "./studio.module.css";

const Robot = dynamic(() => import("../../../components/SplineEmbed"), {
  ssr: false,
  loading: () => <div className={styles.robotPlaceholder}>Your robot companion is waking up…</div>,
});

const projects = [
  { number: "01", title: "One dashboard. Multiple worlds.", name: "Enterprise Developer API Portal", category: "Backend", visual: "portal", tags: ["React", "Node.js", "WSO2", "Docker"], description: "Weather, markets, and crypto brought together through a structured API layer. A project exploring API gateways, resilient integrations, and deployment workflows.", detail: "A React dashboard connects to Express services, with WSO2 gateway configuration and OpenAPI definitions. The repository includes container setup and GitHub Actions workflows. The illustration shows the architecture concept, not a live dashboard.", href: "https://github.com/deshanFdo/apiPortal" },
  { number: "02", title: "Better connections. Real conversations.", name: "LawLinkLK", category: "Full-stack", visual: "law", tags: ["React", "Express", "MongoDB", "Socket.IO"], description: "A platform connecting clients with lawyers in Sri Lanka. Messaging, appointments, and role-based access come together in one web experience.", detail: "Built with a React interface and a Node.js backend. Authentication and Socket.IO messaging support the consultation flow. The visual is a conceptual interface illustration; explore the source for the implementation.", href: "https://github.com/deshanFdo/LawLink-LK" },
  { number: "03", title: "Small interactions. A little delight.", name: "Card Swap", category: "Interface", visual: "cards", tags: ["JavaScript", "CSS", "Interaction"], description: "An interface experiment in rotation, layering, and revealing hidden cards. Because how software feels matters too.", detail: "A focused frontend exploration of card swapping, transforms, and interactive states. This is a smaller experiment alongside my backend and full-stack work.", href: "https://github.com/deshanFdo/card-sawp" },
];

function Arrow() {
  return <span aria-hidden="true">{"↗"}</span>;
}

function ProjectArt({ type }: { type: string }) {
  if (type === "portal") return <div className={styles.portalArt} aria-hidden="true">
    <div className={styles.artTop}><span>API PORTAL</span><span>● SYSTEM ONLINE</span></div>
    <div className={styles.apiWindow}><div className={styles.windowDots}>● ● ●<span> /api/v1</span></div><div className={styles.apiRows}><span>GET</span><b>/weather</b><i>200</i><span>GET</span><b>/markets</b><i>200</i><span>GET</span><b>/crypto</b><i>200</i></div></div>
    <div className={styles.artNodes}><span>CLIENT</span><i>→</i><span>GATEWAY</span><i>→</i><span>SERVICES</span></div>
    <span className={styles.artCaption}>ARCHITECTURE STUDY / 01</span>
  </div>;
  if (type === "law") return <div className={styles.lawArt} aria-hidden="true"><div className={styles.lawBrand}>LawLink<span>LK</span><small>A CLOSER CONNECTION.</small></div><div className={styles.messageCard}><span className={styles.avatar}>L</span><div><b>A conversation starts here.</b><span className={styles.messageLines} /><span className={styles.messageLines} /></div><span>↗</span></div><div className={styles.lawPill}><span>●</span> Clients & lawyers, connected.</div><span className={styles.artCaption}>INTERFACE CONCEPT / 02</span></div>;
  return <div className={styles.cardsArt} aria-hidden="true"><div className={styles.playCard}><span>MAKE</span><b>↗</b><span>IT MOVE.</span></div><div className={styles.playCard}><span>A LITTLE</span><b>✳</b><span>CURIOUS.</span></div><div className={styles.playCard}><span>BUILT TO</span><b>↗</b><span>EXPLORE.</span></div><span className={styles.artCaption}>INTERACTION STUDY / 03</span></div>;
}

export default function StudioPortfolio() {
  const page = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const { motion, reduced, toggleMotion } = useMotionPreference();
  const [filter, setFilter] = useState("All work");
  const [dark, setDark] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [robotOn, setRobotOn] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const email = "deshanfernando67@gmail.com";
  const visible = projects.filter(project => filter === "All work" || project.category === filter);
  const showRobot = robotOn ?? motion;
  useStudioMotion(page, progress, motion, filter);

  function togglePageMotion() {
    if (motion) setRobotOn(false);
    toggleMotion();
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setCopyError(false);
    } catch { setCopyError(true); }
  }

  return <div ref={page} className={`${styles.studio} ${dark ? styles.dark : ""}`} data-motion={motion ? "on" : "off"}>
    <div ref={progress} className={styles.readingProgress} aria-hidden="true" />
    <a className={styles.skip} href="#selected-work">Skip to selected work</a>
    <header className={styles.nav}>
      <Link href="/studio" className={styles.wordmark} aria-label="Deshan Fernando, studio home">df<span>✳</span></Link>
      <nav aria-label="Studio navigation"><a href="#selected-work">Work</a><a href="#build-flow">Process</a><a href="#about-studio">About</a><a href="#contact-studio">Contact</a></nav>
      <div className={styles.navActions}><button className={styles.motionButton} onClick={togglePageMotion} disabled={reduced} aria-label={reduced ? "Motion disabled by your system preference" : "Pause page animations"} aria-pressed={!motion}><span aria-hidden="true">{motion ? "Ⅱ" : "▷"}</span>{motion ? "Motion on" : "Motion off"}</button><button className={styles.themeButton} onClick={() => setDark(!dark)} aria-label={dark ? "Use light theme" : "Use dark theme"} aria-pressed={dark}>{dark ? "☀" : "◐"}</button><Link href="/" className={styles.classicLink}>Classic portfolio <Arrow /></Link></div>
    </header>

    <main>
      <section className={styles.hero} aria-labelledby="studio-heading">
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow} data-reveal><span className={styles.liveDot} /> AVAILABLE FOR ASSOCIATE SE & SE ROLES</div>
          <h1 id="studio-heading"><span className={styles.headlineLine} data-reveal>Software,</span><span className={styles.headlineLine} data-reveal data-reveal-order="1"><em>thoughtfully</em></span><span className={styles.headlineLine} data-reveal data-reveal-order="2">built<span className={styles.period}>.</span></span></h1>
          <div className={styles.heroBottom} data-reveal data-reveal-order="3"><div className={styles.introRule} /><p>I’m <strong>Deshan Fernando.</strong> A software engineer in Colombo, bringing structure to the backend and a little personality to the interface.</p></div>
          <div className={styles.heroActions} data-reveal data-reveal-order="3"><a href="#selected-work" className={styles.primary}>Explore my work <Arrow /></a><a className={styles.textLink} href="/Portfolio/Deshan_Fernando_CV.pdf" target="_blank" rel="noopener noreferrer">Read my CV <Arrow /></a></div>
          <div className={styles.heroMeta}><span>BASED IN SRI LANKA</span><span>BACKEND ↔ FULL-STACK</span></div>
        </div>
        <div className={styles.robotStage} data-reveal data-reveal-order="2" data-motion-region>
          <div className={styles.stageTop}><span><i /> THE INTERACTIVE CORNER</span><span>DF — 01</span></div>
          <div className={styles.robotHalo} aria-hidden="true"><span className={styles.orbitDot} /><span className={styles.orbitStar}>✳</span></div>
          <span className={styles.orbitLabel}>A LITTLE CURIOUS BY DESIGN</span>
          <div className={styles.robotViewport}>{showRobot ? <Robot style={{}} onLoad={undefined} className={undefined} scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" /> : <div className={styles.robotRest}><span>zz.</span><p>Taking a little break.</p><button onClick={() => setRobotOn(true)}>Wake the robot ↗</button></div>}</div>
          <div className={styles.stageBottom}><span>MEET MY ROBOT.<small>Move your pointer. Say hello.</small></span><button onClick={() => setRobotOn(!showRobot)} aria-pressed={!showRobot}>{showRobot ? "Pause robot" : "Wake robot"} <span aria-hidden="true">{showRobot ? "Ⅱ" : "▷"}</span></button></div>
          <div className={styles.stageSticker}><span>HUMAN IDEAS.</span><strong>REAL CODE.</strong><span>✳</span></div>
        </div>
      </section>

      <div className={styles.skillsRibbon} data-motion-region aria-label="Core technologies"><span>THE TOOLBOX</span><b>TypeScript</b><i aria-hidden="true">✳</i><b>React</b><i aria-hidden="true">✳</i><b>Node.js</b><i aria-hidden="true">✳</i><b>MySQL</b><i aria-hidden="true">✳</i><b>Docker</b><i aria-hidden="true">✳</i><b>REST APIs</b></div>

      <section className={styles.work} id="selected-work" aria-labelledby="work-title">
        <div className={styles.sectionLabel} data-reveal><span>01 / SELECTED WORK</span><span>IDEAS → IMPLEMENTATION</span></div>
        <div className={styles.sectionHeading} data-reveal><h2 id="work-title">Made to <em>work.</em><br />Built to <em>feel right.</em></h2><p>A selection of applications and experiments.<br />Different problems. The same curiosity.</p></div>
        <div className={styles.filters} role="group" aria-label="Filter projects">{["All work", "Backend", "Full-stack", "Interface"].map(item => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === "All work" && <span>03</span>}</button>)}</div>
        <div className={styles.projectGrid}>
          {visible.map((project, index) => <article className={`${styles.project} ${project.visual === "portal" ? styles.featuredProject : ""}`} key={project.number} data-reveal data-reveal-order={index % 2}>
            <a className={styles.artLink} href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${project.name} on GitHub`}><ProjectArt type={project.visual} /><span className={styles.artArrow}>↗</span></a>
            <div className={styles.projectMeta}><span>{project.number} / {project.category.toUpperCase()}</span><span>SOURCE AVAILABLE ↗</span></div>
            <h3>{project.title}</h3><p className={styles.projectName}>{project.name}</p><p className={styles.projectDescription}>{project.description}</p>
            <div className={styles.tags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            <div className={styles.projectLinks}><button aria-expanded={expanded === project.number} aria-controls={`detail-${project.number}`} onClick={() => setExpanded(expanded === project.number ? null : project.number)}>{expanded === project.number ? "Less detail −" : "Behind the build +"}</button><a href={project.href} target="_blank" rel="noopener noreferrer">View code ↗</a></div>
            <div id={`detail-${project.number}`} className={styles.detailWrap} data-expanded={expanded === project.number} inert={expanded !== project.number}><div><p className={styles.projectDetail}>{project.detail}</p></div></div>
          </article>)}
        </div>
        <a className={styles.allRepos} href="https://github.com/deshanFdo?tab=repositories" target="_blank" rel="noopener noreferrer">There’s more in the workshop. <span>Explore GitHub ↗</span></a>
      </section>

      <BuildFlow motion={motion} />

      <section className={styles.about} id="about-studio" aria-labelledby="about-title">
        <div className={styles.aboutLeft} data-reveal><span className={styles.sectionLabel}>03 / THE PERSON BEHIND THE CODE</span><h2 id="about-title">A curious mind.<br />A builder’s<br /><em>instinct.</em></h2><div className={styles.monogram} aria-hidden="true"><span>DF</span><i>✳</i><small>COLOMBO, SRI LANKA / 6.9271° N</small></div></div>
        <div className={styles.aboutRight} data-reveal data-reveal-order="1"><p className={styles.aboutLead}>I like understanding how things work.<br />Then making them work better.</p><p>I’m a Computer Science undergraduate at the University of Westminster / IIT, with software engineering internship experience at Sri Lanka Telecom. My work spans assessment APIs, role-based access, database interactions, and React interfaces.</p><p>I’m looking for an Associate Software Engineer or Software Engineer role where I can contribute, keep learning, and build useful software with a thoughtful team.</p>
          <div className={styles.experienceRow}><span>EXPERIENCE</span><div><h3>Sri Lanka Telecom</h3><p>Software Engineer Intern</p><small>Jun 2025 — May 2026</small></div><span>↗</span></div>
          <div className={styles.experienceRow}><span>EDUCATION</span><div><h3>BSc (Hons) Computer Science</h3><p>University of Westminster / IIT</p><small>Expected graduation · May 2027</small></div><span>↗</span></div>
          <a className={styles.textLink} href="/Portfolio/Deshan_Fernando_CV.pdf" target="_blank" rel="noopener noreferrer">The full story, in my CV ↗</a>
        </div>
      </section>

      <section className={styles.contact} id="contact-studio" aria-labelledby="contact-title"><div className={styles.contactTop} data-reveal><span>04 / NEXT CHAPTER</span><span className={styles.availability}><i /> OPEN TO OPPORTUNITIES</span></div><h2 id="contact-title" data-reveal>Let’s build<br />something <em>good.</em><span aria-hidden="true">↗</span></h2><div className={styles.contactBottom} data-reveal><p>Have a role, a project, or an interesting problem?<br />I’d love to hear about it.</p><div><a className={styles.emailLink} href={`mailto:${email}`}>{email} ↗</a><button onClick={copyEmail}>{copied ? "Email copied ✓" : "Copy email +"}</button><span className={styles.copyStatus} role="status">{copyError ? "Copy unavailable. Use the email link above." : copied ? "Ready to paste into your email app." : ""}</span></div></div></section>
    </main>
    <footer className={styles.footer}><Link href="/studio" className={styles.wordmark} aria-label="Back to top">df<span>✳</span></Link><span>DESIGNED WITH INTENT. BUILT WITH CURIOSITY.</span><div><a href="https://github.com/deshanFdo" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://linkedin.com/in/DeshanFdo31" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><Link href="/">Classic ↗</Link></div></footer>
  </div>;
}
