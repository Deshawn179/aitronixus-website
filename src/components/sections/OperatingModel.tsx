"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { operatingModel } from "@/lib/content";
import { Reveal, LineReveal } from "@/components/fx/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;
const STAGES = operatingModel.stages;

/* Positions on the ring, computed once at module scope so every render — server
   and client — produces the same numbers. Starts at twelve o'clock. */
const RADIUS = 40; // percent of the ring container
const POSITIONS = STAGES.map((_, i) => {
  const angle = (i / STAGES.length) * Math.PI * 2 - Math.PI / 2;
  return {
    x: +(50 + Math.cos(angle) * RADIUS).toFixed(3),
    y: +(50 + Math.sin(angle) * RADIUS).toFixed(3),
  };
});

/**
 * The operating model as a closed loop.
 *
 * Six states arranged on a ring on wide viewports, reflowing to an ordered
 * list on narrow ones — the same single list of buttons in both cases, so
 * the reading order and tab order always match the sequence.
 */
export function OperatingModel() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const active = STAGES[index];

  return (
    <section id="approach" className="section model" aria-labelledby="approach-title">
      <div className="grid-field grid-field--fine grid-field--center" aria-hidden="true" />
      <div className="shell">
        <header className="model__header">
          <Reveal>
            <p className="eyebrow eyebrow-bright">{operatingModel.eyebrow}</p>
          </Reveal>
          <h2 id="approach-title" className="display-lg model__title">
            <LineReveal lines={[operatingModel.headline]} accentIndex={0} />
          </h2>
          <Reveal delay={0.1}>
            <p className="lede model__lede">{operatingModel.body}</p>
          </Reveal>
        </header>

        <div className="model__body">
          <div className="model__ring">
            {/* The ring itself — decorative geometry behind the controls. */}
            <svg
              className="model__ring-svg"
              viewBox="0 0 100 100"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="50" cy="50" r="40" stroke="#50e6ff" strokeOpacity="0.16" strokeWidth="0.35" />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#50e6ff"
                strokeOpacity="0.6"
                strokeWidth="0.5"
                strokeDasharray="8 243"
                strokeLinecap="round"
                className="anim-dash-flow"
                style={{ animationDuration: "18s" }}
              />
              <circle cx="50" cy="50" r="29" stroke="#50e6ff" strokeOpacity="0.08" strokeWidth="0.3" strokeDasharray="1 3" />
            </svg>

            <ol className="model__stages">
              {STAGES.map((stage, i) => {
                const selected = i === index;
                return (
                  <li
                    key={stage.id}
                    className="model__stage"
                    style={
                      {
                        "--x": `${POSITIONS[i].x}%`,
                        "--y": `${POSITIONS[i].y}%`,
                      } as React.CSSProperties
                    }
                  >
                    <button
                      type="button"
                      className="model__node"
                      data-selected={selected || undefined}
                      aria-pressed={selected}
                      onClick={() => setIndex(i)}
                      onMouseEnter={() => setIndex(i)}
                      onFocus={() => setIndex(i)}
                    >
                      <span className="model__node-dot" aria-hidden="true">
                        {stage.code}
                      </span>
                      <span className="model__node-name">{stage.name}</span>
                      <span className="model__node-step tech-label">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </button>
                    {/* Narrow viewports: the summary sits with its own stage. */}
                    <p className="model__stage-inline body-muted">{stage.summary}</p>
                  </li>
                );
              })}
            </ol>

            {/* Wide viewports: one shared centre readout. */}
            <div className="model__core" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <p className="tech-label">
                    Stage {String(index + 1).padStart(2, "0")} / 06
                  </p>
                  <h3 className="display-sm model__core-name">{active.name}</h3>
                  <p className="body-muted model__core-body">{active.summary}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <Reveal delay={0.05}>
          <p className="model__loop tech-label">
            <span className="status-dot anim-status" aria-hidden="true" />
            Evolve returns to Discover — the loop does not terminate
          </p>
        </Reveal>
      </div>
    </section>
  );
}
