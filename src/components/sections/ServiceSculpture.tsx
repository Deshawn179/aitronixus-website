import Image from "next/image";

/** A lightweight CSS-built installation, not a WebGL scene: no GPU context,
 * canvas dependency or download-sized model needed on a visitor's phone. */
export function ServiceSculpture({ index, title }: { index: string; title: string }) {
  return <div className="service-sculpture" data-discipline={index}>
    <span className="service-sculpture__label">CONNECTED BY DESIGN / {index}</span>
    <div className="service-sculpture__installation">
      {[0,1,2,3].map(i => <div key={i} className="service-sculpture__plate" style={{ "--plate": i } as React.CSSProperties}><span /><span /><span /></div>)}
      <div className="service-sculpture__beam" />
      <Image src="/brand/atx-chrome.webp" alt="" width={400} height={400} sizes="(max-width: 800px) 50vw, 25vw" className="service-sculpture__mark" />
    </div>
    <div className="service-sculpture__caption"><span className="tech-label">DISCIPLINE {index} / 06</span><strong>{title}</strong><span>Intelligence at every layer.</span></div>
  </div>;
}
