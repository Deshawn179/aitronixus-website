import { ecosystem } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem, LineReveal } from "@/components/fx/Reveal";

/**
 * Technology ecosystem.
 *
 * The marquee is decorative and duplicated for the seamless loop, so it is
 * hidden from assistive technology; the definition list below is the real,
 * readable content. Nothing here claims a partnership or a certification.
 */
export function Ecosystem() {
  const names = ecosystem.domains.map((d) => d.name);

  return (
    <section id="ecosystem" className="section eco" aria-labelledby="ecosystem-title">
      <div className="shell">
        <header className="eco__header">
          <Reveal>
            <p className="eyebrow eyebrow-bright">{ecosystem.eyebrow}</p>
          </Reveal>
          <h2 id="ecosystem-title" className="display-lg eco__title">
            <LineReveal lines={[ecosystem.headline]} accentIndex={0} />
          </h2>
          <Reveal delay={0.1}>
            <p className="lede eco__lede">{ecosystem.body}</p>
          </Reveal>
        </header>
      </div>

      {/* Decorative band */}
      <div className="eco__band" aria-hidden="true">
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="eco__marquee-set">
                {names.map((n) => (
                  <span key={`${copy}-${n}`} className="eco__marquee-item">
                    {n}
                    <span className="eco__marquee-sep">/</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="shell">
        <RevealGroup className="eco__grid" as="ul" stagger={0.05}>
          {ecosystem.domains.map((d, i) => (
            <RevealItem key={d.id} as="li" className="eco__cell">
              <span className="eco__cell-index tech-label">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="eco__cell-name">{d.name}</h3>
              <p className="eco__cell-note">{d.note}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.05}>
          <p className="eco__disclaimer tech-label">
            Listed as areas of engineering practice. No partnership, certification or endorsement is
            implied.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
