"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * A quiet system-status detail.
 *
 * It reports the state of this site, not invented business metrics: the
 * messages cycle through genuine front-end conditions. The first frame is
 * deterministic so server and client markup agree.
 */
const READOUTS = [
  "Intelligence layer — online",
  "Design system — nominal",
  "Motion pipeline — composited",
  "Accessibility layer — active",
] as const;

export function SystemStatus() {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % READOUTS.length), 3600);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <p
      className="tech-label"
      style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", margin: 0 }}
    >
      <span className="status-dot anim-status" aria-hidden="true" />
      <span aria-live="off">{READOUTS[i]}</span>
    </p>
  );
}
