"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, MotionConfig, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight, Check, Copy, Github, Menu, Play, RotateCcw, X, Plus, Minus } from "lucide-react";
import FerrariCar from "./FerrariCar";
import CareerCollection from "./CareerCollection";
import s from "./FerrariExperience.module.css";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "/Portfolio";
const EMAIL = "deshanfernando67@gmail.com";
const Spline = dynamic(() => import("./SplineEmbed"), { ssr: false, loading: () => <p className={s.robotLoading}>Waking your co-driver…</p> });
const BUILDS = [
    { name: "API Portal", number: "01", category: "CONNECTED SYSTEMS", title: "Different sources. One clear interface.", text: "A developer dashboard connecting weather, stock and cryptocurrency APIs through a React interface and Node.js services. An exploration of gateway patterns, API contracts and integration workflows.", stack: ["React", "Node.js", "Express", "OpenAPI", "Docker"], source: "https://github.com/deshanFdo/apiPortal", kind: "api" },
    { name: "TaskFlow AI", number: "02", category: "BACKEND + AI", title: "Structure that makes room for progress.", text: "A learning project built with NestJS, PostgreSQL and JWT authentication, exploring validated task workflows, OpenAPI documentation and AI task features.", stack: ["NestJS", "TypeScript", "PostgreSQL", "Gemini AI"], source: "https://github.com/deshanFdo/taskflow-nestjs-api", live: "https://taskflow-nestjs-api-six.vercel.app", kind: "tasks" },
    { name: "LawLinkLK", number: "03", category: "REAL-TIME APPLICATIONS", title: "Better conversations. Fewer barriers.", text: "A full-stack legal consultation platform bringing together appointment workflows, real-time messaging and an LLM-powered assistant. Built with React, Node.js, MongoDB and Socket.IO.", stack: ["React", "Node.js", "MongoDB", "Socket.IO", "LLM APIs"], source: "https://github.com/deshanFdo/LawLinkLK", kind: "law" },
    { name: "Floorplan → 3D", number: "04", category: "RESEARCH + EXPERIMENTS", title: "A new dimension starts with a flat plan.", text: "An experimental computer-vision pipeline exploring floorplan detection, geometric extraction and procedural 3D structures. A research prototype that continues to evolve.", stack: ["Python", "PyTorch", "OpenCV", "FastAPI", "React"], kind: "spatial" }
];
function ProjectArt({ kind }) {
    if (kind === "api")
        return <div className={s.apiArt} aria-hidden="true"><div className={s.apiOrbit}/><span>WEATHER</span><span>MARKETS</span><span>CRYPTO</span><b>API<span>ONE GATEWAY.</span></b><i /><i /><i /></div>;
    if (kind === "tasks")
        return <div className={s.taskArt} aria-hidden="true"><div><span>THE NEXT ITERATION</span><b>Make<br /><em>it happen.</em></b><p><i /> Define the contract <Check size={12}/></p><p><i /> Connect the pieces</p><p><i /> Refine the details</p></div><span className={s.taskSticker}>02<br /><small>BUILD</small></span></div>;
    if (kind === "law")
        return <div className={s.lawArt} aria-hidden="true"><div className={s.lawCircle}/><b>LAW<br /><em>LINK.</em></b><span>PEOPLE</span><span>CONVERSATIONS</span><span>CONNECTIONS</span><i>↗</i></div>;
    return <div className={s.spatialArt} aria-hidden="true"><svg viewBox="0 0 500 300" fill="none"><path d="m50 210 180 75 230-105-180-75Z" stroke="currentColor" opacity=".25"/><path d="M100 190V90l130 55v110m0-110 170-80v105M100 90l170-70 130 45M270 20v100M160 215V115l170-72m-100 66 100 42v57M280 232v-60l35-17v60" stroke="currentColor" strokeWidth="2"/><path d="M100 190 230 245 400 170M40 245 260 150M90 270 310 175" stroke="currentColor" strokeDasharray="3 7" opacity=".5"/></svg><span>2D → GEOMETRY → 3D</span></div>;
}
function BuildInteraction({ kind }) {
    const [state, setState] = useState(false);
    const [done, setDone] = useState([false, true, false]);
    const [channel, setChannel] = useState("Messaging");
    if (kind === "tasks")
        return <div className={s.interaction}><span>TRY IT / LOCAL TASK INTERACTION</span><div className={s.interactionTasks}>{["Define the contract", "Connect the data", "Ship the iteration"].map((t, i) => <button key={t} aria-pressed={done[i]} onClick={() => setDone(done.map((v, j) => i === j ? !v : v))}><i>{done[i] && <Check size={13}/>}</i>{t}</button>)}</div><p aria-live="polite">{done.filter(Boolean).length} / 3 completed. Changes stay in this preview.</p></div>;
    if (kind === "api")
        return <div className={s.interaction}><span>TRY IT / SAMPLE API RESPONSE</span><div className={s.sampleRequest}><code>GET /api/weather</code><button onClick={() => setState(!state)}>{state ? "Reset" : "Run sample"}<Play size={12}/></button></div><pre aria-live="polite">{state ? '200 OK\n{ "city": "Colombo", "source": "sample" }' : '// Ready to route a sample request.'}</pre><p>Illustrative data. This preview does not call a live API.</p></div>;
    if (kind === "law")
        return <div className={s.interaction}><span>EXPLORE / THE CONNECTIONS</span><div className={s.channelButtons}>{["Messaging", "Appointments", "AI assistant"].map(t => <button key={t} aria-pressed={channel === t} onClick={() => setChannel(t)}>{t}</button>)}</div><p aria-live="polite">{{ Messaging: "Socket.IO supports real-time conversations between clients and lawyers.", Appointments: "Booking workflows help people arrange a consultation.", "AI assistant": "An LLM integration supports the platform’s assistance workflow." }[channel]}</p></div>;
    return <div className={`${s.interaction} ${state ? s.structureRaised : ""}`}><span>EXPLORE / AN ILLUSTRATIVE STRUCTURE</span><div className={s.structureMini}><ProjectArt kind="spatial"/></div><button className={s.structureButton} onClick={() => setState(!state)}>{state ? "Back to plan" : "Raise the structure"}<Plus size={14}/></button><p>Concept visual for the research pipeline, not a live model generator.</p></div>;
}
function BuildDialog({ project, onClose }) {
    const ref = useRef(null);
    useEffect(() => { const d = ref.current; if (project)
        d.showModal();
    else if (d.open)
        d.close(); }, [project]);
    return <dialog ref={ref} className={s.buildDialog} onCancel={onClose} onClick={e => { if (e.target === ref.current)
        onClose(); }} aria-label={project ? `${project.name} case study` : "Project case study"}>
 {project && <><div className={s.dialogHeader}><span>BUILD / {project.number} — {project.category}</span><button onClick={onClose} aria-label="Close case study"><X size={22}/></button></div><div className={s.dialogBody}><h2>{project.name}</h2><h3>{project.title}</h3><p>{project.text}</p><ul className={s.techTags}>{project.stack.map(t => <li key={t}>{t}</li>)}</ul><BuildInteraction key={project.kind} kind={project.kind}/><div className={s.dialogLinks}>{project.source && <a href={project.source} target="_blank" rel="noopener noreferrer">View source <Github size={15}/></a>}{project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">Open project <ArrowUpRight size={15}/></a>}{!project.source && <span>RESEARCH PROTOTYPE / ONGOING EXPLORATION</span>}</div></div></>}
 </dialog>;
}
function Ignition({ onDone }) {
    useEffect(() => { const t = setTimeout(onDone, 1600), prev = document.body.style.overflow; document.body.style.overflow = "hidden"; return () => { clearTimeout(t); document.body.style.overflow = prev; }; }, [onDone]);
    return <motion.div className={s.ignition} exit={{ opacity: 0 }} transition={{ duration: .4 }}><span>ROSSO / WORKS — FERRARI EDITION</span><div><p>PASSION. IN MOTION.</p><h2>ANDIAMO<span>↗</span></h2><div className={s.ignitionLights} aria-hidden="true">{[0, 1, 2, 3, 4].map(i => <i key={i} style={{ animationDelay: `${i * .16}s` }}/>)}</div></div><button onClick={onDone}>Enter the garage <ArrowRight size={16}/></button></motion.div>;
}
export default function FerrariExperience() {
    const reduced = useReducedMotion();
    const [menu, setMenu] = useState(false), [running, setRunning] = useState(false), [aero, setAero] = useState(false), [project, setProject] = useState(null), [robot, setRobot] = useState(false), [copied, setCopied] = useState(false), [copyFailed, setCopyFailed] = useState(false), [intro, setIntro] = useState(false), [focus, setFocus] = useState(0);
    const heroRef = useRef(null), timer = useRef(null);
    const finishIntro = useCallback(() => setIntro(false), []);
    const { scrollYProgress } = useScroll(), progress = useSpring(scrollYProgress, { stiffness: 130, damping: 30 });
    const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const carX = useTransform(heroScroll, [0, 1], [0, 110]);
    useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return; try {
        if (!sessionStorage.getItem("rosso-ignition-v1")) {
            setIntro(true);
            sessionStorage.setItem("rosso-ignition-v1", "1");
        }
    }
    catch { /* The page remains usable without storage. */ } }, []);
    useEffect(() => () => clearTimeout(timer.current), []);
    async function copyEmail() { try {
        await navigator.clipboard.writeText(EMAIL);
        setCopied(true);
        setCopyFailed(false);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 2500);
    }
    catch {
        setCopyFailed(true);
    } }
    const setup = [{ name: "The cockpit", label: "01 / FRONTEND", text: "React, Next.js and TypeScript interfaces. Clear interactions that work across screen sizes." }, { name: "The power unit", label: "02 / BACKEND", text: "Node.js, Express and NestJS services. REST APIs, authentication and application workflows." }, { name: "The foundation", label: "03 / DATA & DELIVERY", text: "PostgreSQL, MySQL and MongoDB. Git, Docker and GitHub Actions to connect the build process." }];
    return <MotionConfig reducedMotion="user"><div className={s.ferrari}><AnimatePresence>{intro && <Ignition onDone={finishIntro}/>}</AnimatePresence><a className={s.skip} href="#ferrari-work">Skip to projects</a><motion.div className={s.progress} style={{ scaleX: reduced ? scrollYProgress : progress }} aria-hidden="true"/>
 <header className={s.nav}><a className={s.brand} href="#ferrari-home" aria-label="Rosso Works, Deshan Fernando home"><span className={s.shield}>DF</span><span>ROSSO / WORKS<small>THE FERRARI EDITION</small></span></a><nav className={menu ? s.menuOpen : ""} aria-label="Ferrari navigation">{[["ferrari-work", "The machines"], ["ferrari-driver", "The driver"], ["ferrari-credentials", "Credentials"], ["ferrari-contact", "The next move"]].map(([id, name]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{name}</a>)}</nav><div className={s.navActions}><a className={s.switchEdition} href={`${BASE}/`}>Silverworks <ArrowUpRight size={14}/></a><button className={s.mobileMenu} onClick={() => setMenu(!menu)} aria-label={menu ? "Close Ferrari navigation" : "Open Ferrari navigation"} aria-expanded={menu}>{menu ? <X size={22}/> : <Menu size={22}/>}</button></div></header>
 <main><section className={s.hero} id="ferrari-home" ref={heroRef}><div className={s.heroEyebrow}><span><i /> DESHAN FERNANDO / SOFTWARE ENGINEER</span><span>COLOMBO, SRI LANKA</span></div><div className={s.heroHeading}><h1>SOFTWARE.<br /><em>WITH SPIRIT.</em></h1><div className={s.driverNumber} aria-hidden="true">31<span>PASSIONE / PRECISIONE</span></div><div className={s.heroSide}><span>THE NEXT CHAPTER</span><p>Associate & Junior<br />Software Engineer roles.</p><a href={`${BASE}/Deshan_Fernando_CV.pdf`} target="_blank" rel="noopener noreferrer">View my CV <ArrowUpRight size={14}/></a></div></div><div className={s.heroDescription}><p>I build interfaces, connect systems,<br />and sweat the details that make them work.</p><a className={s.heroCTA} href="#ferrari-work">Discover the machines <ArrowUpRight size={20}/></a></div>
 <div className={`${s.carStage} ${running ? s.trackActive : ""}`}><div className={s.speedLines} aria-hidden="true"><i /><i /><i /><i /></div><motion.div className={s.carWrap} style={{ x: reduced ? 0 : carX }}><FerrariCar running={running} aero={aero}/></motion.div><div className={s.carStageCaption}><span>DF—31 / AN ORIGINAL RACING STUDY</span><span>{running ? "TRACK DISPLAY ACTIVE" : "A LITTLE FIRE. A LOT OF INTENT."}</span></div></div>
 <div className={s.heroControls}><div className={s.launchStatus}><div className={s.launchLights} aria-hidden="true">{[0, 1, 2, 3, 4].map(i => <i key={`${running}-${i}`} className={running ? s.lightOn : ""} style={{ animationDelay: `${i * .1}s` }}/>)}</div><span>{running ? "PASSION IN MOTION" : "READY WHEN YOU ARE"}</span></div><div className={s.displayControls}><button onClick={() => setRunning(!running)} aria-pressed={running}>{running ? <RotateCcw size={14}/> : <Play size={14}/>} {running ? "Back to garage" : "Start the engine"}</button><button onClick={() => setAero(!aero)} aria-pressed={aero}>{aero ? <Minus size={14}/> : <Plus size={14}/>} {aero ? "Hide airflow" : "Explore the aero"}</button></div></div></section>
 <div className={s.statement}><span>ITALIAN RACING SOUL.<br />A BUILDER’S MINDSET.</span><p>MADE TO <em>MOVE YOU.</em><ArrowUpRight /></p><div className={s.flag} aria-label="Italian racing inspiration"><i /><i /><i /></div></div>
 <section id="ferrari-work" className={s.work}><div className={s.sectionTop}><span>01 / THE MACHINES</span><span>SELECTED BUILDS / OPEN THE BONNET</span></div><div className={s.workHeading}><h2>BEAUTY IS<br /><em>IN THE BUILD.</em></h2><p>Not just what you see.<br />What happens underneath.<br /><span>Select a project to explore.</span></p></div><div className={s.projectGrid}>{BUILDS.map((p, i) => <motion.article key={p.name} className={`${s.projectCard} ${s[`card${i}`]}`} initial={{ y: 18 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: reduced ? 0 : .5 }}><button className={s.projectOpen} onClick={() => setProject(p)} aria-label={`Explore ${p.name}`}><div className={s.cardTop}><span>BUILD / {p.number}</span><span>{p.category}</span></div><div className={s.projectArt}><ProjectArt kind={p.kind}/></div><div className={s.cardBottom}><div><span>{p.stack.slice(0, 3).join(" / ")}</span><h3>{p.name}</h3></div><span className={s.openCircle}><ArrowUpRight size={23}/></span></div></button></motion.article>)}</div><div className={s.workBottom}><span>GOOD WORK IS NEVER THE LAST ITERATION.</span><a href="https://github.com/deshanFdo" target="_blank" rel="noopener noreferrer">More in the workshop <Github size={16}/></a></div></section>
 <section id="ferrari-driver" className={s.driver}><div className={s.sectionTop}><span>02 / THE DRIVER</span><span>CURIOUS BY NATURE. ENGINEER BY PRACTICE.</span></div><div className={s.driverGrid}><div className={s.driverCopy}><span className={s.driverKicker}>DESHAN FERNANDO / COLOMBO, LK</span><h2>THE HUMAN<br />BEHIND <em>THE DRIVE.</em></h2><p>I’m a Computer Science undergraduate at IIT, studying for a University of Westminster degree. My completed software engineering internship at Sri Lanka Telecom gave me hands-on experience with APIs, interfaces and real application workflows.</p><p>I like the point where a thoughtful interface meets a dependable system. That’s where I want to keep building.</p><div className={s.timeline}><div><span>JUN 2025 — MAY 2026</span><strong>Software Engineer Intern</strong><p>Sri Lanka Telecom PLC</p></div><div><span>EXPECTED / JUN 2027</span><strong>BSc (Hons) Computer Science</strong><p>IIT / University of Westminster</p></div></div></div><div className={s.robotGarage}><div className={s.garageTop}><span>THE CO-DRIVER</span><i>31</i></div><div className={s.robotScene}>{robot ? <Spline palette="ferrari" scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"/> : <div className={s.robotStandby}><div className={s.robotHelmet} aria-hidden="true"><span /><i /><i /></div><p>EVERY GREAT DRIVE<br />NEEDS A <em>CO-DRIVER.</em></p><button onClick={() => setRobot(true)}>Wake the robot <Play size={15}/></button><small>YOUR INTERACTIVE 3D COMPANION</small></div>}</div><div className={s.garageBottom}><span>{robot ? "MOVE YOUR POINTER. MAKE A CONNECTION." : "WAITING IN THE GARAGE."}</span>{robot && <button onClick={() => setRobot(false)}>Pause robot Ⅱ</button>}</div></div></div>
 <div className={s.setup}><div className={s.setupHeader}><span>THE ENGINEERING SETUP</span><h3>PASSION NEEDS<br /><em>A GOOD FOUNDATION.</em></h3></div><div className={s.setupPanel}><div className={s.setupTabs} role="tablist" aria-label="Engineering setup">{setup.map((t, i) => <button key={t.name} id={`setup-tab-${i}`} role="tab" aria-selected={focus === i} tabIndex={focus === i ? 0 : -1} aria-controls="setup-panel" onClick={() => setFocus(i)} onKeyDown={e => { let n; if (e.key === "ArrowRight")
        n = (i + 1) % 3; if (e.key === "ArrowLeft")
        n = (i + 2) % 3; if (e.key === "Home")
        n = 0; if (e.key === "End")
        n = 2; if (n !== undefined) {
        e.preventDefault();
        setFocus(n);
        document.getElementById(`setup-tab-${n}`)?.focus();
    } }}>{t.name}</button>)}</div><div className={s.setupContent} id="setup-panel" role="tabpanel" aria-labelledby={`setup-tab-${focus}`}><span>{setup[focus].label}</span><p>{setup[focus].text}</p></div></div></div></section>
 <CareerCollection edition="ferrari"/><section id="ferrari-contact" className={s.contact}><div className={s.sectionTop}><span>05 / THE NEXT MOVE</span><span>OPEN TO ASSOCIATE & JUNIOR OPPORTUNITIES</span></div><h2>LET’S MAKE<br /><em>SOMETHING MOVE.</em><ArrowUpRight /></h2><div className={s.contactRow}><p>An opportunity. An idea.<br />A conversation worth starting.</p><div><a className={s.email} href={`mailto:${EMAIL}`}>{EMAIL}<ArrowUpRight size={21}/></a><button onClick={copyEmail}>{copied ? <Check size={13}/> : <Copy size={13}/>} {copied ? "Email copied" : "Copy email"}</button><span role="status">{copyFailed ? "Copy unavailable. Select the email address above." : "BASED IN COLOMBO / READY FOR THE NEXT CHAPTER"}</span></div></div><div className={s.socials}><a href="https://github.com/deshanFdo" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={16}/></a><a href="https://linkedin.com/in/DeshanFdo31" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={16}/></a><a href={`${BASE}/Deshan_Fernando_CV.pdf`} target="_blank" rel="noopener noreferrer">View CV <ArrowUpRight size={16}/></a><a href="#ferrari-home">Back to pole position ↑</a></div></section></main>
 <footer className={s.footer}><span>ROSSO / WORKS<small>DESHAN FERNANDO</small></span><p>A FERRARI-INSPIRED PERSONAL PORTFOLIO.<br />INDEPENDENT FAN CREATION. NO TEAM AFFILIATION.</p><a href={`${BASE}/`}>Back to Silverworks <ArrowUpRight size={14}/></a><button onClick={() => { window.scrollTo({ top: 0, behavior: "instant" }); setIntro(true); }}>Replay ignition <RotateCcw size={13}/></button></footer><BuildDialog project={project} onClose={() => setProject(null)}/></div></MotionConfig>;
}
