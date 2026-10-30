"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import MercedesStar from "./MercedesStar";
import styles from "./Hero.module.css";

const Spline = dynamic(() => import('./SplineEmbed'), { ssr: false, loading: () => <span className={styles.loading}>Preparing the garage…</span> });

export default function Hero({ ready, reducedMotion }) {
  const [robotOverride, setRobotOverride] = useState(null);
  const robotActive = ready && (robotOverride ?? !reducedMotion);
  const fullName = process.env.NEXT_PUBLIC_FULL_NAME || "Deshan Fernando";
  const names = fullName.split(" ");
  return <section id="home" className={styles.hero}>
    <div className={styles.speedLines} aria-hidden="true"><i /><i /><i /></div>
    <div className={styles.topline}><span><i /> MERCEDES-INSPIRED F1 EDITION</span><span>COLOMBO, SRI LANKA <b>↗</b></span></div>
    <div className={styles.grid}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>SOFTWARE ENGINEER <span>/</span> FULL STACK</p>
        <h1 aria-label={fullName}><span>{names[0]}</span><span>{names.slice(1).join(" ")}</span></h1>
        <div className={styles.intro}><span className={styles.rule} /><div><h2>Precision in every detail.</h2><p>I build web applications, secure APIs, and thoughtful digital experiences. Driven by curiosity. Refined through iteration.</p></div></div>
        <div className={styles.actions}>
          <a className={styles.primary} href="#projects">Explore my work <span aria-hidden="true">↗</span></a>
          <a className={styles.secondary} href={`${process.env.NEXT_PUBLIC_BASE_PATH || "/Portfolio"}/Deshan_Fernando_CV.pdf`} target="_blank" rel="noopener noreferrer">View CV <span aria-hidden="true">↗</span></a>
        </div>
        <p className={styles.availability}><i /> OPEN TO ASSOCIATE SE & SE OPPORTUNITIES</p>
      </div>
      <div className={styles.garage}>
        <div className={styles.garageTop}><span>DF / ENGINEERING LAB</span><span>01 — INTERACTIVE</span></div>
        <MercedesStar className={styles.backdropStar} />
        <div className={styles.orbit} aria-hidden="true" />
        <div className={styles.robot}>
          {robotActive ? <Spline scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" /> : <div className={styles.robotSleep}><MercedesStar /><span>{ready ? "GARAGE ON STANDBY" : "WELCOME TO THE GARAGE"}</span></div>}
        </div>
        <div className={styles.garageBottom}><span><i /> {robotActive ? "YOUR INTERACTIVE CO-PILOT" : "ROBOT ON STANDBY"}</span><button type="button" disabled={!ready} onClick={() => setRobotOverride(!robotActive)}>{robotActive ? "Pause robot" : "Wake robot"} <span aria-hidden="true">{robotActive ? "Ⅱ" : "▷"}</span></button></div>
      </div>
    </div>
    <div className={styles.telemetry}>
      <div><span>01 / FRONTEND</span><strong>React & TypeScript</strong></div>
      <div><span>02 / BACKEND</span><strong>Node.js & REST APIs</strong></div>
      <div><span>03 / MINDSET</span><strong>Build. Test. Improve.</strong></div>
      <a href={process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/deshanFdo"} target="_blank" rel="noopener noreferrer">EXPLORE GITHUB <span aria-hidden="true">↗</span></a>
    </div>
  </section>;
}
