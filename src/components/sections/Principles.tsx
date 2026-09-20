"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { principles } from "@/lib/content";
import { Reveal, LineReveal } from "@/components/fx/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

function PrincipleVisual({ id }: { id: string }) {
  const line = { stroke: "#50e6ff", strokeOpacity: 0.3, strokeWidth: 1.2, fill: "none" } as const;
  const bright = { stroke: "#50e6ff", strokeOpacity: 0.8, strokeWidth: 1.5, fill: "none" } as const;

  return (
    <svg viewBox="0 0 320 320" fill="none" aria-hidden="true" focusable="false" className="principle__svg">
      <circle cx="160" cy="160" r="150" stroke="#50e6ff" strokeOpacity="0.08" strokeWidth="1" />

      {id === "think" && (
        <g>
          {/* signals converging on a decision point */}
          <path d="M20 60h84l40 90M20 160h96l28-10M20 260h84l40-90M300 160h-84" {...line} />
          <path d="M104 60l40 90" {...bright} strokeDasharray="10 220" className="anim-dash-flow" />
          <circle cx="160" cy="160" r="38" {...line} />
          <circle cx="160" cy="160" r="22" {...bright} />
          <circle cx="160" cy="160" r="6" fill="#50e6ff" className="anim-pulse-node" style={{ transformOrigin: "160px 160px" }} />
          <g fill="#50e6ff" fillOpacity="0.5">
            <circle cx="20" cy="60" r="4" />
            <circle cx="20" cy="160" r="4" />
            <circle cx="20" cy="260" r="4" />
          </g>
          <circle cx="300" cy="160" r="5" fill="#50e6ff" />
        </g>
      )}

      {id === "learn" && (
        <g>
          {/* a feedback loop tightening around the system */}
          <rect x="110" y="110" width="100" height="100" rx="8" {...bright} />
          <path
            d="M160 74a86 86 0 1 1-60 25"
            {...line}
            strokeDasharray="6 6"
          />
          <path
            d="M160 44a116 116 0 1 1-82 34"
            {...line}
            strokeOpacity="0.16"
          />
          <path d="M100 99l-4 22 22-4" {...bright} />
          <path
            d="M160 74a86 86 0 1 1-60 25"
            stroke="#50e6ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="16 500"
            className="anim-dash-flow"
            fill="none"
          />
          <g fill="#50e6ff">
            <circle cx="160" cy="110" r="4" fillOpacity="0.8" />
            <circle cx="210" cy="160" r="4" fillOpacity="0.55" />
            <circle cx="160" cy="210" r="4" fillOpacity="0.8" />
            <circle cx="110" cy="160" r="4" fillOpacity="0.55" />
          </g>
        </g>
      )}

      {id === "evolve" && (
        <g>
          {/* a structure extending itself outward */}
          <rect x="136" y="136" width="48" height="48" rx="4" {...bright} />
          <rect x="100" y="100" width="120" height="120" rx="6" {...line} />
          <rect x="64" y="64" width="192" height="192" rx="8" {...line} strokeOpacity="0.18" />
          <rect x="28" y="28" width="264" height="264" rx="10" {...line} strokeOpacity="0.1" strokeDasharray="4 8" />
          <path d="M160 136V64M160 184v72M136 160H64M184 160h72" {...line} />
          <path d="M184 136l36-36M136 136l-36-36M184 184l36 36M136 184l-36 36" {...line} strokeOpacity="0.16" />
          <circle cx="160" cy="160" r="6" fill="#50e6ff" className="anim-pulse-node" style={{ transformOrigin: "160px 160px" }} />
          <g fill="#50e6ff" fillOpacity="0.45">
            <circle cx="220" cy="100" r="3.5" />
            <circle cx="100" cy="100" r="3.5" />
            <circle cx="220" cy="220" r="3.5" />
            <circle cx="100" cy="220" r="3.5" />
          </g>
        </g>
      )}
    </svg>
  );
}

/**
 * Think / Learn / Evolve.
 *
 * Scroll position selects which principle is illustrated, via an
 * IntersectionObserver on the text blocks. If observers are unavailable — or
 * motion is reduced — every block is still fully readable and the diagram
 * simply rests on the first principle.
 */
export function Principles() {
  const [active, setActive] = useState(0);
  /* Only dim the inactive principles once we know observation actually works.
     Without this, a host where the observer never reports would leave two
     thirds of the copy permanently faded. */
  const [observed, setObserved] = useState(false);
  const blocks = useRef<(HTMLElement | null)[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const els = blocks.current.filter((el): el is HTMLElement => Boolean(el));
    if (!els.length || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        setObserved(true);
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!top) return;
        const i = els.indexOf(top.target as HTMLElement);
        if (i >= 0) setActive(i);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.4, 1] },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="principles" className="section principles" aria-labelledby="principles-title">
      <div className="shell">
        <header className="principles__header">
          <Reveal>
            <p className="eyebrow eyebrow-bright">Systems that think, learn and evolve</p>
          </Reveal>
          <h2 id="principles-title" className="display-lg principles__title">
            <LineReveal lines={["Three properties", "of an intelligent system."]} accentIndex={1} />
          </h2>
        </header>

        <div className="principles__body">
          <div className="principles__stage" aria-hidden="true">
            <div className="principles__stage-sticky">
              <AnimatePresence mode="wait">
                <motion.div
                  key={principles[active].id}
                  className="principle__visual"
                  initial={reduced ? false : { opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <PrincipleVisual id={principles[active].id} />
                </motion.div>
              </AnimatePresence>
              <span className="principle__ordinal">{principles[active].ordinal}</span>
            </div>
          </div>

          <ol className="principles__list" data-observed={observed || undefined}>
            {principles.map((p, i) => (
              <li
                key={p.id}
                ref={(el) => {
                  blocks.current[i] = el;
                }}
                className="principle"
                data-active={i === active || undefined}
              >
                <div className="principle__head">
                  <span className="principle__ordinal-inline tech-label">{p.ordinal}</span>
                  <span className="principle__name">{p.name}</span>
                  <span className="principle__line" aria-hidden="true" />
                </div>
                <h3 className="display-sm principle__headline">{p.headline}</h3>
                <p className="body-muted principle__body">{p.body}</p>
                {/* Narrow viewports keep the diagram beside its own principle. */}
                <div className="principle__visual-inline" aria-hidden="true">
                  <PrincipleVisual id={p.id} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
