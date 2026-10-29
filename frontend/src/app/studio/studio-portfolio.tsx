"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import RaceIntro from "./race-intro";
import { useMotionPreference, useStudioMotion } from "./studio-motion";
import styles from "./studio.module.css";

const Robot = dynamic(() => import("../../../components/SplineEmbed"), {
  ssr: false,
  loading: () => <div className={styles.robotPlaceholder}>Bringing the garage online…</div>,
});

const projects = [
  {
    number: "01", name: "Enterprise Developer API Portal", shortName: "API PORTAL",
    category: "BACKEND & INTEGRATIONS", visual: "portal",
    tags: ["React", "Node.js", "WSO2", "Docker"],
    description: "Weather, markets, and crypto. One connected dashboard, with a structured API layer doing the work behind it.",
    detail: "A React dashboard connects to Express services through WSO2 gateway configuration and OpenAPI definitions. The repository includes containers and GitHub Actions workflows for the deployment setup.",
    href: "https://github.com/deshanFdo/apiPortal",
  },
  {
    number: "02", name: "LawLinkLK", shortName: "LAWLINK LK",
    category: "FULL-STACK APPLICATION", visual: "law",
    tags: ["React", "Express", "MongoDB", "Socket.IO"],
    description: "Connecting clients with lawyers in Sri Lanka through messaging, appointments, and an interface built around the conversation.",
    detail: "A React frontend and Node.js backend bring together authentication, role-based access, and Socket.IO messaging to support the consultation flow.",
    href: "https://github.com/deshanFdo/LawLink-LK",
  },
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

function Circuit({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 620 430" fill="none" aria-hidden="true">
    <path className={styles.trackOutline} d="M116 94H420Q484 94 484 150V178Q484 212 528 212H549Q580 212 580 250V298Q580 338 533 338H395L351 291H281L221 354H116Q57 354 57 298V214L111 170V130Q111 109 116 94Z" />
    <path className={styles.trackLine} d="M116 94H420Q484 94 484 150V178Q484 212 528 212H549Q580 212 580 250V298Q580 338 533 338H395L351 291H281L221 354H116Q57 354 57 298V214L111 170V130Q111 109 116 94Z" />
    <path d="M177 78V110M184 78V110" stroke="currentColor" strokeWidth="3" />
    <circle cx="484" cy="152" r="5" fill="currentColor" />
    <circle cx="57" cy="285" r="5" fill="currentColor" />
  </svg>;
}

function ProjectArt({ type }: { type: string }) {
  if (type === "portal") return <div className={styles.portalArt} aria-hidden="true">
    <div className={styles.artTop}><span>API PORTAL</span><span>INTEGRATION STUDY / 01</span></div>
    <div className={styles.apiWindow}>
      <div className={styles.windowTop}><span><i /><i /><i /></span><b>/api/v1</b></div>
      <div className={styles.apiRows}><span>GET</span><b>/weather</b><i>200</i><span>GET</span><b>/markets</b><i>200</i><span>GET</span><b>/crypto</b><i>200</i></div>
      <div className={styles.apiBars}><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
    </div>
    <div className={styles.artNodes}><span>CLIENT</span><i>→</i><span>GATEWAY</span><i>→</i><span>SERVICES</span></div>
    <span className={styles.artCaption}>ARCHITECTURE CONCEPT</span>
  </div>;
  return <div className={styles.lawArt} aria-hidden="true">
    <div className={styles.artTop}><span>LAWLINK LK</span><span>INTERFACE STUDY / 02</span></div>
    <div className={styles.lawWindow}>
      <div className={styles.lawBrand}>LawLink<span>LK</span><b>↗</b></div>
      <div className={styles.chatHeader}><span className={styles.avatar}>L</span><div><b>A closer connection.</b><small>Client ↔ Lawyer</small></div></div>
      <div className={styles.chatBubble}>A conversation starts here.<span>Let’s find a time to talk.</span></div>
      <div className={styles.chatReply}><span /><span /><span /></div>
      <div className={styles.chatInput}>Type a message… <span>↗</span></div>
    </div>
    <span className={styles.artCaption}>INTERFACE CONCEPT</span>
  </div>;
}

export default function StudioPortfolio() {
  const page = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const { motion, reduced, toggleMotion } = useMotionPreference();
  const [introComplete, setIntroComplete] = useState(false);
  const [robotOn, setRobotOn] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const email = "deshanfernando67@gmail.com";
  const animate = motion && introComplete;
  const showRobot = introComplete && (robotOn ?? motion);
  const finishIntro = useCallback(() => setIntroComplete(true), []);
  useStudioMotion(page, progress, animate);

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

  return <>
    {!introComplete && <RaceIntro onFinish={finishIntro} />}
    <div ref={page} id="studio-top" className={styles.studio} data-motion={animate ? "on" : "off"}>
      <div ref={progress} className={styles.readingProgress} aria-hidden="true" />
      <a className={styles.skip} href="#selected-work">Skip to selected work</a>
      <header className={styles.nav}>
        <a href="#studio-top" className={styles.wordmark} aria-label="Deshan Fernando, back to top">DF<span>{"//"}</span></a>
        <nav aria-label="Studio navigation"><a href="#selected-work">WORK<span>01</span></a><a href="#about-studio">ABOUT<span>02</span></a><a href="#contact-studio">CONTACT<span>03</span></a></nav>
        <div className={styles.navActions}>
          <button className={styles.motionButton} onClick={togglePageMotion} disabled={reduced} aria-label={reduced ? "Motion disabled by your system preference" : "Pause page animations"} aria-pressed={!motion}><span aria-hidden="true">{motion ? "Ⅱ" : "▷"}</span> MOTION {motion ? "ON" : "OFF"}</button>
          <Link href="/" className={styles.classicLink}>CLASSIC <Arrow /></Link>
        </div>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="studio-heading" data-motion-region>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow} data-reveal><span /> SOFTWARE ENGINEER / COLOMBO, LK</p>
            <h1 id="studio-heading" tabIndex={-1}><span data-reveal>DESHAN</span><span data-reveal data-reveal-order="1">FERNANDO<span className={styles.period}>.</span></span></h1>
            <p className={styles.heroTagline} data-reveal data-reveal-order="2">PRECISION IN THE BACKEND.<br /><span>PERSONALITY IN THE EXPERIENCE.</span></p>
            <p className={styles.heroIntro} data-reveal data-reveal-order="2">I build connected systems and thoughtful interfaces. Driven by curiosity, inspired by the precision of motorsport.</p>
            <div className={styles.heroActions} data-reveal data-reveal-order="3"><a href="#selected-work" className={styles.primary}>EXPLORE THE WORK <Arrow /></a><a className={styles.textLink} href="/Portfolio/Deshan_Fernando_CV.pdf" target="_blank" rel="noopener noreferrer">VIEW CV <Arrow /></a></div>
            <div className={styles.availability} data-reveal data-reveal-order="3"><span /> OPEN TO ASSOCIATE SE & SE ROLES</div>
          </div>

          <div className={styles.robotStage} data-reveal data-reveal-order="2">
            <div className={styles.stageTop}><span><i /> THE GARAGE</span><span>INTERACTIVE / 01</span></div>
            <span className={styles.stageNumber} aria-hidden="true">01</span>
            <Circuit className={styles.heroCircuit} />
            <div className={styles.robotViewport}>{showRobot ? <Robot style={{}} onLoad={undefined} className={undefined} scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" /> : <div className={styles.robotRest}><span>IN THE PITS.</span><p>Your robot is taking a break.</p><button onClick={() => setRobotOn(true)}>Wake the robot <Arrow /></button></div>}</div>
            <div className={styles.stageBottom}><div><strong>YOUR INTERACTIVE CO-PILOT.</strong><small>Move your pointer. Meet the robot.</small></div><button onClick={() => setRobotOn(!showRobot)} aria-pressed={!showRobot}>{showRobot ? "PAUSE" : "WAKE"} <span aria-hidden="true">{showRobot ? "Ⅱ" : "▷"}</span></button></div>
            <div className={styles.stageStripe} aria-hidden="true" />
          </div>
          <div className={styles.heroRail}><span>BACKEND + FULL-STACK</span><span className={styles.railLine} /><span>PRECISION. ITERATION. PROGRESS.</span><span className={styles.checkers} aria-hidden="true" /></div>
        </section>

        <div className={styles.skillsRibbon} aria-label="Core technologies"><span>THE SETUP <i aria-hidden="true">↗</i></span>{["TypeScript", "React", "Node.js", "MySQL", "Docker", "REST APIs"].map(skill => <b key={skill}>{skill}</b>)}</div>

        <section className={styles.work} id="selected-work" aria-labelledby="work-title">
          <div className={styles.sectionLabel} data-reveal><span><i>01</i> SELECTED WORK</span><span>IDEAS PUT INTO MOTION</span></div>
          <div className={styles.sectionHeading} data-reveal><h2 id="work-title">UNDER<br /><span>THE HOOD.</span></h2><p>Two applications. Different challenges.<br />A closer look at what I’ve been building.</p></div>
          <div className={styles.projectList}>
            {projects.map(project => <article className={styles.project} key={project.number} data-reveal>
              <a className={styles.artLink} href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${project.name} on GitHub`}><ProjectArt type={project.visual} /><span className={styles.artArrow} aria-hidden="true">↗</span></a>
              <div className={styles.projectCopy}>
                <div className={styles.projectMeta}><span>BUILD / {project.number}</span><span>{project.category}</span></div>
                <h3>{project.shortName}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.tags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                <details className={styles.projectDetails}><summary>UNDER THE HOOD <span aria-hidden="true">+</span></summary><p>{project.detail}</p></details>
                <a className={styles.projectCode} href={project.href} target="_blank" rel="noopener noreferrer">EXPLORE THE CODE <Arrow /></a>
              </div>
            </article>)}
          </div>
          <a className={styles.experiment} href="https://github.com/deshanFdo/card-sawp" target="_blank" rel="noopener noreferrer" data-reveal><span className={styles.experimentNumber}>03</span><div><span>AN EXPERIMENT FROM THE GARAGE</span><h3>CARD SWAP</h3></div><p>A small study in motion, layering,<br />and how an interface feels.</p><span className={styles.experimentStack} aria-hidden="true"><i /><i /><i /></span><Arrow /></a>
          <a className={styles.allRepos} href="https://github.com/deshanFdo?tab=repositories" target="_blank" rel="noopener noreferrer">MORE FROM THE GARAGE <span>ALL REPOSITORIES ↗</span></a>
        </section>

        <section className={styles.about} id="about-studio" aria-labelledby="about-title">
          <div className={styles.aboutIdentity} data-reveal data-motion-region>
            <div className={styles.sectionLabel}><span><i>02</i> THE ENGINEER</span></div>
            <div className={styles.driverCard}>
              <div className={styles.driverCardTop}><span>ENGINEER PROFILE</span><span className={styles.checkers} aria-hidden="true" /></div>
              <span className={styles.driverMonogram} aria-hidden="true">DF<span>01</span></span>
              <Circuit className={styles.profileCircuit} />
              <div className={styles.driverCardBottom}><b>DESHAN FERNANDO</b><span>COLOMBO, SRI LANKA</span><small>BACKEND / FULL-STACK</small></div>
            </div>
          </div>
          <div className={styles.aboutCopy} data-reveal data-reveal-order="1">
            <h2 id="about-title">CURIOSITY.<br /><span>WITH DIRECTION.</span></h2>
            <p>I’m a Computer Science undergraduate at the University of Westminster / IIT, with software engineering internship experience at Sri Lanka Telecom.</p>
            <p>My work spans assessment APIs, role-based access, databases, and React interfaces. I enjoy connecting those pieces into software that’s clear, useful, and considered.</p>
            <div className={styles.experienceRow}><span>EXPERIENCE</span><div><h3>Sri Lanka Telecom</h3><p>Software Engineer Intern</p><small>Jun 2025 — May 2026</small></div></div>
            <div className={styles.experienceRow}><span>EDUCATION</span><div><h3>BSc (Hons) Computer Science</h3><p>University of Westminster / IIT</p><small>Expected graduation · May 2027</small></div></div>
            <a className={styles.textLink} href="/Portfolio/Deshan_Fernando_CV.pdf" target="_blank" rel="noopener noreferrer">READ MY CV <Arrow /></a>
          </div>
        </section>

        <section className={styles.contact} id="contact-studio" aria-labelledby="contact-title">
          <div className={styles.sectionLabel} data-reveal><span><i>03</i> THE NEXT CHAPTER</span><span>LET’S MAKE IT COUNT</span></div>
          <div className={styles.contactHeading} data-reveal><h2 id="contact-title">READY FOR<br />WHAT’S NEXT<span>?</span></h2><span className={styles.contactArrow} aria-hidden="true">↗</span></div>
          <div className={styles.contactBottom} data-reveal><p>Looking for an Associate Software Engineer<br />or Software Engineer? Let’s talk.</p><div><a className={styles.emailLink} href={`mailto:${email}`}>{email} <Arrow /></a><button onClick={copyEmail}>{copied ? "EMAIL COPIED ✓" : "COPY EMAIL +"}</button><span className={styles.copyStatus} role="status">{copyError ? "Copy unavailable. Use the email link above." : copied ? "Ready to paste into your email app." : ""}</span></div></div>
        </section>
      </main>

      <footer className={styles.footer}><a href="#studio-top" className={styles.wordmark} aria-label="Back to top">DF<span>{"//"}</span></a><span>BUILT WITH INTENT. ALWAYS ITERATING.</span><div><button onClick={() => setIntroComplete(false)} disabled={reduced}>REPLAY INTRO ↻</button><a href="https://github.com/deshanFdo" target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href="https://linkedin.com/in/DeshanFdo31" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a></div></footer>
    </div>
  </>;
}
