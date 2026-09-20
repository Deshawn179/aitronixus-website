import dynamic from "next/dynamic";

import { CinematicIntro } from "@/components/intro/CinematicIntro";
import { Hero } from "@/components/hero/Hero";
import { ExperienceBridge } from "@/components/hero/ExperienceBridge";
import { IntelligenceLayer } from "@/components/sections/IntelligenceLayer";
import { Capabilities } from "@/components/sections/Capabilities";
import { OperatingModel } from "@/components/sections/OperatingModel";
import { Principles } from "@/components/sections/Principles";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Outcomes } from "@/components/sections/Outcomes";
import { Scenarios } from "@/components/sections/Scenarios";
import { Manifesto } from "@/components/sections/Manifesto";

/* Everything below the fold that carries its own interactivity is code-split,
   so the first load ships the intro and the hero and little else. */
const Conversion = dynamic(() =>
  import("@/components/sections/Conversion").then((m) => m.Conversion),
);

export default function Home() {
  return (
    <>
      <CinematicIntro />
      <Hero />
      <ExperienceBridge />
      <IntelligenceLayer />
      <Capabilities />
      <OperatingModel />
      <Principles />
      <Ecosystem />
      <Outcomes />
      <Scenarios />
      <Manifesto />
      <Conversion />
    </>
  );
}
