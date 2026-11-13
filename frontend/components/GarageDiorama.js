"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./GarageDiorama.module.css";

// A tiny isometric world drawn directly in SVG; no second WebGL context or model downloads.
const project = (x, y, z = 0) => [340 + (x - y) * .72, 205 + (x + y) * .33 - z];
const points = vertices => vertices.map(v => project(...v).join(',')).join(' ');
function Face({ vertices, ...props }) { return <polygon points={points(vertices)} {...props} />; }
function Line({ from, to, ...props }) { const a=project(...from), b=project(...to); return <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} {...props} />; }
function Block({ x,y,z=0,w,d,h,top='#c3d0d0',front='#708787',side='#425857', ...props }) {
  return <g {...props}><Face vertices={[[x,y+d,z],[x+w,y+d,z],[x+w,y+d,z+h],[x,y+d,z+h]]} fill={front}/><Face vertices={[[x+w,y,z],[x+w,y+d,z],[x+w,y+d,z+h],[x+w,y,z+h]]} fill={side}/><Face vertices={[[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]]} fill={top}/></g>;
}
const stations = [
  {id:'interface',label:'Interface',title:'Where people meet the product.',detail:'React and TypeScript interfaces, thoughtful interactions, and responsive layouts.',tag:'FRONTEND / COCKPIT'},
  {id:'apis',label:'APIs',title:'The systems behind the experience.',detail:'Node.js services, REST APIs, authentication, and data flowing between applications.',tag:'BACKEND / PIT WALL'},
  {id:'ai',label:'AI systems',title:'Ideas turned into working experiments.',detail:'From an AI assistant to a floorplan-to-3D pipeline: exploring useful applications of AI.',tag:'EXPERIMENTS / WORKBENCH'},
];

