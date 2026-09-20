"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { scenarios } from "@/lib/content";
import { Reveal, LineReveal } from "@/components/fx/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Scenario explorer.
 *
 * Representative solution scenarios — explicitly labelled as such. These are
 * not case studies; no client has been named, quoted or invented.
 *
 * Built as a tablist with full keyboard support. Manual activation (tabs
 * select on Enter/Space, arrows only move focus) would be the stricter
 * pattern, but each panel is inexpensive and the content is short, so
 * automatic activation gives a better experience here.
 */
export function Scenarios() {
  const [index, setIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  const active = scenarios[index];

  const move = (next: number) => {
    const i = (next + scenarios.length) % scenarios.length;
    setIndex(i);
    tabs.current[i]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        move(index + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        move(index - 1);
        break;
      case "Home":
        e.preventDefault();
        move(0);
        break;
      case "End":
        e.preventDefault();
        move(scenarios.length - 1);
        break;
    }
  };

  return (
    <section id="solutions" className="section scenarios" aria-labelledby="solutions-title">
      <div className="shell">
        <header className="scenarios__header">
          <Reveal>
            <p className="eyebrow eyebrow-bright">Selected Solution Scenarios</p>
          </Reveal>
          <h2 id="solutions-title" className="display-lg scenarios__title">
            <LineReveal lines={["Six problems", "worth solving properly."]} accentIndex={1} />
          </h2>
          <Reveal delay={0.1}>
            <p className="lede scenarios__lede">
              Representative scenarios showing how the work is approached. Each describes a situation
              we are equipped to solve — not a named engagement.
            </p>
          </Reveal>
        </header>

        <div className="scenarios__body">
          <div
            role="tablist"
            aria-label="Solution scenarios"
            aria-orientation="vertical"
            className="scenarios__tabs"
            onKeyDown={onKeyDown}
          >
            {scenarios.map((s, i) => {
              const selected = i === index;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`scenario-tab-${s.id}`}
                  aria-selected={selected}
                  aria-controls="scenario-panel"
                  tabIndex={selected ? 0 : -1}
                  className="scenarios__tab"
                  data-selected={selected || undefined}
                  onClick={() => setIndex(i)}
                >
                  <span className="tech-label">{String(i + 1).padStart(2, "0")}</span>
                  <span className="scenarios__tab-label">{s.label}</span>
                </button>
              );
            })}
          </div>

          <div
            id="scenario-panel"
            role="tabpanel"
            aria-labelledby={`scenario-tab-${active.id}`}
            tabIndex={0}
            className="scenarios__panel ticked"
          >
            <div className="grid-field grid-field--fine" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.article
                key={active.id}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="scenarios__article"
              >
                <p className="tech-label scenarios__flag">Representative scenario</p>
                <h3 className="display-sm scenarios__panel-title">{active.title}</h3>

                <div className="scenarios__block">
                  <h4 className="scenarios__block-title tech-label">The situation</h4>
                  <p className="body-muted">{active.situation}</p>
                </div>

                <div className="scenarios__block">
                  <h4 className="scenarios__block-title tech-label">How we approach it</h4>
                  <ol className="scenarios__steps">
                    {active.approach.map((step, i) => (
                      <li key={step} className="scenarios__step">
                        <span className="scenarios__step-index" aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <p className="scenarios__result">
                  <span className="tech-label">Where it lands</span>
                  {active.result}
                </p>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
