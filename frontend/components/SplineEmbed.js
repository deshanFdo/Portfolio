"use client";
import React, { useRef, useEffect, useState } from "react";

export default function SplineEmbed({ scene, style, onLoad, className, ...props }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const onLoadRef = useRef(onLoad);
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => { onLoadRef.current = onLoad; }, [onLoad]);

  useEffect(() => {
    let app;
    let cancelled = false;
    let started = false;
    let visible = false;
    let ready = false;
    const syncPlayback = () => {
      if (!ready || cancelled) return;
      if (visible && !document.hidden) app.play();
      else app.stop();
    };
    const load = async () => {
      if (started || cancelled) return;
      started = true;
      setStatus("loading");
      try {
        const { Application } = await import("@splinetool/runtime");
        if (cancelled) return;
        app = new Application(canvasRef.current);
        await app.load(scene);
        if (cancelled) return;
        ready = true;
        setStatus("ready");
        syncPlayback();
        onLoadRef.current?.(app);
      } catch (error) {
        if (!cancelled) {
          console.error("Robot scene could not load:", error);
          setStatus("error");
        }
      }
    };
    // The same interactive robot is retained. Load its runtime only near the viewport.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) void load();
      syncPlayback();
    }, { rootMargin: "100px" });
    observer.observe(containerRef.current);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      cancelled = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      app?.dispose();
    };
  }, [scene, attempt]);

  return (
    <div ref={containerRef} className={className} style={{ width: "100%", height: "100%", position: "relative", ...style }}>
      <canvas ref={canvasRef} role="img" aria-label="Interactive 3D robot" style={{ width: "100%", height: "100%", display: "block", touchAction: "pan-y" }} {...props} />
      {status !== "ready" && (
        <div className="robot-status" role="status" aria-live="polite">
          <span>{status === "error" ? "The robot could not load. Your connection may be unavailable." : "Loading interactive robot…"}</span>
          {status === "error" && <button type="button" onClick={() => setAttempt(value => value + 1)}>Retry robot</button>}
        </div>
      )}
    </div>
  );
}
