import { conversion } from "@/lib/content";
import { Reveal, LineReveal } from "@/components/fx/Reveal";
import { Magnetic } from "@/components/fx/Magnetic";
import { ContactForm } from "./ContactForm";

export function Conversion() {
  return (
    <section id="contact" className="section conversion" aria-labelledby="contact-title">
      <div className="conversion__glow halo" aria-hidden="true" />
      <div className="grid-field" aria-hidden="true" />

      <div className="shell conversion__grid">
        <div className="conversion__copy">
          <Reveal>
            <p className="eyebrow eyebrow-bright">{conversion.eyebrow}</p>
          </Reveal>

          <h2 id="contact-title" className="display-lg conversion__title">
            <LineReveal
              lines={["Your infrastructure", "should do more than operate.", "It should evolve."]}
              accentIndex={2}
            />
          </h2>

          <Reveal delay={0.1}>
            <p className="lede conversion__lede">{conversion.body}</p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="conversion__actions">
              <Magnetic>
                <a className="btn btn-primary" href={conversion.primaryCta.href}>
                  {conversion.primaryCta.label}
                  <span aria-hidden="true">→</span>
                </a>
              </Magnetic>
              <a className="btn btn-ghost" href={conversion.secondaryCta.href}>
                {conversion.secondaryCta.label}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="conversion__assurances">
              <li>A reply from an engineer, not a form autoresponder.</li>
              <li>A first conversation about the problem, not a product pitch.</li>
              <li>An honest answer if what you need is not what we do.</li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="conversion__form-wrap">
          <div className="conversion__form ticked">
            <div className="grid-field grid-field--fine" aria-hidden="true" />
            <div className="conversion__form-head">
              <h3 className="conversion__form-title">Start a conversation</h3>
              <p className="tech-label">Secure transport / no tracking cookies</p>
            </div>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
