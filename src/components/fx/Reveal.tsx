"use client";

import { useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { useInViewSafe } from "./useInViewSafe";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Standard entrance. Transform + opacity only, played once when the element
 * enters the viewport. Under prefers-reduced-motion the element is simply
 * present — no fade, no offset, no delay.
 */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  amount = 0.3,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInViewSafe(ref, { amount });

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      data-reveal=""
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered group. Children opt in via <RevealItem>. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.2,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  as?: "div" | "ul" | "ol";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInViewSafe(ref, { amount });
  const MotionTag = motion[As];

  if (reduced) return <As className={className}>{children}</As>;

  const variants: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  return (
    <MotionTag
      ref={ref as React.Ref<never>}
      className={className}
      data-reveal=""
      variants={variants}
      initial="hidden"
      animate={inView ? "shown" : "hidden"}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  y = 22,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li";
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[As];

  if (reduced) return <As className={className}>{children}</As>;

  return (
    <MotionTag
      className={className}
      data-reveal=""
      variants={{
        hidden: { opacity: 0, y },
        shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
      }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Headline reveal: each line rises out of its own clipping band. The mask is a
 * wrapper with overflow hidden, so nothing is painted outside the line box and
 * no layout shift occurs.
 */
export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  accentIndex,
  accentClassName = "ink-luminous",
}: {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  accentIndex?: number;
  accentClassName?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const inView = useInViewSafe(ref, { amount: 0.25 });

  return (
    <span ref={ref} className={className} style={{ display: "block" }}>
      {lines.map((line, i) => {
        const content = <span className={i === accentIndex ? accentClassName : undefined}>{line}</span>;

        if (reduced) {
          return (
            <span key={line} className={lineClassName} style={{ display: "block" }}>
              {content}
            </span>
          );
        }

        return (
          <span key={line} style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
            <motion.span
              className={lineClassName}
              data-reveal=""
              style={{ display: "block", willChange: "transform" }}
              initial={{ y: "108%" }}
              animate={inView ? { y: "0%" } : { y: "108%" }}
              transition={{ duration: 1.05, ease: EASE, delay: delay + i * 0.09 }}
            >
              {content}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
