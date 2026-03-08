"use client";
import React from "react";
import styles from "./NorrisText.module.css";

// Norris sliding text effect - wraps each character
export default function NorrisText({ text, className = "", charClassName = "", fontSize = "inherit" }) {
  const chars = text.split("");
  
  return (
    <span 
      className={`${styles.norrisText} ${className}`.trim()}
      style={{ fontSize, lineHeight: fontSize }}
      aria-label={text}
    >
      {chars.map((char, i) => (
        <span 
          key={i} 
          className={`${styles.char} ${charClassName}`.trim()}
          data-char={char === " " ? "\u00A0" : char}
          style={{ "--char-index": i }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
