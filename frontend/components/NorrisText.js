"use client";
import React from "react";

// Norris sliding text effect - wraps each character
export default function NorrisText({ text, className = "", fontSize = "inherit" }) {
  const chars = text.split("");
  
  return (
    <span 
      className={`norris-text ${className}`}
      style={{ fontSize, lineHeight: fontSize }}
    >
      {chars.map((char, i) => (
        <span 
          key={i} 
          className="char" 
          data-char={char === " " ? "\u00A0" : char}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
