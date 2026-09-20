"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Thin reading indicator across the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: reduced ? scrollYProgress : scaleX }}
      aria-hidden="true"
    />
  );
}

/**
 * A soft cyan aura that trails the cursor. Purely decorative: mounted only for
 * fine pointers, removed entirely under reduced motion, and never intercepts
 * a click.
 */
export function CursorAura() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
    };

    /* One rAF loop, one transform write — no layout reads in the loop. */
    const tick = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={ref} className="cursor-aura" aria-hidden="true" />;
}

/**
 * Publishes normalised pointer position (-1 … 1) as CSS custom properties on a
 * container, for parallax that costs nothing when unused. Desktop only.
 */
export function usePointerParallax<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let px = 0;
    let py = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          el.style.setProperty("--pointer-x", px.toFixed(3));
          el.style.setProperty("--pointer-y", py.toFixed(3));
        });
      }
    };

    const reset = () => {
      el.style.setProperty("--pointer-x", "0");
      el.style.setProperty("--pointer-y", "0");
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", reset);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ref, reduced]);
}
