"use client";
import { useState } from "react";
import { ArrowUpRight, Award, FileBadge, Plus } from "lucide-react";
import { CREDENTIALS, HIGHLIGHTS } from "./credentialsData";
import s from "./CareerCollection.module.css";
const CATEGORIES = ["All", "Cloud", "APIs", "Databases"];
const PLAYBOOK = [
    { title: "Understand the workflow", text: "Start with the people, inputs and states. Map what needs to happen, who can do it, and where the edge cases live." },
    { title: "Connect the pieces", text: "Bring interfaces, API contracts and data together. Keep the boundaries clear so each part has a job that makes sense." },
    { title: "Refine with feedback", text: "Check the details on small screens, use the real interactions, and improve the build through debugging, review and iteration." },
];
function CertificateArtwork({ item, index }) {
    return <div className={s.documentArt} aria-hidden="true">
    <span className={s.passNumber}>LEARNING PASS / {String(index + 1).padStart(2, "0")}</span>
    <div className={s.paper}><div className={s.paperTop}><span>DF / COLLECTION</span><FileBadge size={19}/></div><div className={s.paperMark}>{item.mark}</div><span className={s.paperLabel}>CERTIFICATE PLACEHOLDER</span><i /><i /><i /><div className={s.paperBottom}><span>ORIGINAL DOCUMENT<br />COMING SOON</span><Award size={26}/></div></div>
    <span className={s.artStamp}>PREVIEW<br /><b>PENDING</b></span>
    <span className={s.registration}>DESHAN FERNANDO / CONTINUED LEARNING</span>
  </div>;
}
export default function CareerCollection({ edition = "silverworks" }) {
    const [category, setCategory] = useState("All");
    const ferrari = edition === "ferrari";
    const prefix = ferrari ? "ferrari-" : "";
    const items = CREDENTIALS.filter(item => category === "All" || item.category === category);
    return <>
    <section id={`${prefix}credentials`} className={s.credentials} data-theme={edition}>
      <div className={s.sectionTop}><span>03 / THE CREDENTIALS</span><span>DOCUMENTS COMING SOON</span></div>
      <div className={s.heading}><h2>{ferrari ? <>ALWAYS<br /><em>GETTING BETTER.</em></> : <>LEARNING.<br /><em>WITH INTENT.</em></>}</h2><div><p>A collection in the making.</p><p>Placeholder cards for now.<br />Original certificates will appear here soon.</p></div></div>
      <div className={s.collectionBar}><div className={s.filters} role="group" aria-label="Filter certificates">{CATEGORIES.map(name => <button key={name} type="button" aria-pressed={category === name} onClick={() => setCategory(name)}>{name}</button>)}</div><span role="status" aria-live="polite">{items.length} {items.length === 1 ? "PLACEHOLDER" : "PLACEHOLDERS"}</span></div>
      <div className={s.certificateGrid}>{items.map(item => <article key={item.id} className={s.certificateCard}>
        <CertificateArtwork item={item} index={CREDENTIALS.indexOf(item)}/>
        <div className={s.certificateInfo}><div className={s.issuer}><span>{item.issuer}</span><span>{item.category}</span></div><h3>{item.title}</h3><p>{item.subtitle}</p><div className={s.documentStatus}>{item.document ? <a href={item.document} target="_blank" rel="noopener noreferrer">View certificate <ArrowUpRight size={14}/></a> : <><FileBadge size={14}/><span>Awaiting certificate file</span></>}{item.verificationUrl && <a href={item.verificationUrl} target="_blank" rel="noopener noreferrer">Verify credential <ArrowUpRight size={14}/></a>}</div></div>
      </article>)}</div>
      <div className={s.collectionFoot}><span>ORIGINALS TO FOLLOW. CURIOSITY ALREADY IN MOTION.</span><a href={`#${prefix}highlights`}>Beyond the certificates <ArrowUpRight size={15}/></a></div>
    </section>

    <section id={`${prefix}highlights`} className={s.highlights} data-theme={edition}>
      <div className={s.sectionTop}><span>04 / BEYOND THE CODE</span><span>CHALLENGE. COLLABORATE. KEEP GOING.</span></div>
      <div className={s.heading}><h2>{ferrari ? <>THE DRIVE<br /><em>TO KEEP GROWING.</em></> : <>MORE THAN<br /><em>THE CODE.</em></>}</h2><div><p>Progress takes different forms.</p><p>Selected competition participation<br />and team leadership from my CV.</p></div></div>
      <div className={s.highlightList}>{HIGHLIGHTS.map((item, i) => <article className={s.highlightRow} key={item.title}><span className={s.highlightIndex}>0{i + 1}</span><div className={s.highlightTitle}><span>{item.label}</span><h3>{item.title}</h3></div><p>{item.text}</p><span className={s.highlightYear}>{item.year}</span></article>)}</div>
      <div className={s.playbook}><div className={s.playbookIntro}><span>THE BUILD PLAYBOOK</span><h3>A LITTLE STRUCTURE.<br /><em>A LOT OF CURIOSITY.</em></h3><p>The principles I bring to a build.</p></div><div className={s.playbookSteps}>{PLAYBOOK.map((item, i) => <details key={item.title}><summary><span>0{i + 1}</span> {item.title}<Plus size={16}/></summary><p>{item.text}</p></details>)}</div></div>
    </section>
  </>;
}
