/**
 * Intelligent-infrastructure visualisation.
 *
 * A topology, not decoration: an illuminated core (the intelligence layer)
 * surrounded by three orbital tiers — platform, network, edge — with signal
 * paths flowing inward. Every value is authored, never random, so the server
 * and client render byte-identical markup.
 *
 * Animation is CSS-only (stroke-dashoffset, opacity, rotate) and is removed
 * wholesale under prefers-reduced-motion by the global stylesheet.
 */

type Node = { x: number; y: number; r: number; tier: 1 | 2 | 3; delay: number };

const CX = 300;
const CY = 300;

/* Three orbital tiers. Positions are hand-placed for composition rather than
   generated, so the negative space reads deliberately. */
const NODES: Node[] = [
  // inner tier — platform services
  { x: 300, y: 178, r: 4.5, tier: 1, delay: 0 },
  { x: 406, y: 262, r: 3.5, tier: 1, delay: 0.7 },
  { x: 366, y: 392, r: 4, tier: 1, delay: 1.4 },
  { x: 226, y: 384, r: 3.5, tier: 1, delay: 2.1 },
  { x: 192, y: 250, r: 4, tier: 1, delay: 2.8 },
  // middle tier — network
  { x: 300, y: 108, r: 3, tier: 2, delay: 0.4 },
  { x: 452, y: 176, r: 3.5, tier: 2, delay: 1.1 },
  { x: 486, y: 336, r: 3, tier: 2, delay: 1.8 },
  { x: 386, y: 468, r: 3.5, tier: 2, delay: 2.5 },
  { x: 214, y: 476, r: 3, tier: 2, delay: 3.2 },
  { x: 118, y: 344, r: 3.5, tier: 2, delay: 0.9 },
  { x: 140, y: 180, r: 3, tier: 2, delay: 1.6 },
  // outer tier — edge
  { x: 300, y: 42, r: 2.5, tier: 3, delay: 2.2 },
  { x: 520, y: 108, r: 2.5, tier: 3, delay: 3.0 },
  { x: 560, y: 300, r: 2.5, tier: 3, delay: 0.6 },
  { x: 468, y: 520, r: 2.5, tier: 3, delay: 1.3 },
  { x: 268, y: 560, r: 2.5, tier: 3, delay: 2.0 },
  { x: 68, y: 452, r: 2.5, tier: 3, delay: 2.7 },
  { x: 44, y: 220, r: 2.5, tier: 3, delay: 3.4 },
  { x: 170, y: 74, r: 2.5, tier: 3, delay: 1.9 },
];

/* Signal paths: outer tier → inner tier → core. */
const PATHS: { d: string; dur: number; delay: number }[] = [
  { d: "M300 42 L300 108 L300 178 L300 268", dur: 7, delay: 0 },
  { d: "M520 108 L452 176 L406 262 L332 288", dur: 8.5, delay: 1.2 },
  { d: "M560 300 L486 336 L366 392 L318 328", dur: 9.5, delay: 2.4 },
  { d: "M468 520 L386 468 L366 392 L330 320", dur: 8, delay: 0.6 },
  { d: "M268 560 L214 476 L226 384 L286 324", dur: 10, delay: 3.1 },
  { d: "M68 452 L118 344 L192 250 L272 282", dur: 8.8, delay: 1.8 },
  { d: "M44 220 L140 180 L192 250 L270 290", dur: 9.2, delay: 2.9 },
  { d: "M170 74 L300 108 L300 178 L292 266", dur: 7.6, delay: 4.0 },
];

const TIER_OPACITY: Record<1 | 2 | 3, number> = { 1: 0.95, 2: 0.6, 3: 0.34 };

export function InfrastructureViz({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="viz-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#50e6ff" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#0078d4" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#366bff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="viz-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#50e6ff" stopOpacity="0" />
          <stop offset="100%" stopColor="#50e6ff" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id="viz-fade" cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="viz-mask">
          <rect width="600" height="600" fill="url(#viz-fade)" />
        </mask>
      </defs>

      <g mask="url(#viz-mask)">
        {/* orbital rings */}
        <g stroke="#50e6ff" fill="none">
          <circle cx={CX} cy={CY} r="122" strokeOpacity="0.18" strokeWidth="1" />
          <circle cx={CX} cy={CY} r="192" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="2 7" />
          <circle cx={CX} cy={CY} r="258" strokeOpacity="0.08" strokeWidth="1" />
        </g>

        {/* radar sweep */}
        <g className="anim-radar" style={{ transformOrigin: "300px 300px" }}>
          <path d="M300 300 L300 42 A258 258 0 0 1 482 118 Z" fill="url(#viz-sweep)" opacity="0.13" />
          <line x1="300" y1="300" x2="300" y2="42" stroke="#50e6ff" strokeOpacity="0.45" strokeWidth="1" />
        </g>

        {/* static topology graph */}
        <g stroke="#50e6ff" strokeOpacity="0.14" strokeWidth="1">
          {PATHS.map((p) => (
            <path key={`static-${p.d}`} d={p.d} />
          ))}
        </g>

        {/* flowing signal */}
        <g stroke="#50e6ff" strokeWidth="1.6" strokeLinecap="round" fill="none">
          {PATHS.map((p) => (
            <path
              key={`flow-${p.d}`}
              d={p.d}
              className="anim-dash-flow"
              strokeDasharray="26 480"
              strokeOpacity="0.75"
              style={{ animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }}
            />
          ))}
        </g>

        {/* nodes */}
        <g>
          {NODES.map((n) => (
            <g key={`${n.x}-${n.y}`}>
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r + 4}
                fill="#50e6ff"
                opacity={TIER_OPACITY[n.tier] * 0.12}
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill="#50e6ff"
                opacity={TIER_OPACITY[n.tier]}
                className="anim-pulse-node"
                style={{ transformOrigin: `${n.x}px ${n.y}px`, animationDelay: `${n.delay}s` }}
              />
            </g>
          ))}
        </g>

        {/* core: the intelligence layer */}
        <circle cx={CX} cy={CY} r="96" fill="url(#viz-core)" opacity="0.55" />
        <g transform={`translate(${CX} ${CY})`}>
          <rect
            x="-44"
            y="-44"
            width="88"
            height="88"
            rx="10"
            fill="#04101b"
            stroke="#50e6ff"
            strokeOpacity="0.55"
            strokeWidth="1.2"
          />
          <rect
            x="-27"
            y="-27"
            width="54"
            height="54"
            rx="5"
            fill="none"
            stroke="#50e6ff"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
          <g stroke="#50e6ff" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round">
            <path d="M-20 -44v-16M0 -44v-16M20 -44v-16M-20 44v16M0 44v16M20 44v16" />
            <path d="M-44 -20h-16M-44 0h-16M-44 20h-16M44 -20h16M44 0h16M44 20h16" />
          </g>
          <circle cx="0" cy="0" r="7" fill="#50e6ff" className="anim-pulse-node" />
        </g>
      </g>
    </svg>
  );
}
