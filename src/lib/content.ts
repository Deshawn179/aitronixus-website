/**
 * AiTroniXus — content model.
 *
 * All site copy lives here so the visual system and the language can be
 * maintained independently. Nothing in this file asserts a statistic, a
 * client, a certification or a partnership: every claim is a capability
 * statement the business can stand behind.
 */

export const site = {
  name: "AiTroniXus",
  tagline: "Redefining the Future of Intelligent Infrastructure",
  description:
    "AiTroniXus unifies artificial intelligence, cloud architecture, software engineering and enterprise infrastructure to build systems that think, adapt and scale.",
  // Vercel may expose a detected-but-empty value from `.env.example` during
  // the first import. Treat an empty string as unset so metadata generation
  // always receives a valid absolute URL.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.aitronixus.com",
} as const;

export const nav = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Approach", href: "#approach" },
  { label: "Solutions", href: "#solutions" },
  { label: "Vision", href: "#vision" },
  { label: "Contact", href: "#contact" },
] as const;

/* -------------------------------------------------------------------------
   Hero
   ------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Intelligent Infrastructure / Built to Evolve",
  /* Broken by hand rather than left to wrap: at display size the line endings
     are part of the composition. */
  headline: ["Redefining", "the Future of", "Intelligent", "Infrastructure."],
  /** The line that carries the luminous gradient. */
  accentLine: 2,
  body: "AiTroniXus unifies artificial intelligence, cloud architecture, software engineering and enterprise infrastructure to build systems that think, adapt and scale.",
  primaryCta: { label: "Engineer Your Future", href: "#contact" },
  secondaryCta: { label: "Explore Our Capabilities", href: "#capabilities" },
  tertiaryCta: { label: "Watch the AiTroniXus Experience", href: "#intro-replay" },
  telemetry: [
    { key: "LAYER", value: "INTELLIGENCE" },
    { key: "MODE", value: "ADAPTIVE" },
    { key: "CLOUD", value: "AZURE-NATIVE" },
    { key: "SUPPORT", value: "L1 / L2 / L3" },
  ],
} as const;

/* -------------------------------------------------------------------------
   2 — The intelligence layer
   ------------------------------------------------------------------------- */

export const intelligence = {
  eyebrow: "The Intelligence Layer",
  headline: "We don't add intelligence after the system is built.",
  headlineAccent: "We engineer intelligence into its foundation.",
  body: "Most organisations bolt automation onto infrastructure that was never designed to receive it. We invert that order. Intelligence sits in the substrate — in how the network routes, how the platform scales, how support escalates, how code ships. Every layer below informs the layer above.",
  layers: [
    {
      id: "ai",
      index: "07",
      name: "Artificial Intelligence",
      role: "Decision substrate",
      summary:
        "Models and reasoning services that turn operational signal into decisions your teams can act on — grounded in your own data, governed by your own policy.",
    },
    {
      id: "automation",
      index: "06",
      name: "Automation",
      role: "Execution fabric",
      summary:
        "Orchestrated workflows that carry a decision through to completion across systems, queues and approvals, without a human copying values between windows.",
    },
    {
      id: "software",
      index: "05",
      name: "Software",
      role: "Product surface",
      summary:
        "The platforms, applications and APIs your organisation actually touches — engineered to be extended rather than replaced every three years.",
    },
    {
      id: "cloud",
      index: "04",
      name: "Cloud",
      role: "Elastic capacity",
      summary:
        "Azure-native environments designed for cost visibility, controlled scale and recovery characteristics you can state in a board meeting.",
    },
    {
      id: "infrastructure",
      index: "03",
      name: "Infrastructure",
      role: "Physical + virtual ground",
      summary:
        "Networking, systems integration and endpoint estates modernised to carry modern workloads instead of quietly constraining them.",
    },
    {
      id: "security",
      index: "02",
      name: "Security",
      role: "Constraint model",
      summary:
        "Identity, segmentation and least-privilege considered at design time, so security is an architectural property rather than a later retrofit.",
    },
    {
      id: "support",
      index: "01",
      name: "Support",
      role: "Human continuity",
      summary:
        "Structured L1, L2 and L3 operations that keep the whole stack answerable — with escalation paths and visibility built in from day one.",
    },
  ],
} as const;

