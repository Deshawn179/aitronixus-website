"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Magnetic pull for primary calls to action.
 *
 * Desktop pointers only: the effect is gated on `(hover: hover) and
 * (pointer: fine)` and on prefers-reduced-motion, so touch devices and
 * motion-sensitive users get an ordinary control. Movement is capped at a few
 * pixels — enough to feel responsive, never enough to make the target hard to
 * hit or to shift surrounding layout.
 */
export function Magnetic({
  children,
  strength = 0.28,
  max = 9,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.35 });

  const capable =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (reduced) return <span className={className}>{children}</span>;

  const clamp = (v: number) => Math.max(-max, Math.min(max, v));

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ display: "inline-flex", x: sx, y: sy, willChange: "transform" }}
      onPointerMove={(e) => {
        if (!capable || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set(clamp((e.clientX - (r.left + r.width / 2)) * strength));
        y.set(clamp((e.clientY - (r.top + r.height / 2)) * strength));
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
