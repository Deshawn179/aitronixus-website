"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
// Nothing in this component animates through the library any more; the panel
// is CSS-driven so it can never be left mounted by a stalled animation.

import { nav } from "@/lib/content";
import { Wordmark } from "@/components/brand/Wordmark";
import { Magnetic } from "@/components/fx/Magnetic";



export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);


  /* Condense the bar once the hero starts leaving. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Section progress indicator: which anchor are we inside. */
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.6, 1] },
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  /* Mobile panel: scroll lock, Esc, and focus returned to the toggle. */
  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    /* Move focus into the panel so keyboard users are not stranded behind it.
       A timeout rather than a frame callback: focus management must not depend
       on the frame loop running. */
    const focusTimer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    }, 0);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <header className="site-nav" data-scrolled={scrolled || undefined}>
      <div className="site-nav__inner shell">
        <Link href="/" className="site-nav__brand" aria-label="AiTroniXus — home">
          <Wordmark size="md" />
        </Link>

        <nav className="site-nav__links" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="site-nav__link"
              data-active={active === item.href.slice(1) || undefined}
              aria-current={active === item.href.slice(1) ? "true" : undefined}
            >
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="site-nav__actions">
          <Magnetic>
            <a href="#contact" className="btn btn-primary site-nav__cta">
              Engineer Your Future
            </a>
          </Magnetic>

          <button
            ref={toggleRef}
            type="button"
            className="site-nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => (open ? close() : setOpen(true))}
          >
            <span className="sr-only-brand">{open ? "Close menu" : "Open menu"}</span>
            <span className="site-nav__bars" data-open={open || undefined} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {/* Deliberately not wrapped in AnimatePresence: this panel covers the
          page, so it must unmount the instant it is closed rather than waiting
          on an exit animation to report back. The entry is a CSS keyframe. */}
      {open && (
        <div id="mobile-menu" ref={panelRef} className="mobile-menu">
          <div className="grid-field grid-field--fine" aria-hidden="true" />
          <nav className="mobile-menu__list" aria-label="Primary — mobile">
            {nav.map((item, i) => (
              <a key={item.href} href={item.href} className="mobile-menu__link" onClick={close}>
                <span className="tech-label">{String(i + 1).padStart(2, "0")}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
          <a href="#contact" className="btn btn-primary mobile-menu__cta" onClick={close}>
            Engineer Your Future
          </a>
          <p className="tech-label mobile-menu__foot">
            Intelligent Infrastructure / Built to Evolve
          </p>
        </div>
      )}
    </header>
  );
}
