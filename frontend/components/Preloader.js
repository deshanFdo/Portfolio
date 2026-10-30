"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Preloader.module.css";
import MercedesStar from "./MercedesStar";

export default function Preloader({ onComplete: onFinish }) {
  const dialog = useRef(null);
  const [lights, setLights] = useState(0);
  const [go, setGo] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const element = dialog.current;
    if (preference.matches || !element || typeof element.showModal !== "function") {
      onFinish();
      return;
    }
    const previousOverflow = document.documentElement.style.overflow;
    if (!element.open) element.showModal();
    document.documentElement.style.overflow = "hidden";
    const timers = [1, 2, 3, 4, 5].map((count, index) =>
      window.setTimeout(() => setLights(count), 160 + index * 200),
    );
    timers.push(window.setTimeout(() => { setLights(0); setGo(true); }, 1450));
    timers.push(window.setTimeout(() => setLeaving(true), 1780));
    timers.push(window.setTimeout(() => element.close(), 2120));
    const preferenceChanged = () => { if (preference.matches) element.close(); };
    preference.addEventListener("change", preferenceChanged);
    return () => {
      timers.forEach(window.clearTimeout);
      preference.removeEventListener("change", preferenceChanged);
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [onFinish]);

  return <dialog ref={dialog} className={styles.intro} data-leaving={leaving} onClose={onFinish} aria-labelledby="intro-title" aria-describedby="intro-description">
    <div className={styles.introTop}><span>DF / MERCEDES-INSPIRED EDITION</span><span>SILVER. BLACK. TURQUOISE.</span></div>
    <div className={styles.introCenter}><MercedesStar className={styles.star} />
      <p id="intro-description">DESHAN FERNANDO / SOFTWARE ENGINEER</p>
      <div className={styles.lightRack} aria-hidden="true">{[0, 1, 2, 3, 4].map(index => <div key={index} data-on={index < lights}><i /><i /></div>)}</div>
      <h2 id="intro-title">{go ? "LIGHTS OUT." : "READY TO LAUNCH."}</h2>
      <span className={styles.introCaption}>{go ? "LET’S BUILD SOMETHING THAT MOVES." : "PRECISION. ITERATION. PROGRESS."}</span>
    </div>
    <div className={styles.introBottom}><span>PERSONAL PORTFOLIO / F1 FAN EDITION</span><button autoFocus onClick={() => dialog.current?.close()}>SKIP INTRO <span aria-hidden="true">↗</span></button></div>
    <div className={styles.finishLine} aria-hidden="true" />
  </dialog>;
}
