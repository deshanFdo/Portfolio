"use client";
import React, { useRef, useEffect } from "react";
import styles from "./TileGrid.module.css";

const NUM_TILES = 2500;

function colorForIndex(idx) {
  // idx is 1-based like nth-child
  // start with 4n mapping
  let color = null;
  if (idx % 4 === 0) color = "rgb(var(--red-rgb))";
  if (idx % 4 === 1) color = "rgb(var(--blue-rgb))";
  if (idx % 4 === 2) color = "rgb(var(--green-rgb))";
  if (idx % 4 === 3) color = "rgb(var(--yellow-rgb))";

  // override with 7n rules
  if (idx % 7 === 0) color = "rgb(var(--blue-rgb))";
  if (idx % 7 === 3) color = "rgb(var(--green-rgb))";
  if (idx % 7 === 5) color = "rgb(var(--yellow-rgb))";
  if (idx % 7 === 6) color = "rgb(var(--red-rgb))";

  // override with 11n rules
  if (idx % 11 === 1) color = "rgb(var(--red-rgb))";
  if (idx % 11 === 4) color = "rgb(var(--blue-rgb))";
  if (idx % 11 === 7) color = "rgb(var(--green-rgb))";
  if (idx % 11 === 10) color = "rgb(var(--yellow-rgb))";

  return color;
}

export default function TileGrid() {
  const containerRef = useRef(null);
  const prevElRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function handleMove(e) {
      const x = e.clientX;
      const y = e.clientY;
      const el = document.elementFromPoint(x, y);
      if (!el) return;
      // ensure we're hitting a tile inside this container
      if (!container.contains(el)) return;
      // class name is the module-scoped class
      const tileClass = styles.tile;
      if (!el.classList.contains(tileClass)) return;

      if (prevElRef.current === el) return;

      // remove previous
      if (prevElRef.current) {
        prevElRef.current.classList.remove(styles.lit);
        prevElRef.current.style.backgroundColor = "";
      }

      // add to new
      const idx = Number(el.dataset.index);
      const color = colorForIndex(idx + 1);
      if (color) el.style.backgroundColor = color;
      el.classList.add(styles.lit);
      prevElRef.current = el;
    }

    function handleLeave() {
      if (prevElRef.current) {
        prevElRef.current.classList.remove(styles.lit);
        prevElRef.current.style.backgroundColor = "";
        prevElRef.current = null;
      }
    }

    container.addEventListener("pointermove", handleMove);
    container.addEventListener("pointerleave", handleLeave);
    window.addEventListener("scroll", handleLeave, true);

    return () => {
      container.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("scroll", handleLeave, true);
    };
  }, []);

  return (
    <div id="container" className={styles.container} ref={containerRef}>
      {Array.from({ length: NUM_TILES }).map((_, i) => (
        <div key={i} data-index={i} className={styles.tile}></div>
      ))}
    </div>
  );
}
