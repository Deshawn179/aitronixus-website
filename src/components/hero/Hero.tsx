"use client";
import { useState } from "react";
import Image from "next/image";
import { useIntro } from "@/components/intro/IntroContext";
const modes = [
  { name: "Intelligence", title: "Systems that think.", text: "AI-driven automation that turns complexity into possibility.", color: "#64edff" },
  { name: "Architecture", title: "Built for what’s next.", text: "Cloud-native foundations. Connected infrastructure. Room to grow.", color: "#9a91ff" },
  { name: "Engineering", title: "Ideas into impact.", text: "Purpose-built software and multi-tier support, working as one.", color: "#85ffc5" },
];
export function Hero() {
  const [mode, setMode] = useState(0);
  const { requestReplay } = useIntro();
  return <section className="hero new-hero" aria-labelledby="hero-title">
    <div className="new-hero__ambient" aria-hidden="true" /><div className="new-hero__ghost" aria-hidden="true">ATX</div>
    <div className="shell new-hero__layout">
      <div className="new-hero__copy">
        <p className="eyebrow"><span className="signal-dot" /> INTELLIGENCE. WITHOUT LIMITS.</p>
        <h1 id="hero-title">The future.<br />Intelligently<br /><span>engineered.</span></h1>
        <p className="new-hero__tagline">AiTroniXus — Redefining the Future of Intelligent Infrastructure</p>
        <p className="new-hero__body">We bring AI, cloud, software and infrastructure into one powerful ecosystem. Built to think. Designed to adapt. Engineered to move you forward.</p>
        <div className="new-hero__actions"><a className="btn btn-primary" href="#contact">Build what’s next <span aria-hidden="true">↗</span></a><a className="new-hero__explore" href="#capabilities">Explore our capabilities <span aria-hidden="true">↓</span></a></div>
        <button id="intro-replay" className="new-hero__replay" onClick={requestReplay} type="button"><span aria-hidden="true">▷</span> Replay the cinematic experience</button>
      </div>
      <div className="core-experience" style={{ "--core-accent": modes[mode].color } as React.CSSProperties}>
        <div className="core-scene" aria-hidden="true"><div className="core-scene__aura" /><div className="core-scene__orbit core-scene__orbit--one" /><div className="core-scene__orbit core-scene__orbit--two" /><div className="core-scene__orbit core-scene__orbit--three" /><span className="core-scene__coordinate">ATX / INTELLIGENT SYSTEMS</span><Image className="core-scene__mark" src="/brand/atx-chrome.webp" alt="" width={960} height={960} priority sizes="(max-width: 800px) 90vw, 48vw" /><div className="core-scene__platform" /><span className="core-scene__serial">HUMAN INGENUITY × MACHINE INTELLIGENCE</span></div>
        <div className="core-controls" role="group" aria-label="Explore our engineering focus">{modes.map((item, i) => <button key={item.name} type="button" aria-pressed={mode === i} onClick={() => setMode(i)}><span>0{i + 1}</span>{item.name}</button>)}</div>
        <div className="core-caption" aria-live="polite"><strong>{modes[mode].title}</strong><p>{modes[mode].text}</p></div>
      </div>
    </div>
    <div className="shell new-hero__base"><span>ONE VISION. AN ENTIRE ECOSYSTEM.</span><div><span>AI + AUTOMATION</span><span>AZURE + CLOUD</span><span>SOFTWARE + SUPPORT</span></div><a href="#intelligence" aria-label="Discover the intelligence layer">↓</a></div>
  </section>;
}
