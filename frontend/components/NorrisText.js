"use client";
import React from "react";

// Component that creates the Norris sliding text effect
export default function NorrisText({ text, className = "", fontSize = "4rem", as: Tag = "span" }) {
  const chars = text.split("");
  
  return (
    <Tag 
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
    </Tag>
  );
}
