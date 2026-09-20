"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { capabilities } from "@/lib/content";
import { Reveal, LineReveal } from "@/components/fx/Reveal";
import { CapabilityGlyph } from "./CapabilityGlyph";
import { ServiceSculpture } from "./ServiceSculpture";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Capabilities as an engineering register, not a card grid.
 *
 * A single expanded entry at a time keeps the page composed and gives each
 * capability the full width of the column when it is open. The accompanying
 * diagram is sticky on wide viewports so the metaphor stays in view while the
 * detail is read; on narrow viewports it collapses into the open entry.
 */
export function Capabilities() {
  const [openId, setOpenId] = useState<string>(capabilities[0].id);
  const reduced = useReducedMotion();
  const active = capabilities.find((c) => c.id === openId) ?? capabilities[0];

  return (
    <section id="capabilities" className="section cap" aria-labelledby="capabilities-title">
      <div className="shell">
        <header className="cap__header">
          <Reveal>
            <p className="eyebrow eyebrow-bright">Core Capabilities</p>
          </Reveal>
          <h2 id="capabilities-title" className="display-lg cap__title">
            <LineReveal lines={["Six disciplines.", "One engineering practice."]} accentIndex={1} />
          </h2>
          <Reveal delay={0.1}>
            <p className="lede cap__lede">
              Each capability is delivered by the same team, against the same architecture. That is
              what stops integration from becoming someone else&rsquo;s problem.
            </p>
          </Reveal>
        </header>

        <div className="cap__body">
          {/* Sticky diagram — decorative, mirrors the open entry. */}
          <div className="cap__stage" aria-hidden="true">
            <div className="cap__stage-inner ticked">
              <div className="grid-field grid-field--fine" />
              <AnimatePresence mode="sync">
                <motion.div
                  key={active.id}
                  className="cap__glyph-wrap"
                  initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <ServiceSculpture index={active.index} title={active.title} />
                </motion.div>
              </AnimatePresence>
              <div className="cap__stage-meta">
                <span className="tech-label">{active.index} / 06</span>
                <span className="tech-label">{active.title}</span>
              </div>
            </div>
          </div>

          {/* The register */}
          <ul className="cap__list">
            {capabilities.map((c) => {
              const open = c.id === openId;
              return (
                <li key={c.id} className="cap__row" data-open={open || undefined}>
                  <h3 className="cap__row-heading">
                    <button
                      type="button"
                      className="cap__trigger"
                      aria-expanded={open}
                      aria-controls={`cap-panel-${c.id}`}
                      id={`cap-trigger-${c.id}`}
                      onClick={() => setOpenId(open ? "" : c.id)}
                    >
                      <span className="cap__row-index tech-label">{c.index}</span>
                      <span className="cap__row-title">{c.title}</span>
                      <span className="cap__row-claim">{c.claim}</span>
                      <span className="cap__row-mark" aria-hidden="true">
                        <span />
                        <span />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`cap-panel-${c.id}`}
                    role="region"
                    aria-labelledby={`cap-trigger-${c.id}`}
                    className="cap__panel"
                    hidden={!open}
                  >
                    <div className="cap__panel-inner">
                      <CapabilityGlyph metaphor={c.metaphor} className="cap__glyph-inline" />
                      <div>
                        <p className="cap__panel-body">{c.body}</p>
                        <p className="cap__outcome">
                          <span className="tech-label">Outcome</span>
                          {c.outcome}
                        </p>
                        <ul className="cap__facets">
                          {c.facets.map((f) => (
                            <li key={f} className="cap__facet">
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
