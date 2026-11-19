"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Aperture, Flag, Monitor, Pause, Play, Radio, SkipForward } from "lucide-react";
import PortfolioEditions from "./PortfolioEditions";
import PitWall from "./PitWall";
import { ASSETS, BRAKING_TIME, PitCamera, STOP_TIME, SpeedTrace, readPitFrame } from "./PitPlayback";
import s from "./NightShift.module.css";

const shots = [
  { id: "lane", name: "Pit lane", Icon: Flag },
  { id: "box", name: "Box camera", Icon: Aperture },
  { id: "wall", name: "Pit wall", Icon: Monitor },
];

function Brand() {
  return <><span className={s.mark} aria-hidden="true">31</span><span className={s.brandName}>Pitlane<small>Deshan Fernando</small></span></>;
}

function Lane({ box, wall }) {
  return <section className={s.hero} aria-labelledby="night-shift-title">
    <Image className={s.heroArt} src={ASSETS + "/night-grid.webp"} alt="Number 31 in navy, red and yellow under the floodlights of a wet pit lane." width={1672} height={941} priority />
    <div className={s.heroShade}/>
    <div className={s.cameraLabel}><span className={s.tally}/> CAM 01 <i/> PIT LANE</div>
    <div className={s.heroCopy}>
      <div className={s.edition}><i/> Red Bull edition</div>
      <h1 id="night-shift-title" aria-label="Night Shift">Night<br/><em>Shift<span>.</span></em></h1>
      <p><strong>Deshan Fernando’s engineering portfolio.</strong><br/>Call car 31 into the box to bring the pit wall online.</p>
      <div className={s.heroActions}>
        <button className={s.call} onClick={box}><Radio size={18}/> Call pit stop</button>
        <button className={s.direct} onClick={wall}>Open monitors</button>
      </div>
    </div>
    <div className={s.photoCaption}><span>DF–31</span> Night session</div>
  </section>;
}

function Box({ seconds, paused, toggle, wall, ready }) {
  const { speed, phase } = readPitFrame(seconds);
  return <section className={s.box} aria-label="Pit stop camera">
    <PitCamera seconds={seconds}/>
    <div className={s.boxShade}/>
    <div className={s.cameraLabel}><span className={s.tally}/> CAM 02 <i/> OVERHEAD</div>
    <div className={s.tracksideScreens} data-powered={seconds >= 3.4} aria-hidden="true">
      <div><small>Portfolio monitor</small><b>API Portal</b><span>React / Node.js</span></div>
      <div><small>Telemetry</small><SpeedTrace seconds={seconds}/></div>
    </div>
    <div className={s.boxHud}><div className={s.label}>Car 31 / simulated stop</div><h2>{ready ? phase : "Camera standby"}</h2>
      <div className={s.boxStats}><span><b>{speed}</b> km/h</span><span><b>{seconds.toFixed(1)}</b> s</span></div>
    </div>
    <div className={s.transport}>
      <button onClick={toggle} aria-label={paused ? "Resume pit stop" : "Pause pit stop"}>{paused ? <Play size={16}/> : <Pause size={16}/>} {paused ? "Resume" : "Pause"}</button>
      <button onClick={wall}>Open monitors <SkipForward size={15}/></button>
    </div>
    <div className={s.progress}><i style={{ transform: "scaleX(" + seconds / STOP_TIME + ")" }}/></div>
  </section>;
}

export default function NightShift() {
  const [shot, setShot] = useState("lane");
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const elapsed = useRef(0);
  const focus = useRef(null);
  const lane = useRef(null);
  const box = useRef(null);
  const previous = useRef("lane");
  const preload = useRef();

  function loadCamera() {
    if (!preload.current) {
      preload.current = Promise.allSettled(["pit-box", "car-31"].map(file => {
        const asset = new window.Image();
        asset.src = ASSETS + "/" + file + ".webp";
        return asset.decode();
      }));
    }
    return preload.current;
  }

  function enter(next) {
    if (next === "box") {
      if (shot === "box") return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      elapsed.current = reduced ? BRAKING_TIME : 0;
      setSeconds(elapsed.current);
      setPaused(false);
      setReady(false);
    }
    setShot(next);
  }

  useEffect(() => {
    if (shot === previous.current) return;
    previous.current = shot;
    window.scrollTo({ top: 0, behavior: "instant" });
    const target = shot === "wall" ? focus.current : shot === "box" ? box.current : lane.current;
    target?.focus({ preventScroll: true });
  }, [shot]);

  useEffect(() => {
    if (shot !== "box") return;
    let active = true;
    loadCamera().then(() => { if (active) setReady(true); });
    return () => { active = false; };
  }, [shot]);

  useEffect(() => {
    if (shot !== "box" || paused || !ready) return;
    let frame;
    const started = performance.now() - elapsed.current * 1000;
    const advance = now => {
      elapsed.current = Math.min(STOP_TIME, Math.max(0, now - started) / 1000);
      setSeconds(elapsed.current);
      if (elapsed.current >= STOP_TIME) setShot("wall");
      else frame = requestAnimationFrame(advance);
    };
    frame = requestAnimationFrame(advance);
    return () => cancelAnimationFrame(frame);
  }, [shot, paused, ready]);

  return <div className={s.site}>
    <header className={s.header}>
      <button className={s.brand} onClick={() => enter("lane")} aria-label="Pitlane home"><Brand/></button>
      {shot !== "lane" && <div className={s.team}><i/><span>Red Bull edition</span></div>}
      <div className={s.headerRight}><span className={s.headerRole}>Software engineer <i/> Colombo, LK</span><PortfolioEditions current="redbull"/></div>
    </header>
    <main>
      {shot === "lane" && <div ref={lane} tabIndex={-1}><Lane box={() => enter("box")} wall={() => enter("wall")}/></div>}
      {shot === "box" && <div ref={box} tabIndex={-1}><Box seconds={seconds} paused={paused} ready={ready} toggle={() => setPaused(p => !p)} wall={() => enter("wall")}/></div>}
      {shot === "wall" && <PitWall headingRef={focus} replay={() => enter("box")}/>}
      <nav className={s.shots} aria-label="Camera views">
        <div className={s.director}><span className={s.miniFlag}/> Camera control</div>
        {shots.map(({id,name,Icon},i) => <button key={id} onClick={() => enter(id)} onPointerEnter={id === "box" ? loadCamera : undefined} onFocus={id === "box" ? loadCamera : undefined} aria-current={shot === id ? "step" : undefined}>
          <span className={s.shotNum}>0{i + 1}</span><Icon size={16}/><span>{name}</span>
        </button>)}
      </nav>
    </main>
    <footer className={s.footer}><span>Deshan Fernando <i>/</i> Independent fan portfolio</span><a href="https://formulavisuals.com/replays" target="_blank" rel="noreferrer">Race replays on Formula Visuals</a></footer>
  </div>;
}
