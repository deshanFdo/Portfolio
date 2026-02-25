"use client";
import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const glowRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });
  const rotation = useRef(0);
  const prevPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const rafId = useRef(null);
  const isVisible = useRef(false);
  const speed = useRef(0);

  useEffect(() => {
    document.body.classList.add("custom-cursor-active");

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible.current) {
        isVisible.current = true;
        // Snap trail/glow to first position
        trailPos.current = { ...mousePos.current };
        glowPos.current = { ...mousePos.current };
      }
    };

    const onMouseLeave = () => {
      isVisible.current = false;
    };

    const onMouseEnter = () => {
      isVisible.current = true;
    };

    // Animate with requestAnimationFrame for zero lag
    const animate = () => {
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      // Calculate speed for effects
      const dx = mx - prevPos.current.x;
      const dy = my - prevPos.current.y;
      speed.current = Math.sqrt(dx * dx + dy * dy);

      // Calculate rotation angle based on movement direction
      if (speed.current > 1.5) {
        const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        // Smooth rotation
        let diff = targetAngle - rotation.current;
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        rotation.current += diff * 0.15;
      }

      prevPos.current = { x: mx, y: my };

      // Trail follows with smooth easing
      trailPos.current.x += (mx - trailPos.current.x) * 0.12;
      trailPos.current.y += (my - trailPos.current.y) * 0.12;

      // Glow follows even more lazily
      glowPos.current.x += (mx - glowPos.current.x) * 0.06;
      glowPos.current.y += (my - glowPos.current.y) * 0.06;

      const vis = isVisible.current ? 1 : 0;
      const hover = isHovering.current;
      const carScale = hover ? 1.3 : 1;
      const trailScale = hover ? 1.8 : 1 + Math.min(speed.current * 0.02, 0.5);

      if (carRef.current) {
        carRef.current.style.transform = `translate(${mx}px, ${my}px) rotate(${rotation.current}deg) scale(${carScale})`;
        carRef.current.style.opacity = vis;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPos.current.x}px, ${trailPos.current.y}px) scale(${trailScale})`;
        trailRef.current.style.opacity = vis * 0.5;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowPos.current.x}px, ${glowPos.current.y}px)`;
        glowRef.current.style.opacity = vis * (hover ? 0.4 : 0.15 + Math.min(speed.current * 0.01, 0.2));
      }

      rafId.current = requestAnimationFrame(animate);
    };

    // Hover detection
    const setHoverTrue = () => { isHovering.current = true; };
    const setHoverFalse = () => { isHovering.current = false; };

    const addHoverListeners = () => {
      document.querySelectorAll(
        'a, button, input, textarea, [role="button"], .hover-target'
      ).forEach((el) => {
        el.addEventListener("mouseenter", setHoverTrue);
        el.addEventListener("mouseleave", setHoverFalse);
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    addHoverListeners();

    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      observer.disconnect();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (typeof window === "undefined") return null;

  return (
    <>
      {/* Ambient glow - follows lazily */}
      <div
        ref={glowRef}
        style={{
          position: "fixed",
          top: -30,
          left: -30,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,210,190,0.4) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 99997,
          willChange: "transform, opacity",
        }}
      />

      {/* Teal trail ring */}
      <div
        ref={trailRef}
        style={{
          position: "fixed",
          top: -14,
          left: -14,
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1.5px solid rgba(0, 210, 190, 0.5)",
          pointerEvents: "none",
          zIndex: 99998,
          willChange: "transform, opacity",
        }}
      />

      {/* F1 Car cursor - follows mouse exactly */}
      <div
        ref={carRef}
        style={{
          position: "fixed",
          top: -10,
          left: -10,
          width: 20,
          height: 20,
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform, opacity",
        }}
      >
        {/* Mini F1 car SVG */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0 0 6px rgba(0, 210, 190, 0.6))" }}
        >
          {/* Car body */}
          <path
            d="M2 12 L6 10 L8 8 L16 8 L20 10 L22 12 L22 14 L2 14 Z"
            fill="#00D2BE"
            stroke="#00A89D"
            strokeWidth="0.5"
          />
          {/* Cockpit */}
          <path
            d="M10 8 L11 6 L14 6 L15 8"
            fill="#0a0a10"
            stroke="#00D2BE"
            strokeWidth="0.4"
          />
          {/* Front wing */}
          <path d="M20 11 L23 10.5 L23 13 L22 13" fill="#00A89D" />
          {/* Rear wing */}
          <path d="M2 12 L1 10 L1 10.5 L3 11" fill="#00A89D" />
          <line x1="1" y1="9" x2="1" y2="11" stroke="#00D2BE" strokeWidth="0.8" />
          {/* Wheels */}
          <circle cx="7" cy="14.5" r="2" fill="#1a1a2e" stroke="#333" strokeWidth="0.5" />
          <circle cx="7" cy="14.5" r="0.8" fill="#444" />
          <circle cx="18" cy="14.5" r="2" fill="#1a1a2e" stroke="#333" strokeWidth="0.5" />
          <circle cx="18" cy="14.5" r="0.8" fill="#444" />
          {/* Number */}
          <text x="12" y="12.5" textAnchor="middle" fill="#0a0a10" fontSize="3.5" fontWeight="bold" fontFamily="monospace">44</text>
        </svg>
      </div>
    </>
  );
}
