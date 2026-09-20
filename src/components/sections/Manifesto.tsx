"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { vision } from "@/lib/content";
import { useInViewSafe } from "@/components/fx/useInViewSafe";

const EASE = [0.16, 1, 0.3, 1] as const;

/* The statement is split on words so each can rise independently. Punctuation
   stays attached; the em dash gets its own beat. */
const WORDS = vision.statement.split(" ");

/**
 * Vision manifesto — the quiet moment in the page.
 *
 * No cards, no controls, no competing motion: a single statement, a slow
 * illumination behind it, and nothing else.
 */
export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const inView = useInViewSafe(statementRef, { amount: 0.25 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.7, 0.15]);
  const drift = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section id="vision" ref={ref} className="section manifesto" aria-labelledby="vision-title">
      <motion.div
        className="manifesto__glow halo"
        style={{ opacity: reduced ? 0.4 : glow, y: reduced ? 0 : drift }}
        aria-hidden="true"
      />
      <div className="grid-field grid-field--center" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="shell manifesto__shell">
        <p className="eyebrow eyebrow-bright manifesto__eyebrow">{vision.eyebrow}</p>

        <h2 id="vision-title" ref={statementRef} className="manifesto__statement">
          {WORDS.map((word, i) => (
            <span key={`${word}-${i}`} className="manifesto__word-mask">
              <motion.span
                className="manifesto__word"
                data-reveal=""
                initial={reduced ? false : { y: "104%", opacity: 0 }}
                animate={
                  reduced || inView ? { y: "0%", opacity: 1 } : { y: "104%", opacity: 0 }
                }
                transition={{
                  duration: 0.9,
                  ease: EASE,
                  delay: reduced ? 0 : Math.min(i * 0.035, 1.2),
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h2>

        <div className="manifesto__sig">
          <span className="rule-lux manifesto__sig-rule" aria-hidden="true" />
          <p className="tech-label">AiTroniXus — Vision</p>
        </div>
      </div>
    </section>
  );
}
