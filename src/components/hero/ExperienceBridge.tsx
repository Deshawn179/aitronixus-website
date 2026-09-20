const pillars = [
  { number: "01", title: "Think beyond.", text: "Put intelligence at the heart of every decision.", href: "#intelligence", label: "The intelligence layer" },
  { number: "02", title: "Build without limits.", text: "Connect your ambitions to architecture that can deliver.", href: "#capabilities", label: "Our capabilities" },
  { number: "03", title: "Evolve continuously.", text: "Create an ecosystem that grows with your business.", href: "#approach", label: "Our approach" },
];
export function ExperienceBridge() {
  return <section className="experience-bridge" aria-label="Explore AiTroniXus"><div className="shell experience-bridge__grid">{pillars.map(p => <a key={p.number} href={p.href}><span className="tech-label">{p.number} / {p.label}</span><h2>{p.title}</h2><p>{p.text}</p><span className="experience-bridge__arrow" aria-hidden="true">↗</span></a>)}</div></section>;
}
