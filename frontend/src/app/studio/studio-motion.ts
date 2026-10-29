"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export function useMotionPreference() {
  // Start still, including server-rendered HTML, until the system preference is known.
  const [reduced, setReduced] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const previous = document.documentElement.style.scrollBehavior;
    if (reduced || paused) document.documentElement.style.scrollBehavior = "auto";
    return () => { document.documentElement.style.scrollBehavior = previous; };
  }, [reduced, paused]);

  return { motion: !reduced && !paused, reduced, toggleMotion: () => setPaused(value => !value) };
}

export function useStudioMotion(
  root: RefObject<HTMLDivElement | null>,
  progress: RefObject<HTMLDivElement | null>,
  enabled: boolean,
  filter: string,
) {
  const revealed = useRef(new WeakSet<Element>());

  useEffect(() => {
    const page = root.current;
    if (!page || !enabled || !("IntersectionObserver" in window)) return;

    const targets = page.querySelectorAll<HTMLElement>("[data-reveal]");
    const reveal = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        element.dataset.enter = "visible";
        revealed.current.add(element);
        reveal.unobserve(element);
      }
    }, { threshold: 0.08 });

    targets.forEach(element => {
      if (revealed.current.has(element)) return;
      // Don't replay content already passed when motion is enabled midway down the page.
      if (element.getBoundingClientRect().bottom < 0) return;
      element.dataset.enter = "pending";
      reveal.observe(element);
    });

    // Decorative loops only run while their section is on screen.
    const loops = page.querySelectorAll<HTMLElement>("[data-motion-region]");
    const visibility = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        (entry.target as HTMLElement).dataset.inView = String(entry.isIntersecting);
      });
    });
    loops.forEach(element => visibility.observe(element));
    const syncVisibility = () => { page.dataset.pageVisible = String(!document.hidden); };
    const finishReveal = (event: AnimationEvent) => {
      const element = event.target;
      if (element instanceof HTMLElement && element.dataset.enter === "visible") {
        delete element.dataset.enter;
      }
    };
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    page.addEventListener("animationend", finishReveal);

    return () => {
      reveal.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
      page.removeEventListener("animationend", finishReveal);
      targets.forEach(element => delete element.dataset.enter);
      loops.forEach(element => delete element.dataset.inView);
    };
  }, [root, enabled, filter]);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const fraction = height > 0 ? Math.min(1, Math.max(0, window.scrollY / height)) : 0;
      if (progress.current) progress.current.style.transform = `scaleX(${fraction})`;
      frame = 0;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const resize = new ResizeObserver(schedule);
    if (root.current) resize.observe(root.current);
    update();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resize.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [root, progress, enabled]);
}
