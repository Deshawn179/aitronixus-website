"use client";

import { useEffect, useState, type RefObject } from "react";

type Options = {
  /** Fraction of the element that must be visible before it counts as in view. */
  amount?: number;
  /** Latch on first entry (the default) or track continuously. */
  once?: boolean;
};

/**
 * In-view detection that cannot leave content hidden.
 *
 * `whileInView` is the obvious tool here, but it has one failure mode that is
 * unacceptable for body copy: if the IntersectionObserver callback never
 * arrives, the element stays at its `initial` state forever and the text is
 * simply invisible. That happens in more places than it should — hosts that
 * never composite the page, embedded web views, some prerender and screenshot
 * pipelines.
 *
 * So: observe normally, but if the observer has produced nothing at all after a
 * short grace period, stop trusting it and fall back to measuring geometry on
 * scroll. Content always becomes visible; the animation is the enhancement.
 */
export function useInViewSafe(
  ref: RefObject<HTMLElement | null>,
  { amount = 0.3, once = true }: Options = {},
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let latched = false;
    let observerReported = false;
    let fallbackTimer = 0;
    let fallbackAttached = false;

    const show = () => {
      if (latched) return;
      if (once) latched = true;
      setInView(true);
    };
    const hide = () => {
      if (!once) setInView(false);
    };

    /* Geometry fallback: how much of the element is inside the viewport. */
    const measure = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.bottom <= 0 || r.top >= vh) return hide();
      const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
      const reference = Math.min(r.height || 1, vh);
      if (visible / reference >= Math.min(amount, 0.98)) show();
      else hide();
    };

    const attachFallback = () => {
      if (fallbackAttached) return;
      fallbackAttached = true;
      measure();
      window.addEventListener("scroll", measure, { passive: true });
      window.addEventListener("resize", measure);
    };

    const detachFallback = () => {
      if (!fallbackAttached) return;
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };

    if (typeof IntersectionObserver === "undefined") {
      attachFallback();
      return detachFallback;
    }

    const io = new IntersectionObserver(
      (entries) => {
        observerReported = true;
        window.clearTimeout(fallbackTimer);
        const entry = entries[entries.length - 1];
        if (entry.isIntersecting) show();
        else hide();
        if (latched) io.disconnect();
      },
      { threshold: Math.max(0, Math.min(amount, 1)) },
    );

    io.observe(el);

    fallbackTimer = window.setTimeout(() => {
      if (observerReported) return;
      io.disconnect();
      attachFallback();
    }, 1200);

    return () => {
      io.disconnect();
      window.clearTimeout(fallbackTimer);
      detachFallback();
    };
  }, [ref, amount, once]);

  return inView;
}
