"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MercedesStar from "./MercedesStar";
import styles from "./Navbar.module.css";

const links = [["#home", "Home"], ["#about", "About"], ["#skills", "Skills"], ["#projects", "Projects"], ["#experience", "Experience"], ["#contact", "Contact"]];
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggle = useRef(null);
  useEffect(() => {
    const escape = event => { if (event.key === "Escape" && mobileOpen) { setMobileOpen(false); toggle.current?.focus(); } };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [mobileOpen]);
  return <nav className={styles.navbar} aria-label="Main navigation">
    <div className={styles.inner}>
      <a className={styles.logo} href="#home" aria-label="Deshan Fernando home"><MercedesStar /><span>DESHAN<span>FERNANDO / PORTFOLIO</span></span></a>
      <ul className={styles.links}>{links.map(([href, label]) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
      <Link href="/studio" className={styles.studioLink}>New portfolio <span aria-hidden="true">↗</span></Link>
      <button ref={toggle} className={styles.toggle} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(!mobileOpen)}><span /> <span /></button>
    </div>
    <div id="mobile-navigation" className={styles.mobileMenu} hidden={!mobileOpen}><ul>{links.map(([href, label], i) => <li key={href}><a href={href} onClick={() => setMobileOpen(false)}><span>0{i + 1}</span>{label}<b aria-hidden="true">↗</b></a></li>)}</ul></div>
  </nav>;
}