export type IntelligenceLayer = (typeof intelligence.layers)[number];

/* -------------------------------------------------------------------------
   3 — Core capabilities
   ------------------------------------------------------------------------- */

export const capabilities = [
  {
    id: "ai-automation",
    index: "01",
    metaphor: "orchestration",
    title: "AI-Driven Automation",
    claim: "Work that routes itself.",
    body: "Intelligent workflows, process orchestration and adaptive systems that carry operational decisions end to end — with AI-assisted decision infrastructure where judgement is needed and deterministic automation where it is not.",
    outcome: "Fewer manual handoffs between systems that were never designed to talk.",
    facets: ["Process orchestration", "Adaptive systems", "Decision infrastructure", "Operational automation"],
  },
  {
    id: "cloud-native",
    index: "02",
    metaphor: "scale",
    title: "Cloud-Native Architecture",
    claim: "Capacity that answers to design, not to accident.",
    body: "Scalable Azure environments, cloud migration and hybrid architecture built with resilience engineering, governance and cost optimisation treated as first-class design constraints rather than post-launch cleanup.",
    outcome: "Environments that scale on intent and degrade predictably under pressure.",
    facets: ["Azure environments", "Migration & hybrid", "Resilience engineering", "Governance & cost"],
  },
  {
    id: "software",
    index: "03",
    metaphor: "construction",
    title: "Software Engineering",
    claim: "Platforms built to be extended.",
    body: "Custom platforms, enterprise applications, integrations and APIs engineered as maintainable digital products — with the interfaces, tests and documentation that let a different team pick them up in two years.",
    outcome: "Systems your organisation owns outright and can keep evolving.",
    facets: ["Custom platforms", "Enterprise applications", "APIs & integrations", "Maintainable products"],
  },
  {
    id: "support",
    index: "04",
    metaphor: "escalation",
    title: "Multi-Tier IT Support",
    claim: "Structured escalation, not heroics.",
    body: "Level 1, Level 2 and Level 3 support designed around reliability and rapid escalation — with defined ownership at each tier, visibility into what is actually breaking, and a feedback loop back into engineering.",
    outcome: "Issues that resolve at the right tier, and stop recurring.",
    facets: ["L1 service desk", "L2 technical resolution", "L3 engineering escalation", "Continuous improvement"],
  },
  {
    id: "infrastructure",
    index: "05",
    metaphor: "topology",
    title: "Enterprise Infrastructure",
    claim: "The ground your platforms stand on.",
    body: "Modern networking, systems integration, endpoint environments and performance optimisation — infrastructure modernisation sequenced so the business keeps operating while the foundation is rebuilt underneath it.",
    outcome: "A foundation that carries new workloads instead of constraining them.",
    facets: ["Modern networking", "Systems integration", "Endpoint environments", "Performance optimisation"],
  },
  {
    id: "web",
    index: "06",
    metaphor: "signal",
    title: "Intelligent Web Systems",
    claim: "Digital platforms that do more than render.",
    body: "High-performance web systems that combine considered user experience with automation, analytics and integration — front ends wired directly into the operational systems behind them.",
    outcome: "Public surfaces that feed the business rather than sitting beside it.",
    facets: ["High-performance front ends", "Automation & analytics", "Systems integration", "Scalable architecture"],
  },
] as const;

export type Capability = (typeof capabilities)[number];

/* -------------------------------------------------------------------------
   4 — The operating model
   ------------------------------------------------------------------------- */

