import styles from "./Paddock.module.css";
const PROJECTS = [
  {
    title: "AI Floorplan-to-3D House Generator",
    role: "Full-Stack + ML Engineer",
    tech: ["Python", "PyTorch", "YOLO", "OpenCV", "FastAPI", "React", "Vite"],
    desc: "End-to-end application converting 2D floorplan images into structured data and 3D house models. Multi-stage AI pipeline combining YOLO detection, segmentation, and geometric post-processing to extract walls, doors, and windows -- then procedurally generates a 3D representation. Phase 2 targets AR/VR walkthrough.",
    features: [
      "Multi-stage ML pipeline (detection -> segmentation -> extraction -> 3D generation)",
      "YOLO-based architectural element detection with custom training workflows",
      "Robust geometric post-processing for clean building primitives",
      "Artifact-driven debugging with visual overlays & JSON outputs",
      "Security-focused upload validation & cached inference results",
      "Colab-ready training notebooks with dataset augmentation pipelines"
    ],
    featured: true,
    link: null,
    github: null,
    color: "#88A8FF"
  },
  {
    title: "Enterprise Developer API Portal",
    role: "Full-Stack Developer",
    tech: ["React 19", "Vite", "Node.js", "Express 5", "WSO2 API Manager", "Docker", "GitHub Actions"],
    desc: "Full-stack real-time API dashboard aggregating live Weather, Stock Market, and Cryptocurrency data from multiple external APIs. Showcases enterprise API management patterns with WSO2 API Manager as gateway, CI/CD pipelines, and dual deployment strategy.",
    features: [
      "Live data from 3 API domains (Weather, Stocks, Crypto)",
      "WSO2 API Manager 4.3 gateway with JWT validation",
      "CI/CD: GitHub Actions build + auto-deploy to GitHub Pages",
      "Dual deployment: Render (full-stack) + GitHub Pages (static fallback)",
      "Glassmorphism dark-theme responsive dashboard UI"
    ],
    featured: false,
    link: "https://api-portal-2maq.onrender.com",
    github: "https://github.com/deshanFdo/apiPortal",
    color: "#7AD7F0"
  },
  {
    title: "E-Commerce Microservices Platform",
    role: "Backend Architect & Developer",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Redis", "RabbitMQ", "Docker", "AWS EC2"],
    desc: "Architected Spring Boot backend decomposed into RESTful microservices for product catalog, identity, and orders. Integrated Redis caching and RabbitMQ for async event processing on AWS EC2.",
    features: [
      "RESTful microservices architecture with Spring Boot",
      "Redis caching layer for sub-millisecond catalog reads",
      "Asynchronous event processing using RabbitMQ",
      "Dockerized container deployments on AWS EC2",
      "Relational schema design with PostgreSQL"
    ],
    featured: false,
    link: null,
    github: null,
    color: "#7AD7F0"
  },
  {
    title: "NexusLink",
    role: "Full-Stack Developer",
    tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Zustand", "Tailwind CSS"],
    desc: "Knowledge-Graph Driven Collaboration Platform supporting documentation, development, and presentation projects with dedicated editors and workflows. Features dynamic knowledge graph visualization of project structure and relationships.",
    features: [
      "Real-time knowledge graph visualization",
      "Role-based access (Owner, Co-Owner, Member)",
      "Version history & document tracking",
      "Secure email invitations with Google SMTP"
    ],
    featured: false,
    link: null,
    github: null,
    color: "#5F7EDC"
  },
  {
    title: "Smart Employee System",
    role: "Full-Stack Developer",
    tech: ["Node.js", "Express.js", "React", "MySQL", "JWT", "RBAC"],
    desc: "Comprehensive Role-Based Access Control (RBAC) system for employee assessments at Sri Lanka Telecom. Supports 8+ user roles with middleware-level route protection, dynamic permission resolution, paginated endpoints, and optimized database queries reducing response times by ~40%.",
    features: [
      "RESTful backend with RBAC for 8+ user roles",
      "JWT authentication with middleware-level route protection",
      "React assessor panels with local caching and prefetching",
      "Paginated endpoints reducing avg response time by ~40%"
    ],
    featured: false,
    link: null,
    github: null,
    color: "#5F7EDC"
  },
  {
    title: "LawLinkLK",
    role: "Full-Stack Developer",
    tech: ["MERN Stack", "OpenAI API", "Socket.io", "JWT"],
    desc: "Real-time legal consultation platform with AI-powered assistant and secure instant messaging between clients and lawyers. Features end-to-end JWT authentication and live case management.",
    features: [
      "Real-time chat with Socket.io",
      "AI-powered legal assistant (OpenAI)",
      "JWT secure authentication",
      "Live case management dashboard"
    ],
    featured: false,
    link: "https://lawlinklk.com",
    github: "https://github.com/deshanFdo/LawLink-LK",
    color: "#88A8FF"
  },
  {
    title: "Airline Seat Booking",
    role: "Backend Developer",
    tech: ["Java", "REST API"],
    desc: "Robust core API for managing seat reservations and passenger manifests with focus on data consistency.",
    features: [
      "Seat reservation API",
      "Passenger management",
      "Data consistency"
    ],
    featured: false,
    link: null,
    github: null,
    color: "#5F7EDC"
  }
];


export default function Projects() {
  return <section id="projects" className={styles.section}>
    <div className={styles.heading}><span>03 / THE WORK</span><h2>BUILT. TESTED. REFINED.</h2><p>From secure enterprise systems<br />to experiments in AI and 3D.</p></div>
    <div className={styles.projectGrid}>{PROJECTS.map((project, index) => <article key={project.title} className={`${styles.project} ${project.featured ? styles.featured : ""}`}>
      <div className={styles.projectTop}><span>PROJECT / {String(index + 1).padStart(2, "0")}</span><span>{project.featured ? "FEATURED BUILD" : project.role}</span></div>
      {project.featured && <div className={styles.blueprint} aria-hidden="true"><svg viewBox="0 0 400 210" fill="none"><path d="M80 155 190 200 330 130 220 85Z M80 155V70L220 0 330 45V130 M190 200V115L330 45 M80 70 190 115 M220 0V85 M130 90V135L190 160 260 125V80 M190 115V160" stroke="currentColor" strokeWidth="1.5"/><path d="M20 170 180 235M260 10 385 60M30 20V150M350 70V170" stroke="currentColor" strokeDasharray="3 5" opacity=".4"/></svg><span>FLOORPLAN → STRUCTURE → 3D</span></div>}
      <div className={styles.projectCopy}><h3>{project.title}</h3><p>{project.desc}</p><ul className={styles.tags}>{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul></div>
      <details className={styles.details}><summary>Implementation details <span aria-hidden="true">+</span></summary><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></details>
      <div className={styles.projectLinks}>{project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">Source code <span aria-hidden="true">↗</span></a>}{project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">View project <span aria-hidden="true">↗</span></a>}{!project.github && !project.link && <span>Project overview</span>}</div>
    </article>)}</div>
    <a className={styles.textLink} href={process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/deshanFdo"} target="_blank" rel="noopener noreferrer">More on GitHub <span aria-hidden="true">↗</span></a>
  </section>;
}