export default function GarageDiorama() {
  const [active,setActive]=useState('interface');
  const [lights,setLights]=useState(true);
  const [motion,setMotion]=useState(true);
  const [running,setRunning]=useState(false);
  const [reduced,setReduced]=useState(false);
  const stage=useRef(null);
  useEffect(()=>{
    const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible=false;
    const sync=()=>{setReduced(preference.matches);setRunning(visible && !document.hidden && !preference.matches);};
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();},{threshold:.1});
    observer.observe(stage.current);
    document.addEventListener('visibilitychange',sync);preference.addEventListener('change',sync);
    return ()=>{observer.disconnect();document.removeEventListener('visibilitychange',sync);preference.removeEventListener('change',sync);};
  },[]);
  const station=stations.find(s=>s.id===active);
  return <div className={styles.garage} ref={stage} data-running={running&&motion} data-lights={lights}>
    <div className={styles.top}><span><i/> SILVERWORKS / GARAGE 01</span><span>ISOMETRIC STUDY</span></div>
    <div className={styles.stage}>
      <svg viewBox="70 5 575 460" role="img" aria-label="Isometric F1 garage with a silver and turquoise race car, a pit-wall monitor bank, and an AI workbench" className={styles.scene}>
        <ellipse cx="362" cy="419" rx="220" ry="28" fill="#000" opacity=".45"/>
        <Block x={-12} y={-12} z={-19} w={380} d={292} h={19} top="#172a29" front="#0d1b1b" side="#102222"/>
        <Face vertices={[[0,0,0],[0,265,0],[0,265,155],[0,0,155]]} fill="#152827" stroke="#344c49"/>
        <Face vertices={[[0,0,0],[355,0,0],[355,0,155],[0,0,155]]} fill="#203532" stroke="#344c49"/>
        {[50,100,150,200,250,300,350].map(x=><Line key={'x'+x} from={[x,0,1]} to={[x,265,1]} stroke="#2c4540" strokeWidth=".6"/>)}
        {[50,100,150,200,250].map(y=><Line key={'y'+y} from={[0,y,1]} to={[355,y,1]} stroke="#2c4540" strokeWidth=".6"/>)}
        {[70,140,210,280,350].map(x=><Line key={x} from={[x,0,0]} to={[x,0,155]} stroke="#39534b" strokeWidth=".8"/>)}
        <g className={styles.light}><Line from={[4,0,130]} to={[350,0,130]} stroke="#00d2be" strokeWidth="4"/><Line from={[0,4,130]} to={[0,258,130]} stroke="#a9e8dd" strokeWidth="3"/></g>
        <Line from={[0,0,155]} to={[355,0,155]} stroke="#8ba7a0" strokeWidth="3"/>
        <Line from={[0,0,155]} to={[0,265,155]} stroke="#657c76" strokeWidth="3"/>
        <text x="382" y="114" transform="rotate(24 382 114)" fill="#d9e9e4" fontSize="16" fontWeight="700" fontFamily="monospace" letterSpacing="2">SILVERWORKS</text>
        <text x="383" y="135" transform="rotate(24 383 135)" fill="#72a69a" fontSize="7" fontFamily="monospace" letterSpacing="1.5">PRECISION / ITERATION / PROGRESS</text>
        <g className={active==='apis'?styles.selected:''}>
          <Block x={135} y={12} w={170} d={35} h={49} top="#546c65" front="#263e36" side="#1c302a"/>
          {[148,200,252].map((x,i)=><g key={x}><Block x={x} y={24} z={52} w={44} d={5} h={36} top="#9eb5ab" front="#071714" side="#425d50"/>
            <Face vertices={[[x+4,29.2,57],[x+40,29.2,57],[x+40,29.2,83],[x+4,29.2,83]]} fill="#0c3028"/>
            {[0,1,2,3].map(n=><Line key={n} from={[x+7,29.5,77-n*5]} to={[x+20+((n+i)%3)*6,29.5,77-n*5]} stroke={n===0?'#8cdfcb':'#00a58f'} strokeWidth="1.4"/>)}</g>)}
          <Line from={[145,48,43]} to={[295,48,43]} stroke="#00d2be" strokeWidth="2"/>
        </g>
        <g className={active==='ai'?styles.selected:''}>
          <Block x={9} y={126} w={52} d={96} h={42} top="#778e83" front="#263e32" side="#425b49"/>
          <Block x={17} y={142} z={43} w={33} d={28} h={2} top="#a4d1bb"/>
          <Block x={22} y={149} z={45} w={12} d={12} h={18} top="#def0e5" front="#83ac99" side="#b3d3c1"/>
          <Block x={35} y={154} z={45} w={9} d={9} h={10} top="#00d2be" front="#197967" side="#0ca58e"/>
          <Line from={[15,223,35]} to={[55,223,35]} stroke="#00d2be" strokeWidth="2"/>
        </g>
        <Face vertices={[[80,92,1],[326,92,1],[326,229,1],[80,229,1]]} fill="#0c1c19" stroke="#50695d" strokeWidth="1"/>
        <g className={styles.flow}><Face vertices={[[83,95,2],[323,95,2],[323,226,2],[83,226,2]]} fill="none" stroke="#00d2be" strokeDasharray="10 18" strokeWidth="1.7"/></g>
        <g className={active==='interface'?styles.selected:''}>
          <Face vertices={[[103,120,3],[280,120,3],[303,203,3],[115,208,3]]} fill="#000" opacity=".4"/>
          {[117,253].map(x=>[114,184].map(y=><Block key={x+'-'+y} x={x} y={y} z={8} w={28} d={18} h={29} top="#142522" front="#030908" side="#091311"/>))}
          <Block x={137} y={133} z={17} w={95} d={54} h={20} top="#b4c9c1" front="#536d60" side="#769485"/>
          <Block x={128} y={143} z={33} w={47} d={34} h={13} top="#d3e1db" front="#789e8b" side="#a8c6b6"/>
          <Face vertices={[[168,143,39],[193,144,48],[211,149,39],[211,171,39],[193,176,48],[168,177,39]]} fill="#06100c" stroke="#c1d6c9" strokeWidth="2"/>
          <Block x={212} y={149} z={18} w={67} d={22} h={12} top="#d3e3db" front="#718f7e" side="#a5c3b2"/>
          <Block x={277} y={115} z={12} w={11} d={78} h={7} top="#00d2be" front="#0a6253" side="#31a98d"/>
          <Block x={107} y={120} z={36} w={10} d={69} h={7} top="#b3c9be" front="#00aa91" side="#679380"/>
          <Line from={[139,186,30]} to={[230,186,30]} stroke="#00d2be" strokeWidth="4"/>
          <Line from={[219,160,31]} to={[273,160,31]} stroke="#00d2be" strokeWidth="3"/>
          <text x={project(234,158,34)[0]} y={project(234,158,34)[1]} fill="#254a39" fontSize="9" fontWeight="700" transform={`rotate(25 ${project(234,158,34).join(' ')})`}>DF</text>
        </g>
        <Block x={317} y={201} w={26} d={29} h={47} top="#adccc0" front="#38584a" side="#648b77"/>
        <Line from={[321,231,33]} to={[339,231,33]} stroke="#00d2be" strokeWidth="2"/>
        <text x="377" y="432" fill="#84a99a" fontSize="7" fontFamily="monospace" letterSpacing="2" transform="rotate(25 377 432)">DF / ENGINEERING GARAGE</text>
      </svg>
    </div>
    <div className={styles.controls}><span>EXPLORE THE GARAGE</span><div><button type="button" onClick={()=>setLights(!lights)} aria-pressed={lights}>Lights {lights?'on':'off'}</button><button type="button" onClick={()=>setMotion(!motion)} disabled={reduced} title={reduced?'Your reduced-motion preference is enabled':undefined} aria-pressed={motion&&!reduced}>Motion {motion&&!reduced?'on':'off'}</button></div></div>
    <div className={styles.stations} aria-label="Garage stations">{stations.map(s=><button key={s.id} type="button" aria-pressed={active===s.id} onClick={()=>setActive(s.id)}>{s.label}<span aria-hidden="true">↗</span></button>)}</div>
    <div className={styles.description} aria-live="polite" aria-atomic="true"><span>{station.tag}</span><h3>{station.title}</h3><p>{station.detail}</p><a href="#projects">See the projects <span aria-hidden="true">↗</span></a></div>
  </div>;
}
