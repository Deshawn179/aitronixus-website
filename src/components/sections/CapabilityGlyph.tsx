/**
 * Capability metaphors.
 *
 * Each capability gets a distinct structural diagram rather than an icon from a
 * set — orchestration branches, scale nests, construction stacks, escalation
 * ascends, topology meshes, signal radiates. Line work only, one accent.
 */

type Props = { metaphor: string; className?: string };

const S = {
  line: { stroke: "#50e6ff", strokeOpacity: 0.28, strokeWidth: 1.2, fill: "none" },
  lineBright: { stroke: "#50e6ff", strokeOpacity: 0.72, strokeWidth: 1.4, fill: "none" },
  dot: { fill: "#50e6ff" },
} as const;

export function CapabilityGlyph({ metaphor, className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {metaphor === "orchestration" && (
        <g>
          <path d="M24 120h44" {...S.lineBright} />
          <path d="M68 120c26 0 26-58 52-58h40" {...S.line} />
          <path d="M68 120h92" {...S.lineBright} />
          <path d="M68 120c26 0 26 58 52 58h40" {...S.line} />
          <path d="M160 62h56M160 120h56M160 178h56" {...S.line} />
          <circle cx="68" cy="120" r="6" {...S.dot} />
          <circle cx="160" cy="62" r="4" {...S.dot} fillOpacity="0.5" />
          <circle cx="160" cy="120" r="4" {...S.dot} />
          <circle cx="160" cy="178" r="4" {...S.dot} fillOpacity="0.5" />
          <path
            d="M68 120h92"
            stroke="#50e6ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="14 160"
            className="anim-dash-flow"
          />
        </g>
      )}

      {metaphor === "scale" && (
        <g>
          <rect x="96" y="96" width="48" height="48" rx="4" {...S.lineBright} />
          <rect x="74" y="74" width="92" height="92" rx="6" {...S.line} />
          <rect x="52" y="52" width="136" height="136" rx="8" {...S.line} strokeOpacity="0.18" />
          <rect x="30" y="30" width="180" height="180" rx="10" {...S.line} strokeOpacity="0.1" />
          <circle cx="120" cy="120" r="5" {...S.dot} className="anim-pulse-node" style={{ transformOrigin: "120px 120px" }} />
          <path d="M120 30v22M120 188v22M30 120h22M188 120h22" {...S.line} />
        </g>
      )}

      {metaphor === "construction" && (
        <g>
          <rect x="40" y="150" width="60" height="50" rx="3" {...S.line} />
          <rect x="108" y="150" width="92" height="50" rx="3" {...S.line} />
          <rect x="40" y="92" width="92" height="50" rx="3" {...S.lineBright} />
          <rect x="140" y="92" width="60" height="50" rx="3" {...S.line} />
          <rect x="72" y="34" width="96" height="50" rx="3" {...S.line} />
          <path d="M86 92v-8M154 92v-8M70 150v-8M166 150v-8" {...S.line} />
          <circle cx="86" cy="117" r="4" {...S.dot} />
          <circle cx="120" cy="59" r="4" {...S.dot} fillOpacity="0.5" />
        </g>
      )}

      {metaphor === "escalation" && (
        <g>
          <rect x="34" y="158" width="172" height="42" rx="4" {...S.line} />
          <rect x="54" y="102" width="132" height="42" rx="4" {...S.line} />
          <rect x="74" y="46" width="92" height="42" rx="4" {...S.lineBright} />
          <path d="M120 158v-14M120 102v-14" {...S.lineBright} strokeDasharray="4 4" />
          <text x="46" y="184" fill="#50e6ff" fillOpacity="0.55" fontSize="11" fontFamily="monospace">
            L1
          </text>
          <text x="66" y="128" fill="#50e6ff" fillOpacity="0.7" fontSize="11" fontFamily="monospace">
            L2
          </text>
          <text x="86" y="72" fill="#50e6ff" fontSize="11" fontFamily="monospace">
            L3
          </text>
          <circle cx="186" cy="67" r="4" {...S.dot} className="anim-pulse-node" style={{ transformOrigin: "186px 67px" }} />
        </g>
      )}

      {metaphor === "topology" && (
        <g>
          <path
            d="M56 60L120 40l64 20-16 66 16 68-64 18-64-18 16-68z"
            {...S.line}
            strokeOpacity="0.2"
          />
          <path d="M56 60l64 66 64-66M120 126v86M56 194l64-68 64 68M40 126h160" {...S.line} />
          <circle cx="120" cy="126" r="7" {...S.dot} />
          <g fill="#50e6ff" fillOpacity="0.62">
            <circle cx="56" cy="60" r="4" />
            <circle cx="184" cy="60" r="4" />
            <circle cx="56" cy="194" r="4" />
            <circle cx="184" cy="194" r="4" />
            <circle cx="120" cy="40" r="3.5" />
            <circle cx="120" cy="212" r="3.5" />
          </g>
          <path
            d="M56 60l64 66 64-66"
            stroke="#50e6ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="12 200"
            className="anim-dash-flow"
          />
        </g>
      )}

      {metaphor === "signal" && (
        <g>
          <circle cx="120" cy="150" r="7" {...S.dot} />
          <path d="M120 150V44" {...S.lineBright} />
          <path d="M92 122a40 40 0 0 1 56 0" {...S.line} />
          <path d="M74 104a66 66 0 0 1 92 0" {...S.line} strokeOpacity="0.2" />
          <path d="M56 86a92 92 0 0 1 128 0" {...S.line} strokeOpacity="0.13" />
          <path d="M60 196h120" {...S.line} />
          <path d="M80 212h80" {...S.line} strokeOpacity="0.18" />
          <circle cx="120" cy="44" r="5" {...S.dot} className="anim-pulse-node" style={{ transformOrigin: "120px 44px" }} />
        </g>
      )}
    </svg>
  );
}
