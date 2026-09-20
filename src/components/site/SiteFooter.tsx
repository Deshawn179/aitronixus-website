import { footer, site } from "@/lib/content";
import { Wordmark } from "@/components/brand/Wordmark";
export function SiteFooter() {
  return <footer className="site-footer">
    <div className="shell" style={{position:"relative"}}>
      <div className="site-footer__grid">
        <div><a href="#main" aria-label="AiTroniXus — back to top"><Wordmark size="md" /></a><p className="body-muted" style={{marginTop:"1.25rem",maxWidth:"42ch"}}>{footer.positioning}</p></div>
        {footer.columns.map(col => <div key={col.title}><h2 className="footer-col__title">{col.title}</h2><ul className="footer-col__list">{col.links.map(link => <li key={link.label}><a className="footer-link" href={link.href}>{link.label}</a></li>)}</ul></div>)}
        <div><h2 className="footer-col__title">Your next chapter</h2><p className="body-muted" style={{fontSize:".85rem",maxWidth:"24ch"}}>An ambitious idea deserves an intelligent foundation.</p><a className="footer-link" href="#contact-form">Let’s build it together ↗</a></div>
      </div>
      <div className="site-footer__base"><p className="tech-label" style={{margin:0}}>© {new Date().getFullYear()} {site.name}. All rights reserved.</p><span className="tech-label">Human ingenuity × artificial intelligence</span><a href="#main" className="footer-link">Back to top ↑</a></div>
    </div>
  </footer>;
}
