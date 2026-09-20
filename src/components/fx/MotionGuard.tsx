"use client";

import { useEffect } from "react";

/**
 * Motion capability guard.
 *
 * Entrance animations hide their element until they play. That is fine as long
 * as they always play — but a host where requestAnimationFrame never runs
 * (some embedded web views, screenshot and prerender pipelines, heavily
 * throttled background contexts) would leave that copy permanently invisible.
 *
 * So: confirm the frame loop is alive. If it is not, mark the document and let
 * CSS force every reveal to its finished state. Costs one frame, and removes
 * an entire class of "the text never appeared" failure.
 */
export function MotionGuard() {
  useEffect(() => {
    let alive = false;

    const raf = window.requestAnimationFrame(() => {
      alive = true;
      document.documentElement.dataset.motion = "on";
    });

    const timer = window.setTimeout(() => {
      if (!alive) document.documentElement.dataset.motion = "off";
    }, 800);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
