"use client";

import { useState } from "react";
import { Activity, BookOpen, Code2, ExternalLink, FileText, Headphones, Play, UserRound } from "lucide-react";
import { BUILDS } from "./portfolioBuilds";
import { CREDENTIALS } from "./credentialsData";
import { PitCamera, SpeedTrace, STOP_TIME, readPitFrame } from "./PitPlayback";
import s from "./NightShift.module.css";

const stations = [
  ["Projects", Code2], ["Driver", UserRound], ["Credentials", BookOpen], ["Radio", Headphones],
];
const base = process.env.NEXT_PUBLIC_BASE_PATH || "/Portfolio";
const email = "deshanfernando67@gmail.com";

function Projects() {
  const [index, setIndex] = useState(0);
  const project = BUILDS[index];
  return <div className={s.projects}>
    <div className={s.projectList} role="group" aria-label="Select a project">
      {BUILDS.map((p, i) => <button key={p.kind} onClick={() => setIndex(i)} aria-pressed={i === index}>
        <span>{p.number}</span>{p.name}
      </button>)}
    </div>
    <article className={s.projectCopy} key={project.kind}>
      <div className={s.label}>{project.category}</div>
      <h3>{project.name}</h3>
      <p>{project.text}</p>
      <ul className={s.tags}>{project.stack.map(tech => <li key={tech}>{tech}</li>)}</ul>
      <div className={s.links}>
        {project.source && <a href={project.source} target="_blank" rel="noreferrer">Source code <ExternalLink size={14}/></a>}
        {project.live && <a href={project.live} target="_blank" rel="noreferrer">Open project <ExternalLink size={14}/></a>}
        {!project.source && <span>Research prototype · in development</span>}
      </div>
    </article>
  </div>;
}

function Station({ name }) {
  if (name === "Projects") return <Projects />;
  if (name === "Driver") return <article className={s.readout}>
    <div className={s.label}>Engineering profile / Colombo, LK</div>
    <h3>Deshan Fernando</h3>
    <p>I build web interfaces and the APIs that support them. At Sri Lanka Telecom I worked on application workflows and connecting services. I’m looking for my next role as an associate or junior software engineer.</p>
    <dl className={s.lines}>
      <div><dt>Jun 2025 – May 2026</dt><dd>Software Engineering Intern · Sri Lanka Telecom</dd></div>
      <div><dt>Education</dt><dd>BSc (Hons) Computer Science · IIT / University of Westminster</dd></div>
    </dl>
  </article>;
  if (name === "Credentials") return <article className={s.readout}>
    <div className={s.label}>Training archive</div><h3>Credentials</h3>
    <p>Certificate files are pending. These entries reserve their places in the garage.</p>
    <dl className={s.lines}>{CREDENTIALS.map(c => <div key={c.id}><dt>{c.issuer}</dt><dd>{c.title}
      {c.document && <a href={c.document}>Open certificate</a>}
      {c.verificationUrl && <a href={c.verificationUrl}>Verify credential</a>}
    </dd></div>)}</dl>
  </article>;
  return <article className={s.readout}>
    <div className={s.label}>Radio channel / open</div><h3>Talk to Deshan.</h3>
    <p>Have an associate or junior software engineering opening? Send me the role or the problem your team is working on.</p>
    <a className={s.email} href={"mailto:" + email}>{email}</a>
    <div className={s.links}>
      <a href={base + "/Deshan_Fernando_CV.pdf"} target="_blank" rel="noreferrer"><FileText size={15}/> View CV</a>
      <a href="https://github.com/deshanFdo" target="_blank" rel="noreferrer">GitHub <ExternalLink size={14}/></a>
      <a href="https://linkedin.com/in/DeshanFdo31" target="_blank" rel="noreferrer">LinkedIn <ExternalLink size={14}/></a>
    </div>
  </article>;
}

function ReplayMonitor({ replay }) {
  const [seconds, setSeconds] = useState(STOP_TIME);
  const { speed } = readPitFrame(seconds);
  return <aside className={s.instrument} aria-label="Pit stop replay monitor">
    <div className={s.instrumentHead}><Activity size={15}/> Telemetry <span>SIM REPLAY</span></div>
    <div className={s.miniFeed}><PitCamera seconds={seconds}/><small>BOX CAM</small></div>
    <div className={s.telemetry}>
      <div className={s.velocity}><strong>{speed.toString().padStart(2, "0")}</strong> km/h <span>{seconds.toFixed(1)} s</span></div>
      <SpeedTrace seconds={seconds}/>
      <label htmlFor="pit-replay">Scrub pit replay</label>
      <input id="pit-replay" type="range" min="0" max={STOP_TIME} step=".1" value={seconds} aria-valuetext={seconds.toFixed(1) + " seconds, " + speed + " kilometres per hour"} onChange={e => setSeconds(Number(e.target.value))} />
      <button className={s.smallButton} onClick={replay}><Play size={13}/> Replay pit stop</button>
    </div>
    <div className={s.sourceCredit}>Explore race data on <a href="https://formulavisuals.com/telemetry" target="_blank" rel="noreferrer">Formula Visuals <ExternalLink size={12}/></a></div>
  </aside>;
}

export default function PitWall({ replay, headingRef }) {
  const [station, setStation] = useState("Projects");
  return <section className={s.wall} aria-label="Pit wall">
    <div className={s.wallTitle}>
      <div><div className={s.label}><i className={s.online}/> Garage feed / connected</div>
        <h2 tabIndex={-1} ref={headingRef}>The pit wall<span>.</span></h2></div>
      <span className={s.wallSignature}>DF <b>/</b> 31</span>
    </div>
    <div className={s.bank}>
      <div className={s.monitor}>
        <div className={s.screenBar}><span><i className={s.online}/> Portfolio monitor</span><span>CH / 31</span></div>
        <div className={s.stationKeys} role="group" aria-label="Portfolio channels">{stations.map(([name, Icon]) =>
          <button key={name} aria-pressed={station === name} onClick={() => setStation(name)}><Icon size={16}/>{name}</button>
        )}</div>
        <div className={s.stationBody} key={station}><Station name={station}/></div>
        <div className={s.bezel}><i/>DF / PIT SYSTEMS<i/></div>
      </div>
      <ReplayMonitor replay={replay}/>
    </div>
    <div className={s.archive}>
      <div><span className={s.label}>Race archive / Formula Visuals</span><h3>São Paulo Grand Prix</h3><small>8 November 2026 · Race podium</small></div>
      <ol>{[["Norris","McLaren"],["Verstappen","Red Bull"],["Hadjar","Red Bull"]].map(([driver,team],i) => <li key={driver}><b>P{i+1}</b><span>{driver}<small>{team}</small></span></li>)}</ol>
      <a href="https://formulavisuals.com/calendar/2026/20" target="_blank" rel="noreferrer">Session results <ExternalLink size={14}/></a>
    </div>
  </section>;
}
