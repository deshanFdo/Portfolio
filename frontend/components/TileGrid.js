"use client";
import React from "react";
import styles from "./TileGrid.module.css";

const NUM_TILES = 2500;

export default function TileGrid() {
  return (
    <div id="container" className={styles.container}>
      {Array.from({ length: NUM_TILES }).map((_, i) => (
        <div key={i} className={styles.tile}></div>
      ))}
    </div>
  );
}