export const operatingModel = {
  eyebrow: "The AiTroniXus Operating Model",
  headline: "A closed loop, not a straight line.",
  body: "Six operating states, continuously cycling. Evolution feeds discovery; the system never reaches a final version because the organisation never stops changing.",
  stages: [
    {
      id: "discover",
      code: "D",
      name: "Discover",
      summary:
        "We map what actually exists — systems, dependencies, workarounds and the undocumented processes holding it together.",
    },
    {
      id: "architect",
      code: "A",
      name: "Architect",
      summary:
        "We design the target state and the sequence to reach it, including what stays, what is replaced and what is retired.",
    },
    {
      id: "engineer",
      code: "E",
      name: "Engineer",
      summary:
        "We build the platforms, environments and integrations — in increments that deliver value before the programme is complete.",
    },
    {
      id: "automate",
      code: "T",
      name: "Automate",
      summary:
        "We move repeatable work into orchestrated workflows, with intelligence applied where judgement is genuinely required.",
    },
    {
      id: "optimise",
      code: "O",
      name: "Optimise",
      summary:
        "We tune cost, performance and reliability against real telemetry rather than assumptions made at design time.",
    },
    {
      id: "evolve",
      code: "V",
      name: "Evolve",
      summary:
        "We feed what the running system reveals back into discovery, so the architecture adapts as the organisation grows.",
    },
  ],
} as const;

export type Stage = (typeof operatingModel.stages)[number];

/* -------------------------------------------------------------------------
   5 — Think / Learn / Evolve
   ------------------------------------------------------------------------- */

export const principles = [
  {
    id: "think",
    ordinal: "I",
    name: "Think",
    headline: "Systems that interpret signal.",
    body: "Infrastructure produces an enormous amount of evidence and almost none of it reaches a decision. We connect telemetry, application data and operational context so the system can surface what matters — and support a better decision at the moment it is needed.",
  },
  {
    id: "learn",
    ordinal: "II",
    name: "Learn",
    headline: "Environments that improve under feedback.",
    body: "Every incident, every escalation, every performance anomaly is an input. Analytics and automation turn that history into changed behaviour — thresholds that adjust, workflows that reroute, support tiers that see the pattern before it repeats.",
  },
  {
    id: "evolve",
    ordinal: "III",
    name: "Evolve",
    headline: "Infrastructure that adapts to growth.",
    body: "Organisations outgrow their architecture long before anyone admits it. We build for the shape of the business two stages ahead, so expansion, acquisition or a new operating model is an adjustment rather than a rebuild.",
  },
] as const;

/* -------------------------------------------------------------------------
   6 — Technology ecosystem
   ------------------------------------------------------------------------- */

