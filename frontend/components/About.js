import MercedesStar from "./MercedesStar";
import styles from "./Paddock.module.css";

export default function About() {
  return <section className={styles.section} id="about">
    <div className={styles.heading}><span>01 / THE PERSON</span><h2>BEHIND THE BUILD.</h2><p>Curiosity is the starting point.<br />Engineering is how I move it forward.</p></div>
    <div className={styles.aboutGrid}>
      <div className={styles.portrait}><div className={styles.portraitArt} role="img" aria-label="DF monogram in silver and turquoise"><MercedesStar /><b aria-hidden="true">DF</b><small>ENGINEERING / PERSONAL PROFILE</small></div><div><span>DESHAN FERNANDO</span><span>SRI LANKA / SOFTWARE ENGINEER</span></div></div>
      <div className={styles.bio}><p className={styles.kicker}>DETAILS MAKE THE DIFFERENCE.</p><h3>A builder with an<br /><em>engineering mindset.</em></h3><p>I’m a Computer Science undergraduate with hands-on experience from my software engineering internship at Sri Lanka Telecom. I work across React interfaces, Node.js services, and SQL databases.</p><p>I enjoy the details that make an application dependable: clear APIs, secure access, responsive interfaces, and code that a team can build on.</p><div className={styles.facts}><div><span>FOCUS</span><strong>Full-stack development</strong></div><div><span>NEXT CHAPTER</span><strong>Associate SE / SE roles</strong></div></div><a className={styles.textLink} href="#contact">Let’s connect <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>;
}
