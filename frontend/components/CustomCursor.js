"use client";
import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const rafId = useRef(null);
  const isVisible = useRef(false);

  useEffect(() => {
    document.body.classList.add("custom-cursor-active");

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible.current) {
        isVisible.current = true;
        ringPos.current = { ...mousePos.current };
      }
    };

    const onMouseLeave = () => { isVisible.current = false; };
    const onMouseEnter = () => { isVisible.current = true; };

    const animate = () => {
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      // Ring follows with smooth easing
      ringPos.current.x += (mx - ringPos.current.x) * 0.15;
      ringPos.current.y += (my - ringPos.current.y) * 0.15;

      const vis = isVisible.current ? 1 : 0;
      const hover = isHovering.current;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) scale(${hover ? 1.5 : 1})`;
        dotRef.current.style.opacity = vis;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) scale(${hover ? 1.5 : 1})`;
        ringRef.current.style.opacity = vis * 0.6;
      }

      rafId.current = requestAnimationFrame(animate);
    };

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
      {/* Trailing ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: -16,
          left: -16,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1.5px solid rgba(0, 210, 190, 0.5)",
          pointerEvents: "none",
          zIndex: 99998,
          willChange: "transform, opacity",
          transition: "width 0.2s, height 0.2s, top 0.2s, left 0.2s",
        }}
      />

      {/* Center dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#00D2BE",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform, opacity",
          boxShadow: "0 0 10px rgba(0, 210, 190, 0.5)",
        }}
      />
    </>
  );
}