export const ecosystem = {
  eyebrow: "Technology Ecosystem",
  headline: "The ground we build on.",
  body: "The technology landscape our engineers and architects work across. Listed as areas of practice — not as partnership or certification claims.",
  domains: [
    {
      id: "azure",
      name: "Microsoft Azure",
      note: "Landing zones, identity, networking, platform services and governance.",
    },
    {
      id: "ai-ml",
      name: "AI & Machine Learning",
      note: "Applied models, retrieval over enterprise data, evaluation and guardrails.",
    },
    {
      id: "cloud-native",
      name: "Cloud-Native Services",
      note: "Containers, serverless, managed data services and event-driven design.",
    },
    {
      id: "apis",
      name: "APIs & Integration",
      note: "Contract-first interfaces, messaging, and integration across legacy estates.",
    },
    {
      id: "web",
      name: "Modern Web Technologies",
      note: "Typed component architectures, edge delivery and performance budgets.",
    },
    {
      id: "networking",
      name: "Enterprise Networking",
      note: "Segmentation, routing, connectivity and hybrid network design.",
    },
    {
      id: "automation",
      name: "Automation Platforms",
      note: "Workflow orchestration, infrastructure as code and release automation.",
    },
    {
      id: "observability",
      name: "Monitoring & Observability",
      note: "Instrumentation, tracing, alert design and operational dashboards.",
    },
    {
      id: "security",
      name: "Security-Conscious Architecture",
      note: "Least privilege, secret management and defensible system boundaries.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------
   7 — Business outcomes
   ------------------------------------------------------------------------- */

export const outcomes = {
  eyebrow: "Business Outcomes",
  headline: "What changes at executive level.",
  body: "Technology decisions only matter where they alter how the organisation performs. These are the shifts intelligent infrastructure is engineered to produce.",
  rows: [
    {
      id: "delivery",
      outcome: "Accelerated delivery",
      before: "Change requests queue behind environment provisioning and manual release steps.",
      after: "Automated pipelines and prepared environments move work to production on a predictable cadence.",
    },
    {
      id: "efficiency",
      outcome: "Operational efficiency",
      before: "Skilled people spend their week moving data between systems that do not integrate.",
      after: "Orchestrated workflows carry routine work end to end; people handle the exceptions.",
    },
    {
      id: "reliability",
      outcome: "Improved reliability",
      before: "Failures surface when a user reports them, and root cause is reconstructed after the fact.",
      after: "Instrumented systems detect degradation early, with defined escalation and recovery paths.",
    },
    {
      id: "workload",
      outcome: "Reduced manual workload",
      before: "Repetitive operational tasks scale linearly with the size of the business.",
      after: "Repeatable work is automated, so growth no longer demands proportional headcount.",
    },
    {
      id: "scale",
      outcome: "Scalable architecture",
      before: "Capacity is a procurement conversation held months before it is needed.",
      after: "Elastic, governed environments scale against demand within defined cost boundaries.",
    },
    {
      id: "visibility",
      outcome: "System visibility",
      before: "Answering 'what is the state of our estate' takes a week and three teams.",
      after: "Live telemetry and dashboards give a shared, current view across the stack.",
    },
    {
      id: "response",
      outcome: "Faster response & recovery",
      before: "Incidents escalate informally and recovery depends on who happens to be available.",
      after: "Structured L1–L3 tiers with documented runbooks and rehearsed recovery procedures.",
    },
    {
      id: "foundation",
      outcome: "Future-ready foundations",
      before: "Each new initiative starts by working around the constraints of the last one.",
      after: "A designed foundation that new capability plugs into instead of fighting.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------
   8 — Solution scenarios
   ------------------------------------------------------------------------- */

export const scenarios = [
  {
    id: "fragmented-workflow",
    label: "Fragmented workflow",
    title: "Automating a fragmented business workflow",
    situation:
      "A core process spans email, a finance system, a spreadsheet and two approvals. Nobody can say where a given item is without asking three people.",
    approach: [
      "Map the real process, including the undocumented workarounds people rely on.",
      "Define the system of record and the integration contracts between each participating system.",
      "Orchestrate the path end to end, with intelligence applied only where judgement is required.",
      "Instrument each step so status is a query rather than a conversation.",
    ],
    result: "A single traceable workflow, with exceptions routed to people and the routine path handled by the system.",
  },
  {
    id: "legacy",
    label: "Legacy modernisation",
    title: "Modernising legacy infrastructure",
    situation:
      "Business-critical systems run on infrastructure that is expensive to maintain, difficult to secure and impossible to scale.",
    approach: [
      "Assess dependencies, data gravity and true operating cost across the existing estate.",
      "Sequence modernisation so the business keeps running throughout the transition.",
      "Rebuild the foundation — network, identity, platform — before migrating the workloads that sit on it.",
      "Retire the legacy footprint deliberately, with a verified rollback position at each step.",
    ],
    result: "A modern foundation reached without a high-risk single cutover event.",
  },
  {
    id: "azure",
    label: "Azure environment",
    title: "Designing a scalable Azure environment",
    situation:
      "Cloud adoption has grown organically. Subscriptions, naming, identity and cost ownership were never designed, and governance is now urgent.",
    approach: [
      "Establish a landing zone: subscription topology, identity model, network design and policy baseline.",
      "Define governance — tagging, cost ownership, and guardrails enforced as policy rather than convention.",
      "Standardise environment provisioning as infrastructure as code.",
      "Instrument cost and performance so optimisation is continuous.",
    ],
    result: "An Azure estate that scales under control, with cost and access attributable by design.",
  },
  {
    id: "platform",
    label: "Intelligent platform",
    title: "Building a custom intelligent platform",
    situation:
      "Off-the-shelf software covers eighty percent of a critical business capability, and the missing twenty percent is the part that differentiates the organisation.",
    approach: [
      "Model the domain and define where the platform must be opinionated versus configurable.",
      "Build a typed, tested application core with contract-first APIs for everything around it.",
      "Introduce AI where it changes the quality of a decision, with evaluation and human review paths.",
      "Ship in increments that deliver usable capability before the full scope is complete.",
    ],
    result: "A platform the organisation owns, extends and operates on its own terms.",
  },
  {
    id: "support",
    label: "Enterprise support",
    title: "Establishing enterprise-grade IT support",
    situation:
      "Support is informal. Escalation depends on individual relationships, and the same issues recur because nothing feeds back into engineering.",
    approach: [
      "Define L1, L2 and L3 scope, ownership and escalation criteria explicitly.",
      "Stand up intake, triage and documented runbooks for the highest-volume issue classes.",
      "Instrument the queue so recurring root causes are visible rather than anecdotal.",
      "Close the loop: recurring issues become engineering work, not permanent support load.",
    ],
    result: "Predictable resolution at the right tier, and a support function that reduces its own future load.",
  },
  {
    id: "unified",
    label: "Unified operations",
    title: "Connecting cloud, network, software and operations",
    situation:
      "Each domain is competently run in isolation. Nobody owns the seams between them, and every cross-domain incident becomes an investigation.",
    approach: [
      "Establish a shared telemetry and identity spine across all four domains.",
      "Define interfaces and ownership at each seam, including who responds first.",
      "Unify alerting and on-call so a single incident produces a single coordinated response.",
      "Review cross-domain incidents as architecture signal, not as isolated failures.",
    ],
    result: "One operating picture across the estate, with the seams designed rather than inherited.",
  },
] as const;

export type Scenario = (typeof scenarios)[number];

/* -------------------------------------------------------------------------
   9 / 10 — Vision + conversion
   ------------------------------------------------------------------------- */

export const vision = {
  eyebrow: "Vision",
  statement:
    "To create a world where human ingenuity and artificial intelligence operate as one — advancing industries, empowering people, and defining the blueprint of tomorrow.",
} as const;

export const conversion = {
  eyebrow: "Engineer Your Future",
  headline: "Your infrastructure should do more than operate. It should evolve.",
  body: "Let's engineer an intelligent digital foundation built for what comes next.",
  primaryCta: { label: "Start a Conversation", href: "#contact-form" },
  secondaryCta: { label: "Explore a Solution", href: "#solutions" },
} as const;

export const interests = [
  "AI-driven automation",
  "Cloud-native architecture",
  "Software engineering",
  "Multi-tier IT support",
  "Enterprise infrastructure",
  "Intelligent web systems",
  "Something else",
] as const;

/* -------------------------------------------------------------------------
   Footer
   ------------------------------------------------------------------------- */

export const footer = {
  positioning:
    "AiTroniXus merges intelligence, innovation and infrastructure into one engineering practice — designing systems that think, learn, adapt and evolve.",
  columns: [
    {
      title: "Capabilities",
      links: [
        { label: "AI-Driven Automation", href: "#capabilities" },
        { label: "Cloud-Native Architecture", href: "#capabilities" },
        { label: "Software Engineering", href: "#capabilities" },
        { label: "Multi-Tier IT Support", href: "#capabilities" },
        { label: "Enterprise Infrastructure", href: "#capabilities" },
        { label: "Intelligent Web Systems", href: "#capabilities" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "The Intelligence Layer", href: "#intelligence" },
        { label: "Operating Model", href: "#approach" },
        { label: "Solution Scenarios", href: "#solutions" },
        { label: "Technology Ecosystem", href: "#ecosystem" },
        { label: "Vision", href: "#vision" },
        { label: "Contact", href: "#contact" },
      ],
    },
  ],
} as const;
