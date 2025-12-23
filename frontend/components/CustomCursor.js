"use client";
import React, { useEffect, useState, useCallback } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const onMouseMove = useCallback((e) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // Add hover detection for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, [role="button"], .hover-target'
      );
      
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    // Initial setup and mutation observer for dynamic content
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      observer.disconnect();
    };
  }, [onMouseMove, onMouseLeave]);

  if (typeof window === "undefined") return null;

  return (
    <>
      {/* Dot */}
      <div
        style={{
          position: "fixed",
          left: position.x - 4,
          top: position.y - 4,
          width: 8,
          height: 8,
          backgroundColor: "#00D2BE",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease, transform 0.1s ease",
          transform: isHovering ? "scale(0)" : "scale(1)",
          mixBlendMode: "difference",
        }}
      />
      {/* Ring */}
      <div
        style={{
          position: "fixed",
          left: position.x - 20,
          top: position.y - 20,
          width: 40,
          height: 40,
          border: "2px solid #00D2BE",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: isVisible ? 1 : 0,
          transition: "all 0.15s ease-out",
          transform: isHovering ? "scale(1.5)" : "scale(1)",
          backgroundColor: isHovering ? "rgba(0, 210, 190, 0.1)" : "transparent",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
