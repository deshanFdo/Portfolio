import styles from "./Paddock.module.css";

const groups = [
  ["01", "INTERFACE", "From interaction to implementation.", ["React", "TypeScript", "JavaScript", "HTML & CSS", "Tailwind CSS"]],
  ["02", "ENGINE ROOM", "Services built around real workflows.", ["Node.js", "Express", "Java", "Python", "REST APIs", "JWT & RBAC"]],
  ["03", "INFRASTRUCTURE", "The tools that connect it all.", ["MySQL", "PostgreSQL", "MongoDB", "WSO2", "Docker", "GitHub Actions"]]
];
export default function Skills() {
  return <section id="skills" className={`${styles.section} ${styles.toolkit}`}>
    <div className={styles.heading}><span>02 / THE SETUP</span><h2>ENGINEERING TOOLKIT.</h2></div>
    <div className={styles.skillGrid}>{groups.map(([number, title, description, skills]) => <article key={title} className={styles.skill}><span className={styles.skillNumber}>{number}</span><h3>{title}</h3><p>{description}</p><ul>{skills.map(skill => <li key={skill}>{skill}</li>)}</ul></article>)}</div>
    <details className={`${styles.details} ${styles.credentials}`}><summary>Credentials & continued learning <span aria-hidden="true">+</span></summary><ul><li>Postman Student Expert</li><li>Azure Fundamentals (AZ-900)</li><li>Python for Data Analysis</li><li>Meta Introduction to Databases</li><li>Cloud Computing Core</li></ul></details>
  </section>;
}
