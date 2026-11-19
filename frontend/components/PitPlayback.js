import Image from "next/image";
import s from "./NightShift.module.css";

export const ASSETS = (process.env.NEXT_PUBLIC_BASE_PATH || "/Portfolio") + "/images/redbull";
export const STOP_TIME = 4.8;
export const BRAKING_TIME = 2.8;

// Speed and distance use the same deceleration curve for the camera and replay.
export function readPitFrame(seconds) {
  const remaining = Math.max(0, 1 - seconds / BRAKING_TIME);
  return {
    speed: Math.round(78 * remaining),
    offset: 160 * remaining ** 2,
    phase: seconds < BRAKING_TIME ? "Pit entry" : seconds < 3.85 ? "On the marks" : "Monitors powering up",
  };
}

export function PitCamera({ seconds }) {
  const { offset } = readPitFrame(seconds);
  return <div className={s.bay} aria-hidden="true">
    <Image src={ASSETS + "/pit-box.webp"} width={1280} height={720} alt="" loading="eager" className={s.asphalt} />
    <div className={s.vehicle} style={{ transform: "translate(-50%, " + (offset - 50) + "%)" }}>
      <Image src={ASSETS + "/car-31.webp"} width={400} height={800} alt="" loading="eager" />
    </div>
  </div>;
}

const trace = Array.from({ length: 49 }, (_, i) => {
  const time = i / 10;
  return (time / STOP_TIME * 280) + "," + (62 - readPitFrame(time).speed / 78 * 54);
}).join(" ");

export function SpeedTrace({ seconds }) {
  const x = seconds / STOP_TIME * 280;
  const y = 62 - readPitFrame(seconds).speed / 78 * 54;
  return <svg viewBox="-4 0 288 70" preserveAspectRatio="none" aria-hidden="true" className={s.trace}>
    {[8, 35, 62].map(n => <path key={n} d={"M0 " + n + "H280"} stroke="#394659" strokeDasharray="2 4" />)}
    <polyline points={trace} fill="none" stroke="#ffcc32" strokeWidth="2.5" />
    <path d={"M" + x + " 0v70"} stroke="#d8e1f5" opacity=".7" />
    <circle cx={x} cy={y} r="3.4" fill="#fff" />
  </svg>;
}
