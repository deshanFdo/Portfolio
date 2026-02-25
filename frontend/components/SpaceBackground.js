"use client";
import React, { useEffect, useRef } from "react";
import styles from "./SpaceBackground.module.css";

export default function SpaceBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let animationFrameId;
        let particles = [];

        // Resize handler
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resize);
        resize();

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 1.5 + 0.5;
                this.opacity = Math.random() * 0.4 + 0.1;
                this.color = Math.random() > 0.7
                    ? `rgba(0, 210, 190, `
                    : Math.random() > 0.5
                        ? `rgba(200, 200, 220, `
                        : `rgba(100, 255, 218, `;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.opacity + ")";
                ctx.fill();
            }
        }

        // Initialize particles
        const init = () => {
            particles = [];
            const count = Math.min(Math.floor(window.innerWidth * 0.04), 80);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        init();

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections
            ctx.lineWidth = 0.3;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        const opacity = (1 - distance / 120) * 0.08;
                        ctx.strokeStyle = `rgba(0, 210, 190, ${opacity})`;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Update and draw particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className={styles.background}>
            <div className={styles.meshGradient} />
            <canvas ref={canvasRef} className={styles.canvas} />
            <div className={styles.overlay} />
        </div>
    );
}
