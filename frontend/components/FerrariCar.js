import { useId } from "react";
import s from "./FerrariExperience.module.css";
// Original vector study, inspired by open-wheel racing rather than a specific car.
export default function FerrariCar({ running, aero }) {
    const id = useId().replace(/:/g, "");
    const paint = name => `url(#${id}-${name})`;
    return <svg viewBox="0 0 1200 440" className={`${s.car} ${running ? s.running : ""} ${aero ? s.aero : ""}`} role="img" aria-label={`Original red open-wheel race car, ${aero ? "aerodynamic study" : "bodywork view"}${running ? ", wheels animating" : ""}`}>
    <defs>
      <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#ff6b64"/><stop offset=".28" stopColor="#e92936"/><stop offset=".62" stopColor="#b90c20"/><stop offset="1" stopColor="#690a13"/></linearGradient>
      <linearGradient id={`${id}-side`}><stop stopColor="#8b0919"/><stop offset=".4" stopColor="#ed2837"/><stop offset="1" stopColor="#f34445"/></linearGradient>
      <radialGradient id={`${id}-tyre`}><stop offset=".46" stopColor="#1c1d1d"/><stop offset=".67" stopColor="#080b0b"/><stop offset=".88" stopColor="#252626"/><stop offset="1" stopColor="#090b0b"/></radialGradient>
      <linearGradient id={`${id}-hub`}><stop stopColor="#202325"/><stop offset=".4" stopColor="#aaa699"/><stop offset=".6" stopColor="#383d3e"/><stop offset="1" stopColor="#121616"/></linearGradient>
      <pattern id={`${id}-carbon`} width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#171718"/><path d="m0 0 7 7m-3-7 7 7" stroke="#353232" strokeWidth=".7"/></pattern>
    </defs>
    <ellipse cx="610" cy="391" rx="513" ry="20" fill="#3d0615" opacity=".3"/>
    <g className={s.carChassis}>
      <path d="m108 324 135-20 194 2 303 9 279 39 85 15-17 15H169Z" fill={paint("carbon")}/>
      <path d="M205 291 155 178l-40 4 23 120-13 45h98Z" fill="#900b1c"/>
      <path d="m93 177 159-9 8 22-158 14Z" fill="#f92e38" stroke="#7d0c1a"/>
      <path d="m103 196 154-8 7 15-151 13Z" fill={paint("carbon")}/>
      <path d="m95 166 14 50 18 2-7-54Z" fill="#fb3841"/>
      <path d="m251 282 50-52 107-57 61-9 29 58 66 35 177 24 165 35 71 13-8 31H284Z" fill={paint("body")}/>
      <path d="m294 290 127-60 122 33 199 19 153 33-11 21H307Z" fill={paint("side")}/>
      <path d="m357 254 54-22 106 27-60 15-68-2Z" fill="#500b13"/>
      <path d="m449 175 23 49 67 32-43-4-48-45-22-30Z" fill="#f5e9d7"/>
      <path d="m460 174 12 27 8 2-11-30Z" fill="#154c30"/>
      <path d="m473 175 11 29 8 2-10-30Z" fill="#ffffff"/>
      <path d="m485 176 10 32 8 3-9-34Z" fill="#dd1930"/>
      <path d="m528 236 27-22 40-1 51 29 16 26-60-1Z" fill="#211617"/>
      <path d="M548 232q1-37 30-35 27 2 28 39Z" fill="#f1ce43"/>
      <path d="m553 211 46 4 2 12-48-3Z" fill="#11161a"/>
      <path d="m525 240 4-14 62-6 52 27 10 18-15 3-6-15-44-19-49 4-2 13Z" fill="#181c1d" stroke="#ef464b" strokeWidth="2"/>
      <path d="m622 268 151 12 129 34 137 16 36 16-28 10-163-14-97-10-114-20-38-17Z" fill={paint("body")}/>
      <path d="m683 292 206 29 141 16-4 8-141-10-203-30Z" fill="#f4ba98" opacity=".5"/>
      <path d="m704 334 359 20 76 17-8 15-400-26Z" fill={paint("carbon")}/>
      <path d="m1010 348 130 22-2 12-135-16Z" fill="#e02935"/>
      <path d="m1123 354 23 9 5 31-25-4Z" fill="#ef3d40"/>
      <path d="m254 308 45 20 76 22m-110-50 121 32M807 319l49 35 146 4m-182-20 165 32" fill="none" stroke="#242324" strokeWidth="9"/>
      <path d="m596 264 40-37 29 1-7 10-23-1-25 31Z" fill="#b10b1f"/>
      <path d="m657 225 27 2 8 9-27 2Z" fill="#ee3340"/>
      <path d="m409 288-9 27m23-25-8 28m22-26-8 27m22-25-8 26" stroke="#5a0913" strokeWidth="5"/>
      <text x="483" y="315" fill="#f4e8d4" fontSize="23" fontFamily="Arial,sans-serif" fontWeight="700" fontStyle="italic">ROSSO / WORKS</text>
      <path d="M355 276h28v34l-14 10-14-10Z" fill="#f2d342"/><text x="369" y="301" textAnchor="middle" fill="#2d1714" fontSize="15" fontFamily="Arial,sans-serif" fontWeight="700">DF</text>
      <text x="801" y="327" fill="#f4e8d4" fontSize="29" fontFamily="Arial,sans-serif" fontWeight="700" fontStyle="italic">31</text>
    </g>
    {[{ cx: 278, cy: 326, r: 88 }, { cx: 914, cy: 335, r: 83 }].map((w, i) => <g key={i}><circle cx={w.cx} cy={w.cy} r={w.r} fill={paint("tyre")}/><circle cx={w.cx} cy={w.cy} r={w.r - 9} fill="none" stroke="#3a3935" strokeWidth="1.5"/><circle cx={w.cx} cy={w.cy} r={w.r - 15} fill="none" stroke="#f2cf3f" strokeWidth="2" strokeDasharray="34 175"/><g className={s.wheel} style={{ transformOrigin: `${w.cx}px ${w.cy}px` }}><circle cx={w.cx} cy={w.cy} r={w.r * .49} fill={paint("hub")}/>{[0, 60, 120, 180, 240, 300].map(a => <path key={a} d={`M${w.cx - 4} ${w.cy - 4}l-9-${w.r * .4} 20 0-3 ${w.r * .4}Z`} transform={`rotate(${a} ${w.cx} ${w.cy})`} fill="#151b1b"/>)}</g><circle cx={w.cx} cy={w.cy} r="13" fill="#bfb8a0"/><circle cx={w.cx} cy={w.cy} r="7" fill="#312e26"/></g>)}
    <g className={s.airflow} fill="none" stroke="#ffe89b" strokeWidth="1.6"><path d="M33 143Q283 83 566 166T1160 244M12 232Q261 190 536 267T1170 321M56 85Q323 11 583 111T1165 192"/><path d="m1146 237 14 7-17 2m11 66 16 9-18 1m0-138 13 8-16 2"/></g>
  </svg>;
}
