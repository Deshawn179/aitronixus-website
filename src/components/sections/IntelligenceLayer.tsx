"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { intelligence } from "@/lib/content";
import { Reveal, LineReveal } from "@/components/fx/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The ecosystem as an exploded stack.
 *
 * Implemented as a real tablist: arrow keys move between layers, Home/End jump
 * to the ends, and the description is a single live panel rather than seven
 * competing ones. Hover is a convenience on top of that, never the only way in.
 */
export function IntelligenceLayer() {
  const layers = intelligence.layers;
  const [index, setIndex] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  const active = layers[index];

  const focusTab = (next: number) => {
    const i = (next + layers.length) % layers.length;
    setIndex(i);
    tabsRef.current[i]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        focusTab(index + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        focusTab(index - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(layers.length - 1);
        break;
    }
  };

  return (
    <section id="intelligence" className="section layer-section" aria-labelledby="intelligence-title">
      <div className="grid-field grid-field--fine grid-field--center" aria-hidden="true" />
      <div className="shell layer-section__grid">
        <div className="layer-section__intro">
          <Reveal>
            <p className="eyebrow eyebrow-bright">{intelligence.eyebrow}</p>
          </Reveal>

          <h2 id="intelligence-title" className="display-md layer-section__title">
            <LineReveal lines={[intelligence.headline]} />
            <span className="layer-section__title-accent">
              <LineReveal lines={[intelligence.headlineAccent]} accentIndex={0} delay={0.12} />
            </span>
          </h2>

          <Reveal delay={0.1}>
            <p className="body-muted layer-section__body">{intelligence.body}</p>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="tech-label layer-section__hint">
              Select a layer — use the arrow keys to move through the stack.
            </p>
          </Reveal>
        </div>

        <div className="layer-stack">
          <div
            role="tablist"
            aria-label="The AiTroniXus intelligence stack"
            aria-orientation="vertical"
            className="layer-stack__list"
            onKeyDown={onKeyDown}
          >
            {layers.map((layer, i) => {
              const selected = i === index;
              return (
                <button
                  key={layer.id}
                  ref={(el) => {
                    tabsRef.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`layer-tab-${layer.id}`}
                  aria-selected={selected}
                  aria-controls="layer-panel"
                  tabIndex={selected ? 0 : -1}
                  className="layer-plate"
                  data-selected={selected || undefined}
                  style={{ "--depth": String(i) } as React.CSSProperties}
                  onClick={() => setIndex(i)}
                  onMouseEnter={() => setIndex(i)}
                  onFocus={() => setIndex(i)}
                >
                  <span className="layer-plate__index tech-label">{layer.index}</span>
                  <span className="layer-plate__name">{layer.name}</span>
                  <span className="layer-plate__role tech-label">{layer.role}</span>
                  <span className="layer-plate__edge" aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <div
            id="layer-panel"
            role="tabpanel"
            aria-labelledby={`layer-tab-${active.id}`}
            className="layer-panel layer-panel--floating"
            tabIndex={0}
            aria-live="polite"
            aria-atomic="true"
          >
            <motion.div
              key={active.id}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="tech-label">
                <span className="signal-dot" aria-hidden="true" /> Layer {active.index} — {active.role}
              </p>
              <h3 className="display-sm layer-panel__name">{active.name}</h3>
              <p className="body-muted">{active.summary}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
