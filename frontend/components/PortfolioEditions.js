"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./PortfolioEditions.module.css";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "/Portfolio";
const editions = [
  { slug: "", name: "Silverworks", team: "Mercedes", color: "#65e9ca" },
  { slug: "ferrari", name: "Rosso Works", team: "Ferrari", color: "#ff5363" },
  { slug: "redbull", name: "Night Shift", team: "Red Bull", color: "#ffcc24" },
];

export default function PortfolioEditions({ current }) {
  const menu = useRef(null);
  useEffect(() => {
    const outside = (event) => {
      if (!menu.current?.contains(event.target)) menu.current.open = false;
    };
    const escape = (event) => {
      if (event.key === "Escape" && menu.current?.open) {
        menu.current.open = false;
        menu.current.querySelector("summary").focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  return <details className={styles.menu} ref={menu}>
    <summary>Editions <ChevronDown size={14} aria-hidden="true" /></summary>
    <div>{editions.map(({ slug, name, team, color }) =>
      <a key={name} href={base + "/" + slug} aria-current={current === slug ? "page" : undefined}>
        <i style={{ background: color }} aria-hidden="true" />
        <span>{name}<small>{team}</small></span>
      </a>
    )}</div>
  </details>;
}
