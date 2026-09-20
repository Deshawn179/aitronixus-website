import type { Metadata } from "next";
import Link from "next/link";

import { nav } from "@/lib/content";
import { IntelligenceNode } from "@/components/brand/Wordmark";

export const metadata: Metadata = {
  title: "Signal lost",
  description: "The requested route does not resolve.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section notfound" aria-labelledby="notfound-title">
      <div className="grid-field grid-field--center" aria-hidden="true" />
      <div className="notfound__glow halo" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="shell notfound__shell">
        <p className="eyebrow eyebrow-bright notfound__eyebrow">
          <span className="status-dot anim-status" aria-hidden="true" />
          Error 404 — route unresolved
        </p>

        <p className="notfound__code" aria-hidden="true">
          404
        </p>

        <h1 id="notfound-title" className="display-lg notfound__title">
          This node is not on the map.
        </h1>

        <p className="lede notfound__lede">
          The address you followed does not resolve to anything on this system. The intelligence
          layer is still where you left it.
        </p>

        <div className="notfound__actions">
          <Link className="btn btn-primary" href="/">
            Return to the core
            <span aria-hidden="true">→</span>
          </Link>
          <Link className="btn btn-ghost" href="/#contact">
            Report a broken link
          </Link>
        </div>

        <nav className="notfound__nav" aria-label="Site sections">
          <p className="tech-label notfound__nav-title">
            <IntelligenceNode size={16} animated={false} /> Known routes
          </p>
          <ul className="notfound__nav-list">
            {nav.map((item) => (
              <li key={item.href}>
                <Link className="footer-link" href={`/${item.href}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
