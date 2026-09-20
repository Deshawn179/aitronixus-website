import { outcomes } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem, LineReveal } from "@/components/fx/Reveal";

/**
 * Business outcomes, expressed as a before/after matrix.
 *
 * A real <table> so the relationship between the three columns survives a
 * screen reader; restyled to read as an engineering matrix rather than a
 * spreadsheet. The scroll container is on the table alone, so the page itself
 * never gains a horizontal axis.
 *
 * Deliberately no percentages, no client counts, no benchmark figures — none
 * have been measured, and inventing them would undermine everything else here.
 */
export function Outcomes() {
  return (
    <section id="outcomes" className="section outcomes" aria-labelledby="outcomes-title">
      <div className="grid-field grid-field--fine grid-field--center" aria-hidden="true" />
      <div className="shell">
        <header className="outcomes__header">
          <Reveal>
            <p className="eyebrow eyebrow-bright">{outcomes.eyebrow}</p>
          </Reveal>
          <h2 id="outcomes-title" className="display-lg outcomes__title">
            <LineReveal lines={[outcomes.headline]} accentIndex={0} />
          </h2>
          <Reveal delay={0.1}>
            <p className="lede outcomes__lede">{outcomes.body}</p>
          </Reveal>
        </header>

        <Reveal delay={0.05}>
          <div className="outcomes__scroll">
            <table className="matrix">
              <caption className="sr-only-brand">
                Business outcomes: the typical starting position and the engineered alternative.
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="matrix__th matrix__th--outcome">
                    Outcome
                  </th>
                  <th scope="col" className="matrix__th">
                    Typical starting position
                  </th>
                  <th scope="col" className="matrix__th matrix__th--after">
                    Engineered with AiTroniXus
                  </th>
                </tr>
              </thead>
              <tbody>
                {outcomes.rows.map((row, i) => (
                  <tr key={row.id} className="matrix__row">
                    <th scope="row" className="matrix__rowhead">
                      <span className="tech-label matrix__rowindex">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {row.outcome}
                    </th>
                    <td className="matrix__cell matrix__cell--before">{row.before}</td>
                    <td className="matrix__cell matrix__cell--after">
                      <span className="matrix__marker" aria-hidden="true" />
                      {row.after}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Compact restatement for very narrow viewports, where a three-column
            matrix stops being readable at any font size. */}
        <RevealGroup className="outcomes__stack" as="ul" stagger={0.04}>
          {outcomes.rows.map((row) => (
            <RevealItem key={row.id} as="li" className="outcomes__stack-item">
              <h3 className="outcomes__stack-title">{row.outcome}</h3>
              <p className="outcomes__stack-before">
                <span className="tech-label">Today</span>
                {row.before}
              </p>
              <p className="outcomes__stack-after">
                <span className="tech-label">Engineered</span>
                {row.after}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
