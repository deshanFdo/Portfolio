import MercedesStar from "./MercedesStar";
import styles from "./Paddock.module.css";

export default function Footer({ onReplay, reducedMotion }) {
  return <footer className={styles.footer}>
    <div className={styles.footerTop}><div><MercedesStar /><span>DESHAN FERNANDO<small>PRECISION. ITERATION. PROGRESS.</small></span></div><a href="#home">Back to the grid <span aria-hidden="true">↑</span></a></div>
    <div className={styles.footerBottom}><p>© {new Date().getFullYear()} Deshan Fernando.<span>Mercedes-inspired personal portfolio. An independent F1 fan creation.</span></p><button type="button" onClick={onReplay} disabled={reducedMotion}>{reducedMotion ? "Intro off · reduced motion" : "Replay intro ↗"}</button></div>
  </footer>;
}
