"use client";
import React, { useEffect, useRef } from "react";
import styles from "./AuroraBackground.module.css";

export default function AuroraBackground() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let animationId;
    let time = 0;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener("resize", resize);
    
    // Aurora colors
    const colors = [
      { r: 0, g: 210, b: 190 },   // Petronas teal
      { r: 0, g: 145, b: 255 },    // Electric blue
      { r: 0, g: 100, b: 150 },    // Deep teal
    ];
    
    const blobs = [
      { x: 0.3, y: 0.2, vx: 0.0003, vy: 0.0002, radius: 0.4, color: 0 },
      { x: 0.7, y: 0.5, vx: -0.0002, vy: 0.0003, radius: 0.35, color: 1 },
      { x: 0.5, y: 0.8, vx: 0.0002, vy: -0.0002, radius: 0.3, color: 2 },
    ];
    
    const animate = () => {
      time += 1;
      
      // Clear with fade
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw blobs
      blobs.forEach((blob, i) => {
        // Update position
        blob.x += blob.vx + Math.sin(time * 0.001 + i) * 0.0001;
        blob.y += blob.vy + Math.cos(time * 0.001 + i) * 0.0001;
        
        // Bounce off edges
        if (blob.x < 0 || blob.x > 1) blob.vx *= -1;
        if (blob.y < 0 || blob.y > 1) blob.vy *= -1;
        
        // Draw gradient blob
        const x = blob.x * canvas.width;
        const y = blob.y * canvas.height;
        const radius = blob.radius * Math.min(canvas.width, canvas.height);
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        const color = colors[blob.color];
        
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.15)`);
        gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, 0.05)`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
      
      {/* Grid overlay */}
      <div className={styles.grid}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`v-${i}`} className={styles.gridLineV} style={{ left: `${(i + 1) * (100 / 13)}%` }} />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`h-${i}`} className={styles.gridLineH} style={{ top: `${(i + 1) * (100 / 9)}%` }} />
        ))}
      </div>
      
      {/* Corner accents */}
      <div className={`${styles.corner} ${styles.topLeft}`} />
      <div className={`${styles.corner} ${styles.topRight}`} />
      <div className={`${styles.corner} ${styles.bottomLeft}`} />
      <div className={`${styles.corner} ${styles.bottomRight}`} />
      
      {/* Scanline effect */}
      <div className={styles.scanlines} />
    </div>
  );
}
