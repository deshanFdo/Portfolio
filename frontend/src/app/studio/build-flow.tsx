"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import styles from "./build-flow.module.css";
import studio from "./studio.module.css";

const steps = [
  {
    title: "Understand", subtitle: "Start with the right question.", icon: "?",
    heading: "Before the code, the why.",
    description: "Who is this for? What should be easier for them? I start by turning a broad idea into a small, clear problem.",
    output: "A focused brief", notes: ["The person using it", "The problem worth solving", "A useful first version"],
    annotation: "01 — DEFINE THE PROBLEM", sketch: ["WHO?", "WHY?", "WHAT IF?"],
  },
  {
    title: "Design", subtitle: "Give the idea a structure.", icon: "◇",
    heading: "Make the connections clear.",
    description: "I map the user journey, sketch the interface, and think through the API contracts and data relationships behind it.",
    output: "A connected plan", notes: ["User journeys & interface states", "API boundaries & data models", "The smallest path through the system"],
    annotation: "02 — CONNECT THE PIECES", sketch: ["INTERFACE", "API", "DATA"],
  },
  {
    title: "Build", subtitle: "Bring one useful slice to life.", icon: "</>",
    heading: "Small pieces. Working together.",
    description: "I connect the interface to the backend, make the happy path work, then handle the loading, empty, and error states around it.",
    output: "A working slice", notes: ["Readable, focused components", "Validation & access boundaries", "Feedback for every interaction"],
    annotation: "03 — MAKE IT WORK", sketch: ["REQUEST", "VALIDATE", "RESPOND"],
  },
  {
    title: "Refine", subtitle: "Try it. Question it. Improve it.", icon: "↻",
    heading: "The details make the difference.",
    description: "I look for rough edges: a confusing message, an awkward mobile layout, or a slow interaction. Then I make the next version better.",
    output: "A more considered experience", notes: ["Realistic inputs & edge cases", "Keyboard & mobile checks", "Feedback that shapes the next iteration"],
    annotation: "04 — CLOSE THE LOOP", sketch: ["TRY", "LEARN", "IMPROVE"],
  },
];

const journey = [
  "Ready when you are. Send a sample request.",
  "01 / The interface sends a request.",
  "02 / The API checks the input.",
  "03 / The data layer returns a result.",
  "04 / The interface receives a response.",
];

export default function BuildFlow({ motion }: { motion: boolean }) {
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const step = steps[active];

  useEffect(() => {
    if (!playing) return;
    if (!motion) {
      setPhase(4);
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => {
      if (phase >= 3) {
        setPhase(4);
        setPlaying(false);
      } else setPhase(value => value + 1);
    }, 720);
    return () => window.clearTimeout(timer);
  }, [playing, phase, motion]);

  function selectTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % steps.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + steps.length - 1) % steps.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = steps.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  function playRequest() {
    setPhase(motion ? 1 : 4);
    setPlaying(motion);
  }

  return (
    <section className={styles.flow} id="build-flow" aria-labelledby="flow-title">
      <div className={studio.sectionLabel} data-reveal><span>02 / HOW I BUILD</span><span>A LITTLE METHOD TO THE CURIOSITY</span></div>
      <div className={`${studio.sectionHeading} ${styles.heading}`} data-reveal>
        <h2 id="flow-title">From a <em>what if.</em><br />To a <em>here it is.</em></h2>
        <p>Good software starts with a question.<br />Here’s how I like to find the answer.</p>
      </div>

      <div className={styles.workbench} data-reveal>
        <div className={styles.stepList} role="tablist" aria-label="Explore my building process" aria-orientation="vertical">
          {steps.map((item, index) => (
            <button
              key={item.title} ref={node => { tabs.current[index] = node; }}
              role="tab" id={`build-tab-${index}`} aria-controls="build-panel"
              aria-selected={active === index} tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)} onKeyDown={event => selectTab(event, index)}
            >
              <span className={styles.stepNumber}>0{index + 1}</span>
              <span><strong>{item.title}</strong><small>{item.subtitle}</small></span>
              <span className={styles.stepArrow} aria-hidden="true">↗</span>
            </button>
          ))}
          <div className={styles.processNote}><span aria-hidden="true">↳</span> A loop, more than a straight line.</div>
        </div>

        <div className={styles.panel} id="build-panel" role="tabpanel" aria-labelledby={`build-tab-${active}`} tabIndex={0}>
          <div key={active} className={styles.panelContent}>
            <div className={styles.sketch} data-step={active} aria-hidden="true">
              <span className={styles.sketchLabel}>{step.annotation}</span>
              <svg viewBox="0 0 500 190" fill="none" className={styles.sketchLines}>
                <path d="M80 115 C150 10 350 10 420 115" />
                <path d="M80 115 C150 210 350 210 420 115" />
                <path d="M80 115 H420" className={styles.drawLine} />
                <circle cx="250" cy="115" r="64" />
              </svg>
              <div className={styles.sketchNodes}><span>{step.sketch[0]}</span><b>{step.icon}</b><span>{step.sketch[2]}</span></div>
              <span className={styles.sketchCenter}>{step.sketch[1]}</span>
              <span className={styles.sketchMark}>DF / FIELD NOTES</span>
            </div>
            <div className={styles.panelCopy}>
              <h3>{step.heading}</h3><p>{step.description}</p>
              <ul>{step.notes.map(note => <li key={note}><span aria-hidden="true">↗</span>{note}</li>)}</ul>
              <div className={styles.output}><span>THE OUTCOME</span><strong>{step.output}</strong></div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.requestLab} data-reveal>
        <div className={styles.labIntro}><span className={styles.labLabel}>A TINY INTERACTIVE EXPLAINER</span><h3>Follow the <em>request.</em></h3><p>One click. A few connections.<br /> See how an interface talks to a backend.</p></div>
        <div className={styles.labPlayground}>
          <div className={styles.requestTrack} data-phase={phase} aria-hidden="true">
            <div className={styles.requestNode} data-active={phase === 1 || phase === 4}><span>⌘</span><b>Interface</b><small>{phase === 4 ? "Response received" : "Send a request"}</small></div>
            <div className={styles.wire} data-active={phase === 1 || phase === 4} data-return={phase === 4}><i key={phase} /></div>
            <div className={styles.requestNode} data-active={phase === 2}><span>{"{ }"}</span><b>API</b><small>Check & coordinate</small></div>
            <div className={styles.wire} data-active={phase === 2 || phase === 3} data-return={phase === 3}><i key={phase} /></div>
            <div className={styles.requestNode} data-active={phase === 3}><span>≡</span><b>Data</b><small>Find the result</small></div>
          </div>
          <div className={styles.labControls}>
            <button onClick={playRequest} disabled={playing}>{playing ? "Following request…" : phase === 4 ? "Run it again" : "Send a request"}<span aria-hidden="true">{playing ? "···" : "↗"}</span></button>
            <span className={styles.requestStatus} role="status" aria-live="polite">{journey[phase]}</span>
          </div>
          <p className={styles.labFootnote}>Illustrative demo · Interface → API → Data → Interface. Runs entirely on this page.</p>
        </div>
      </div>
    </section>
  );
}
