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

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", () => setIsVisible(false));

    const addHoverListeners = () => {
      document.querySelectorAll("a, button, input, textarea, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, [onMouseMove]);

  if (typeof window === "undefined") return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          left: position.x - 4,
          top: position.y - 4,
          width: 8,
          height: 8,
          backgroundColor: "#DFFF00",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s, transform 0.1s",
          transform: isHovering ? "scale(0)" : "scale(1)",
          mixBlendMode: "difference",
        }}
      />
      <div
        style={{
          position: "fixed",
          left: position.x - 20,
          top: position.y - 20,
          width: 40,
          height: 40,
          border: "1px solid #DFFF00",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: isVisible ? 0.5 : 0,
          transition: "all 0.15s ease-out",
          transform: isHovering ? "scale(1.5)" : "scale(1)",
        }}
      />
    </>
  );
}
